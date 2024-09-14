/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate , useSearchParams } from "react-router-dom";

function SendMoney({user}) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams()
  const id  = searchParams.get("id")
  const name = searchParams.get("name")

  
  const [amount, setAmount] = useState(0);

  const firstletter = name[0].toUpperCase()

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    }
  }, [navigate]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransfer = async() => {
    
    try{
      const res =  await axios.post("http://localhost:3000/api/account/transfer" , {
        amount : amount ,
        to : id
      }, {
        headers : {
          Authorization:"Bearer "+ sessionStorage.getItem("token")
        }
      })

      if (res.status === 200){
        alert(`${res.data.message}`)
      }
    }catch(error){
      console.log(`Error : ${error}`)
    }
      
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Send Money</h1>
        </div>
        <div className="flex items-center p-6">
          <div className="w-20 h-20 flex items-center justify-center bg-green-500 rounded-full text-2xl font-bold text-white mr-4">
            {firstletter}
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold">{name}</h2>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-center">
          <button
            onClick={handleTransfer}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendMoney;
