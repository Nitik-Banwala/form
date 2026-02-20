import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";


const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [details, setDetails] = useState({
        email: "",
        password: ""
    })

    const getItems = () => {
        return JSON.parse(localStorage.getItem("Users"))
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/profile")

    }

    return (
        <div className="justify-center items-center w-full h-screen flex flex-col  ">
            <div className=" px-5 py-10 rounded-2xl shadow w-125 h-auto">
                <h2 className="text-center text-[#112D49] text-4xl font-bold">Welcome back!</h2>
                <p className="text-center text-[16px] font-bold text-[#112D49]">Log in below to access your account and <br /> keep things running smoothly.</p>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input type="email" placeholder="Email" value={details.email} onChange={(e) => setDetails(() => ({
                        ...details,
                        email: e.target.value

                    }))} className=" p-2 w-115 rounded-[112px] bg-[#F4F8F7] text-[#112D49] text-[16px] font-normal pl-6 mt-2" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password" value={details.password} onChange={(e) => setDetails(() => ({
                            ...details,
                            password: e.target.value
                        }))} className=" p-2 w-115 rounded-[112px] bg-[#F4F8F7] text-[#112D49] text-[16px] font-normal pl-6 mt-2" />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute ml-100 mt-17 text-sm text-blue-600"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    <button type="submit" onClick={(e) => handleSubmit(e)} className="border p-2 w-115 rounded-[112px]   text-[16px] font-normal pl-6 mt-3 bg-[#112D49] text-white">Login</button>
                </form>
                <h1 className="text-center text-[16px] text-[#41576D] mt-4">Don’t have an account?
<Link to={"/"}>
                    <span className=" text-center text-[16px] ml-1 text-[#112D49] font-bold cursor-pointer">Create account</span>
                    </Link>
                </h1>
            </div>
        </div>
    );
}
export default Login