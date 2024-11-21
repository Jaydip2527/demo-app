import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserProfile } from "../../redux/actions/actions";
import { toast } from "../../utils/constant";
import "./styles.css";
import HeaderComponent from "../Layout/header";
import defaulProfile from "../../assets/add-profile.jpg";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../../routes";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { userDetails } = useSelector((state) => state.auth); // Assuming Redux holds user details
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getAllUsers = useCallback(async () => {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      await dispatch(getUserData(token, JSON.parse(localStorage.getItem("userDetails"))?.email, navigate));
    } catch (error) {
      console.error("Error fetching items:", error);
      toast(error.message, "error");
    } finally {
      setLoader(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(SIGNIN);
    }
  }, [navigate]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage?.getItem("userDetails"));
    // Pre-fill form fields with user data
    if (userDetails?.username && userDetails?.email) {
      setValue("username", userDetails.username);
      setValue("email", userDetails.email);
      setValue("phone", userDetails.phone);
      setValue("city", userDetails.city);
      setValue("pincode", userDetails.pincode);
      setValue("address", userDetails.address);
      setValue("firstName", userDetails.firstName);
      setValue("lastName", userDetails.lastName);
      setProfileImage(userDetails.profileImage);
    }
  }, [setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = { ...data, profileImage }; // Include the image in the payload
      // await dispatch(updateUserProfile(payload));
      toast("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast(error?.message || "Error updating profile", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar/Header */}
      <HeaderComponent />

      {/* Profile Form */}
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          background:
            "radial-gradient(circle, rgba(148,187,233,1) 0%, rgba(238,174,202,1) 100%)",
        }}
      >
        <div className="container userProfile mt-4">
          <div className="row justify-content-center">
            {loader ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
              >
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="col-lg-12 col-md-10 mb-4">
                <h3 className="text-center">User Profile</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Profile Image */}
                  <div className="text-center mb-3">
                    <div
                      className="profile-container"
                      onClick={triggerFileInput}
                    >
                      <img
                        src={profileImage || defaulProfile}
                        alt="Profile"
                        className="profile-image"
                      />
                      <div className="profile-hover-overlay">
                        <i
                          className="bi bi-plus"
                          style={{ fontSize: "2rem" }}
                        ></i>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      className="d-none"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>

                  <div className="row">
                    {/* First Name */}
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                        {...register("firstName", {
                          required: "First name is required.",
                          maxLength: {
                            value: 20,
                            message:
                              "First name must be at most 20 characters.",
                          },
                        })}
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName.message}
                        </div>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.lastName ? "is-invalid" : ""
                        }`}
                        {...register("lastName", {
                          required: "Last name is required.",
                          maxLength: {
                            value: 20,
                            message: "Last name must be at most 20 characters.",
                          },
                        })}
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName.message}
                        </div>
                      )}
                    </div>

                    {/* Username */}
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.username ? "is-invalid" : ""
                        }`}
                        {...register("username", {
                          required: "Username is required.",
                          maxLength: {
                            value: 20,
                            message: "Username must be at most 20 characters.",
                          },
                        })}
                      />
                      {errors.username && (
                        <div className="invalid-feedback">
                          {errors.username.message}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        {...register("email", {
                          required: "Email is required.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address.",
                          },
                        })}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">
                          {errors.email.message}
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        {...register("phone", {
                          required: "Phone number is required.",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message:
                              "Please enter a valid 10-digit phone number.",
                          },
                        })}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">
                          {errors.phone.message}
                        </div>
                      )}
                    </div>

                    {/* City */}
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("city")}
                      />
                    </div>

                    {/* Pincode */}
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("pincode")}
                      />
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        {...register("address")}
                      ></textarea>
                    </div>
                  </div>

                  {/* Update Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
