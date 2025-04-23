import axios from "axios";
import { loginRequest } from "@/authConfig";

export async function createCalendarEvent(instance, account, leaveDetails) {
  const response = await instance.acquireTokenSilent({
    scopes: loginRequest.scopes,
    account: account,
  });

  const accessToken = response.accessToken;

  console.log({ response, accessToken, leaveDetails });

  const event = {
    subject: "Leave Approved: " + leaveDetails.employeeName,
    body: {
      contentType: "HTML",
      content: `Leave from ${leaveDetails.startDate} to ${leaveDetails.endDate}<br/>Reason: ${leaveDetails.reason}`,
    },
    start: {
      dateTime: leaveDetails.startDate + "T09:00:00",
      timeZone: "Africa/Kigali",
    },
    end: {
      dateTime: leaveDetails.endDate + "T17:00:00",
      timeZone: "Africa/Kigali",
    },
    location: {
      displayName: "N/A",
    },
    attendees: [], // optionally add HR or manager emails
  };

  await axios.post("https://graph.microsoft.com/v1.0/me/events", event, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
