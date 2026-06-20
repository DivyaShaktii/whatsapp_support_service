# WhatsApp Business Integration Setup

This document outlines the architecture, the recent code updates, and the necessary next steps for both the frontend and backend to complete the WhatsApp Business account integration.

## 1. Architectural Validation: Are You Thinking About It Right?

**Yes, your thinking is exactly right!** You need to provide two options: adding an existing number or registering a new one. 

The beauty of using **Meta's Embedded Signup Flow** is that it handles **both** scenarios within a single Facebook popup window:

*   **Option 1 (Add Existing Number):** The user enters their phone number on your UI, clicks "Connect", and the Facebook popup opens. They select the number they entered. Meta passes the `phone_number_id` back to your backend. The backend queries Meta to check if the number they selected matches the one they typed into your UI. (This is what we just implemented!).
*   **Option 2 (Register a New Number):** The user simply clicks "Link new number". The Facebook popup opens. Meta prompts them to type their new number, Meta sends them an OTP to verify it, and Meta registers it as a business number. Once done, Meta passes the new `phone_number_id` back to your backend, and you save it. You don't need to build your own OTP system; Meta handles the verification entirely!

---

## 2. Code & Methods Updated Here

In the backend (`app/routers/whatsapp.py`), the `connect_whatsapp_meta` endpoint was updated to handle the verification logic for **Option 1**. 

### Updated Methods:
1.  **`normalize_phone_number(phone: str) -> str`**: A new helper function that strips all spaces, dashes, brackets, and non-digit characters from a phone number string. This ensures that `+91 98765-43210` perfectly matches `919876543210`.
2.  **`connect_whatsapp_meta()` Endpoint Logic**:
    *   **Graph API Call**: We added an HTTP `GET` request to Meta's Graph API (`https://graph.facebook.com/v19.0/{phone_number_id}?access_token={access_token}`). This retrieves the official `display_phone_number` of the account the user authorized.
    *   **Verification**: The backend compares the normalized phone number the user typed on your frontend with the normalized phone number returned by Meta. If they don't match, it returns an HTTP `400` error, preventing fraudulent or mistaken linking.
    *   **Webhook Subscription**: We added an HTTP `POST` request to `https://graph.facebook.com/v19.0/{waba_id}/subscribed_apps` to automatically subscribe your backend to receive incoming WhatsApp messages for this newly linked account.
3.  **`requirements.txt`**: Added the `requests` library to handle synchronous API calls to Meta.

---

## 3. Checklist: What Needs to be Done Next

Here is the exact breakdown of what you need to do next to finish the setup:

### Frontend (React/Next.js/Vue etc.)
- [ ] **Build the UI with Two Options**:
    - **Option 1**: A form with an input field for the phone number and a "Connect" button.
    - **Option 2**: A simple "Register New Number" button.
- [ ] **Integrate the Facebook SDK**: Load `connect.facebook.net/en_US/sdk.js` and initialize `FB.init()` with your Meta App ID.
- [ ] **Trigger Embedded Signup**: Bind the `FB.login()` function to your UI buttons. Ensure you request the `whatsapp_business_management` and `whatsapp_business_messaging` permissions.
- [ ] **Handle the Callback**: Once the user finishes the Facebook popup, extract the `access_token` from the auth response.
- [ ] **Send Data to Backend**:
    - For Option 1: Send the user-typed `phone_number`, `access_token`, `waba_id`, and `phone_number_id` via a POST request to your `/api/whatsapp/connect` backend endpoint.
    - For Option 2: Send the same data (omitting the user-typed `phone_number` since they registered it fresh in the popup). You may need to slightly adjust the backend endpoint to bypass the comparison check if it's explicitly "Option 2".

### Backend (FastAPI)
- [ ] **Option 2 Support**: Slightly adjust the `connect_whatsapp_meta` endpoint. If the user is registering a brand new number (Option 2), skip the "comparison" step since they didn't type a number into your UI beforehand. Just fetch the `display_phone_number` from Meta and save it directly.
- [x] **Webhook Endpoint Setup**: Created a `GET /webhook` endpoint to handle Meta's initial webhook verification challenge (Meta will send a `hub.challenge` token that you must echo back).
- [x] **Message Receiving Endpoint**: Created a `POST /webhook` endpoint. This is where Meta will push incoming text messages from customers. You will parse these JSON payloads and route them to your AI/support agents.
- [ ] **Send Message API**: Create a utility function that makes a POST request to `https://graph.facebook.com/v19.0/{phone_number_id}/messages` to send outbound replies to the customer.
