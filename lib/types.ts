export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type Comment = {
  id: number;
  content: string;
  post_id: number;
  parent_id: number | null;
  created_at: string;
  owner: User;
  likes_count: number;
  liked_by: User[];
  is_liked: boolean;
  replies: Comment[];
};

export type Post = {
  id: number;
  content: string;
  image_url: string | null;
  visibility: "public" | "private";
  created_at: string;
  owner: User;
  likes_count: number;
  liked_by: User[];
  is_liked: boolean;
  comments: Comment[];
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  first_name: string;
  last_name: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export type LikeState = {
  target_type: "post" | "comment" | "reply";
  target_id: number;
  liked: boolean;
  likes_count: number;
  liked_by: User[];
};
