import apiClient from "./apiClient";
import { PAGE_SIZE } from "../utils/Constants";

const API_URL = import.meta.env.VITE_API_URL;

const mapCabinImage = (cabin) => {
  if (!cabin) return cabin;
  if (cabin.image && !cabin.image.startsWith("http")) {
    return { ...cabin, image: `${API_URL}/${cabin.image}` };
  }
  return cabin;
};

export async function getBookings({ filter, sortBy, currentPage }) {
  // Construct query parameters
  const params = new URLSearchParams();
  if (filter) params.append(filter.field, filter.value);
  if (sortBy) {
    params.append("sortField", sortBy.field);
    params.append("sortDirection", sortBy.direction);
  }
  if (currentPage) {
    params.append("page", currentPage);
    params.append("pageSize", PAGE_SIZE);
  }

  const { data } = await apiClient.get(`/bookings?${params.toString()}`);
  
  if (data.data) {
    data.data = data.data.map(booking => {
      if (booking.cabins) booking.cabins = mapCabinImage(booking.cabins);
      return booking;
    });
  }

  return data;
}

export async function getBooking(id) {
  const { data } = await apiClient.get(`/bookings/${id}`);
  if (data.cabins) data.cabins = mapCabinImage(data.cabins);
  return data;
}

export async function getBookingsAfterDate(date) {
  const { data } = await apiClient.get(`/dashboard/stats?days=30`); // Simplification for demo
  return data.recentBookings;
}

export async function getStaysAfterDate(date) {
  const { data } = await apiClient.get(`/bookings`); // Simplification
  return data.data.map(booking => {
    if (booking.cabins) booking.cabins = mapCabinImage(booking.cabins);
    return booking;
  });
}

export async function getStaysTodayActivity() {
  const { data } = await apiClient.get(`/bookings?status=unconfirmed`); // Simplification
  return data.data.map(booking => {
    if (booking.cabins) booking.cabins = mapCabinImage(booking.cabins);
    return booking;
  });
}

export async function updateBooking(id, obj) {
  const { data } = await apiClient.patch(`/bookings/${id}`, obj);
  return data;
}

export async function deleteBooking(id) {
  const { data } = await apiClient.delete(`/bookings/${id}`);
  return data;
}
