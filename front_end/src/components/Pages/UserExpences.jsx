import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Layout from "../HeadSection/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../api/axios";

/*
  NOTE: jQuery, DataTables JS/CSS aur Bootstrap globally
  public/index.html me <head> me CDN se add kiye gaye hain.
  Isliye yahan dynamic script loading ki zarurat nahi.
*/

function ExpensePage() {
  const token = localStorage.getItem("token");
  const [site, setSite] = useState([]);
  const [users, setUsers] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [laberId, setLaberId] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);
  const getSite = async () => {
    try {
      try {
        const { data } = await api.get(
          "/api/attendence/all_site",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setSite(data.sites);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      try {
        const { data } = await api.get(
          "/api/auth/all-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const laberExpenses = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/api/expenses/insert_expense",
        {
          siteId,
          laberId,
          date,
          Amount: rate,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        setSiteId("");
        setLaberId("");
        setRate("");
        setDate(new Date().toISOString().slice(0, 10));
        setDescription("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getExpense = async () => {
    try {
      const { data } = await api.get(
        "/api/expenses/get-expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setExpenses(data.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSite();
    getUser();
    getExpense();
  }, []);

  const totalAmount = expenses.reduce((sum, e) => sum + Number(e.Amount), 0);

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
            <div className="row g-4">
              {/* ================= LEFT: DATATABLE ================= */}
              <div className="col-12 col-lg-8 order-2 order-lg-1">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0">
                        <i className="bi bi-cash-coin me-2 text-warning"></i>
                        Expense Records
                      </h5>
                      <span className="badge bg-dark fs-6 text-white">
                        Total: ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="table-responsive">
                      <table
                        id="attendanceTable"
                        data-datatable="true"
                        className="table table-striped table-bordered align-middle w-100"
                      >
                        <thead className="table-dark">
                          <tr>
                            <th>Site Name</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenses.map((e, i) => (
                            <tr key={i}>
                              <td>{e.siteId?.siteName}</td>
                              <td>{e.laberId?.name}</td>
                              <td>
                                <span className="badge bg-success">
                                  ₹{Number(e.Amount).toLocaleString("en-IN")}
                                </span>
                              </td>
                              <td>{e.description}</td>
                              <td>
                                {new Date(e.date).toLocaleString("en-IN", {
                                  timeZone: "Asia/Kolkata",
                                })}
                              </td>{" "}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT: EXPENSE FORM ================= */}
              <div className="col-12 col-lg-4 order-1 order-lg-2">
                <div className="card border-0 shadow-lg overflow-hidden attendance-card">
                  <div className="card-header border-0 py-4 attendance-header">
                    <h5 className="fw-bold mb-1 text-white">
                      <i className="bi bi-calendar2-check me-2 text-warning"></i>
                      लेबर खर्च जोड़ें
                    </h5>
                    <small className="text-white-50">
                      Fill the details below
                    </small>
                  </div>

                  <div className="card-body p-4">
                    <form onSubmit={laberExpenses}>
                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small text-uppercase mb-2">
                          <i className="bi bi-geo-alt-fill text-warning me-1"></i>
                          साइट का नाम
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

                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small text-uppercase mb-2">
                          <i className="bi bi-cash-coin text-warning me-1"></i>
                          Description
                        </label>
                        <div className="input-group input-group-modern">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-currency-rupee"></i>
                          </span>
                          <textarea
                            className="form-control"
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                      <hr className="my-4 opacity-25" />

                      <button
                        type="submit"
                        className="btn btn-warning fw-bold w-100 py-2 submit-btn"
                      >
                        <i className="bi bi-check-circle-fill me-2"></i>Submit
                        Attendance
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <style>{`
                .attendance-card {
                  border-radius: 16px;
                }

                .attendance-header {
                  background: linear-gradient(135deg, #1f2333 0%, #2c3148 60%, #1a1d29 100%);
                }

                .input-group-modern {
                  flex-wrap: nowrap;
                }

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

                .type-btn {
                  transition: all 0.15s ease;
                }

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

export default ExpensePage;
