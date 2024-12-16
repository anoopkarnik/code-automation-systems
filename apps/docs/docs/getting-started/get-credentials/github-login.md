---
sidebar_position: 3
---

# Github Login OAuth

1. Go to the [GitHub Developer Settings](https://github.com/settings/developers).
2. If you haven't already, sign in with your GitHub account.
3. Click on "New OAuth App" button.
4. Fill in the required fields:
   - **Application name**: Your application's name (e.g., CANSY)
   - **Homepage URL**: Your application's homepage URL (e.g., *http://localhost:4000*)
   - **Authorization callback URL**: The URL to redirect users to after authorization (e.g., *http://localhost:4000/api/auth/callback/github*)
5. Click "Register application" to create your OAuth app.
6. After registering, you will be redirected to the app's detail page. Here, you can find your **Client ID** and **Client Secret**.
7. Copy the **Client ID** and **Client Secret** for future use.
