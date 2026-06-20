# WhatsApp Integration Design

## Overview

Support two onboarding paths:

1.  Bring an existing WhatsApp Business number.
2.  Register and connect a new WhatsApp Business number.

## Existing Number Flow

    Connect Channels
     -> Select WhatsApp
     -> Use Existing Number
     -> Authenticate
     -> Select Business Account
     -> Select Phone Number
     -> Grant Permissions
     -> Configure Webhooks
     -> Connected

Incoming messages: Customer -\> WhatsApp -\> Platform Webhook -\> AI -\>
WhatsApp -\> Customer

## New Number Flow

    Connect Channels
     -> Select WhatsApp
     -> Get New Number
     -> Enter Business Details
     -> Register Phone Number
     -> Verify OTP
     -> Complete Setup
     -> Connected

Business details: - Business name - Category - Website - Email -
Country - Display name - Phone number

## Suggested UI

-   Use My Existing WhatsApp Business Number
-   Register and Connect a New Number

## Data Model

WhatsAppConnection: - workspace_id - phone_number - phone_number_id -
business_account_id - display_name - onboarding_type -
verification_status - webhook_status

## Development Order

1.  Existing number support
2.  New number onboarding
3.  Channel management
4.  Multiple numbers
5.  Analytics and monitoring
