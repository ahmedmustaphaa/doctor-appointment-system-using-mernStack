import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useShareContext } from "../context/AppContext";
import axiosInstance from "../../api/axios";

function MyProfile() {
  const [editMode, setEditMode] = useState(false);
  const { userDataProfile } = useShareContext();

  const defaultImage = "https://i.pravatar.cc/150";

  const [user, setUser] = useState({});
  const [image, setImage] = useState(defaultImage);

  // تحميل البيانات عند وصولها
  useEffect(() => {
    if (userDataProfile) {
      setUser({
        name: userDataProfile.name || "",
        email: userDataProfile.email || "",
        phone: userDataProfile.phone || "",
        address: userDataProfile.address || "",
        gender: userDataProfile.gender || "",
        birthday: userDataProfile.dob || "",
      });

      if (userDataProfile.image) {
        setImage(userDataProfile.image);
      }
    }
  }, [userDataProfile]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // تحديث البيانات
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("phone", user.phone);
      formData.append("address", user.address);
      formData.append("gender", user.gender);
      formData.append("dob", user.birthday);

 
      if (image instanceof File) {
        formData.append("image", image);
      }

      const { data } = await axiosInstance.post(
        "user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        alert("Profile updated ✅");
        setEditMode(false);

        if (data.user.image) {
          setImage(data.user.image);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            My Profile
          </h2>

          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            <Pencil size={16} />
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              image instanceof File
                ? URL.createObjectURL(image)
                : image
            }
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-teal-100 shadow-md"
          />

          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-3"
            />
          )}
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Address", name: "address", type: "text" },
            { label: "Gender", name: "gender", type: "text" },
            { label: "Birthday", name: "birthday", type: "date" },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm text-gray-500">
                {field.label}
              </label>

              {editMode ? (
                <input
                  type={field.type}
                  name={field.name}
                  value={user[field.name] || ""}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              ) : (
                <p className="mt-2 text-gray-800 font-medium">
                  {user[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Save Button */}
        {editMode && (
          <button
            onClick={handleUpdate}
            className="mt-8 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition shadow-md"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default MyProfile;