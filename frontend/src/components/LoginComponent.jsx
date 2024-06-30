import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { storeTokenInCookie } from "../utilities/cookies";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
    reset,
  } = useForm();
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function customSubmitHandler(data) {
    const { email, username, password } = data;
    const reqData = {
      email,
      username,
      password
    };
    const apiUrl = isRegister
      ? "http://localhost:5000/auth/user/register"
      : "http://localhost:5000/auth/user/login";

    try {
      const response = await axios.post(apiUrl, reqData);

      const { token, user } = response.data;
      storeTokenInCookie(token);
      dispatch(login({ user }));
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in or registering:", error);
      toast.error("Error logging in or registering. Please try again.");
    }
  }

  const validateConfirmPassword = (value) => {
    const password = watch("password");
    return value === password || "Passwords do not match";
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    reset();
  };

  return (
    <div
      data-theme="synthwave"
      className="w-full flex flex-col justify-center space-y-1 items-center h-screen"
    >
      <ToastContainer />
      <form
        onSubmit={handleSubmit(customSubmitHandler)}
        className="max-w-72 md:max-w-80 lg:max-w-96 w-full space-y-4"
      >
        {isRegister ? (
          <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-center font-semibold">
            Let's Register
          </h1>
        ) : (
          <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-center font-semibold">
            Let's Login
          </h1>
        )}

        {isRegister && (
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              {...register("email", { required: true })}
              className="grow"
              placeholder="Email"
            />
            {touchedFields.email && errors.email && (
              <span className="text-red-400 text-sm mb-2">
                This field is required
              </span>
            )}
          </label>
        )}

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            {...register("username", { required: true })}
            className="grow"
            placeholder="Username"
          />
          {touchedFields.username && errors.username && (
            <span className="text-red-400 text-sm mb-2">
              This field is required
            </span>
          )}
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            {...register("password", { required: true })}
            className="grow"
            placeholder="Password"
          />
          {touchedFields.password && errors.password && (
            <span className="text-red-400 text-sm mb-2">
              This field is required
            </span>
          )}
        </label>

        {isRegister && (
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: validateConfirmPassword,
              })}
              className="grow"
              placeholder="Confirm Password"
            />
            {touchedFields.confirmPassword && errors.confirmPassword && (
              <span className="text-red-400 text-sm mb-2">
                Password and Confirm Password do not match!
              </span>
            )}
          </label>
        )}

        <div className="flex justify-evenly">
          <button
            type="submit"
            className="btn btn-secondary sm:w-20 md:w-40 lg:w-44"
          >
            {isRegister ? "Register" : "Login"}
          </button>
          <button
            type="button"
            onClick={toggleForm}
            className="btn btn-accent sm:w-20 md:w-40 lg:w-44"
          >
            {isRegister ? "Already a user?" : "New user?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
