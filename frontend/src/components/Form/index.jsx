import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../utils/constant";
import { useForm } from "react-hook-form";
import HeaderComponent from "../Layout/header";
import { LIST } from "../../routes";
import { addData, updateData } from "../../redux/actions/actions";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // Track if it's edit mode
  const location = useLocation();
  const Id = location.state?.Id || null; // Get Id from location state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => state.items.items); // Assuming items are already fetched

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [image, setImage] = useState(null); // Store uploaded image
  const [imagePreview, setImagePreview] = useState(null); // Store uploaded image preview

  useEffect(() => {
    if (Id) {
      setIsEdit(true);
      const itemToEdit = itemsData.find((data) => data._id === Id);
      if (itemToEdit) {
        reset({
          title: itemToEdit.title,
          authors: itemToEdit.authors,
          isbn: itemToEdit.isbn,
          subtitle: itemToEdit.subtitle,
          description: itemToEdit.description,
          image: itemToEdit.image,
        });
        itemToEdit?.image && setImagePreview(`${process.env.REACT_APP_API_URL}/${itemToEdit.image}`);
      }
    } else {
      reset(); // Reset form if not in edit mode
    }
  }, [Id, itemsData, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    });
    if (image) {
      formData.append("image", image);
    } else if (isEdit) {
      // If not uploading a new image, keep the existing one
      formData.append("image", imagePreview.split("/").pop());
    }

    try {
      if (isEdit) {
        await dispatch(updateData(Id, formData, navigate)); // Update Item
        toast("Item updated successfully", "success");
      } else {
        await dispatch(addData(formData, navigate)); // Add new Item
        toast("Item added successfully", "success");
      }
      reset();
    } catch (error) {
      console.log("error ::", error);
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="text-center mb-3">{isEdit ? "Edit Form" : "Add Form"}</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">Item Title</label>
                    <input
                      type="text"
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      placeholder="Enter Item Title"
                      {...register("title", {
                        required: "Item Title is required.",
                      })}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title?.message}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Item Author</label>
                    <input
                      type="text"
                      className={`form-control ${errors.authors ? "is-invalid" : ""}`}
                      placeholder="Enter Item Author"
                      {...register("authors", {
                        required: "Item Author is required.",
                      })}
                    />
                    {errors.authors && <div className="invalid-feedback">{errors.authors?.message}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Isbn Number</label>
                    <input
                      type="text"
                      className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
                      placeholder="Enter ISBN Number"
                      {...register("isbn", {
                        required: "Isbn Number is required.",
                        pattern: {
                          value: /^[0-9-]+$/,
                          message: "ISBN Number must only contain numbers and dashes.",
                        },
                      })}
                    />
                    {errors.isbn && <div className="invalid-feedback">{errors.isbn?.message}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Item Subtitle</label>
                    <input
                      type="text"
                      className={`form-control ${errors.subtitle ? "is-invalid" : ""}`}
                      placeholder="Enter Item Subtitle"
                      {...register("subtitle")}
                    />
                    {errors.subtitle && <div className="invalid-feedback">{errors.subtitle?.message}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className={`form-control ${errors.description ? "is-invalid" : ""}`}
                      placeholder="Enter Description"
                      {...register("description")}
                    ></textarea>
                    {errors.description && <div className="invalid-feedback">{errors.description?.message}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Item Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Item"
                        className="img-fluid mt-3"
                        style={{ maxWidth: "200px" }}
                      />
                    )}
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{" "}
                          {isEdit ? "Updating..." : "Saving..."}
                        </>
                      ) : (
                        isEdit ? "Update Item" : "Save Item"
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={() => navigate(LIST)}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

