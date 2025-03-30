# 💳 FinPal: Mobile Credit Card Expense Reminder with AI Insights (for UGAHacks X)

## 👨‍💻 Team Members
Tillman Won

Matthew Mocklin

## 📌 Project Purpose
Many individuals struggle with credit card debt due to overspending. According to a 2023 study by the Federal Reserve, **over 60% of Americans** carry credit card debt, often because they spend beyond their actual available balance. **FinPal** is designed to address this issue by keeping users accountable and promoting better financial decisions.

**How it works:**
- Tracks credit card transactions in real-time
- Notifies users after every purchase with their remaining monthly budget
- Includes an AI assistant for personalized financial insights

By ensuring users always know how much they have left in their budget, **FinPal** helps prevent overspending and encourages responsible credit usage.

---

## 🚀 Features
- **Real-time Transaction Tracking via Plaid:** Automatically logs credit card transactions.
- **Instant Budget Notifications:** Alerts users after every purchase with their remaining budget.
- **AI-Powered Insights:** Users can ask an AI assistant about their spending habits and receive actionable financial advice.
- **Customizable Budgeting:** Set and adjust monthly spending limits.
- **Secure & Private:** Transactions are encrypted and only visible to the user.

---

## 🛠️ Tools & Technologies
- **Frontend:** Expo/React Native (for cross-platform mobile development)
- **Backend:** Node.js with Express.js
- **AI Assistant:** OpenAI API for NLP-based personalized financial insights
- **Financial Data Integration:** Plaid API (for securely fetching transaction data)
- **Notifications:** Expo Notifications (for push notifications)

---

## 🚧 Challenges & Solutions
### 🔴 Challenge 1: Integrating Plaid
**Problem:** Plaid required a dedicated Node backend for data retrieval and Express as middle-ware between the front-end and back-end.
**Solution:** We opted to use sandbox data provided by Plaid as a proof of concept, which provides direct transaction retrieval. We ended up giving up on Express for time reasons.

### 🔴 Challenge 2: OpenAI API Token
**Problem:** It was taking much longer than we're proud to admit to get a response from the API. We kept getting 404 Responses from our queries.
**Solution:** Turns out we didn't have the tier plan for ChatGPT 4o. So we used ChatGPT 4o-mini instead.

---

## 📜 Credits & Acknowledgments
This project utilizes the following public frameworks and APIs:
- **Plaid API** - Secure financial data access
- **Express.js** - Communication between front-end and the back-end
- **OpenAI API** - AI-powered financial insights
- **Expo Go** - Mobile testing
- **Expo Notifications** - Push notifications
- **Expo/React Native** - Mobile application framework

---

