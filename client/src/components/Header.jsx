import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
        <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-10">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    YourHR
                </Link>
                <nav className="flex items-center">
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={handleSignOut}
                                className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition-all duration-300"
                            >
                                Sign Out
                            </button>
                            <button className="text-white hover:text-gray-200 transition-all duration-300">
                                <RxAvatar size={30} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <Link
                                to="/login"
                                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
