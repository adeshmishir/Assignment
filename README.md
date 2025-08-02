# 🧠 Apify Assignment – Web App Challenge

## 📦 Project Overview

This is a full-stack web application that authenticates users using their Apify API key, displays a list of available actors, allows execution of any actor with its dynamic input schema, and shows the run results — all within a clean and responsive UI.

🔗 GitHub Repo: [https://github.com/adeshmishir/Assignment](https://github.com/adeshmishir/Assignment)

---

## 🛠️ How to Install and Run

### 1. Clone the repository
```bash
git clone https://github.com/adeshmishir/Assignment.git
cd Assignment


Setup BAckend :
cd server
npm install


Create a .env file inside /server with:
PORT=5000
APIFY_API_BASE_URL=https://api.apify.com/v2/

Then run:
npm run server


Setup Frontend:
cd ../client
npm install
npm run dev



Actor Used for Testing:
I used the apify/website-content-crawler actor for testing. It accepts a URL and extracts content from the website.


Assumptions & Design Choices:
Built using React (Vite), Tailwind CSS, Node.js, and Express.js.
Frontend allows login, actor listing, schema-based input form, and output display.
Used localStorage to store the API key.
Single-page app with responsive UI and smooth user experience.
Implemented pagination, toaster notifications, and form validation.


Working Flow:
Login using your Apify API Key.
Browse and select an actor.
Dynamic form loads based on the actor's input schema.
Fill in details and run the actor.
View the result/output.


 Folder Structure:
client/       # React frontend
server/       # Node.js backend
README.md     # This file

