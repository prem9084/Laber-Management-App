import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Layout from "../HeadSection/Layout";
import { toast } from "react-toastify";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
  const [errors, setErrors] = useState({});
const navigate = useNavigate();
  // ---- Fetch all users ----
  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/auth/all-user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ---- Delete user ----
  const deleteUser = async (userId) => {
    try {
      const { data } = await api.delete(`/api/auth/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUsers(users.filter((user) => user._id !== userId));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ---- Form handlers ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.fatherName.trim())
      newErrors.fatherName = "Father's name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      fatherName: "",
      password: "",
      address: "",
      mobile: "",
    });
    setErrors({});
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setBtnLoading(true);
      const { data } = await api.post("/api/auth/register", {
        name,
        fatherName,
        mobile,
        email,
        password,
        address,
      });
      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
        setBtnLoading(false);
      }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
  if (users.length > 0) {
    const table = $("#attendanceTable");

    if ($.fn.DataTable.isDataTable("#attendanceTable")) {
      table.DataTable().destroy();
    }

    table.DataTable();
  }
}, [users]);

  return (
    <Layout>
      <div
        className="d-flex flex-column flex-md-row"
        style={{ minHeight: "100vh", marginTop: "9rem" }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="flex-grow-1 bg-light">
          <div className="container-fluid px-3 px-md-4 py-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">
                    <i className="bi bi-people me-2 text-warning"></i>
                    All Users
                  </h5>
                  <button
                    type="button"
                    className="btn btn-warning fw-semibold"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="bi bi-plus-lg me-1"></i>नया मज़दूर जोड़ें
                  </button>
                </div>

                <div className="table-responsive">
                  {loading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: "300px" }}
                    >
                      <div
                        className="spinner-border text-primary"
                        style={{ width: "4rem", height: "4rem" }}
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <table
                      id="attendanceTable"
                      data-datatable="true"
                      className="table table-striped table-bordered align-middle w-100"
                    >
                      <thead className="table-dark">
                        <tr>
                          <th>Name</th>
                          <th>Mobile</th>
                          <th>Role</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.length > 0 ? (
                          users.map((u, i) => (
                            <tr key={i}>
                              <td>
                                {u.name} S/O {u.fatherName}
                              </td>
                              <td>{u.mobile}</td>
                              <td>{u.role === "1" ? "Thekedar" : "Laber"}</td>
                              <td>{u.address}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary me-1"
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-warning me-1"
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => deleteUser(u._id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <></>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Add User Modal ---- */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div
              className="modal-content border-0 shadow-lg"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                maxHeight: "90vh",
              }}
            >
              {/* Header */}
              <div
                className="modal-header border-0 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  padding: "1.5rem 1.75rem",
                }}
              >
                <div>
                  <h5 className="modal-title fw-bold mb-1">
                    <i className="bi bi-person-plus-fill me-2"></i>
                    नया मज़दूर जोड़ें
                  </h5>
                  <small className="opacity-75">
                    Fill in the details below to create an account
                  </small>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                ></button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column"
                style={{ minHeight: 0 }}
              >
                <div
                  className="modal-body p-4"
                  style={{ overflowY: "auto", maxHeight: "60vh" }}
                >
                  {/* Name */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="userName"
                      name="name"
                      placeholder="मज़दूर का पूरा नाम"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="userName">
                      <i className="bi bi-person me-2 text-warning"></i>
                      मज़दूर का पूरा नाम
                    </label>
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  {/* Father's Name */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.fatherName ? "is-invalid" : ""
                      }`}
                      id="fatherName"
                      name="fatherName"
                      placeholder="पिता का नाम"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                    />
                    <label htmlFor="fatherName">
                      <i className="bi bi-people me-2 text-warning"></i>
                      पिता का नाम
                    </label>
                    {errors.fatherName && (
                      <div className="invalid-feedback">
                        {errors.fatherName}
                      </div>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.mobile ? "is-invalid" : ""
                      }`}
                      id="mobile"
                      name="mobile"
                      placeholder="मज़दूर का मोबाइल नंबर"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    <label htmlFor="mobile">
                      <i className="bi bi-telephone me-2 text-warning"></i>
                      मज़दूर का मोबाइल नंबर
                    </label>
                    {errors.mobile && (
                      <div className="invalid-feedback">{errors.mobile}</div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.address ? "is-invalid" : ""
                      }`}
                      id="address"
                      name="address"
                      placeholder="गाँव का नाम"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="address">
                      <i className="bi bi-geo-alt me-2 text-warning"></i>
                      गाँव का नाम
                    </label>
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-1">
                    <label
                      htmlFor="userPassword"
                      className="form-label fw-semibold small"
                    >
                      <i className="bi bi-lock me-1 text-warning"></i>
                      पासवर्ड
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        id="userPassword"
                        name="password"
                        placeholder="पासवर्ड डालें"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="input-group-text"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`bi ${
                            showPassword ? "bi-eye-slash" : "bi-eye"
                          }`}
                        />
                      </button>
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                  <small className="text-muted">न्यूनतम 6 अक्षर</small>
                </div>

                {/* Footer stays outside the scroll area, always visible */}
                <div className="modal-footer border-0 px-4 pb-4 pt-3">
                  <button
                    type="button"
                    className="btn btn-light fw-semibold px-4"
                    onClick={closeModal}
                    disabled={btnLoading}
                  >
                    <i className="bi bi-x-lg me-1"></i>
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning fw-semibold px-4"
                    disabled={btnLoading}
                  >
                    {btnLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        मज़दूर जोड़ा जा रहा है...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-1"></i>
                        मज़दूर जोड़ें
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
              )}
    </Layout>
  );
}

export default UsersPage;
