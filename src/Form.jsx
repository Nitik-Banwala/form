import { useState, useEffect } from "react";

const STORAGE_KEY = "user_registry";

const Form = () => {
    const [users, setUsers] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "" });

    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: "",
    });
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            setUsers(saved);
            if (saved.length > 0) setShowForm(true);
        } catch {
            setUsers([]);
        }
    }, []);

    const saveUsers = (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
    };

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

        if (users.some((u) => u.email.toLowerCase() === formDetails.email.toLowerCase())) {
            showToast("Email already exists.", "error");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const updated = [...users, formDetails];
            setUsers(updated);
            saveUsers(updated);

            setFormDetails({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                profilePicture: "",
            });

            setError(false);
            setLoading(false);
            showToast("User added successfully!", "success");
        }, 3000);
    };

    const handleFileChange = (files) => {
        const file = files[0];
        if (file) {
            const image = URL.createObjectURL(file);
            setFormDetails({ ...formDetails, profilePicture: image });
        }
    };

    const handleClear = () => {
        if (!users.length) return;

        if (window.confirm("Clear all entries?")) {
            localStorage.removeItem(STORAGE_KEY);
            setUsers([]);
            setShowForm(false);
            showToast("All entries cleared.", "error");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-stone-100">
            <main className="max-w-4xl mx-auto px-5 py-10 space-y-10">

                {users.length === 0 && !showForm && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                            alt="No data"
                            className="w-40 opacity-70 mb-4 cursor-pointer hover:scale-105 transition"
                            onClick={() => setShowForm(true)}
                        />
                        <p className="text-gray-500 text-lg font-medium">
                            No Results Found
                        </p>
                        <p className="text-gray-400 text-sm">
                            Click the image to add a user
                        </p>
                    </div>
                )}

                {showForm && (
                    <div className="border p-5 rounded-2xl bg-white shadow">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                className="border p-2 w-full"
                                value={formDetails.firstName}
                                onChange={(e) =>
                                    setFormDetails({ ...formDetails, firstName: e.target.value })
                                }
                            />
                            {error && !formDetails.firstName && (
                                <p className="text-red-500 text-xs">First name is required</p>
                            )}

                            <input
                                type="text"
                                placeholder="Enter last name"
                                className="border p-2 w-full mt-2"
                                value={formDetails.lastName}
                                onChange={(e) =>
                                    setFormDetails({ ...formDetails, lastName: e.target.value })
                                }
                            />
                            {error && !formDetails.lastName && (
                                <p className="text-red-500 text-xs">Last name is required</p>
                            )}

                            <input
                                type="email"
                                placeholder="Enter email"
                                className="border p-2 w-full mt-2"
                                value={formDetails.email}
                                onChange={(e) =>
                                    setFormDetails({ ...formDetails, email: e.target.value })
                                }
                            />
                            {error && !formDetails.email && (
                                <p className="text-red-500 text-xs">Email is required</p>
                            )}

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="border p-2 w-full mt-2"
                                value={formDetails.password}
                                onChange={(e) =>
                                    setFormDetails({ ...formDetails, password: e.target.value })
                                }
                            />
                            {error && !formDetails.password && (
                                <p className="text-red-500 text-xs">Password is required</p>
                            )}

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    className="border p-2 w-full mt-2"
                                    value={formDetails.confirmPassword}
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
                                <p className="text-red-500 text-xs">
                                    Confirm password is required
                                </p>
                            )}

                            {error &&
                                formDetails.password !== formDetails.confirmPassword && (
                                    <p className="text-red-500 text-xs">Passwords do not match</p>
                                )}

                            <input
                                type="file"
                                className="border p-2 w-full mt-2"
                                onChange={(e) => handleFileChange(e.target.files)}
                            />

                            {formDetails.profilePicture && (
                                <img
                                    src={formDetails.profilePicture}
                                    alt="preview"
                                    className="w-full h-60 object-cover mt-2 rounded"
                                />
                            )}

                            {loading && (
                                <div className="flex justify-center mt-3">
                                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            <button
                                disabled={loading}
                                className={`border p-2 w-full mt-3 text-white ${loading ? "bg-gray-400" : "bg-black"
                                    }`}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>

                            {toast.message && (
                                <p className={`text-xs mt-2 ${toast.type === "success" ? "text-green-600" : "text-red-600"}`}>
                                    {toast.message}
                                </p>
                            )}
                        </form>
                    </div>
                )}

                {users.length > 0 && (
                    <div>
                        <div className="flex justify-between mb-3">
                            <h2 className="text-xl font-serif">User data</h2>
                            <button
                                onClick={handleClear}
                                className="text-red-500 border border-red-400 px-3 py-1 rounded"
                            >
                                Clear All
                            </button>
                        </div>

                        <table className="w-full bg-white border rounded overflow-hidden">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u, i) => (
                                    <tr key={u.email} className="border-t">
                                        <td className="p-3">{i + 1}</td>
                                        <td className="p-3">{u.firstName} {u.lastName}</td>
                                        <td className="p-3 text-gray-500 text-sm">{u.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Form;