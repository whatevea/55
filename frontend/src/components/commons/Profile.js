import React, { useEffect, useState } from "react";
import http from "../../config/http";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SkillsCreateTableComponent from "./SkillsCreateTableComponent";

const Profile = () => {
  const data = useSelector((state) => state?.User);
  const [loading, setLoading] = useState(false);
  const [newUserState, setNewUserState] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    fname: "",
    lname: "",
    bio: "",
    password: "",
    newPassword: "",
    skills: [],
  });

  // const [userData, setUserData] = useState(null)
  // // console.log('userData is', userData);

  useEffect(() => {
    // Function to fetch job posts from the backend
    const fetchUser = async () => {
      try {
        const response = await http.get(
          `/auth/getUserData/${data.userData._id}`
        );
        // setUserData(response.data.data); // Assuming the response contains job posts data
        const userFromBackend = response.data.data;

        setFormData({
          email: userFromBackend.email,
          fname: userFromBackend.fname,
          lname: userFromBackend.lname,
          bio: userFromBackend.bio,
          password: "", // Assuming you don't want to update the password in this way
          newPassword: "", // Assuming you don't want to update the password in this way
          user_type: userFromBackend.user_type,
          skills: userFromBackend.skills,
        });
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    };

    fetchUser(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast("Invalid Email");
        return;
      }

      // Set loading to true to show the loader animation
      setLoading(true);

      // Submit Updated data
      const response = await http.put("/auth/updateUser", {
        ...formData,
        _id: data.userData._id,
      });
      setNewUserState(response.data);
      toast("Profile Updated Successfully!");

      // Redirect to login page after a delay (you can adjust the delay as needed)
      setTimeout(() => {
        setLoading(false);
        if (newUserState?.data?.user_type === "freelancer") {
          navigate("/freelancer/jobseeker");
        } else {
          navigate("/hirer/hirer-profile");
        }
      }, 2000);

      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      // Handle registration error
      console.error("Updation failed:", error);
      // Optionally, you can show an error message to the user
    } finally {
      // Set loading back to false after registration attempt
      // setLoading(false);
    }
  };
  console.log("newUserState is", newUserState);

  const updateSkills = (skills) => {
    console.log("skills is", skills);
    setFormData({ ...formData, skills });
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center mx-auto h-screen">
          <ScaleLoader
            color="#4caf50"
            loading={loading}
            height={55}
            width={8}
            radius={2}
            margin={2}
          />
        </div>
      ) : (
        <div className="bg-white p-8 rounded-md shadow-md w-2/4 mx-auto mt-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Update Profile
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lname"
                className="block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-600"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Please add your bio data as well..."
                rows="4"
                className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="Skills"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Skills
              </label>
              <SkillsCreateTableComponent updateSkills={updateSkills} />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Old Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400"
                required
              />
            </div>
            {/* <div className="mb-4">
                <label htmlFor="user_type" className="block text-sm font-medium text-gray-600">
                    User Type
                </label>
                <select
                    id="user_type"
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="Freelancer">Freelancer</option>
                    <option value="Hirer">Hirer</option>
                </select>
            </div> */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
