"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";  // ✅ useRouter instead of redirect
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();  // ✅

 const handleRegister = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const user = Object.fromEntries(formData.entries());
  console.log("Form data:", user);  // ✅ check form data

  if (user.password !== user.confirmPassword) {
    return toast.error("Passwords do not match");
  }

  if (user.password.length < 8) {
    return toast.error("Password must be at least 8 characters");
  }

  console.log("Sending signup request...");  // ✅

  const { data, error } = await authClient.signUp.email({
    name: user.name,
    email: user.email,
    password: user.password,
    image: user.photoURL,
    callbackURL: "/",
  });

  console.log("Response data:", data);   // ✅
  console.log("Response error:", error); // ✅

  if (data) {
    toast.success("Account created successfully!");
    router.push("/");
  } else {
    toast.error(error?.message || "Something went wrong");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleRegister} className="space-y-3">
          <input name="name" placeholder="Name" className="input input-bordered w-full" required />
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="photoURL" placeholder="Photo URL" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input input-bordered w-full" required />

          <button className="btn btn-success w-full" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have account? <Link href="/login" className="text-green-600">Login</Link>
        </p>
      </div>
    </div>
  );
}