import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const UserAvatar = ({
  avatarUrl,
  name,
}: {
  avatarUrl: string;
  name: string;
}) => {
  return avatarUrl ? (
    <Avatar className="border border-white bg-black shadow-lg size-12">
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  ) : (
    <p>Loading avatar...</p>
  );
};

export default UserAvatar;
