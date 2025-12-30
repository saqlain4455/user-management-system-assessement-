import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        setError("Unauthorized");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", background: "#fff", padding: "20px" }}>
      <h2>Dashboard</h2>

      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      {user.role === "admin" && (
        <div style={{ marginTop: "20px" }}>
          <h3>Admin Section</h3>
          <p>You have admin access.</p>
        </div>
      )}

      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
