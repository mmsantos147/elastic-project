# U🔺iSearch

UaiSearch é uma engine de busca inteligente desenvolvida com **Spring Boot** e **Elasticsearch**, projetada para oferecer resultados relevantes mesmo com erros de digitação, sinônimos e expressões complexas.

## 🚀 Tecnologias

![ElasticSearch](https://img.shields.io/badge/Elastic_Search-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![SpringBoot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![StyledComponents](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Debian](https://img.shields.io/badge/Debian-A81D33?style=for-the-badge&logo=debian&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

## 📦 Funcionalidades

- Correção de digitação (sugestão: "Você quis dizer...")
- Interpretação de operadores lógicos (`"aspas"`, `created_at`, `reading_time`, `in_title`, `-`, `-in_title`, etc.)
- Paginação de resultados
- Controle de quantidade de resultados por página
- Indexação de grandes volumes de dados (ex: Wikipedia)
- Suporte a linguagem natural (snowball algorithm)
- Resumo automático dos resultados (via API da OpenAi)
- API REST para integração
- Type-as-you-search
- Sistema de favoritos e histórico de dados
- Suporte para mais de 20 idiomas
- Syntax Highlight
- Acessibilidade para surdos
- Design totalmente responsivo
- Temperatura e clima em tempo real
- Grafo de conexões
- Indicadores de palavras chaves que casaram
- Páginas de dicas de pesquisas
- Teclado virtual

## 📁 Estrutura do Projeto

```
uaisearch/
├── aisearch/ # Aplicação backend SpringBoot + Elastic Search
├── frontend/ # Aplicação React + JavaScript
├── crawler_wikipedia/ # Scrapping de dados da conexões da Wikipédia
├── mock_server/ # Servidor de respostas definidas para desenvolvimento do frontend
└── automated_translator/ # Tradutor automático para o i18n
```
