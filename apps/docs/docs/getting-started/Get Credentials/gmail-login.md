---
sidebar_position: 3
---

# Gmail Login OAuth

## Create Google Cloud Project

1. Go to the [Google Cloud Console](https://console.developers.google.com/).
   ![Google Cloud Console](/img/console_page.png)
2. If you haven't already, sign in with your Google account.
3. Create a new project by clicking on the "Select a project" dropdown at the top of the page and then click on "New Project".
   ![Create New Project](/img/create-project.png)
4. Enter a name for your project and click "Create".
5. Once your project is created, select it from the project dropdown.

## Create OAuth Consent Screen

1. After enabling the API, go to "APIs & Services" > "OAuth consent screen".
   ![OAuth Consent Screen](/img/consent-screen.png)
2. Select External User Type and Create OAuth Consent Screen.
3. Insert your App name (CASY), User support email, application home page (*https://bsamaritan.com*), authorized domain(*https://bsamaritan.com*), developer contact information, and privacy policy link which you can generate
from [Termsfeed Privacy Policy Generator Site](https://www.termsfeed.com).
   ![OAuth Consent Screen](/img/app-info-consent-screen.png)
4. In the "Scopes for Google APIs" section, select the top three scopes (userinfo.email, userinfo.profile, and openid) and click Update.
   ![OAuth Consent Screen](/img/add-remove-scope.png)
   Save and Continue to the next step.
5. In the "Test Users" section, click on the "Add Users" button and add the email address of the user who will be testing the integration.
   ![OAuth Consent Screen](/img/test-users.png)
6. Click "Save and Continue".

## Create Crendentials

1. In the left sidebar, navigate to "APIs & Services" > "Credentials" and click on "Create Credentials" and select "OAuth Client ID".
   ![Create Credentials](/img/create-credentials.png)
2. Choose "Web application" as the application type.
3. Enter a name for your OAuth client, specify the authorized javascript origin as *http://localhost:4000* and specify the authorized redirect URIs 1 - *http://localhost:4000/api/auth/callback/google*.
   ![Create Credentials](/img/create-credential-detes.png)
4. Click "Create" to generate your OAuth client ID and secret.
5. Download the JSON file containing your credentials for future use