---
sidebar_position: 3
---

# Google Drive OAuth

## Create Google Cloud Project

1. Go to the [Google Cloud Console](https://console.developers.google.com/).
   ![Google Cloud Console](/img/console_page.png)
2. If you haven't already, sign in with your Google account.
3. Create a new project by clicking on the "Select a project" dropdown at the top of the page and then click on "New Project".
   ![Create New Project](/img/create-project.png)
4. Enter a name for your project and click "Create".
5. Once your project is created, select it from the project dropdown.

## Enable Google Drive API

1. In the left sidebar, navigate to "APIs & Services" > "Library".
   ![Library](/img/google-cloud-left-sidebar.png)
2. Search for "Google Drive API" and click on it.
3. Click the "Enable" button to enable the API for your project.

## Create OAuth Consent Screen

1. After enabling the API, go to "APIs & Services" > "OAuth consent screen".
   ![OAuth Consent Screen](/img/consent-screen.png)
2. Select External User Type and Create OAuth Consent Screen.
3. Insert your App name (CANSY), User support email, application home page (*https://bsamaritan.com*), authorized domain(*https://bsamaritan.com*, *https://www.termsfeed.com*, *https://www.termsofusegenerator.net*), developer contact information, privacy policy link which you can generate from [Termsfeed Privacy Policy Generator Site](https://www.termsfeed.com) and terms of service from [Terms of Use Generator Site](https://www.termsofusegenerator.net) and click on Save.
   ![OAuth Consent Screen](/img/app-info-consent-screen.png)
4. In the "Scopes for Google APIs" section, add the following scope in the Manually add scopes field and add to table then click Update:
   - *https://www.googleapis.com/auth/drive*
   ![OAuth Consent Screen](/img/add-remove-scope.png)
   Save and Continue to the next step.
5. In the "Test Users" section, click on the "Add Users" button and add the email address of the user who will be testing the integration.
   ![OAuth Consent Screen](/img/test-users.png)
6. Click "Save and Continue".

## Create Crendentials

1. In the left sidebar, navigate to "APIs & Services" > "Credentials" and click on "Create Credentials" and select "OAuth Client ID".
   ![Create Credentials](/img/create-credentials.png)
2. Choose "Web application" as the application type.
3. Enter a name for your OAuth client, specify the authorized javascript origin as *http://localhost:4000* and specify the authorized redirect URIs 1 - *http://localhost:4000/api/callback/drive*.
   ![Create Credentials](/img/create-credential-detes.png)
4. Click "Create" to generate your OAuth client ID and secret.
5. Download the JSON file containing your credentials for future use