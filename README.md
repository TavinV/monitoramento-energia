# ⚡ Monitoramento de Energia com ESP32 e MERN Stack

## 🧭 Introdução

O **Monitoramento de Energia** é um sistema desenvolvido para registrar e visualizar medições elétricas realizadas por um **ESP32**.  
O dispositivo envia dados de **tensão (V)** e **corrente (A)** via protocolo HTTP, que são processados no **servidor Node.js** para calcular:

- Potência instantânea (W)
- Energia consumida (kWh)
- Custo estimado (R$)
- Tempo desde a última medição
- Data e hora da última atualização

O objetivo do projeto é fornecer uma interface simples, responsiva e intuitiva para acompanhamento em tempo real do consumo elétrico de máquinas, possibilitando análises e controle de eficiência energética.

---

---

🔗 Aplicação hospedada: https://monitoramento-energia.vercel.app/


## ⚙️ Detalhes Técnicos

### Arquitetura e Comunicação
O projeto utiliza uma arquitetura **MERN (MongoDB, Express, React, Node.js)**, com comunicação via **API RESTful**.  
O **ESP32** atua como cliente HTTP, enviando medições em formato JSON para o servidor.  
O frontend em React consome a API e exibe os dados em **cards e gráficos dinâmicos**.

### Tecnologias Principais
| Camada | Tecnologia | Descrição |
|--------|-------------|-----------|
| Backend | **Node.js + Express.js** | Servidor responsável por receber e processar medições |
| Banco de Dados | **MongoDB Atlas** | Armazenamento das medições em formato NoSQL |
| Frontend | **React + Vite + Tailwind CSS + Recharts** | Interface visual moderna e responsiva |
| Segurança | **Middleware de autenticação com API Key** | Garante que apenas o ESP32 autorizado envie dados |
| Controle de Versão | **Git + GitHub** | Versionamento do projeto e colaboração |

### Cybersegurança
Para evitar inserção de dados não autorizados:
- O ESP32 envia uma **chave de autenticação (API Key)** configurada no `.env` do servidor.
- O middleware `validateApiKey.js` verifica a validade do token antes de permitir o registro da medição.
- Todas as requisições externas devem incluir o cabeçalho:
  ```
  x-api-key: <API_KEY>
  ```

---

## 🗂️ Estrutura de Pastas (resumida)

```
📦monitoramento-energia
 ┣ 📂client            # Frontend React
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┗ 📜App.jsx
 ┣ 📂server            # Backend Node.js / Express
 ┃ ┣ 📂config
 ┃ ┣ 📂controllers
 ┃ ┣ 📂middleware
 ┃ ┣ 📂models
 ┃ ┣ 📂routes
 ┃ ┣ 📂util
 ┃ ┗ 📜server.js
```

---

## 🚀 Execução do Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seuusuario/monitoramento-energia.git
cd monitoramento-energia
```

### 2️⃣ Backend (server)
```bash
cd server
npm install
cp .env.example .env
# Edite o arquivo .env com sua URI do MongoDB e API_KEY
npm run dev
```

### 3️⃣ Frontend (client)
```bash
cd client
npm install
npm run dev
```

---

## 📡 Documentação da API

### Base URL
```
http://localhost:3000/api/measurements
```

---

### **1. POST /measurements**
Registra uma nova medição enviada pelo ESP32.

**Headers:**
```
Content-Type: application/json
x-api-key: <API_KEY>
```

**Body:**
```json
{
  "voltage": 127.5,
  "current": 0.4
}
```

**Respostas:**

✅ **200 OK**
```json
{
  "_id": "67201b891f5c3e23e2e5ab12",
  "voltage": 127.5,
  "current": 0.4,
  "power": 51,
  "duration": 0.12,
  "energy": 0.00006,
  "cost": 0.00004,
  "timestamp": "2025-10-31T00:58:09.798Z"
}
```

❌ **401 Unauthorized**
```json
{ "error": "Acesso negado: API Key inválida." }
```

❌ **400 Bad Request**
```json
{ "error": "Campos obrigatórios ausentes." }
```

---

### **2. GET /measurements**
Retorna todas as medições registradas.

**Exemplo de resposta:**
```json
[
  {
    "voltage": 127.6,
    "current": 0.42,
    "power": 53.6,
    "duration": 0.35,
    "energy": 0.00018,
    "cost": 0.00012,
    "timestamp": "2025-10-31T01:10:25.201Z"
  },
  {
    "voltage": 126.9,
    "current": 0.38,
    "power": 48.22,
    "duration": 0.45,
    "energy": 0.00021,
    "cost": 0.00014,
    "timestamp": "2025-10-31T01:15:34.102Z"
  }
]
```

---

### **3. GET /measurements/last**
Retorna apenas a última medição registrada.

**Exemplo de resposta:**
```json
{
  "voltage": 127.8,
  "current": 0.41,
  "power": 52.3,
  "duration": 0.25,
  "energy": 0.00013,
  "cost": 0.00009,
  "timestamp": "2025-10-31T01:30:22.402Z"
}
```

---

## 📊 Cálculos Aplicados

| Dado | Fórmula | Unidade |
|------|----------|----------|
| Potência | `P = V × I` | Watts (W) |
| Energia | `(P × tempo) / 1000` | Quilowatt-hora (kWh) |
| Custo | `Energia × tarifa` | Reais (R$) |
| Tempo | Calculado a partir da diferença entre medições | Horas |


## 🧱 Licença
Este projeto é de uso educacional e experimental.  
Sinta-se à vontade para modificá-lo, desde que cite a autoria original.
