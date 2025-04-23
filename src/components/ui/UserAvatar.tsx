import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const UserAvatar = () => {
  const { instance, accounts } = useMsal();
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const tokenResponse = await instance.acquireTokenSilent({
          scopes: ["User.Read"],
          account: accounts[0],
        });

        const response = await fetch(
          "https://graph.microsoft.com/v1.0/me/photo/$value",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.accessToken}`,
            },
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          setAvatarUrl(URL.createObjectURL(blob));
        }
      } catch (err) {
        console.error("Error fetching profile picture", err);
      }
    };

    fetchAvatar();
  }, [instance, accounts]);

  return avatarUrl ? (
    <Avatar className="border border-white bg-black shadow-lg size-12">
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{accounts[0].name}</AvatarFallback>
    </Avatar>
  ) : (
    <p>Loading avatar...</p>
  );
};

export default UserAvatar;
