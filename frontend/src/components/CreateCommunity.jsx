import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { joinCommunity } from "../../store/authSlice";
import { getTokenFromCookie } from "../../../backend/utilities/cookies";

function CreateCommunity() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const existingJoinedCommunities = useSelector((state) => state.auth.joinedCommunities);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("imageUrl", data.imageUrl); // Assuming imageUrl is set in state
    formData.append("openToAll", data.openToAll || false);
    formData.append("adminsOnly", data.adminsOnly || false);
    formData.append("createChatrooms", data.createChatrooms || false);
    formData.append("image", data.image[0]);
    formData.append("trending", data.trending);

    const token = getTokenFromCookie();

    try {
      const res = await axios.post("http://localhost:5000/community/addCommunity", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      const newCommunity = res.data.community; // Assuming the response contains the new community in this format
      const newArray = [...existingJoinedCommunities, newCommunity];
      dispatch(joinCommunity(newArray));
    } catch (error) {
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
    <div data-theme="synthwave" className="p-4 w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-2xl font-semibold mb-4">Create Community</h1>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-2">
            <div className="mb-2">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                className="input input-bordered input-info w-full"
                {...register("name", { required: "Name is required" })}
                placeholder="Name"
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="mb-2">
              <label className="block mb-1">Description</label>
              <textarea
                className="textarea textarea-info w-full h-24"
                placeholder="Description"
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && <span className="text-red-500">{errors.description.message}</span>}
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
              <label className="mr-2">Open to All?</label>
              <input 
                type="checkbox" 
                className="toggle toggle-info" 
                {...register("openToAll")}
              />
            </div>
            <div className="mb-2 flex items-center">
              <label className="mr-2">Only Admins Can Post?</label>
              <input 
                type="checkbox" 
                className="toggle toggle-info" 
                {...register("adminsOnly")}
              />
            </div>
            <div className="mb-2 flex items-center">
              <label className="mr-2">All Can Create Chatrooms?</label>
              <input 
                type="checkbox" 
                className="toggle toggle-info" 
                {...register("createChatrooms")}
              />
            </div>
            <div className="mb-2 flex items-center">
              <label className="mr-2">Add to trending section?</label>
              <input 
                type="checkbox" 
                className="toggle toggle-info" 
                {...register("trending")}
              />
            </div>
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-2">
                  <img src={imagePreview} alt="Image Preview" className="w-full h-auto" />
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full text-center mt-4 items-center justify-center gap-2">
            {imagePreview && (
              <div className="">
                <button type="button" className="btn btn-info" onClick={showImagePreview}>
                  Preview Image
                </button>
              </div>
            )}
            <button type="submit" className="btn btn-outline btn-secondary">
              Create Community
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCommunity;
