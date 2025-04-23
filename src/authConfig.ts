// authConfig.js
export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_TENANT_ID
    }`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
  },

  // cache: {
  //   cacheLocation: "localStorage",
  //   storeAuthStateInCookie: false,
  // },
};
export const loginRequest = {
  scopes: [
    "User.Read",
    "Calendars.ReadWrite", // ✅ required to write to Outlook Calendar
    "Mail.Send", // (optional) if you want to send emails too
  ],
};
