# Context: AI-Powered Multi-Tenant Conversational Support Platform (MVP)

## Vision

Build a B2B SaaS platform that enables businesses to automate customer support over messaging channels, starting with **WhatsApp**. The platform should answer customer questions using the business's own knowledge base and operational systems while providing seamless escalation to human agents when required.

The long-term vision is to support multiple channels (Telegram, Web Chat, Instagram, SMS, etc.), multiple AI agents, and enterprise-grade integrations. However, the initial implementation should focus on a simple, reliable, and production-ready MVP.

---

# Target Customers

The primary customers are **small and medium-sized businesses** such as:

* Shopify and D2C brands
* E-commerce businesses
* Restaurants
* Clinics and hospitals
* Local service providers
* Businesses that receive significant customer queries through WhatsApp

The platform should be multi-tenant so that multiple businesses can use the same deployment while keeping their data completely isolated.

---

# Core Problem

Businesses repeatedly answer questions like:

* Where is my order?
* What is your return policy?
* What are your business hours?
* What products do you sell?
* Is this item in stock?
* How can I contact support?

These responses should be automated using AI while maintaining accuracy and allowing escalation to humans when necessary.

---

# MVP Scope

Only implement:

1. WhatsApp support
2. Knowledge-base question answering (RAG)
3. Basic order lookup
4. Human handoff
5. Multi-tenant support
6. Conversation history
7. Document upload and indexing

Do NOT implement:

* Multiple messaging channels
* Voice support
* Complex multi-agent orchestration
* Distributed microservices
* Event-driven architecture
* Workflow engines
* Marketing campaigns

---

# Product Workflow

## Business Onboarding

Each business (tenant) should:

1. Create an account.
2. Connect WhatsApp Business credentials.
3. Upload knowledge documents (PDFs, DOCX, FAQs, manuals).
4. Optionally connect order systems or provide order data.
5. Configure branding and support settings.

Each tenant must remain logically isolated from every other tenant.

---

## Customer Workflow

Customer sends a WhatsApp message.

Examples:

* "What is your return policy?"
* "Where is my order #12345?"
* "I want to speak to a human."

The platform should:

1. Receive the webhook.
2. Identify the tenant.
3. Store the message.
4. Classify the request.
5. Retrieve relevant information.
6. Generate an answer.
7. Send the response back through WhatsApp.

---

# Knowledge Base

Businesses should be able to upload:

* PDF files
* DOCX files
* FAQs
* Product guides
* Policy documents

Documents should be chunked, embedded, and indexed for retrieval-augmented generation (RAG).

The AI should answer only from retrieved context and avoid inventing facts.

---

# Order Tracking

The platform should support simple order lookups.

Preferred approach:

* Live API integration with the client's order system.

Alternative MVP approach:

* CSV import or periodic synchronization.

Avoid storing unnecessary customer or order data permanently. Prefer fetching live information when possible.

---

# Human Handoff

If the AI cannot confidently answer or the customer requests a human:

* Create a support ticket.
* Mark the conversation for escalation.
* Notify the business.

Human handoff should be implemented in a simple manner for the MVP.

---

# Multi-Tenancy

Every resource must be associated with a tenant.

Examples:

* tenant_id
* documents
* conversations
* messages
* tickets
* configurations

No tenant should ever access another tenant's data.

Tenant isolation is a first-class design principle.

---

# Recommended Architecture

Use a modular monolith instead of microservices.

Suggested stack:

* FastAPI backend
* PostgreSQL
* pgvector for embeddings
* S3-compatible object storage for documents
* OpenAI or Amazon Bedrock for LLM inference
* WhatsApp Cloud API integration

Keep the architecture simple and evolvable.

---

# Suggested Modules

* API layer
* Conversation service
* Intent classification
* Knowledge retrieval
* LLM response generation
* Order service
* Human handoff service
* Tenant management
* Document ingestion
* Vector search
* WhatsApp integration
* Authentication
* Audit logging

Modules should be loosely coupled and independently testable.

---

# Data Model

Important entities:

* Tenant
* User
* Conversation
* Message
* Document
* Document Chunk
* Ticket
* Order Reference
* Audit Log

Every major entity should include tenant context.

---

# Security Principles

* Read-only integrations whenever possible.
* Least-privilege access to client systems.
* Encryption in transit and at rest.
* Do not use client data to train foundation models.
* Maintain complete audit logs.
* Never mix data between tenants.
* Validate all incoming webhooks.

---

# AI Design Philosophy

Prefer deterministic routing over unnecessary complexity.

Instead of a full supervisor-agent architecture in the MVP:

* Perform lightweight intent classification.
* Route to FAQ, order lookup, or human handoff logic.
* Retrieve context.
* Generate grounded responses.

Multi-agent orchestration can be introduced later if justified by real customer needs.

---

# Non-Functional Requirements

* Modular and maintainable codebase
* Clear separation between business logic and integrations
* Easy addition of future messaging channels
* Horizontal scalability in later versions
* Comprehensive logging and observability
* Production-ready error handling

---

# Future Roadmap

Potential future enhancements:

* Telegram integration
* Instagram integration
* Web chat widget
* SMS support
* Email support
* Advanced multi-agent orchestration
* CRM integrations
* Shopify and WooCommerce apps
* Analytics dashboards
* Sentiment analysis
* Proactive notifications
* Multilingual support
* Voice agents
* Enterprise RBAC
* Workflow automation

---

# Guiding Principle

Optimize for simplicity, customer value, and fast iteration. The MVP should solve real customer problems with minimal complexity, validate market demand, and provide a solid foundation for future expansion into a full-featured AI customer support platform.
