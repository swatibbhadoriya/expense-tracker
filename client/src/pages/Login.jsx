import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/login",
        inputValue,
        {
          withCredentials: true,
        }
      );
      console.log("Response data:", data);
      const { token, message } = data;

      if (token) {
        localStorage.setItem("token", token);
        handleSuccess(message);

        setTimeout(() => {
          navigate("/dashboard");
          setInputValue({
            email: "",
            password: "",
          });
        }, 1000);
      } else {
        handleError(message);
        setInputValue({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      handleError(errorMessage);
      setInputValue({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="full-height">
      <div className="form_container">
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={{ color: "blue", textDecoration: "underline" }}>
            Signup
          </Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
