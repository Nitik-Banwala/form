import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Form = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(true);

        if (
            !formDetails.firstName ||
            !formDetails.lastName ||
            !formDetails.email ||
            !formDetails.password ||
            !formDetails.confirmPassword ||
            formDetails.password !== formDetails.confirmPassword
        ) {
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("Users")) || [];
        existingUsers.push(formDetails);
        localStorage.setItem("Users", JSON.stringify(existingUsers));

        e.target.reset()

        navigate("/login")
        console.log("Form Submitted:", formDetails);
        alert("Form submitted successfully!");
    };

    const handleFileChange = (files) => {
        const file = files[0];
        if (file) {
            const image = URL.createObjectURL(file);
            setFormDetails({ ...formDetails, profilePicture: image });
        }
    };

    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <div className=" px-5 py-10 rounded-2xl shadow w-125 h-auto">
                <form onSubmit={handleSubmit} className="flex flex-col w-115">
                    <h1 className="text-center text-4xl text-[#112D49] font-bold">Sign up</h1>
                    <p className="text-center text-[16px] text-[#112D49] font-normal mt-4 mb-4">Create your account to unlock access and stay <br /> updated with everything we offer.</p>
                    <input
                        type="text"
                        placeholder="Enter first name"
                        className=" p-2 w-115 rounded-[112px] bg-[#F4F8F7] text-[#112D49] text-[16px] font-normal pl-6"
                        onChange={(e) =>
                            setFormDetails({
                                ...formDetails,
                                firstName: e.target.value,
                            })
                        }

                    />
                    {error && !formDetails.firstName && (
                        <p className="text-red-500 text-xs ml-4 ">
                            First name is required
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="Enter last name"
                        className=" p-2  mt-2 w-115 rounded-[112px] bg-[#F4F8F7] text-[#112D49] text-[16px] font-normal pl-6 "
                        onChange={(e) =>
                            setFormDetails({
                                ...formDetails,
                                lastName: e.target.value,
                            })
                        }
                    />
                    {error && !formDetails.lastName && (
                        <p className="text-red-500 text-xs ml-4">
                            Last name is required
                        </p>
                    )}
                    <input
                        type="email"
                        placeholder="Enter email"
                        className=" p-2 w-115 rounded-[112px] bg-[#F4F8F7] text-[#112D49] text-[16px] font-normal pl-6 mt-2"
                        onChange={(e) =>
                            setFormDetails({
                                ...formDetails,
                                email: e.target.value,
                            })
                        }
                    />
                    {error && !formDetails.email && (
                        <p className="text-red-500 text-xs ml-4">
                            Email is required
                        </p>
                    )}

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className=" p-2 w-115 rounded-[112px] bg-[#F4F8F7] text-[#112D49] text-[16px] font-normal pl-6 mt-2"
                        onChange={(e) =>
                            setFormDetails({
                                ...formDetails,
                                password: e.target.value,
                            })
                        }
                    />
                    {error && !formDetails.password && (
                        <p className="text-red-500 text-xs ml-4">
                            Password is required
                        </p>
                    )}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className=" p-2 w-115 rounded-[112px] bg-[#F4F8F7] text-[#112D49] text-[16px] font-normal pl-6 mt-2"
                            onChange={(e) =>
                                setFormDetails({
                                    ...formDetails,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-4 text-sm text-blue-600"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {error && !formDetails.confirmPassword && (
                        <p className="text-red-500 text-xs ml-4">
                            Confirm password is required
                        </p>
                    )}

                    {error &&
                        formDetails.confirmPassword &&
                        formDetails.password !== formDetails.confirmPassword && (
                            <p className="text-red-500 text-xs ml-4">
                                Passwords do not match
                            </p>
                        )}

                    <input
                        type="file"
                        className=" p-2 w-115 rounded-[112px] bg-[#F4F8F7] text-[#112D49] text-[16px] font-normal pl-6 mt-2"
                        onChange={(e) => handleFileChange(e.target.files)}
                    />
                    {formDetails.profilePicture && (
                        <img
                            src={formDetails.profilePicture}
                            alt="preview"
                            className="w-80 h-40 object-cover mt-2 rounded "
                        />
                    )}
                    <button className="border p-2 w-115 rounded-[112px]   text-[16px] font-normal pl-6 mt-3 bg-[#112D49] text-white">
                        Submit
                    </button>
                    <p className="mt-5 text-center text-[#41576D]">Already a member?  <Link to={"/login"}> <span className="text-[#112D49] font-bold">Log in</span>  </Link></p>
                </form>
            </div>
        </div>
    );
};

export default Form;