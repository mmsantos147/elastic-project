import json
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import unquote, urljoin
import sys
import time
from tqdm import tqdm

def read_wikipedia_data(file_path):
    """
    Lê o arquivo NDJSON e retorna um dicionário de documentos da Wikipedia
    """
    wiki_docs = {}
    wiki_titles = {}  # Mapeamento de títulos para IDs (para facilitar a busca)
    
    print("Lendo o arquivo de dados...")
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            try:
                # Pular linhas de índice
                if '"index"' in line:
                    continue
                
                data = json.loads(line)
                # Processar apenas os documentos com título e URL
                if "title" in data and "url" in data:
                    doc_id = data.get("url", "").split("/")[-1]  # Usar o último segmento da URL como ID
                    wiki_docs[doc_id] = {
                        "title": data["title"],
                        "url": data["url"],
                        "content": data.get("content", "")
                    }
                    # Armazenar o título para busca rápida
                    wiki_titles[data["title"].lower()] = doc_id
            except json.JSONDecodeError:
                continue
    
    print(f"Carregados {len(wiki_docs)} documentos da Wikipedia")
    return wiki_docs, wiki_titles

def fetch_wikipedia_content(url):
    """
    Obtém o conteúdo completo de uma página da Wikipedia
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Erro ao acessar a URL {url}: {e}")
        return None

def extract_wiki_links_from_html(html_content, base_url):
    """
    Extrai links internos da Wikipedia do conteúdo HTML
    """
    if not html_content:
        return []
    
    soup = BeautifulSoup(html_content, 'html.parser')
    links = []
    
    # Encontrar todos os links no corpo principal do artigo
    content_div = soup.select_one('#mw-content-text')
    if not content_div:
        return []
    
    # Buscar todos os links no conteúdo principal
    for a_tag in content_div.select('a[href]'):
        href = a_tag.get('href', '')
        
        # Considerar apenas links internos da Wikipedia
        if href.startswith('/wiki/') and ':' not in href:  # Evitar páginas especiais como File:, Category:, etc.
            # Extrair o título da página do link
            page_name = href.split('/wiki/')[-1]
            
            # Ignorar âncoras na mesma página
            if '#' in page_name:
                page_name = page_name.split('#')[0]
                
            if page_name:
                links.append(unquote(page_name))
    
    return list(set(links))  # Remover duplicatas

def build_reference_mapping(wiki_docs, wiki_titles, max_nodes=None):
    """
    Constrói um mapeamento simples de IDs para links acessando as páginas da Wikipedia
    """
    reference_map = []
    processed = 0
    
    print("Construindo mapeamento de referências...")
    doc_items = list(wiki_docs.items())
    
    # Usar tqdm para mostrar barra de progresso
    for doc_id, doc in tqdm(doc_items[:max_nodes] if max_nodes else doc_items, desc="Processando páginas"):
        # Buscar o conteúdo completo da página
        html_content = fetch_wikipedia_content(doc["url"])
        
        # Extrair links do HTML
        links = extract_wiki_links_from_html(html_content, doc["url"])
        
        # Filtrar apenas links que existem na base de dados
        valid_links = []
        for link in links:
            link_id = None
            
            # Verificar diretamente pelo ID
            if link in wiki_docs:
                link_id = link
            # Verificar pelo título (normalizado)
            elif link.lower() in wiki_titles:
                link_id = wiki_titles[link.lower()]
            
            if link_id and link_id in wiki_docs and link_id != doc_id:  # Excluir auto-referências
                valid_links.append(link_id)
        
        # Adicionar ao mapeamento
        reference_map.append({
            "id": doc_id,
            "links": valid_links
        })
        
        processed += 1
        
        # Pequena pausa para evitar sobrecarregar o servidor da Wikipedia
        time.sleep(1)
    
    print(f"Mapeamento concluído com {processed} documentos")
    return reference_map

def save_mapping_as_json(reference_map, output_file="wikipedia_reference_map.json"):
    """
    Salva o mapeamento em formato JSON
    """
    # Salvar em arquivo
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(reference_map, f, ensure_ascii=False, indent=2)
    
    print(f"Mapeamento salvo em formato JSON como '{output_file}'")

def main():
    # Configurar parâmetros
    file_path = "wiki.json"  # Altere para o seu arquivo
    max_nodes = None  # Número máximo de nós a processar (None para todos)
    
    # Processar argumentos da linha de comando
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    
    # Processar argumentos opcionais
    if len(sys.argv) > 2 and sys.argv[2].isdigit():
        max_nodes = int(sys.argv[2])
        print(f"Limitando o processamento a {max_nodes} documentos")
    
    # Ler documentos
    wiki_docs, wiki_titles = read_wikipedia_data(file_path)
    
    # Construir mapeamento
    reference_map = build_reference_mapping(wiki_docs, wiki_titles, max_nodes)
    
    # Verificar se o mapeamento tem dados
    if reference_map:
        # Salvar resultados
        print("\nSalvando resultados...")
        save_mapping_as_json(reference_map, "wikipedia_reference_map.json")
    else:
        print("Não foi possível construir o mapeamento. Verifique os dados de entrada.")

if __name__ == "__main__":
    main()