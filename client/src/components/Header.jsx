import React, { useState, useEffect } from "react";
import { Link,useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    useEffect(() => {
        const token = getCookie("access_token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [location]);

    const handleSignOut = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/signout`,
                {},
                { withCredentials: true }
            );
            document.cookie = "access_token=; Max-Age=0; path=/";
            setIsAuthenticated(false);
            navigate("/login");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">YourHR</h1>
                <nav>
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4 relative">
                            <button
                                onClick={handleSignOut}
                                className="text-white rounded"
                            >
                                Sign Out
                            </button>
                            <button className="px-4">
                                <RxAvatar size={24} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="px-4">
                                Login
                            </Link>
                            <Link to="/signup" className="px-4">
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
