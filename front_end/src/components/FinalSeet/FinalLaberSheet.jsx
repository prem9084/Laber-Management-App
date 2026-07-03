import React, { useEffect, useState } from "react";
import Layout from "../HeadSection/Layout";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import api from "../../api/axios";

const FinalLaberSheet = () => {
  const [finalData, setFinalData] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const fetchFinalData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/attendence/final-sheet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFinalData(data.data);
    } catch (error) {
      console.error("Error fetching final data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totals = finalData.reduce(
    (acc, item) => {
      acc.thandiAttendance += item.thandiAttendance || 0;
      acc.garamAttendance += item.garamAttendance || 0;
      acc.totalIncome += item.totalIncome || 0;
      acc.totalExpense += item.totalExpense || 0;
      acc.baki += item.baki || 0;
      return acc;
    },
    {
      thandiAttendance: 0,
      garamAttendance: 0,
      totalIncome: 0,
      totalExpense: 0,
      baki: 0,
    },
  );

  useEffect(() => {
    fetchFinalData();
  }, []);

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
              <div className="col-12 col-lg-12 order-2 order-lg-1">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0">
                        <i className="bi bi-cash-coin me-2 text-warning"></i>
                        फाइनल रिकॉर्ड्स
                      </h5>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          window.open("/thekedar/laber-sheet", "_blank")
                        }
                      >
                        <i className="bi bi-printer me-1"></i>
                        Print
                      </button>
                      {/* <span className="badge bg-dark fs-6">
                        Total: ₹{totalAmount.toLocaleString("en-IN")}
                      </span> */}
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
                              <th>मज़दूर का नाम</th>
                              <th>साइट का नाम</th>
                              <th>ठंडी की हाजिरी</th>
                              <th>गरम की हाजिरी</th>
                              <th>कुल बने</th>
                              <th>खरचा</th>
                              <th>बाकी</th>
                            </tr>
                          </thead>

                          <tbody>
                            {finalData.length > 0 ? (
                              finalData.map((e, index) => (
                                <tr key={index}>
                                  <td>
                                    {e.laberName} S/O {e.fatherName}
                                  </td>

                                  <td>{e.siteName}</td>

                                  <td>
                                    {e.thandiAttendance} × ₹{e.thandiRate} = ₹
                                    {e.thandiAmount}
                                  </td>

                                  <td>
                                    {e.garamAttendance} × ₹{e.garamRate} = ₹
                                    {e.garamAmount}
                                  </td>

                                  <td>₹ {e.totalIncome}</td>

                                  <td className="fw-bold text-danger">
                                    ₹ {e.totalExpense}
                                  </td>

                                  <td className="fw-bold text-success">
                                    ₹ {e.baki}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7" className="text-center py-4">
                                  कोई डेटा उपलब्ध नहीं है।
                                </td>
                              </tr>
                            )}
                          </tbody>

                          {finalData.length > 0 && (
                            <tfoot className="table-dark">
                              <tr>
                                <th colSpan="2" className="text-end">
                                  कुल
                                </th>

                                <th>{totals.thandiAttendance} हाजिरी</th>

                                <th>{totals.garamAttendance} हाजिरी</th>

                                <th>₹ {totals.totalIncome}</th>

                                <th className="fw-bold text-danger">
                                  ₹ {totals.totalExpense}
                                </th>

                                <th className="text-warning">
                                  ₹ {totals.baki}
                                </th>
                              </tr>
                            </tfoot>
                          )}
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT: ATTENDANCE FORM ================= */}
              {/* <div className="col-12 col-lg-4 order-1 order-lg-2">
                <div className="card border-0 shadow-lg overflow-hidden attendance-card">
                  <div className="card-header border-0 py-4 attendance-header">
                    <h5 className="fw-bold mb-1 text-white">
                      <i className="bi bi-calendar2-check me-2 text-warning"></i>
                      Mark Attendance
                    </h5>
                    <small className="text-white-50">
                      Fill the details below
                    </small>
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
                        className="btn btn-warning fw-bold w-100 py-2 submit-btn"
                      >
                        <i className="bi bi-check-circle-fill me-2"></i>Submit
                        Attendance
                      </button>
                    </form>
                  </div>
                </div>
              </div> */}

              {/* <style>{`
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
              `}</style> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FinalLaberSheet;
