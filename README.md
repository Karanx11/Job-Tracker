# 🚀 AI Job Application Tracker

A full-stack MERN application that helps users track job applications using a Kanban board with AI-powered features like job description parsing and resume bullet generation.

---

## 🌍 Live Demo

🔗 Frontend: https://job-tracker-rto6.onrender.com  
🔗 Backend: https://job-tracker-backend-jwgv.onrender.com
---

## 📌 Features

### 🔐 Authentication
- Register & Login using JWT
- Secure routes
- Persistent login

---

### 📊 Kanban Board
- 5 Columns:
  - Applied
  - Phone Screen
  - Interview
  - Offer
  - Rejected
- Drag & Drop functionality
- Real-time updates

---

### 📄 Application Management
- Create new applications
- Edit applications
- Delete applications
- Fields:
  - Company
  - Role
  - Status
  - JD Link
  - Notes
  - Salary Range
  - Date Applied

---

### 🤖 AI Job Description Parser
- Paste job description
- Extract:
  - Company name
  - Role
  - Required skills
  - Nice-to-have skills
  - Seniority
  - Location
- Auto-fill form fields
- Handles invalid AI responses

---

### 🧠 AI Resume Suggestions
- Generate tailored resume bullet points
- Based on job role & company
- Copy-to-clipboard feature

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- @hello-pangea/dnd

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt

### AI Integration
- Groq API (LLaMA models)

---

## 📁 Project Structure

        Job Tracker/
        │
        ├── backend/
        │ ├── models/
        │ ├── routes/
        │ ├── server.js
        │ └── .env
        │
        ├── frontend/
        │ ├── src/
        │ ├── components/
        │ ├── pages/
        │ └── App.jsx


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Karanx11/Job-Tracker.git
cd job-tracker
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

MONGO_URI=your_mongodb_uri
GROQ_API_KEY=your_api_key
JWT_SECRET=your_secret

Run server:

npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🔑 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
GROQ_API_KEY	Groq API key
JWT_SECRET	Secret for authentication

## 🚀 Deployment

##  Backend (Render)
        Web Service
        Root: backend
        Build: npm install
        Start: npm start
##   Frontend (Render)
        Static Site
        Root: frontend
        Build: npm install && npm run build
        Publish: dist

### ⚠️ Notes

    Do not commit .env file
    Use .env.example for sharing config
    Render free tier may sleep on inactivity

##  🔮 Future Improvements
    Dashboard analytics
    Search & filter applications
    Notifications & reminders
    Dark mode
    Export to CSV

👨‍💻 Author

Karan Sharma

⭐ Acknowledgements
Groq API for AI features
MongoDB Atlas
Render for deployment