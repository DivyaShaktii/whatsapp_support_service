# Guide to Obtaining Meta Environment Keys

This guide explains exactly where to find each of the required `.env` keys for your WhatsApp Business integration across both the frontend and backend.

## Prerequisites
Before you start, make sure you have:
1. Created a Meta Developer account at [developers.facebook.com](https://developers.facebook.com/).
2. Created a "Business" App in the Meta App Dashboard.
3. Added the "WhatsApp" product to your app.

---

## Frontend Keys (`frontend/.env.local`)

### 1. `NEXT_PUBLIC_META_APP_ID`
This is the public identifier for your Meta App.
* **How to get it:**
  1. Go to your Meta App Dashboard.
  2. Look at the top navigation bar. You will see **App ID: [15-digit-number]** right next to your app's name.
  3. Copy that number.

### 2. `NEXT_PUBLIC_META_CONFIG_ID`
This specifically tells Meta to use the Embedded Signup configuration.
* **How to get it:**
  1. In the Meta App Dashboard, go to **WhatsApp > Embedded Signup** in the left sidebar.
  2. Click **Create Configuration** (or view your existing one).
  3. Name it (e.g., "Main Setup").
  4. Once created, you will see a **Configuration ID**. Copy this.

---

## Backend Keys (`backend/.env`)

### 1. `WEBHOOK_VERIFY_TOKEN`
This is a custom password *you* create to secure the connection between Meta and your backend.
* **How to get it:**
  1. **You make this up!** Type a random, secure string in your `.env` file (e.g., `my_super_secret_webhook_token_2026`).
  2. When you go to the Meta App Dashboard > **WhatsApp > Configuration**.
  3. Click **Edit** under "Webhook".
  4. Paste your backend URL (e.g., `https://yourdomain.com/api/whatsapp/webhook`).
  5. Paste the exact string you made up into the **Verify Token** field. Meta will send a request to your backend to make sure they match.

### 2. `META_APP_SECRET`
This is a hidden secret used by your backend to mathematically verify that incoming messages actually came from Meta and not a hacker.
* **How to get it:**
  1. Go to your Meta App Dashboard.
  2. In the left sidebar, click **App Settings > Basic**.
  3. Look for the **App Secret** field. You will need to click "Show" and enter your Facebook password to reveal it.
  4. Copy the secret.

### 3. `WHATSAPP_ACCESS_TOKEN` (System User Token)
This token allows your backend to send outbound messages via the WhatsApp Cloud API indefinitely without the token expiring.
* **How to get it:**
  1. Go to your Meta Business Settings: [business.facebook.com/settings](https://business.facebook.com/settings).
  2. In the left sidebar, go to **Users > System Users**.
  3. Click **Add** to create a new System User (Name it something like "Support Bot", Role: Admin).
  4. Select the new System User and click **Add Assets**. Grant it access to your WhatsApp Business Account.
  5. Click **Generate New Token**.
  6. Select your App from the dropdown.
  7. Check the boxes for `whatsapp_business_messaging` and `whatsapp_business_management`.
  8. Click Generate. **Copy this token immediately** (it will be very long). Meta will only show it to you once!
