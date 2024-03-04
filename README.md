# 🌟 Login System with PassportJS and MongoDB 🌐

This repository contains an example login system built using ExpressJS, PassportJS and MongoDB Database.

🌟 Don't forget to star ⭐ this repository if you find it helpful! 🌟

## ℹ️ How to run the app
- Clone the repository.
```
git clone https://github.com/methupaPerera/passport-login-example.git
```
- Install the necessary packages.
```
npm install
```
- Replace the DB_URI in the env file.
```
DB_URI = your-mongo-db-uri
```
- Run the app.
```
npm run dev
```

## 📁 File Structure

The project is structured as follows:

### 📂 Structure Details:

- **src**: Contains the main application files.
  - **index.js**: Entry point of the app.
  - **views**: EJS templates for different views.
  - **routes**: Includes the route handlers.
  - **models**: Includes models for mongodb.
  - **middleware**: Contains middleware of passportjs.
  - **controllers**: Contains controller functions for routes.
  - **config**: Contains db configs, passport configs and other configs.

>Feel free to explore the respective directories and well commented files to understand the implementation of the passport login system utilizing mongodb for the database functionality.
