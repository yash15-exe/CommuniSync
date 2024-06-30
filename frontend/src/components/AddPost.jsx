import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { communityObjectId } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("caption", data.caption);
    formData.append("visibleToAll", data.visibleToAll || false);
    formData.append("allowComments", data.allowComments || false);
    formData.append("image", data.image[0]);
    formData.append("senderObjectId", user._id);
    formData.append("communityObjectId", communityObjectId);
    formData.append("authorUsername", user.username);

    try {
      const res = await axios.post("http://localhost:5000/posts/addPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post added successfully!");
      console.log("Data sent successfully: ", res);
    } catch (error) {
      toast.error("Error in sending the data!");
      console.log("Error in sending the data: ", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showImagePreview = () => {
    setShowPreview(true);
  };

  const hideImagePreview = () => {
    setShowPreview(false);
  };

  return (
    <div data-theme="synthwave" className="flex p-4 w-full max-w-md h-full items-center">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h1 className="text-center text-2xl font-semibold mb-4">Create A Post</h1>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-2">
            <div className="mb-2">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                className="input input-bordered input-info w-full"
                {...register("title", { required: "Title is required" })}
                placeholder="Title"
              />
              {errors.title && <span className="text-red-500">Please add a title</span>}
            </div>
            <div className="mb-2">
              <label className="block mb-1">Caption</label>
              <textarea
                className="textarea textarea-info w-full h-24"
                placeholder="Caption"
                {...register("caption", { required: "Caption is required" })}
              ></textarea>
              {errors.caption && <span className="text-red-500">Please add a caption</span>}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <div className="mb-2">
              <label className="block mb-1">Upload Image</label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-info w-full"
                {...register("image", { required: "Image is required" })}
                onChange={handleFileChange}
              />
              {errors.image && <span className="text-red-500">{errors.image.message}</span>}
            </div>
            <div className="mb-2 flex items-center">
              <label className="mr-2">Visible to All?</label>
              <input type="checkbox" className="toggle toggle-info" {...register("visibleToAll")} />
            </div>
            <div className="mb-2 flex items-center">
              <label className="mr-2">Allow Comments?</label>
              <input
                type="checkbox"
                className="toggle toggle-info"
                {...register("allowComments")}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full text-center mt-4 items-center justify-center gap-2">
          {imagePreview && (
            <div className="">
              <button type="button" className="btn btn-info" onClick={showImagePreview}>
                Preview Image
              </button>
            </div>
          )}
          <button type="submit" className="btn btn-outline btn-secondary">
            Add Post
          </button>
        </div>
        {showPreview && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 ">
            <div className="max-w-md bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-end">
                <button className="text-gray-600 hover:text-gray-800" onClick={hideImagePreview}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-2">
                <img src={imagePreview} alt="Image Preview" className="w-full h-auto" />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddPost;
