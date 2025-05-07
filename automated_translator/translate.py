import os
import json
import asyncio
from googletrans import Translator

async def translate_text(text, lang, translator):
    try:
        if not text.strip():  
            return text
        
        translation = await translator.translate(text, dest=lang)
        return translation.text
    except Exception as e:
        print(f"Erro ao traduzir texto '{text}': {e}")
        return text  

async def translate_nested_async(obj, lang, translator):
    if isinstance(obj, str):
        return await translate_text(obj, lang, translator)
    elif isinstance(obj, dict):
        result = {}
        for key, value in obj.items():
            result[key] = await translate_nested_async(value, lang, translator)
        return result

async def translate_to_async(texto: dict, idioma_destino: str) -> dict:
    translator = Translator()
    try:
        translated_dict = await translate_nested_async(texto, idioma_destino, translator)
        return translated_dict
    except Exception as e:
        print(f"Erro durante a tradução: {e}")
        return {}

def load_json(path: str) -> dict:
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data: dict, path: str):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

async def translate_file(ptbr, target_code, output_path):
    print(f"Traduzindo para {target_code}...")
    translated = await translate_to_async(ptbr, target_code)
    
    if translated:
        save_json(translated, output_path)
        print(f"Arquivo {os.path.basename(output_path)} traduzido com sucesso!")
        return True
    else:
        print(f"Erro ao traduzir para {target_code}")
        return False

async def translate_all_files_async():
    locales_dir = "../frontend/src/locales"
    files = [f for f in os.listdir(locales_dir) if f.endswith(".json")]
    base_file = os.path.join(locales_dir, "pt-br.json")
    ptbr = load_json(base_file)
    
    print("Começando o processo de tradução...")
    
    tasks = []
    for filename in files:
        if filename == "pt-br.json":
            continue
            
        target_code = filename.replace(".json", "")
        output_path = os.path.join(locales_dir, filename)
        tasks.append(translate_file(ptbr, target_code, output_path))
    
    results = await asyncio.gather(*tasks)
    
    success_count = results.count(True)
    print(f"Tradução concluída: {success_count} de {len(tasks)} arquivos traduzidos com sucesso!")

def translate_all_files():
    asyncio.run(translate_all_files_async())

if __name__ == "__main__":
    translate_all_files()