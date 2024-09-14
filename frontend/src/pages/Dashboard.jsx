import { useEffect } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import { useNavigate } from "react-router-dom"


function Dashboard() {
  const navigate = useNavigate()
 
  useEffect (()=>{
    const token = sessionStorage.getItem("token")

    if (!token){
      navigate("/signup")
    }

  }, [navigate])
  
  return (
    <div>
      <Appbar />
      <div className="mt-4">
        <Balance  value={1000}/>
        <Users/>
      </div>
    </div>
  )
}

export default Dashboard