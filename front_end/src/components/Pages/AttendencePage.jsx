import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Layout from "../HeadSection/Layout";
import { toast } from "react-toastify";
import api from "../../api/axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function AttendancePage() {
  const token = localStorage.getItem("token");
  const [type, setType] = useState("");
  const [site, setSite] = useState([]);
  const [users, setUsers] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [laberId, setLaberId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [rate, setRate] = useState("");
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const tableRef = useRef(null);
  const dtRef = useRef(null);
  const navigate = useNavigate();

  const submitAttendance = async (e) => {
    e.preventDefault();

    try {
      setBtnLoading(true);
      const { data } = await api.post(
        "/api/attendence/insert_intendence",
        { siteId, laberId, date, type, rate, status: "present" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setSiteId("");
        setLaberId("");
        setRate("");
        setType("");
        setDate(new Date().toISOString().slice(0, 10));
     
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  const getSite = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/attendence/all_site", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSite(data.sites);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  // silent = true → data refresh ho jaye but table/spinner screen se hataya na jaye
  const getAttendance = async () => {
    try {
       setLoading(true);
      const { data } = await api.get("/api/attendence/attendance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(data.attendance);
    } catch (error) {
      console.log(error);
    } finally {
       setLoading(false);
    }
  };

  // ---- Delete attendance (safe — only updates state) ----
  const deleteAttendance = async (id) => {
    try {
      const { data } = await api.delete(
        `/api/attendence/delete-attendance/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setAttendance((prev) => prev.filter((e) => e._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSite();
    getUser();
    getAttendance();
  }, []);

  // ---- Same safe DataTable logic as ExpensePage/UsersPage/SitePage ----
    useEffect(() => {
    if (attendance.length > 0) {
      const table = $("#attendanceTable");
  
      if ($.fn.DataTable.isDataTable("#attendanceTable")) {
        table.DataTable().destroy();
      }
  
      table.DataTable();
    }
  }, [attendance]); // 👈 same fix as ExpensePage / UsersPage / SitePage

  return (
    <Layout>
      <div
        className="d-flex flex-column flex-md-row"
        style={{ minHeight: "100vh", marginTop: "9rem" }}
      >
        <Sidebar />

        <div className="flex-grow-1 bg-light">
          <div className="container-fluid px-3 px-md-4 py-4">
            <div className="row g-4">
              {/* ================= LEFT: DATATABLE ================= */}
              <div className="col-12 col-lg-8 order-2 order-lg-1">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0">
                        <i className="bi bi-cash-coin me-2 text-warning"></i>
                        Attendence Records
                      </h5>
                    </div>

                    <div className="table-responsive">
                      {loading ? (
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: "300px" }}
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
                          ref={tableRef}
                          data-datatable="true"
                          className="table table-striped table-bordered align-middle w-100"
                        >
                          <thead className="table-dark">
                            <tr>
                              <th>Site Name</th>
                              <th>User</th>
                              <th>Type</th>
                              <th>Dihadi</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {attendance.length > 0 ? (
                              attendance.map((a, i) => (
                                <tr key={i}>
                                  <td>{a.siteId?.siteName}</td>
                                  <td>
                                    {a.laberId?.name} S/O {a.laberId?.fatherName}
                                  </td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        a.type === "1" ? "bg-danger" : "bg-info"
                                      } text-white d-inline-flex align-items-center justify-content-center px-2 py-1`}
                                    >
                                      {a.type === "1" ? "गरम" : "ठंडी"}
                                    </span>
                                  </td>
                                  <td>₹ {Number(a.rate).toLocaleString("en-IN")}</td>
                                  <td>
                                    {new Date(a.date).toLocaleString("en-IN", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                      hour12: true,
                                    })}
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => deleteAttendance(a._id)}
                                      className="btn btn-sm btn-outline-danger"
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

              {/* ================= RIGHT: ATTENDANCE FORM ================= */}
              <div className="col-12 col-lg-4 order-1 order-lg-2">
                <div className="card border-0 shadow-lg overflow-hidden attendance-card">
                  <div className="card-header border-0 py-4 attendance-header">
                    <h5 className="fw-bold mb-1 text-white">
                      <i className="bi bi-calendar2-check me-2 text-warning"></i>
                      Mark Attendance
                    </h5>
                    <small className="text-white-50">Fill the details below</small>
                  </div>

                  <div className="card-body p-4">
                    <form onSubmit={submitAttendance}>
                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small text-uppercase mb-2">
                          <i className="bi bi-geo-alt-fill text-warning me-1"></i>
                          Site Name
                        </label>
                        <div className="input-group input-group-modern">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-building"></i>
                          </span>
                          <select
                            className="form-select"
                            name="site"
                            value={siteId}
                            onChange={(e) => setSiteId(e.target.value)}
                          >
                            <option value="">-- Select Site --</option>
                            {site.map((s) => (
                              <option key={s._id} value={s._id}>
                                {s.siteName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small text-uppercase mb-2">
                          <i className="bi bi-person-fill text-warning me-1"></i>
                          Select User
                        </label>
                        <div className="input-group input-group-modern">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-person"></i>
                          </span>
                          <select
                            className="form-select"
                            name="user"
                            value={laberId}
                            onChange={(e) => setLaberId(e.target.value)}
                          >
                            <option value="">-- Select User --</option>
                            {users.map((u) => (
                              <option key={u._id} value={u._id}>
                                {u.name} S/O {u.fatherName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small text-uppercase mb-2">
                          <i className="bi bi-cash-coin text-warning me-1"></i>
                          Amount
                        </label>
                        <div className="input-group input-group-modern">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-currency-rupee"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Amount"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small text-uppercase mb-2">
                          <i className="bi bi-calendar3 text-warning me-1"></i>
                          Select Date
                        </label>
                        <div className="input-group input-group-modern">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-calendar-event"></i>
                          </span>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Enter Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-2">
                        <label className="form-label fw-semibold text-secondary small text-uppercase mb-2">
                          <i className="bi bi-thermometer-half text-warning me-1"></i>
                          Type
                        </label>
                        <div className="btn-group w-100" role="group">
                          <div className="d-flex gap-3 w-100">
                            <input
                              type="radio"
                              className="btn-check"
                              name="type"
                              id="type-0"
                              value="0"
                              checked={type === "0"}
                              onChange={(e) => setType(e.target.value)}
                              autoComplete="off"
                            />
                            <label
                              htmlFor="type-0"
                              className="btn btn-outline-info fw-semibold rounded-3 flex-fill py-2 type-btn"
                            >
                              <i className="bi bi-snow me-1"></i>
                              Thandi
                            </label>

                            <input
                              type="radio"
                              className="btn-check"
                              name="type"
                              id="type-1"
                              value="1"
                              checked={type === "1"}
                              onChange={(e) => setType(e.target.value)}
                              autoComplete="off"
                            />
                            <label
                              htmlFor="type-1"
                              className="btn btn-outline-danger fw-semibold rounded-3 flex-fill py-2 type-btn"
                            >
                              <i className="bi bi-sun-fill me-1"></i>
                              Garam
                            </label>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4 opacity-25" />

                      <button
                        type="submit"
                        className="btn btn-warning fw-bold w-100 py-2"
                        disabled={btnLoading}
                      >
                        {btnLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Loading...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-circle-fill me-2"></i>
                            Add Attendance
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <style>{`
                .attendance-card { border-radius: 16px; }
                .attendance-header {
                  background: linear-gradient(135deg, #1f2333 0%, #2c3148 60%, #1a1d29 100%);
                }
                .input-group-modern { flex-wrap: nowrap; }
                .input-group-modern .input-group-text {
                  border: 1.5px solid #e7e9ee;
                  border-right: none;
                  color: #8a8f9c;
                  width: 42px;
                  min-width: 42px;
                  flex: 0 0 42px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 0;
                }
                .input-group-modern .form-select,
                .input-group-modern .form-control {
                  border: 1.5px solid #e7e9ee;
                  border-left: none;
                  padding: 0.65rem 0.9rem;
                  font-size: 0.95rem;
                  flex: 1 1 auto;
                  width: 1%;
                  min-width: 0;
                }
                .input-group-modern .form-select:focus,
                .input-group-modern .form-control:focus {
                  box-shadow: none;
                  border-color: #ffc107;
                }
                .input-group-modern:focus-within .input-group-text {
                  border-color: #ffc107;
                }
                .type-btn { transition: all 0.15s ease; }
                .submit-btn {
                  border-radius: 12px;
                  box-shadow: 0 6px 16px rgba(255, 193, 7, 0.35);
                  transition: transform 0.15s ease, box-shadow 0.15s ease;
                }
                .submit-btn:hover {
                  transform: translateY(-1px);
                  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.45);
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AttendancePage;