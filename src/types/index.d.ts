interface UserType {
  first_name: string;
  last_name?: string;
  email: string;
  username: string;
  email_verified: boolean;
  is_active: boolean;
  avatar?: string;
  provider: Provider;
  password?: string;
  friends: string[];
  friend_requests: string[];
}

type ChatMemberType = {
  _id: string;
  first_name: string;
  last_name: ?string;
  avatar: ?string;
  username: string;
};

type ChatAdminType = {
  _id: string;
  first_name: string;
  last_name: ?string;
  avatar: ?string;
  username: string;
};

interface ChatType {
  _id: string;
  is_group_chat: boolean;
  group_name?: string;
  group_icon?: string;
  admins: ChatAdminType[] | [];
  members: ChatMemberType[];
  last_message?: LastMessageType;
  updatedAt: string;
}

type LastMessageType = {
  _id: string;
  chat_id: string;
  content: string;
  sender: string;
};

type MessageSenderType = {
  first_name: string;
  last_name: ?string;
  _id: string;
  avatar: ?string;
  username: string;
};

interface MessageType {
  _id: string;
  chat_id: string;
  content: string;
  sender: MessageSenderType;
  attachment: any;
  createdAt: string;
}

type JWTPayloadType = {
  id: string;
  email: string;
};

type EmailVerificationDataType = {
  user_id: string;
  secret_token: string;
};
