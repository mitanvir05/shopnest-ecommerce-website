import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../../../redux/features/auth/authApi";
import avatarImg from "../../../assets/avatar.png";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { setUser } from "../../../redux/features/auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editProfile, { isError, error, isLoading, isSuccess }] =
    useEditProfileMutation();
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profileImage: "",
    profession: "",
    userId: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        bio: user?.bio || "",
        profileImage: user?.profileImage || "",
        profession: user?.profession || "",
        userId: user?._id || "",
      });
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: formData.username,
      bio: formData.bio,
      profileImage: formData.profileImage,
      profession: formData.profession,
      userId: formData.userId,
    };
    try {
        const response = await editProfile(updatedUser).unwrap();
        
        dispatch(setUser(response.user))
        alert("Updated Succesfully")
        localStorage.setItem("user", JSON.stringify(response.user))

    } catch (error) {
      console.error("Error updating user profile:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6 ">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <img
            className="w-32 h-32 object-cover rounded-full"
            src={formData?.profileImage || avatarImg}
            alt=""
          />
          <div className="ml-6">
            <h3 className="text-2xl font-semibold ">
              Username : {formData?.username || "N/A"}
            </h3>
            <p className="text-gray-500">User Bio : {formData?.bio || "N/A"}</p>
            <p className="text-gray-500">
              Profession : {formData?.profession || "N/A"}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto text-blue-500 hover:text-green-600"
          >
            <FaEdit size={30} />
          </button>
        </div>
      </div>
      {/* modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-900 hover:text-red-700"
            >
              <IoMdClose size={30} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData?.username}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image Url
                </label>
                <input
                  type="text"
                  name="profileImage"
                  placeholder="profile Image Url"
                  required
                  value={formData?.profileImage}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Write Your Bio
                </label>
                <textarea
                  name="bio"
                  rows="3"
                  value={formData?.bio}
                  onChange={handleChange}
                  placeholder="Add your bio"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Profession"
                  required
                  value={formData?.profession}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 w-full bg-blue-500 text-white py-2 px-5 rounded-md
                 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}  `}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>

              {isError && (
                <p className="text-red-500 text-sm mt-4">{error.message}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
