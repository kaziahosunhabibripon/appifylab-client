import type {
  Comment,
  LikeState,
  LoginPayload,
  Post,
  RegisterPayload,
  TokenResponse,
  User,
} from "@/lib/types";

const HOSTED_API_BASE_URL = "https://appifylab-task-he13.onrender.com/api/v1";
const configuredApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_BASE_URL =
  configuredApiBaseUrl?.includes("appifylab-social-api.onrender.com")
    ? HOSTED_API_BASE_URL
    : configuredApiBaseUrl ?? HOSTED_API_BASE_URL;

type RequestOptions = Omit<RequestInit, "body"> & {
  token?: string | null;
  body?: unknown;
};

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, body: requestBody, ...fetchOptions } = options;
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let body: BodyInit | undefined;
  if (requestBody instanceof FormData) {
    body = requestBody;
  } else if (requestBody !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(requestBody);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...fetchOptions,
      headers,
      body,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? `Unable to reach the API server at ${API_BASE_URL}. ${error.message}`
        : `Unable to reach the API server at ${API_BASE_URL}.`;
    throw new ApiError(message, 0);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      typeof payload?.detail === "string"
        ? payload.detail
        : "Something went wrong. Please try again.";
    throw new ApiError(message, response.status);
  }

  return payload as T;
}

export const api = {
  login(payload: LoginPayload) {
    return request<TokenResponse>("/auth/login", {
      method: "POST",
      body: payload,
    });
  },
  register(payload: RegisterPayload) {
    return request<User>("/auth/register", {
      method: "POST",
      body: payload,
    });
  },
  me(token: string) {
    return request<User>("/users/me", { token });
  },
  feed(token: string) {
    return request<Post[]>("/posts", { token });
  },
  createPost(token: string, data: FormData) {
    return request<Post>("/posts", {
      method: "POST",
      token,
      body: data,
    });
  },
  addComment(token: string, postId: number, content: string) {
    return request<Comment>(`/posts/${postId}/comments`, {
      method: "POST",
      token,
      body: { content },
    });
  },
  addReply(token: string, commentId: number, content: string) {
    return request<Comment>(`/comments/${commentId}/replies`, {
      method: "POST",
      token,
      body: { content },
    });
  },
  toggleLike(token: string, targetType: "post" | "comment" | "reply", targetId: number) {
    return request<LikeState>(`/likes/${targetType}/${targetId}/toggle`, {
      method: "POST",
      token,
    });
  },
};

export { API_BASE_URL, ApiError };
