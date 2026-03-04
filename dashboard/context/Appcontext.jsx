import { createContext, useContext, useState ,useEffect} from "react";

import Cookies from "universal-cookie";

const AppContext=createContext();


function Appcontext({children}) {
  const cookies = new Cookies();


    const [atoken,setAtoken]=useState(cookies.get("token") || null  );
    const [doctorLength,setDoctorLength]=useState(0);

 
    const val={
        atoken,
        setAtoken,
        doctorLength,
        setDoctorLength
    }
  return (
    <AppContext.Provider value={val}>
      {children}
    </AppContext.Provider>
  )
}

export const ShareDashData=()=>{
    return useContext(AppContext)
}

export default Appcontext

