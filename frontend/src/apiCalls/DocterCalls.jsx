import api from "./axios";

export const getDocter=async (id)=>{
   const abc=await api.get(`/getDoctor/${id}`);
   console.log(abc.data);
   return abc.data;
}
export const getAllDocters=async ()=>{
   const abc=await api.get(`getAllDoctors`);
   console.log(abc.data);
   return abc.data;
}

export const getDocterByEmail=async (name)=>{
   const abc=await api.get(`/getDoctorByMail/${name}`);
   console.log(abc.data);
   return abc.data;
}

export const getAppoinByDateAndDoctor=async (id,date)=>{
    const abc=await api.get(`/getDoctorAvailability/${id}/${date}`);
    console.log(abc.data);
   return abc.data;
}

export const getDoctersByType=async (specialization)=>{
   const abc=await api.get(`/getSpecializationByName/${specialization}`);
   console.log(abc.data);
   return abc.data;
}

export const postreviewcall=async (payload)=>{
   try{const abc=await api.post('/postRating',payload);}
   catch(err){return false;}
   
   return true;
}

export const setDoctersTrue=async (body)=>{
   try{const abc=await api.post('/acceptStatus',body);}
   catch(err){return false;}
   
   return true;
}



 