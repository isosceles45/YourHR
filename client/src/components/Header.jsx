import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Job Portal</h1>
                <nav>
                    <Link to="/login" className="px-4">
                        Login
                    </Link>
                    <Link to="/signup" className="px-4">
                        Sign Up
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
