# ClariNote
Your AI-powered assistant that transforms complex PDFs and long texts into clear, concise summaries.

---

## Built with the tools and technologies:

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Poppler](https://img.shields.io/badge/Poppler-PDF_Extraction-grey?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)

## 🖼️ Screenshots

### Login 
![Login form](screenshots/login.png)

### Register 
![Register form](screenshots/register.png)

### User lectures 
![Lectures list](screenshots/userLectures.png)

### Upload Lecture
![Upload](screenshots/uploadLecture.png)

### Lecture content 
![Lecture Content](screenshots/lectureContent.png)

### Delete lecture dialog
![Delete dialog](screenshots/deleteDialog.png)

### Summary generation state
![Summary generation](screenshots/summaryGeneration.png)

### PDF Summary 
![Summary generation](screenshots/summary.png)

## 📌 Features

- Upload a **PDF lecture file**
- AI automatically analyzes the content
- Generates organized study notes including:
  - **Lecture Overview**
  - **Key Concepts**
  - **Important Definitions**
  - **Key Points**
  - **Quick Revision Summary**

This makes it easier for students to review lectures and prepare for exams efficiently.

---

## ⚙️ Prerequisites

Make sure the following are installed on your machine before running the project:

- **PHP**
- **Poppler** (for PDF text extraction)
- **Composer**
- **Node.js & npm** – for running the frontend
- **MySQL** – database
- **Git** – to clone the repository

---

## 🛠️ Tech Stack

### Backend
- **Laravel** – PHP framework used to build the REST API and handle application logic
- **PHP** – Core programming language for the backend
- **Composer** – Dependency management

### AI Integration
- **Gemini API** – Used to analyze lecture text and generate structured summaries

## 🤖 Automation with n8n

This project integrates **n8n** to enhance functionality through automation.

### 🔹 What it does
- Uses n8n workflows to handle background automation processes  
- Automatically sends an email to the user after their PDF summary has been successfully generated  

### 🔹 Why it matters
- Improves user experience by providing instant feedback  
- Demonstrates real-world use of automation tools in a fullstack application  
- Reduces manual effort by handling communication automatically  
### File Processing
- **Poppler** – Used to extract text content from uploaded PDF files

### Database
- **MySQL** – Stores lecture files, extracted text, and generated summaries

### Tools & Development
- **Postman** – API testing
- **Git & GitHub** – Version control and project hosting

## 🚀 How It Works

1. The user uploads a **PDF lecture file**.
2. The system extracts the **text content** from the PDF.
3. The **AI agent processes the text**.
4. Structured notes are generated automatically for easier studying.

---

## 🎯 Purpose

ClariNote aims to help students save time by converting long lecture materials into **clear, structured summaries** that are easy to understand and revise.

---

## ⚙️ Installation

Follow these steps to run the project locally (Backend + Frontend).

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/clarinote.git
cd backend
```

### 2. Install Dependencies

Use Composer to install the required PHP packages.

```bash
composer install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then generate the application key:

```bash
php artisan key:generate
```

Add your **Gemini API key** to the `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

### 4. Set Up the Database

Configure your database credentials inside `.env`, then run:

```bash
php artisan migrate
```

### 5. Start the Development Server

Run the Laravel server:

```bash
php artisan serve
```

The application will be available at:

```
http://127.0.0.1:8000
```

### 6. Test the API

You can test the endpoints using **Postman** by sending requests to the running server.

### 7. Setup the Frontend 
Open a new terminal navigate to the frontend folder and install dependencies:
```bash
  cd frontend
  cd ClariNote
  npm install
```
Start the development server:
```bash
npm run dev
```

The frontend will be available at:
```
http://localhost:5173
```