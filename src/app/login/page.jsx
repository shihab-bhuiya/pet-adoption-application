"use client";

import { authClient } from "@/lib/auth-client";
import { router } from "better-auth/api";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);

    const { data, error } = await authClient.signIn.email({
    email: user.email, // required
    password: user.password, // required
    rememberMe: true,
    callbackURL: "/",
});
if(data){
    toast("Login successful");

    router.push('/');
    redirect('/');
}
else{
    toast.error(error.message);
}

 
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-3">

          <input name="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

          <button className="btn btn-success w-full">
            Login
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have account? <Link href="/sign-up" className="text-green-600">Sign Up</Link>
        </p>

      </div>

    </div>
  );
}