import apiClient from "./apiClient";

const API_URL_BASE = "http://localhost:3000";

const mapUserAvatar = (user) => {
  if (user?.avatar && !user.avatar.startsWith("http")) {
    return { ...user, avatar: `${API_URL_BASE}/${user.avatar}` };
  }
  return user;
};

export async function getUsers() {
  const { data } = await apiClient.get("/users");
  return data.map(mapUserAvatar);
}

export async function signup(newUser) {
  // This might be handled by apiAuth.js, checking...
  const { data } = await apiClient.post("/auth/register", newUser);
  return data;
}
