import api from "./axios";

export const PostAppointment = async (payload) => {
    const res = await api.post(`/postAppointment`, payload);
    console.log(res.data)
    await IncrementAppointment(res.data.id);

}
export const PostDoctorAvailability = async (payload) => {
    // try {
        const res = await api.post(`/postDoctorAvailability`, payload);
        console.log(res.data)

    

}
export const IncrementAppointment = async (id) => {
    const res = await api.put(`/incrementBookedAppointments/${id}`);
    console.log(res.data)
}

