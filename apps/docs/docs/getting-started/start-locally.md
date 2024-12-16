---
sidebar_position: 3
---

# Start CANSY Locally

## Start Postgres and Kafka Locally

```bash
sudo docker-compose -f docker-compose-tools.yml up -d

# Check if the services are running
sudo docker ps

# Run the create-kafka-topics.py script to create the necessary topics in kafka
sudo sh scripts/create-kafka-topics.sh

# Copy all the .env.example files using the script in scripts/create-env-files.sh 
sudo sh scripts/create-env-files.sh

# Create the postgres tables by running the below command in the root directory
npm run db:migrate
```

## Fill Client Secrets and API Keys

**Gmail Login**: To allow gmail login, *AUTH_GOOGLE_ID*, *AUTH_GOOGLE_SECRET* and *NEXT_PUBLIC_RESEND_API_KEY* present in the apps/dashboard-app/.env file are required to be filled. You can get the above details from below docs:

[Google Login OAuth](/docs/getting-started/get-credentials/gmail-login)

[Resend API Key](/docs/getting-started/get-credentials/resend)

**Linkedin Login**: To allow linkedin login, *AUTH_LINKEDIN_ID* and *AUTH_LINKEDIN_SECRET* present in the apps/dashboard-app/.env file are required to be filled. You can get the above details from below docs:

[Linkedin Login OAuth](/docs/getting-started/get-credentials/linkedin-login)

**Github Login**: To allow github login, *AUTH_GITHUB_ID* and *AUTH_GITHUB_SECRET* present in the apps/dashboard-app/.env file are required to be filled. You can get the above details from below doc:

[Github Login OAuth](/docs/getting-started/get-credentials/github-login)

**Notion Connection**: To allow notion connection, *NEXT_PUBLIC_NOTION_CLIENT_ID*, *NEXT_PUBLIC_NOTION_CLIENT_SECRET* and *NEXT_PUBLIC_NOTION_OAUTH_URL* present in the apps/dashboard-app/.env file are required to be filled. For *NEXT_PUBLIC_NOTION_OAUTH_URL* just fill the NOTION_CLIENT_ID after ?client_id= in the url. You can get the above details from below doc:

[Notion OAuth](/docs/getting-started/get-credentials/notion)

**Youtube Connection**: To allow youtube connection, *NEXT_PUBLIC_YOUTUBE_CLIENT_ID* and *NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET*present in the apps/dashboard-app/.env file are required to be filled. You can get the above details from below doc:

[Youtube OAuth](/docs/getting-started/get-credentials/youtube)

**Google Drive Connection**: To allow google drive connection, *NEXT_PUBLIC_DRIVE_CLIENT_ID* and *NEXT_PUBLIC_DRIVE_CLIENT_SECRET* present in the apps/dashboard-app/.env file are required to be filled. You can get the above details from below doc:

[Google Drive OAuth](/docs/getting-started/get-credentials/google-drive)

## Running the apps locally with docker compose

```bash
# Run the below command to start the apps locally with docker compose
sudo docker-compose -f docker-compose-local.yml up -d

# Check if the 5 services are running:
sudo docker ps
```

## Running the apps locally in dev mode

```bash
# Install npm packages in all the apps
npm i

# Create prisma client for the monorepo
npm run db:generate

# In 4 different terminals, run the below commands to start all the apps necessary to run CANSY locally
npm run start-dashboard-app
npm run start-scheduler
npm run start-worker
npm run start-processor

# Create the python virtual environment in the flask-worker app
cd apps/flask-worker
python3 -m venv python-local
source python-local/bin/activate

# Install the dependencies in the flask-worker app and start the flask-worker app
pip install -r requirements.txt
python3 app/app.py
```

## Running the docs

```bash
npm run start-docs
```


