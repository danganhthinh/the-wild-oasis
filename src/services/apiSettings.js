import apiClient from "./apiClient";

export async function getSettings() {
  const { data } = await apiClient.get("/settings");
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data } = await apiClient.patch("/settings", newSetting);
  return data;
}
