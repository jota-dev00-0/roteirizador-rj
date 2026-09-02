# 🚛 Roteirizador RJ

Sistema inteligente de roteirização de entregas para o Rio de Janeiro, utilizando IA para otimizar rotas de forma automática.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Groq](https://img.shields.io/badge/IA-Groq-00C49A)

## ✨ Funcionalidades

- 📦 Cadastro manual de entregas (cliente, endereço, horário e volume)
- 📄 Importação de entregas via CSV
- 🚛 Configuração flexível de quantidade de caminhões (1 a 6)
- 🧠 Otimização inteligente com IA (Groq/Llama 3.3)
- 🗺️ Visualização das rotas por caminhão
- 📍 Link direto para Google Maps com a sequência de paradas
- 🎨 Interface dark mode com design moderno

## 🚀 Tecnologias

- **Frontend:** React, Vite
- **Estilização:** CSS puro com variáveis
- **IA:** Groq API (Llama 3.3 70B)
- **Mapas:** Google Maps (link externo)

## 📋 Pré-requisitos

- Node.js 16+
- Chave de API gratuita da [Groq](https://console.groq.com/keys)

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/roteirizador-rj.git
cd roteirizador-rj

# Instale as dependências
npm install

# Crie o arquivo de ambiente
echo "GROQ_API_KEY=sua-chave-aqui" > .env

# Inicie o servidor
npm run dev