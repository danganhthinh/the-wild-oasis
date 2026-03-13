import apiClient from "./apiClient";

const API_URL = "http://localhost:3000";

const mapCabinImage = (cabin) => {
  if (!cabin) return cabin;
  if (cabin.image && !cabin.image.startsWith("http")) {
    return { ...cabin, image: `${API_URL}/${cabin.image}` };
  }
  return cabin;
};

export async function getCabins() {
  const { data } = await apiClient.get("/cabins");
  return data.map(mapCabinImage);
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";
  
  let imagePath = newCabin.image;
  
  // 1. Upload image if it's a new file
  if (!hasImagePath && newCabin.image) {
    const formData = new FormData();
    formData.append("file", newCabin.image);
    
    const { data: uploadData } = await apiClient.post("/cabins/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    imagePath = uploadData.url;
  }

  // 2. Prepare data (filter out fields that backend might reject if not in DTO)
  const { _id, id: _, createdAt, updatedAt, __v, ...cabinData } = newCabin;
  
  // Ensure we only save the relative path in the database
  const cleanedImagePath = typeof imagePath === "string" 
    ? imagePath.replace(`${API_URL}/`, "") 
    : imagePath;

  const finalCabinData = { ...cabinData, image: cleanedImagePath };

  if (id) {
    const { data } = await apiClient.patch(`/cabins/${id}`, finalCabinData);
    return mapCabinImage(data);
  } else {
    const { data } = await apiClient.post("/cabins", finalCabinData);
    return mapCabinImage(data);
  }
}

export async function deleteCabin(id) {
  const { data } = await apiClient.delete(`/cabins/${id}`);
  return data;
}
