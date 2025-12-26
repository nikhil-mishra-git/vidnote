import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { registerUser } from "../../api/apiCalls.js";
import { setAuth } from "../../store/authSlice.js";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(form);
            if (data?.success === true && data?.user) {
                dispatch(setAuth(data.user));
                toast.success(data.message || "Account Created");
                navigate("/dashboard");
            }
        } catch {
            toast.error("User already exists");
        }
    };

    return (
        <div className="relative min-h-screen bg-[#101010] flex flex-col items-center justify-center px-4">

            <div className="absolute -top-20 -left-20 sm:-left-32 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] bg-[#24cfa6]/20 blur-[80px] sm:blur-[120px] rounded-full"></div>

            <Link
                to="/"
                className="absolute left-4 sm:left-6 md:left-20 top-10 sm:top-8 md:top-20 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-zinc-900 px-3 sm:px-4 py-3 text-sm text-zinc-300"
            >
                <IoMdArrowRoundBack className="text-[#24cfa6]" />
                Back to Home
            </Link>

            <div className="w-full max-w-md">
                <h1 className="text-4xl md:text-5xl font-mono text-white mb-6 sm:mb-8">Register</h1>

                <form onSubmit={handleRegister}>
                    <input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full px-5 py-3 mb-3 bg-zinc-900 border border-zinc-700 text-white rounded-md"
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full px-5 py-3 mb-3 bg-zinc-900 border border-zinc-700 text-white rounded-md"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-zinc-900 border border-zinc-700 text-white rounded-md"
                    />

                    <button
                        type="submit"
                        className="w-full mt-4 bg-[#24cfa6] py-3 rounded-md font-semibold"
                    >
                        Create Account
                    </button>
                </form>
            </div>

            <p className="text-zinc-400 text-sm mt-6">
                Already registered?{" "}
                <Link to="/login" className="text-[#24cfa6] hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default Register;
