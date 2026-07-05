import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Layout from "../HeadSection/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function SitePage() {
  const [form, setForm] = useState({ site: "" });
  const [sitename, setSitename] = useState("");
  const [allsites, setAllsites] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();
  const handleSite = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);
      const { data } = await api.post(
        "/api/attendence/add_site",
        { siteName: sitename },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setBtnLoading(false);
    }
  };

  // get All sites

  const AllSites = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/attendence/all_site", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllsites(data.sites);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteSites = async (id) => {
    try {
      setLoading(true);
      const { data } = await api.delete(`/api/attendence/delete-site/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/thekedar/site_name");
        setAllsites((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllSites();
  }, []);
  useEffect(() => {
    if (allsites.length > 0) {
      const table = $("#attendanceTable");

      if ($.fn.DataTable.isDataTable("#attendanceTable")) {
        table.DataTable().destroy();
      }

      table.DataTable();
    }
  }, [allsites]);
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
                    <h5 className="fw-bold mb-4">
                      <i className="bi bi-building me-2 text-warning"></i>
                      All Sites
                    </h5>

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
                              <th>Site Name</th>
                              <th>Date Added</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {allsites.length > 0 ? (
                              allsites.map((s, i) => (
                                <tr key={i}>
                                  <td>{s.siteName}</td>
                                  <td>
                                    {new Date(s.createdAt).toLocaleDateString()}
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => deleteSites(s._id)}
                                      className="btn btn-sm btn-outline-danger"
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

              {/* ================= RIGHT: ADD SITE FORM ================= */}
              <div className="col-12 col-lg-4 order-1 order-lg-2">
                <div className="card border-0 shadow-sm overflow-hidden">
                  <div className="card-header bg-dark text-white border-0 py-3">
                    <h5 className="fw-bold mb-0">
                      <i className="bi bi-plus-circle-fill me-2 text-warning"></i>
                      Add Site
                    </h5>
                    <small className="text-white-50">
                      Enter new site details
                    </small>
                  </div>

                  <div className="card-body p-4">
                    <form onSubmit={handleSite}>
                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary">
                          <i className="bi bi-geo-alt-fill text-warning me-1"></i>
                          Site Name
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-building"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="siteName"
                            value={sitename}
                            onChange={(e) => setSitename(e.target.value)}
                            placeholder="Enter site name"
                            required
                          />
                        </div>
                      </div>

                      <hr className="my-4" />

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
                            Add Site
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SitePage;
