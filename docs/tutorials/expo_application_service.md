<img src="../img/expo-logo.png" alt="Expo Logo" style="max-width: 200px;">  

# Expo Application Service

The Expo Application Service (`EAS`) is a service that allows you to run your Expo application as a 
local dev server, manage deployment/prooduction builds, app store and google play store 
publications etc. EAS is a tool to use when developing a your Expo application to manage the 
things and you need it installed to use the Expo Go app in development mode.

## Installation

To install the Expo Application Service, you need to have a JavaScript package manager like
`npm` or `yarn` installed on your machine. You can install the Expo Application Service by running
the following command:

```sh
npm install -g eas-cli
```

When you have installed the Expo Application Service, you can verify the installation by running the
following command:

```sh
which eas && eas --version
```

Now you need to login to the Expo Application Service. If you do not have a Expo account, you can create
one by visiting the [Expo website](https://expo.dev/signup). Once you have an account, you can login to
the Expo Application Service by running the following command:

```sh
eas login
```

You will be presented with a prompt to enter your Expo username/email, password and a 2FA-token 
if you have configured one.


> ---
> ✅ **Done:**  
> Now you should have installed the required Expo Application Service, EAS.
> ---
