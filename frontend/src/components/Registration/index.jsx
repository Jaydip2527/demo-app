import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SIGNIN } from "../../routes";
import {
  emailRegx,
  noSpeacialCharRegx,
  passwordRegx,
  toast,
} from "../../utils/constant";
import img from "../../assets/logo-jd2.png";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/actions";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when the form is submitted
    try {
      await dispatch(registerUser(data, navigate));
      reset();
    } catch (error) {
      console.log("error ::", error);
      toast(error?.message, "error");
    } finally {
      setLoading(false); // Set loading to false once the request is completed
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-3">
                  <img src={img} width={180} alt="Not Found" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      {...register("username", {
                        required: "User name is required.",
                        pattern: {
                          value: noSpeacialCharRegx,
                          message: "Please enter a valid user name.",
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
                    {errors.username && (
                      <div className="invalid-feedback">
                        {errors.username.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: emailRegx,
                          message: "Please enter a valid email.",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
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
                            message:
                              "Password should be at most 12 characters.",
                          },
                          minLength: {
                            value: 6,
                            message:
                              "Password should be at least 6 characters.",
                          },
                        })}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        style={{ border: "1px solid #ced4da" }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <i
                          className={`bi ${
                            showPassword ? "bi-eye-slash" : "bi-eye"
                          }`}
                        ></i>
                      </button>
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                        {...register("confirmPassword", {
                          required: "Please confirm your password.",
                          validate: (value) =>
                            value === getValues("password") ||
                            "Passwords do not match.",
                        })}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        style={{ border: "1px solid #ced4da" }}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        <i
                          className={`bi ${
                            showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                          }`}
                        ></i>
                      </button>
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-2"
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
                  <div className="text-center mt-2">
                    <p className="mb-0 d-flex justify-content-center">
                      Already have an account?
                      <Link to={SIGNIN} className="text-decoration-none ms-2">
                        <p className="text-primary">Sign In</p>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
