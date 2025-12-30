import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setFullName(res.data.fullName);
        setEmail(res.data.email);
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await api.put("/user/profile", { fullName, email });
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.error || "Profile update failed");
    }
  };

  
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await api.put("/user/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Password change failed");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>My Profile</h2>

      {error && <p className="error">{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

   
      <form onSubmit={handleProfileUpdate}>
        <h3>Update Profile</h3>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Save Changes</button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      {/* Change Password */}
      <form onSubmit={handlePasswordChange}>
        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default Profile;
