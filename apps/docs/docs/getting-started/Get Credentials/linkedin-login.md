---
sidebar_position: 3
---

# LinkedIn Login OAuth

1. Go to the LinkedIn Developer Portal - [LinkedIn Developer Portal](https://www.linkedin.com/developers/).
2. Sign in with your LinkedIn account or create a new one if you don't have an account.
3. Click on My Apps in the header and "Create App" to start a new application.
4. Fill in the required fields such as App Name, LinkedIn Page (Create a LinkedIn Page of your company using the link in the form itself), app logo and Privacy Policy URL which you can generate from [Termsfeed Privacy Policy Generator Site](https://www.termsfeed.com).
5. Under "Auth" tab, set the "OAuth 2.0 Redirect URLs" to *http://localhost:4000/api/auth/callback/linkedin*.
6. Click on "Create" to save your application.
7. Once the app is created, navigate to the "Auth" tab to find your Client ID and Client Secret.
8. Copy the Client ID and Client Secret for use in your application.
