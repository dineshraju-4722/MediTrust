import api from "./axios";
export const PostDocterDetails=async (payload)=>{
    const abc=await api.post(`/postDoctor`,payload);
    console.log(abc.data);
   return abc.data;
}