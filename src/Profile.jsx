import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const logBtnRef = useRef(null);

    const [profileDetails, setProfileDetails] = useState({
        firstName: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: "",
    });

 
    const data = JSON.parse(localStorage.getItem("Users") || "null");

    useEffect(() => {
        if (!data?.length) return;

        setProfileDetails({
            username: data[0]?.firstName || "",
            lastname: data[0]?.lastname || "",
            email: data[0]?.email || "",
            password: data[0]?.password || "",
            confirmPassword: data[0]?.confirmPassword || "",
            profilePicture: data[0]?.profilePicture || "",
        });
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("Users");
        navigate("/Form");
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
           

            <div className="ml-20 w-1/4 border-r p-8">
                <h2 className="text-2xl font-bold mb-10">Profile</h2>

                <div className="flex items-center gap-4">
                    <img
                        src={profileDetails.profilePicture}
                        alt="profile"
                        className="w-16 h-16 rounded-full object-cover bg-gray-200"
                    />
                    <div>
                        <p className="font-semibold">{profileDetails.firstName}</p>
                        <p className="text-sm text-gray-500">{profileDetails.email}</p>
                    </div>
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
                >
                    <div className="grid grid-cols-2 gap-5">
                        <input
                            type="text"
                            value={profileDetails.firstName}
                            className="border rounded-lg p-3"
                            placeholder="First Name"
                            readOnly
                        />
                        <input
                            type="text"
                            value={profileDetails.lastname}
                            className="border rounded-lg p-3"
                            placeholder="Last Name"
                            readOnly
                        />
                    </div>

                    <input
                        type="text"
                        value={profileDetails.email}
                        className="border rounded-lg p-3 w-full"
                        placeholder="Email"
                        readOnly
                    />

                    <input
                        type="password"
                        value={profileDetails.password}
                        className="border rounded-lg p-3 w-full"
                        placeholder="Password"
                        readOnly
                    />

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
                    <Link to={"/Form"}>Logout</Link>
                
                </button>
            </div>
        </div>
    );
};

export default Profile;