import { Navigate } from "react-router-dom"


// log out ho rahay tha tou hum profile pa ja rahay tha so not access honay chaiya us ka liya hum na ya file banay
const ProtectedRoute=({isAuthenticated,children})=>{
      if(!isAuthenticated){
        return <Navigate to={"/login"} replace/>
      } 
      return children
}


export default ProtectedRoute