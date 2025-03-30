# 💰 Real-Time Personal Finance Tracker

An AI-powered, real-time personal finance assistant that helps users understand their spending, make smarter financial decisions, and visualize their transactions instantly. Built for **FrostHack 2025** under the problem statement by **Pathway & FetchAI**.

---

## 🚀 Features

- 🔄 Real-time transaction ingestion & indexing with **Pathway**
- 🧠 Natural language query answering via **FetchAI autonomous agents**
- 📊 Interactive data visualization with day-wise expenditure charts
- 🧾 Intelligent financial insights like "Can I afford this?" or "What did I spend on groceries last week?"
- 🌐 Web-based UI with text + visual response integration

---

## 🛠️ Tech Stack

### Backend:
- **FetchAI AI Agents** – LLM-powered agents for reasoning & dynamic replies ([docs](https://fetch.ai/docs/))
- **Pathway Vector Store** – Real-time, context-aware data handling ([pathway.com](https://pathway.com))
- **Node.js + Express.js** – API handling and backend logic

### Frontend:
- **React.js** – SPA for querying and displaying results
- **Tailwind CSS** – Clean, responsive styling
- **Chart.js** – For rendering expenditure visualizations

### Dev Tools:
- **Docker** – Containerized dev & deployment
- **GitHub Actions** – Automated CI/CD
- **Jest** – Unit & integration testing

---

## 📈 Use Cases

- "How much did I spend on food this week?"
- "Can I afford a ₹5000 purchase today?"
- "Show me a chart of last month's spending."

---

## 🧪 How It Works

1. **User Inputs** a natural language query (e.g., "What did I spend yesterday?")
2. **Transaction Data** is fetched & indexed in real-time using Pathway
3. **FetchAI Agent** processes the query, performs reasoning, and returns text + chart-based response
4. **Frontend** displays the response + interactive visual breakdown

---

## 🧠 Architecture

**System Flow:**
- User input → React Frontend
- React sends query to Express Backend
- Backend invokes FetchAI Agent for reasoning
- Pathway handles real-time data lookup
- Response is returned with text + chart data
- Frontend displays response and charts

---

## 📦 Setup Instructions

1. **Clone this repo**
```bash
git clone https://github.com/yourusername/real-time-finance-tracker.git
cd real-time-finance-tracker
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Start backend server**
```bash
npm start
```

4. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

5. **Run frontend app**
```bash
npm run dev
```

6. **(Optional)** Add real transaction data ingestion or mock data scripts in `/data`

---

## 🎯 Built For

- **FrostHack 2025** – Problem Statement by Pathway & FetchAI
- Focused on real-world applications of AI agents and real-time data processing

---

## 🙌 Credits

- **Team:** Prabhmannat Singh ([@PRABHMANNAT](https://github.com/PRABHMANNAT))
- **Special Thanks:** Pathway, FetchAI, FrostHack organizers

---

## 🔮 Future Enhancements

- 🏦 Integration with real bank APIs (e.g., Plaid, Razorpay)
- 📱 Launch mobile version (Flutter / React Native)
- 🔐 End-to-end encrypted data sync
- 📊 Monthly budget recommendation engine

---

## 📬 Contact

**Website:** [prabh.site](https://prabh.site)  
**Email:** contact@prabh.site  
**LinkedIn:** [linkedin.com/in/prabhmannat](https://linkedin.com/in/prabhmannat)

---

> _"Make finance feel like texting a smart friend — one who actually knows your wallet."_
