import api from "./axios";

export const PostDocterDetails = async (payload) => {
  const response = await api.post(`/postDoctor`, payload);
  return response.data;
};
