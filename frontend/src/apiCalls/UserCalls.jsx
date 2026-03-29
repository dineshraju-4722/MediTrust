import api from './axios'


export const loginData=async (data)=>{
    const abc=await api.post(`/signin`,data);
    // console.log(abc.data)
    return abc.data;
}
export const signUpData=async (data)=>{
    const abc=await api.post(`/signup`,data);
    // console.log(abc.data)
    return abc.data;
}


export const getAppointmentsByUser=async (id)=>{
    const abc=await api.get(`/getAppointmentsByUsers/${id}`);
    return abc.data;
}
export const getSpecialistsNames=async ()=>{
    const abc=await api.get(`/getAllSpecilizations`);
    console.log(abc.data)
    return abc.data;
}

