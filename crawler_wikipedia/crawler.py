import json
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
import concurrent.futures
import time
from urllib.parse import urljoin

def process_wiki_page(current_wiki_page, hrefs_hashtable):
    try:
        response = requests.get(current_wiki_page['url'], timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        links = soup.find_all('a')
        
        connections_confirmed = set([current_wiki_page['id']])  # Usando set para evitar duplicados
        connections_ids = []
        
        for link in links:
            href = link.get('href')
            if not href or not href.startswith('/wiki/'):
                continue
                
            full_link = urljoin("https://en.wikipedia.org", href)
            
            if full_link in hrefs_hashtable and hrefs_hashtable[full_link] not in connections_confirmed:
                connections_ids.append(hrefs_hashtable[full_link])
                connections_confirmed.add(hrefs_hashtable[full_link])
        
        result = {
            "id": current_wiki_page['id'],
            "title": current_wiki_page['title'],
            "url": current_wiki_page['url'],
            "connections": connections_ids
        }
        
        return result
    except Exception as e:
        print(f"Erro ao processar {current_wiki_page['title']}: {e}")
        return {
            "id": current_wiki_page['id'],
            "title": current_wiki_page['title'],
            "url": current_wiki_page['url'],
            "connections": [],
            "error": str(e)
        }

def main():
    print("Carregando dataset...")
    with open('./wiki.json', 'r', encoding='utf-8') as wiki:
        dataset = json.loads(wiki.read())
    
    print("Criando tabela hash de URLs...")
    hrefs_hashtable = {}
    for wiki_page in dataset:
        hrefs_hashtable[wiki_page['url']] = wiki_page['id']
    
    results = []
    
    max_workers = 20
    
    print(f"Processando {len(dataset)} páginas com {max_workers} threads...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_page = {
            executor.submit(process_wiki_page, page, hrefs_hashtable): page 
            for page in dataset
        }
        
        with tqdm(total=len(dataset)) as pbar:
            for future in concurrent.futures.as_completed(future_to_page):
                page = future_to_page[future]
                try:
                    result = future.result()
                    if result:
                        results.append(result)
                except Exception as e:
                    print(f"Erro ao processar {page['title']}: {e}")
                
                pbar.update(1)
    
    print(f"Salvando {len(results)} resultados em wiki_connections.json...")
    with open('wiki_connections.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print("Processo concluído!")

if __name__ == '__main__':
    start_time = time.time()
    main()
    elapsed_time = time.time() - start_time
    print(f"Tempo total de execução: {elapsed_time:.2f} segundos")