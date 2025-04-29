import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const UserAvatar = ({
  avatarUrl,
  name,
}: {
  avatarUrl: string;
  name: string;
}) => {
  const firstInitial = name?.charAt(0);
  const secondInitial = name?.split(" ")[1]?.charAt(0);
  console.log({ name });
  return (
    <Avatar className="border border-white bg-black shadow-lg size-12">
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>
        <p className="text-black text-xl">
          {firstInitial}
          {secondInitial}
        </p>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
