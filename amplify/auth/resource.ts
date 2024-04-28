import { defineAuth } from '@aws-amplify/backend';

// Define and configure your authentication resource
const configuredAuth = defineAuth({
  // Define the login methods
  loginWith: {
    email: true,
    // Add social providers
    // externalProviders: {
    //   loginWithAmazon: {
    //     clientId: 'LOGINWITHAMAZON_CLIENT_ID', // Replace with the actual client ID
    //     clientSecret: 'LOGINWITHAMAZON_CLIENT_SECRET', // Replace with the actual client secret
    //   },
    //   // Configure callback and logout URLs
    //   callbackUrls: ['http://localhost:3000'],
    //   logoutUrls: ['http://localhost:3000'],
    // },
  },
  // Enable multi-factor authentication
  // multifactor: {
  //   mode: 'OPTIONAL',
  //   sms: {
  //     smsMessage: (code) => `Your verification code is ${code}`,
  //   },
  // },
  // Request additional attributes for your app's users
  userAttributes: {
    profilePicture: {
      mutable: true,
      required: false,
    },
  },
});

// Export the configured authentication resource
export const auth = configuredAuth;
