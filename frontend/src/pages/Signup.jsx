import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();


  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Add state for toggling password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/user/signup", {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        password: password
      })
      if (res.status === 200){
        sessionStorage.setItem("token", res.data.token)
        navigate("/dashboard")
      }
      

    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setUserName("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <Heading label={"Signup"} />

        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Signup
        </button>
        <BottomWarning label={"Already have an account?"} buttonText={"signin"} to={"/signin"} />
      </form>
    </div>
  );
}

export default Signup;
