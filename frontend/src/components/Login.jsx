import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      console.log(response);

      // ✅ Show SweetAlert2 success alert
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); 
      });

    } catch (error) {
     
      Swal.fire({
        title: "Login Failed",
        text: error.message || "Invalid credentials",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
        <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-3 px-6 rounded"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-red-500 underline" to="/register">
            Register{" "}
          </Link>
          here.
        </p>
      </div>
    </section>
  );
};

export default Login;
