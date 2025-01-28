import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };
   // console.log(data);
  };

  return (
    <section className="h-screen flex items-center justify-center ">
      <div className="max-w-sm boder shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form
          onSubmit={handleRegister}
          className="space-y-5 max-w-sm mx-auto pt-8"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
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
          {message && (
            <div
              className={`text-red-500 text-xs ${
                message.type === "error" ? "block" : "hidden"
              }`}
            >
              {message.text}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-3 px-6 rounded"
          >
            Register
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Already have an account? {""}
          <Link className="text-red-500 underline" to="/login">
            Login {""}
          </Link>
          here.
        </p>
      </div>
    </section>
  );
};

export default Register;
