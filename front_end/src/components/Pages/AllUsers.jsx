import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Layout from "../HeadSection/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../api/axios";

/*
  NOTE: jQuery, DataTables JS/CSS aur Bootstrap ab globally
  public/index.html me <head> me CDN se add kiye gaye hain.
  Isliye yahan dynamic script loading ki zarurat nahi — seedha
  window.jQuery use karenge.
*/

/* ================= DUMMY USERS DATA (replace with API / localStorage) ================= */


function UsersPage() {
  const token = localStorage.getItem("token");
 const [users, setUsers] = useState([]);
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

  const deleteUser = async (userId) => {
    try {
      const { data } = await api.delete(
        `/api/auth/delete-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setUsers(users.filter((user) => user._id !== userId));
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getUser();
  }, [])
  return (
    <Layout>
      <div className="d-flex flex-column flex-md-row" style={{ minHeight: "100vh", marginTop: "9rem" }}>
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
                  <button type="button" className="btn btn-warning fw-semibold">
                    <i className="bi bi-plus-lg me-1"></i>Add User
                  </button>
                </div>

                <div className="table-responsive">
                  <table id="attendanceTable"
                        data-datatable="true" className="table table-striped table-bordered align-middle w-100">
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
                      {users.map((u, i) => (
                        <tr key={i}>
                          <td>{u.name} S/O {u.fatherName}</td>
                          <td>{u.mobile}</td>
                          <td>{u.role == "1" ? "Thekedar" : "Laber"}</td>
                          <td>{u.address}</td>
                        
                          <td>
                            <button type="button" className="btn btn-sm btn-outline-primary me-1">
                              <i className="bi bi-eye"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-warning me-1">
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(u._id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UsersPage;