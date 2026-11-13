import api from "./axios";

export const PostAppointment = async (payload) => {
  const response = await api.post(`/postAppointment`, payload);
  if (response.data?.id) {
    await IncrementAppointment(response.data.id);
  }
  return response.data;
};

export const PostDoctorAvailability = async (payload) => {
  const response = await api.post(`/postDoctorAvailability`, payload);
  return response.data;
};

export const IncrementAppointment = async (id) => {
  const response = await api.put(`/incrementBookedAppointments/${id}`);
  return response.data;
};
