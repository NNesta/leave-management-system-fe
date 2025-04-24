import axios from "axios";
import { loginRequest } from "@/authConfig";
import { LeaveRequest } from "@/components/manager/types";

export async function createCalendarEvent(
  instance,
  account,
  leaveDetails: LeaveRequest
) {
  const response = await instance.acquireTokenSilent({
    scopes: loginRequest.scopes,
    account: account,
  });

  const accessToken = response.accessToken;

  console.log({ response, accessToken, leaveDetails });

  const event = {
    subject: `${leaveDetails.employee.fullName} going in ${leaveDetails.leaveType.name}`,
    body: {
      contentType: "HTML",
      content: `Leave from ${
        leaveDetails.startDate || new Date().toLocaleDateString()
      } to ${
        leaveDetails.endDate || new Date().toLocaleDateString()
      }<br/>Reason: ${leaveDetails.leaveReason}`,
    },
    start: {
      dateTime: leaveDetails.startDate,
    },
    end: {
      dateTime: leaveDetails.endDate,
    },
  };

  await axios.post("https://graph.microsoft.com/v1.0/me/events", event, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
