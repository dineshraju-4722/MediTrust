import api from "./axios";

export const getAppointmentsByUser = async (id) => {
  const response = await api.get(`/getAppointmentsByUsers/${id}`);
  return response.data;
};

export const getSpecialistsNames = async () => {
  const response = await api.get(`/getAllSpecilizations`);
  return response.data;
};

export const loginData = async (data) => {
  const response = await api.post(`/signin`, data);
  return response.data;
};

export const signUpData = async (data) => {
  const response = await api.post(`/signup`, data);
  return response.data;
};
