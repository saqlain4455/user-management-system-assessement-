import { useEffect, useState } from "react";
import {
  fetchUsers,
  activateUser,
  deactivateUser,
} from "../services/adminApi";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetchUsers(pageNum);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const handleActivate = async (id) => {
    if (!window.confirm("Activate this user?")) return;
    await activateUser(id);
    loadUsers(page);
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm("Deactivate this user?")) return;
    await deactivateUser(id);
    loadUsers(page);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                {user.status === "active" ? (
                  <button onClick={() => handleDeactivate(user._id)}>
                    Deactivate
                  </button>
                ) : (
                  <button onClick={() => handleActivate(user._id)}>
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
