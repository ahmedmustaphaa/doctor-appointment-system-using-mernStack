import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../api/axios';
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [doctorlist, setDoctorlist] = useState([]);

  const [token,setToken]=useState(localStorage.getItem("token") || null);

  console.log(token)

  const [userDataProfile,setUserData]=useState();

  useEffect(()=>{

     const getUserData=async()=>{
      const {data}=await axiosInstance.get('/user/get-profile',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      setUserData(data.userData)
     }
     getUserData();

  },[])

  useEffect(()=>{
    const fetchDoctors=async()=>{
                   try{
                    const {data}=await axiosInstance.get("/admin/DoctorList");
          
                    setDoctorlist(data.doctors);
                   }catch(error){
                    console.error("Error fetching doctors:", error);
                   }
    }
    fetchDoctors();
  },[])
    const user={
doctorlist,
setDoctorlist,
token,setToken,
userDataProfile,setUserData
    }
  return (
    <AppContext.Provider value={ user}>
      {children}
    </AppContext.Provider>
  );
};
export const useShareContext=()=>{
    return useContext(AppContext)
}