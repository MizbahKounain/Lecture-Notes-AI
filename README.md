# 📘 NoteX.ai — Lecture to AI Notes

**NoteX.ai** is a student-focused web application that converts live lecture recordings into **clean, structured notes** and **exam-ready study material** using AI.

It helps students:

* Focus on understanding lectures instead of typing
* Automatically generate summaries
* Convert notes into study-friendly formats

---

## ✨ Features

*  **Live Lecture Recording** (browser-based)
*  **Real-time Transcription**
*  **AI-generated Clean Notes**
*  **Smart Study Mode**

  * Definitions
  * Key points
  * Exam-oriented notes
*  **Editable Notes**
*  **Download as TXT or PDF**
*  **Student-friendly, modern UI**

---

## 🛠️ Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **Tailwind CSS**
* **Web Speech API** (for live transcription)
* **jsPDF** (PDF export)

### Backend

* **Java**
* **Spring Boot**
* **REST APIs**
* **AI API (Groq / LLM-based)**

---

## 📂 Project Structure

```
NoteX_ai/
├── frontend/        # Next.js frontend
│   ├── app/
│   ├── public/
│   └── package.json
│
├── backend/         # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have:

* **Node.js** (v18+ recommended)
* **Java JDK 17**
* **Maven**
* **Google Chrome** (required for speech recognition)

---

##  Running the Project Locally

### 1️. Clone the Repository

```bash
git clone https://github.com/your-username/Lecture-Notes-AI.git
cd NoteX_ai
```

---

### 2️. Backend Setup (Spring Boot)

#### Navigate to backend:

```bash
cd backend
```

#### Set Environment Variable (API Key)

**Windows (PowerShell):**

```powershell
$env:GROQ_API_KEY="your_api_key_here"
```

**macOS / Linux:**

```bash
export GROQ_API_KEY=your_api_key_here
```

#### Run backend:

```bash
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

Test:

```
http://localhost:8080/health
```

---

### 3️. Frontend Setup (Next.js)

#### Open a new terminal and navigate:

```bash
cd frontend
```

#### Install dependencies:

```bash
npm install
```

#### Run frontend:

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:3000
```

---

##  How to Use the App

1. Open the app in **Google Chrome**
2. Click **Start Recording**
3. Speak or play a lecture
4. Stop recording
5. Click **Generate Notes**
6. (Optional) Click **Convert to Study Notes**
7. Edit or download notes as TXT / PDF

---

## ⚠️ Important Notes

*  Speech recognition works best in **Google Chrome**
*  Use a quiet environment for better accuracy
*  Long lectures are supported using auto-restart transcription
*  API keys are stored securely using environment variables

---

##  Current Status

*  Core features implemented
*  Works locally
*  Deployment planned (Vercel + Railway)

---

## 🧠 Future Improvements

*  Audio upload support
*  Multi-language transcription
*  Topic detection & titles
*  Auto-generated quizzes
*  Cloud deployment

---

##  Built For

**Students** who want to:

* Learn more effectively
* Save time during lectures
* Prepare smarter for exams

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is for educational and personal use.

---

**Made with ❤️ for students — combining learning and AI.**
