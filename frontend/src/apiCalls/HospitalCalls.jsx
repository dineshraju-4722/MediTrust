import api from "./axios";

export const PostHospital = async (payload) => {
  const response = await api.post(`/postHospital`, payload);
  return response.data;
};

export const GetAllHospitals = async () => {
  const response = await api.get(`/getAllHospitals`);
  return response.data;
};

export const GetHospitalById = async (id) => {
  const response = await api.get(`/getHospital/${id}`);
  return response.data;
};
