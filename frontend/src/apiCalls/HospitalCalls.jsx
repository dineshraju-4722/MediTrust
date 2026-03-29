import api from "./axios";


export const PostHospital = async (payload) => {
    const abc = await api.post(`/postHospital`, payload);
    console.log(abc.data)
    return abc.data;
}

export const GetAllHospitals = async () => {
    const abc = await api.get(`/getAllHospitals`);
    console.log(abc.data)
    return abc.data;
}

export const GetHospitalById = async (id) => {
    const abc = await api.get(`/getHospital/${id}`);
    console.log(abc.data)
    return abc.data;
}