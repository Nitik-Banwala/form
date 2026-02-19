import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ session, logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <Link to="/">Home</Link>

            {session ? (
                <>
                    {" | "}
                    <Link to="/profile">Profile</Link>
                    {" | "}
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    {" | "}
                    <Link to="/login">Login</Link>
                </>
            )}
        </nav>
    );
}


export default Navbar;