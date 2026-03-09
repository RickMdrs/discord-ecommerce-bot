# 🛒 Rage Store: Integrated E-commerce & Automated Delivery Bot

## 📌 Project Overview
A comprehensive full-stack Discord solution for digital product sales. This bot automates the entire sales cycle—from inventory management and dynamic UI rendering to real-time payment processing via the **Mercado Pago API** and instant product provisioning.

## 🚀 Key Features & Business Logic
* **Real-time Payment Integration:** Utilizes the Mercado Pago SDK to generate dynamic PIX (Brazilian Instant Payment) QR codes and "Copy & Paste" keys directly within the Discord interface.
* **Automated Provisioning (FIFO):** Implements a "First-In, First-Out" (FIFO) logic for license key delivery. The system automatically pulls from an encrypted SQLite database to deliver unique keys upon payment confirmation.
* **Dynamic Inventory Management:** Admin dashboard allows for real-time SKU updates, price adjustments, and stock replenishment via Discord Modals.
* **Secure Checkout Flow:** Creates private, ephemeral threads for each customer to ensure a secure and private transaction environment, preventing credential exposure.

## 🛠️ Technical Architecture
* **Backend:** Node.js with `discord.js` v14.
* **Database:** `quick.db` (SQLite-based) for high-speed persistence of product drafts and stock lists.
* **Fintech Integration:** RESTful integration with Mercado Pago for transaction status polling (webhooks/polling logic).
* **State Management:** Handles complex multi-step user interactions using Modal submissions and temporary database drafts.

## 🔐 Security Best Practices
* **Environment Isolation:** Secrets such as Discord Tokens and Payment API Keys are managed strictly via `.env` files (not included in the repository).
* **Role-Based Access Control (RBAC):** Admin functionalities are protected by role-ID checks to prevent unauthorized inventory manipulation.
* **Input Sanitization:** User inputs are processed and validated to prevent script injection in product listings.