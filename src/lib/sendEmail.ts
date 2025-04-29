import axios from "axios";
import { loginRequest } from "@/authConfig";

export const sendEmail = async (instance, account, leaveDetails) => {
  const response = await instance.acquireTokenSilent({
    scopes: loginRequest.scopes,
    account: account,
  });

  const accessToken = response.accessToken;

  console.log({ response, accessToken, leaveDetails });

  await axios.post("https://graph.microsoft.com/v1.0/me/sendMail", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      message: {
        subject: "Leave Request Approved",
        body: {
          contentType: "Text",
          content: `Your leave request from ${leaveDetails.startDate} to ${leaveDetails.endDate} has been approved.`,
        },
        toRecipients: [
          {
            emailAddress: {
              address: leaveDetails.userEmail,
            },
          },
        ],
      },
    },
  });
};
