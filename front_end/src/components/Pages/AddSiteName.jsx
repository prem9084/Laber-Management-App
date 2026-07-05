import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Layout from "../HeadSection/Layout";
import { toast } from "react-toastify";
import api from "../../api/axios";
import $ from "jquery";

function SitePage() {
  const token = localStorage.getItem("token");

  const [sitename, setSitename] = useState("");
  const [allsites, setAllsites] = useState([]);

  const [loading, setLoading] = useState(true);

  const [btnLoading, setBtnLoading] = useState(false);

  const tableRef = useRef(null);
  const dtRef = useRef(null);

  // ================= GET SITES =================

  // ================= ADD SITE =================
  const handleSite = async (e) => {
    e.preventDefault();

    if (!sitename.trim()) {
      toast.error("Site name is required");
      return;
    }

    try {
      setBtnLoading(true);
      const { data } = await api.post(
        "/api/attendence/add_site",
        { siteName: sitename },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        await getSites();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBtnLoading(false);
    }
  };

  // ================= DELETE SITE (SAFE) =================
  const deleteSites = async (id) => {
    try {
      const { data } = await api.delete(`/api/attendence/delete-site/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);

        if ($.fn.DataTable.isDataTable("#attendanceTable")) {
          $("#attendanceTable").DataTable().destroy();
        }
        setAllsites((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSites(true);
    const interval = setInterval(() => {
      getSites(false);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getSites = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);

      const { data } = await api.get("/api/attendence/all_site", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
       setAllsites(data.sites);
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

 useEffect(() => {
  if (allsites.length > 0) {
    const table = $("#attendanceTable");

    if ($.fn.DataTable.isDataTable("#attendanceTable")) {
      table.DataTable().destroy();
    }

    table.DataTable();
  }
}, [allsites]); // 👈 same fix as AttendancePage / UsersPage / SitePage

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
              {/* ================= TABLE ================= */}
              <div className="col-12 col-lg-8 order-2 order-lg-1">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-4">
                      <i className="bi bi-building me-2 text-warning"></i>
                      All Sites
                    </h5>

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
                              <th>Date Added</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {allsites.length > 0 ? (
                              allsites.map((s) => (
                                <tr key={s._id}>
                                  <td>{s.siteName}</td>
                                  <td>
                                    {new Date(s.createdAt).toLocaleDateString()}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => deleteSites(s._id)}
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3" className="text-center py-4">
                                  No Data Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= FORM — advanced design ================= */}
              <div className="col-12 col-lg-4 order-1 order-lg-2">
                <div className="card border-0 shadow-lg overflow-hidden site-card">
                  <div className="card-header border-0 py-4 site-header">
                    <h5 className="fw-bold mb-1 text-white">
                      <i className="bi bi-building-add me-2 text-warning"></i>
                      Add New Site
                    </h5>
                    <small className="text-white-50">
                      Register a new project site
                    </small>
                  </div>

                  <div className="card-body p-4">
                    <form onSubmit={handleSite}>
                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small text-uppercase mb-2">
                          <i className="bi bi-signpost-2-fill text-warning me-1"></i>
                          Site Name
                        </label>
                        <div className="input-group input-group-modern mt-5">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-building"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control site-input"
                            placeholder="Site ka name"
                            value={sitename}
                            onChange={(e) => setSitename(e.target.value)}
                          />
                        </div>
                        <div className="form-text" style={{ fontSize: "12px" }}>
                          Give the site a clear, recognizable name.
                        </div>
                      </div>

                      <hr className="my-4 opacity-25" />

                      <button
                        type="submit"
                        className="btn btn-warning fw-bold w-100 py-2 submit-btn"
                        disabled={btnLoading}
                      >
                        {btnLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Adding...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-circle-fill me-2"></i>
                            Add Site
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <style>{`
  .site-card {
    border-radius: 16px;
  }

  .site-header {
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

  .input-group-modern .form-control {
    border: 1.5px solid #e7e9ee;
    border-left: none;
    padding: 0.65rem 0.9rem;
    font-size: 0.95rem;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
  }

  .input-group-modern .form-control:focus {
    box-shadow: none;
    border-color: #ffc107;
  }

  .input-group-modern:focus-within .input-group-text {
    border-color: #ffc107;
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

  /* ---- FIX: input was invisible ---- */
  .site-card .input-group-modern .input-group-text {
    background-color: #f8f9fa !important;
    border: 1.5px solid #e7e9ee !important;
    color: #8a8f9c !important;
  }

  .site-card .input-group-modern .site-input {
    background-color: #ffffff !important;
    border: 1.5px solid #e7e9ee !important;
    color: #1a1d29 !important;
    padding: 0.65rem 0.9rem !important;
    font-size: 0.95rem !important;
    min-height: 44px !important;
    opacity: 1 !important;
    display: block !important;
  }

  .site-card .input-group-modern .site-input:focus {
    background-color: #ffffff !important;
    border-color: #ffc107 !important;
    color: #1a1d29 !important;
    box-shadow: none !important;
  }

  .site-card .input-group-modern .site-input::placeholder {
    color: #9aa0ac !important;
    opacity: 1 !important;
  }
`}</style>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SitePage;
