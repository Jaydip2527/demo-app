import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP } from "../../routes";
import { useForm } from "react-hook-form";
import { noSpeacialCharRegx, passwordRegx, toast } from "../../utils/constant";
import img from "../../assets/logo-jd2.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/actions";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    setValue: setvalue,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkRememberMe = localStorage.getItem("rememberMe");
    const data = JSON.parse(checkRememberMe);
    if (data?.rememberMe === true) {
      setvalue("username", data.data.username);
      setvalue("password", data.data.password);
      setvalue("rememberMe", data.rememberMe);
    }
  }, [setvalue]);
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(loginUser(data, navigate, rememberMe));
      reset();
    } catch (error) {
      console.log("error ::", error);
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-center mb-3">
              <img src={img} alt="Logo" width={180} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  {...register("username", {
                    required: "User name is required.",
                    pattern: {
                      value: noSpeacialCharRegx,
                      message: "Please enter a valid User Name.",
                    },
                    maxLength: {
                      value: 20,
                      message: "User name should be at most 20 characters.",
                    },
                    minLength: {
                      value: 2,
                      message: "User name should be at least 2 characters.",
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors.username?.message}
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required.",
                    pattern: {
                      value: passwordRegx,
                      message:
                        "Password must have one letter, one number, and one special character.",
                    },
                    maxLength: {
                      value: 12,
                      message: "Password should be at most 12 characters.",
                    },
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters.",
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>

              <div className="form-group form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  name="rememberMe"
                  defaultChecked={localStorage.getItem("rememberMe") === "true"}
                  {...register("rememberMe", { onChange: handleRememberMe })}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>

            <div className="text-center mt-3">OR</div>

            <div className="d-flex justify-content-center mt-3">
              <span>Don’t have an account?</span>
              <Link to={SIGNUP} className="ms-2 text-decoration-none">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

