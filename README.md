# BSamaritan: Code Automations and Systems for Gamifying Life

**BSamaritan** is a customizable automation and productivity solution integrating third-party services with Notion for gamifying life.

## Overview

The project mainly is divided into 3 parts:

### Systems
Clone the Notion Templates for the below systems.
1) **Project Management**
2) **Personal Finance**
3) **Personal Productivity**
4) **Knowledge & Skill Development**
5) **Social & Relationships**

### Automations

**Triggers**

1) Schedule - Cron
2) Webhook - Internal Webhook
   
**Actions**

1) Webhook - External Webhook
2) Code - Python Code, Javascript Code
   
### Connections
1)  Notion
2)  OpenAI
3)  Google Drive
4)  Youtube

## Installation Guide

### Without Docker

### With Docker
1) npm i
2) npm run db:generate
3) npm run dev to run all the apps

## Usage

i) **Scheduler Template**
From a Scheduler Notion Database based on properties of pages which define schedule of habits, tasks and financial obligations, we create calendar pages in notion with notifications for reminding using a Cron Scheduler Trigger every 30 Minutes and Python Code with Query Database, Create Page in Database and Update Page Sample Codes.

ii) **Subscribed Channels Addition Template**
From a Youtube Account Add Details of all channels subscribed to a Notion Youtube Channel Database every Day at 12.

iii) **Storing Youtube Liked Videos Template**
From a Youtube Account Add Liked videos properties and youtube embedding as a page in Notion Videos Database Every Hour.

## License

This project is licensed under the [MIT License](LICENSE).
