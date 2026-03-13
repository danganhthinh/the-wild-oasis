import apiClient from "./apiClient";

export async function signup({ fullName, email, password }) {
  const { data } = await apiClient.post("/auth/admin/register", {
    fullName,
    email,
    password,
  });
  
  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
  }
  
  return data;
}

export async function login({ email, password }) {
  const { data } = await apiClient.post("/auth/admin/login", {
    email,
    password,
  });

  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
  }

  return data;
}

const API_URL_BASE = "http://localhost:3000";

const mapUserAvatar = (user) => {
  if (user?.avatar && !user.avatar.startsWith("http")) {
    return { ...user, avatar: `${API_URL_BASE}/${user.avatar}` };
  }
  return user;
};

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const { data } = await apiClient.get("/users/me");
    return mapUserAvatar(data);
  } catch (error) {
    console.error("Error fetching current user:", error);
    localStorage.removeItem("token");
    return null;
  }
}

export async function logout() {
  localStorage.removeItem("token");
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let avatarPath = avatar;

  // 1. Upload avatar if it's a new file
  if (avatar instanceof File) {
    const formData = new FormData();
    formData.append("file", avatar);

    const { data: uploadData } = await apiClient.post("/cabins/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    avatarPath = uploadData.url;
  }

  // Ensure we only save the relative path
  const cleanedAvatarPath = typeof avatarPath === "string"
    ? avatarPath.replace(`${API_URL_BASE}/`, "")
    : avatarPath;

  const { data } = await apiClient.patch("/users/me", {
    password,
    fullName,
    avatar: cleanedAvatarPath,
  });

  return mapUserAvatar(data);
}
