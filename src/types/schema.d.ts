type User = {
  id: number;
  email: string;
  name: string;
  surname: string;
  photo?: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  metaData: UserMetaData;
};

type UserMetaData = {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  lastSeen: Date;
  device?: string;
};

type GuestbookAuthor = {
  name: string;
  email: string;
  photo: string;
  isVerified: boolean;
};

type GuestbookMessage = {
  id: number;
  message: string;
  isEdited: boolean;
  likesCount: number;
  hasLiked: boolean;
  createdAt: string;
  updatedAt: string;
  author: GuestbookAuthor;
};

type View = {
  slug: string;
  count: number;
  likesCount: number;
};

type LikePost = {
  userId: number;
  slug: string;
};

type LikeMessage = {
  userId: number;
  messageId: number;
};
