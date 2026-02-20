import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import Form from "./Formapp";

const Profile = () => {
    const navigate = useNavigate();
    const logBtnRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const [profileDetails, setProfileDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: "",
    });

    const data = JSON.parse(localStorage.getItem("Users") || "null");

    useEffect(() => {
        if (!data?.length) return;

        setProfileDetails({
            firstName: data[0]?.firstName || "",
            lastName: data[0]?.lastName || "",
            email: data[0]?.email || "",
            password: data[0]?.password || "",
            // confirmPassword: data[0]?.confirmPassword || "",
            profilePicture: data[0]?.profilePicture || "",
        });
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("Users");
        navigate("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saved:", profileDetails);
    };

    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen font-montserrat">
                <h1 className="text-4xl font-semibold">No results found</h1>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen font-montserrat">
            <div className=" h-212 w-30 bg-[#112D49]">
                <div className="mt-40">
                    <div className="mt-15 ml-7">
                        <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6667 4.37125L25 11.6837V24.375H21.6667V14.625H11.6667V24.375H8.33333V11.6837L16.6667 4.37125ZM16.6667 0L0 14.625H5V27.625H15V17.875H18.3333V27.625H28.3333V14.625H33.3333L16.6667 0Z" fill="white" />
                        </svg>
                    </div>
                    <div className="mt-15 ml-7">
                        <svg width="27" height="33" viewBox="0 0 27 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3333 32.5C15.1667 32.5 16.6667 31 16.6667 29.1667H10C10 31 11.5 32.5 13.3333 32.5ZM23.3333 22.5V14.1667C23.3333 9.05 20.6167 4.76667 15.8333 3.63333V2.5C15.8333 1.11667 14.7167 0 13.3333 0C11.95 0 10.8333 1.11667 10.8333 2.5V3.63333C6.06667 4.76667 3.33333 9.03333 3.33333 14.1667V22.5L0 25.8333V27.5H26.6667V25.8333L23.3333 22.5ZM20 24.1667H6.66667V14.1667C6.66667 10.0333 9.18333 6.66667 13.3333 6.66667C17.4833 6.66667 20 10.0333 20 14.1667V24.1667Z" fill="white" />
                        </svg>
                    </div>
                    <div className="mt-15 ml-7"><svg width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 3.25H28.3333V0H25V3.25H8.33333V0H5V3.25H3.33333C1.5 3.25 0 4.7125 0 6.5V32.5C0 34.2875 1.5 35.75 3.33333 35.75H30C31.8333 35.75 33.3333 34.2875 33.3333 32.5V6.5C33.3333 4.7125 31.8333 3.25 30 3.25ZM30 32.5H3.33333V14.625H30V32.5ZM30 11.375H3.33333V6.5H30V11.375Z" fill="white" />
                    </svg>
                    </div>
                    <div className="mt-15 ml-7"><svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 21.6333L12.5 11.6167L19.1667 18.2833L33.3333 2.35L30.9833 0L19.1667 13.2833L12.5 6.61667L0 19.1333L2.5 21.6333Z" fill="white" />
                    </svg>
                    </div>
                    <div className="mt-15 ml-7"><svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 3.25C15.1667 3.25 16.6667 4.7125 16.6667 6.5C16.6667 8.2875 15.1667 9.75 13.3333 9.75C11.5 9.75 10 8.2875 10 6.5C10 4.7125 11.5 3.25 13.3333 3.25ZM13.3333 19.5C17.8333 19.5 23 21.5963 23.3333 22.75H3.33333C3.71667 21.58 8.85 19.5 13.3333 19.5ZM13.3333 0C9.65 0 6.66667 2.90875 6.66667 6.5C6.66667 10.0913 9.65 13 13.3333 13C17.0167 13 20 10.0913 20 6.5C20 2.90875 17.0167 0 13.3333 0ZM13.3333 16.25C8.88333 16.25 0 18.4275 0 22.75V26H26.6667V22.75C26.6667 18.4275 17.7833 16.25 13.3333 16.25Z" fill="white" />
                    </svg>
                    </div>
                </div>
            </div>

            <div className="ml-20 w-1/4  border-r p-8">
                <div className="flex flex-row gap-12 ">
                    <h1><svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.82 21.18L5.66 12L14.82 2.82L12 0L0 12L12 24L14.82 21.18Z" fill="black" />
                    </svg>
                    </h1>
                    <h2 className="text-2xl font-bold mb-10 -mt-1 text-[#1C1C1C]">Profile</h2>
                </div>
                <div className="flex flex-row gap-8 mt-13 ml-5">
                    <h1 className=" cursor-pointer">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.7375 11.2875L22.4625 13.0125L5.475 30H3.75V28.275L20.7375 11.2875ZM27.4875 0C27.0187 0 26.5312 0.1875 26.175 0.54375L22.7437 3.975L29.775 11.0062L33.2062 7.575C33.9375 6.84375 33.9375 5.6625 33.2062 4.93125L28.8188 0.54375C28.4438 0.16875 27.975 0 27.4875 0ZM20.7375 5.98125L0 26.7188V33.75H7.03125L27.7687 13.0125L20.7375 5.98125Z" fill="#1C1C1C" />
                        </svg>
                    </h1>
                    <h1 className="text-2xl font-bold cursor-pointer text-[#1C1C1C]">Edit profile</h1>
                </div>
            </div>

            <div className="w-2/4 p-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-semibold">Edit Profile</h2>
                    <img
                        src={profileDetails.profilePicture}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover bg-gray-200"
                    />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-5"
                >    <div className="flex flex-row w-102  justify-between"><h1>First Name</h1> <h1>Last Name</h1></div>
                    <div className="grid grid-cols-2 -mt-4 gap-5">
                        <input
                            type="text"
                            value={profileDetails.firstName}
                            className="border rounded-lg p-3"
                            placeholder="First Name"
                            readOnly
                        />
                        <input
                            type="text"
                            value={profileDetails.lastName}
                            className="border rounded-lg p-3"
                            placeholder="Last Name"
                            readOnly
                        />
                    </div>
                    <h1>Email</h1>
                    <input
                        type="text"
                        value={profileDetails.email}
                        className="border rounded-lg p-3 -mt-4 w-full"
                        placeholder="Email"
                        readOnly
                    />

                    <div>
                        <h1 className="ml-1 mb-1">Address</h1>
                        <input type="text"
                            className="border rounded-lg p-3 w-full"
                            value={"33062 Zboncak isle"}
                        />
                    </div>
                    <div>
                        <h1 className="ml-1 mb-1">Contact Number</h1>
                        <input type="text"
                            className="border rounded-lg p-3 w-full"
                            value={"58077.79"}
                        />
                    </div>
                    <h1>Password</h1>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={profileDetails.password}
                        className="border rounded-lg -mt-4 p-3 w-full"
                        placeholder="Password"
                        readOnly
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute -ml-12 text-sm text-blue-600"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>

                    <div className="flex gap-4 mt-10">
                        <button
                            type="button"
                            className="px-6 py-3 border rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-[#112D49] text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-1/4 p-8 flex flex-col items-end">
                <img
                    onClick={() => (logBtnRef.current.style.display = "block")}
                    src={profileDetails.profilePicture}
                    alt="profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                />

                <button
                    ref={logBtnRef}
                    onClick={handleLogOut}
                    className="hidden mt-4 px-4 py-2 border rounded-lg"
                >
                    <Link to={"/"}>Logout</Link>

                </button>
            </div>
        </div>
    );
};

export default Profile;