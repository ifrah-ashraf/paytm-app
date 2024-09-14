/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Users() {
    const [result, setResult] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/api/user/bulk?filter=" + filter)
            .then(response => {
                setResult(response.data.user)
            })
    }, [filter])

    return (
        <div className="flex flex-col mt-4">
            <div className="font-semibold text-lg font-sans ml-4">
                Users
            </div>
            <div>
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="shadow-lg border-2 rounded-sm h-8 w-[98%] justify-center ml-4 mt-2"
                    placeholder=" Search User" />


            </div>
            <div>

                {result.map(user => <User key={user.id} user={user} />)}
            </div>
            <div className="mt-4 flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center ml-4">
                    <div className="text-xl">
                        I
                    </div>
                </div>
                <div className="ml-4 text-xl flex-grow">
                    Ifrah Ashraf
                </div>
                <div className="ml-auto mr-4 text-sm">
                    <button className="bg-black text-white px-4 py-2 rounded-lg transition transform hover:bg-gray-800 hover:scale-105 active:scale-95">
                        Send Money
                    </button>
                </div>

            </div>
        </div>

    )
}

function User({ user }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/send?id="+ user.id + "&name=" + user.firstName )
    }
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 ml-4">
                    <div className="flex flex-col items-center justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="text-sm">
                <button className="bg-black text-white px-4 py-2 rounded-lg transition transform hover:bg-gray-800 hover:scale-105 active:scale-95"
                onClick={handleClick}>
                    Send Money
                </button>
            </div>
        </div>
    )
}

export default Users