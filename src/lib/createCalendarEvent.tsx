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
  const startDate = new Date(
    leaveDetails.startDate[0],
    leaveDetails.startDate[1] - 1,
    leaveDetails.startDate[2]
  );
  const endDate = new Date(
    leaveDetails.endDate[0],
    leaveDetails.endDate[1] - 1,
    leaveDetails.endDate[2]
  );

  const event = {
    subject: `${leaveDetails.user.fullName} going in ${leaveDetails.leaveType.name}`,
    body: {
      contentType: "HTML",
      content: `Leave from ${startDate} to ${endDate}<br/>Reason: ${leaveDetails.reason}`,
    },
    start: {
      dateTime: startDate,
      timeZone: "E. Africa Standard Time",
    },
    end: {
      dateTime: endDate,
      timeZone: "E. Africa Standard Time",
    },
  };

  await axios.post("https://graph.microsoft.com/v1.0/me/events", event, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
