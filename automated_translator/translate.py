import os
import json
import openai


openai.api_key = "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"

def translate_to(texto: str, idioma_destino: str) -> str:
    messages = [
        {
            "role": "system",
            "content": (
                "Você é um tradutor de idiomas. "
                "O usuário irá mandar o conteúdo de um arquivo JSON, "
                "especificando a sigla da linguagem. Traduza o texto "
                "para a linguagem específica. Não use markdown; apenas JSON puro."
                "O JSON deve ser IDENTICO ao JSON original, com excessao da tradução,"
                "que deverá corresponder ao input do usuário. Coloque todo o texto"
                "(chaves e valores) entre aspas duplas, não aspas simples. Não escape "
                "aspas simples com \\ (contra barra)."
            )
        },
        {
            "role": "user",
            "content": f"Traduz o seguinte texto para o idioma: [{idioma_destino}] (CODIGO DE IDIMA DA NORMAL ISO 639-1):\n\n{texto}"
        }
    ]

    response = openai.chat.completions.create(
        model="gpt-4o-mini",       
        messages=messages,
        temperature=0                  
    )

    response_text = response.choices[0].message.content.strip()
    try:
        translated_content = json.loads(response_text)
        return translated_content
    except json.JSONDecodeError:
        print(response_text)
        print("Erro ao decodificar a resposta da tradução. Verifique o formato.")
    return {}

def load_json(path: str) -> dict:
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data: dict, path: str):
    # Aqui fazemos o salvamento com indentação apropriada
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def translate_all_files():
    locales_dir = "../frontend/src/locales"

    files = [f for f in os.listdir(locales_dir) if f.endswith(".json")]

    base_file = os.path.join(locales_dir, "pt-br.json")
    ptbr = load_json(base_file)

    print("Começando...")
    
    for filename in files:
        if filename == "pt-br.json":
            continue

        target_code = filename.replace(".json", "")
        print(f"Traduzindo para {target_code}...")

        # Traduzir o arquivo inteiro
        translated = translate_to(ptbr, target_code)

        if translated:
            save_json(translated, os.path.join(locales_dir, filename))
        else:
            print(f"Erro ao traduzir o arquivo {filename}")

    print("Tradução concluída para todos os arquivos!")

if __name__ == "__main__":
    translate_all_files()
