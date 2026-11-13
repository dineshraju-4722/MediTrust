import api from "./axios";

export const getDocter = async (id) => {
  const response = await api.get(`/getDoctor/${id}`);
  return response.data;
};

export const getAllDocters = async () => {
  const response = await api.get(`/getAllDoctors`);
  return response.data;
};

export const getDocterByEmail = async (email) => {
  const response = await api.get(`/getDoctorByMail/${email}`);
  return response.data;
};

export const getAppoinByDateAndDoctor = async (id, date) => {
  const response = await api.get(`/getDoctorAvailability/${id}/${date}`);
  return response.data;
};

export const getDoctersByType = async (specialization) => {
  const response = await api.get(`/getSpecializationByName/${specialization}`);
  return response.data;
};

export const postreviewcall = async (payload) => {
  try {
    await api.post("/postRating", payload);
    return true;
  } catch {
    return false;
  }
};

export const setDoctersTrue = async (body) => {
  try {
    await api.post("/acceptStatus", body);
    return true;
  } catch {
    return false;
  }
};
