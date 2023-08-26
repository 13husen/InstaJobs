import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get('token')) {
            navigate("/")
        }
    }, [])

    // const isMobile = useMediaQuery({ query: `(max-width: 720px)` });
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState()

    const loginHandler = async (e) => {
        toast.loading("Processing login...")
        setLoading(true);
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            email: email,
            password: password
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        fetch(`${process.env.REACT_APP_API_URL}/api/login`, requestOptions)
            .then(async (response) => {
                toast.dismiss();
                setLoading(false);
                if (response.ok) {
                    let result = await response.json();
                    Cookies.set('token', result.access_token ?? null, { sameSite: 'None', secure: true })
                    navigate("/");
                } else {
                    toast.error("Failed to login, Invalid credentials")
                }
            })
            .catch(error => {
                setLoading(false);
                toast.error("Failed to login, Invalid credentials");
            });
    }
    return (
        <div>
            <div className="antialiased bg-gray-200 text-gray-900 font-sans">
                <div className="flex items-center h-screen w-full">
                    <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                        <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                        <form className="mb-4" onSubmit={loginHandler}>
                            <div className="mb-4 md:w-full">
                                <label htmlFor="email" className="block text-xs mb-1 text-left">Email</label>
                                <input onChange={e => setEmail(e.target.value)} required className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Email" />
                            </div>
                            <div className="mb-6 md:w-full">
                                <label htmlFor="password" className="block text-xs mb-1 text-left">Password</label>
                                <input onChange={e => setPassword(e.target.value)} required className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
                            </div>
                            <button disabled={loading} className="bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 text-white transition-all duration-300 uppercase text-sm font-semibold px-4 py-2 rounded">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
