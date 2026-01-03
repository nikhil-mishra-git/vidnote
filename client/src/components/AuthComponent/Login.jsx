import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginUser } from "../../api/apiCalls.js";
import { setAuth } from "../../store/authSlice.js";

import toast from "react-hot-toast";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        try {
            setLoading(true);

            const data = await loginUser(form);
            if (data?.success === true && data?.user) {
                dispatch(setAuth(data.user));
                toast.success(data.message);
                navigate("/dashboard");
            }
        } catch (err) {
            toast.error("Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#101010] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">

            <div className="absolute -top-20 -left-20 sm:-left-32 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] bg-[#24cfa6]/20 blur-[80px] sm:blur-[120px] rounded-full"></div>

            <Link
                to="/"
                className="absolute left-4 sm:left-6 md:left-20 top-10 sm:top-8 md:top-20 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-zinc-900 px-3 sm:px-4 py-3 text-sm text-zinc-300"
            >
                <IoMdArrowRoundBack className="text-[#24cfa6]" />
                Back to Home
            </Link>

            {/* Form container - responsive width */}
            <div className="w-full max-w-sm sm:max-w-md mt-8 sm:mt-0">

                <h1 className="text-4xl md:text-5xl font-mono text-white mb-6 sm:mb-8">Sign In</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        disabled={loading}
                        value={form.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        required
                        className="w-full px-4 sm:px-5 py-3 bg-zinc-900 border border-zinc-700 text-white rounded-md text-sm sm:text-base focus:outline-none focus:border-[#24cfa6] transition"
                    />

                    {/* Password input */}
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        disabled={loading}
                        value={form.password}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        required
                        className="w-full px-4 sm:px-5 py-3 bg-zinc-900 border border-zinc-700 text-white rounded-md text-sm sm:text-base focus:outline-none focus:border-[#24cfa6] transition"
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-4 sm:mt-6 py-3 rounded-md font-semibold text-sm sm:text-base transition 
        ${loading
                                ? "bg-[#24cfa6]/60 cursor-not-allowed"
                                : "bg-[#24cfa6] hover:bg-[#20b895]"
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                Signing in...
                            </span>
                        ) : (
                            "Continue"
                        )}
                    </button>

                </form>
            </div>

            {/* Sign up link - responsive text size */}
            <p className="text-zinc-400 text-xs sm:text-sm mt-6 sm:mt-8">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#24cfa6] hover:underline">
                    Create one
                </Link>
            </p>
        </div>
    );
};

export default Login;