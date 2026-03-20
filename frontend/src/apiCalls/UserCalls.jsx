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

