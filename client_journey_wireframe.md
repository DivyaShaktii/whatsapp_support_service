# AI Customer Support Platform – Client Journey & Wireframe Specification

## Overview

This document defines the end-to-end client journey for an AI-powered multi-channel customer support platform targeted at small and medium-sized businesses such as restaurants, hospitals, clinics, e-commerce stores, Shopify merchants, and service providers.

The primary design philosophy is:

> **Enable a business to deploy its first AI customer support agent in under 10 minutes while progressively exposing advanced features.**

The onboarding experience should feel simple, guided, and non-technical, allowing even non-technical business owners to complete setup successfully.

---

# High-Level User Journey

```
Landing Page
      │
      ▼
Sign Up / Login
      │
      ▼
Welcome Screen
      │
      ▼
Create Workspace
      │
      ▼
Business Information
      │
      ▼
Select Communication Channels
      │
      ▼
Connect Selected Channels
      │
      ▼
Knowledge Base Setup
      │
      ▼
Configure AI Assistant
      │
      ▼
Configure Human Escalation
      │
      ▼
Test Assistant
      │
      ▼
Go Live
      │
      ▼
Main Dashboard
```

---

# 1. Landing Page

## Objective

Introduce the platform and encourage visitors to begin onboarding.

## Sections

### Navigation Bar

* Company Logo
* Features
* Pricing
* Documentation
* Login
* Get Started

### Hero Section

* Product headline
* Short value proposition
* Product animation or demo
* Primary CTA: "Start Free"

### Supported Channels

Display supported integrations such as:

* WhatsApp
* Website Chat
* Instagram
* Facebook Messenger
* Email
* Voice
* SMS

### Customer Testimonials

Show reviews, logos, or success stories.

### Footer

Include links to:

* Privacy Policy
* Terms
* Contact
* Documentation
* Social Media

---

# 2. Sign Up / Login

## Objective

Allow users to create an account with minimal friction.

## Components

* Email
* Password
* Continue button
* Continue with Google
* Login link for existing users

No business-specific information should be requested at this stage.

---

# 3. Welcome Screen

## Objective

Set expectations and encourage completion.

Example message:

* Welcome
* Estimated setup time: 5–10 minutes
* "Let's set up your AI assistant."

Primary action:

* Start Setup

---

# 4. Create Workspace

## Objective

Create the primary organization under which services will operate.

## Fields

* Workspace Name
* Company Name
* Business Type
* Country
* Time Zone

Primary action:

* Continue

---

# 5. Business Information

## Objective

Collect context that improves AI responses.

## Fields

* Business Name
* Industry
* Website URL
* Business Description
* Support Email
* Support Phone Number
* Business Hours
* Supported Languages
* Company Logo (optional)

## Preview Panel

Display a summary indicating that this information will be used by the AI while answering customer queries.

---

# 6. Select Communication Channels

## Objective

Allow customers to choose where the AI assistant will operate.

## Available Channels

* WhatsApp
* Website Chat
* Instagram
* Facebook Messenger
* Email
* Voice Calls
* SMS

Multiple selections should be supported.

Primary action:

* Continue

---

# 7. Connect Communication Channels

## Objective

Authenticate and configure each selected channel.

Examples:

### WhatsApp

* Connect button
* Authentication status
* Connected indicator

### Website Chat

Options such as:

* Copy JavaScript snippet
* Shopify installation
* WordPress plugin
* Other CMS integrations

### Email

* SMTP configuration
* IMAP configuration
* Test connection

### Instagram / Facebook

* Login via Meta
* Authorization status

Display progress such as:

* 2 of 5 channels connected

---

# 8. Knowledge Base Setup

## Objective

Provide information that the AI can reference while answering questions.

## Supported Sources

* PDF upload
* DOCX upload
* CSV upload
* Website crawler
* FAQ import
* Shopify product import
* Plain text
* Notion
* Google Drive
* Confluence

## Sidebar

Show currently indexed knowledge sources, for example:

* Website
* FAQ.pdf
* Menu.pdf
* Policies.docx

Primary action:

* Continue

---

# 9. Configure AI Assistant

## Objective

Customize assistant behavior.

### Identity

* Assistant Name

### Tone

Examples:

* Friendly
* Professional
* Casual
* Formal
* Luxury

### System Instructions

Example:

* Use uploaded knowledge whenever possible.
* Do not invent information.
* Escalate refund requests.
* Escalate uncertain cases.

### Response Preferences

* Creativity level
* Response length

  * Short
  * Medium
  * Long
* Emoji usage

  * Never
  * Sometimes
  * Frequently

---

# 10. Human Escalation Rules

## Objective

Define when AI should transfer conversations.

Possible triggers:

* Customer requests human support
* Refund requests
* Angry sentiment
* Medical emergencies
* Payment disputes
* Low confidence
* Compliance-sensitive topics

Assignable destinations:

* Support Team
* Sales Team
* Manager
* Specific department

---

# 11. Business Workflows

## Objective

Connect AI with external systems.

Examples:

* Order Status API
* Appointment Booking API
* CRM Lead Creation
* Ticket Creation
* Custom Webhooks

Each workflow should support:

* Endpoint URL
* Authentication
* Payload mapping
* Response mapping
* Test execution

---

# 12. Test Playground

## Objective

Allow businesses to verify AI behavior before deployment.

## Interface

### Chat Window

Simulate customer conversations.

### Quick Test Buttons

* Refund request
* Order status
* Appointment booking
* Human transfer

### Diagnostics

Display:

* Knowledge sources used
* Confidence score
* Tools invoked
* Response latency
* Escalation status

---

# 13. Go Live

## Objective

Enable production deployment.

Display:

* Connected channels
* Indexed knowledge sources
* Assistant status
* Deployment readiness

Primary action:

* Go Live

Success message:

"Your AI assistant is now ready to serve customers."

---

# 14. Main Dashboard

## Objective

Provide an overview of platform activity.

## Sidebar Navigation

* Dashboard
* Inbox
* Conversations
* Knowledge Base
* Channels
* Workflows
* Analytics
* AI Agents
* Team
* Settings
* Billing

## Dashboard Cards

* Today's Conversations
* AI Resolution Rate
* Human Transfers
* Average Response Time
* Customer Satisfaction
* Pending Messages

Include charts and recent conversation summaries.

---

# 15. Unified Inbox

## Objective

Provide a single interface for all customer conversations.

## Left Panel

Conversation list including:

* WhatsApp
* Website
* Instagram
* Email

## Center Panel

Active conversation thread.

## Right Panel

Customer information:

* Profile
* Sentiment
* Tags
* Internal notes
* Conversation history
* Assigned agent

Support seamless switching between AI and human handling.

---

# 16. Knowledge Management

## Objective

Manage AI knowledge sources.

Features:

* View uploaded sources
* Sync data
* Edit
* Delete
* Re-index
* Preview extracted chunks
* Monitor indexing status

---

# 17. Channel Management

Each channel should expose:

* Connection status
* Reconnect
* Disconnect
* Configuration
* Webhook settings
* Logs
* Health monitoring

---

# 18. Workflow Builder

Provide a visual automation canvas.

Example flow:

```
Incoming Message
        │
        ▼
Intent Detection
        │
   ┌────┴─────┐
   ▼          ▼
Order      Refund
 │            │
API       Human
 │            │
Respond   Notify
```

Support drag-and-drop creation of custom business logic.

---

# 19. Analytics

Include dashboards for:

* Conversation volume
* AI resolution percentage
* Human handoff rate
* AI confidence
* Average response time
* Peak traffic hours
* Customer satisfaction
* Channel distribution
* Agent performance
* Knowledge gaps
* Frequently asked questions

Allow filtering by:

* Date range
* Channel
* Team
* Business location

---

# 20. Settings

Configuration categories:

## Workspace

* Company details
* Branding
* Time zone

## Team

* Members
* Roles
* Permissions

## API

* API keys
* OAuth credentials

## Webhooks

* Incoming
* Outgoing

## Notifications

* Email
* SMS
* Slack
* Push

## Security

* Authentication
* Audit logs
* Session management

## Billing

* Subscription
* Usage
* Invoices

---

# MVP Recommendation

To maximize onboarding completion, compress setup into a five-step guided wizard:

## Step 1 – Workspace

* Business information
* Organization details

## Step 2 – Connect Channels

* WhatsApp
* Website
* Email
* Instagram
* Other selected channels

## Step 3 – Add Knowledge

* Upload documents
* Import website
* FAQs
* Product catalogs

## Step 4 – Configure AI

* Assistant name
* Personality
* System instructions
* Escalation rules

## Step 5 – Test & Go Live

* Chat playground
* Validate responses
* Review diagnostics
* Deploy to production

---

# UX Principles

* Minimize required inputs during onboarding.
* Use progressive disclosure for advanced settings.
* Provide live previews wherever possible.
* Show clear setup progress.
* Allow users to skip optional steps and configure them later.
* Surface validation errors immediately.
* Keep technical integrations wizard-driven.
* Ensure every page has a single primary call-to-action.
* Optimize for first-value delivery in less than 10 minutes.
* Make all post-onboarding configuration accessible from the main dashboard without forcing users through the setup flow again.
