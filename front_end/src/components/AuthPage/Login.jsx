import React, { useState } from "react";
import Layout from "../HeadSection/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import api from "../../api/axios.js";
const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    try {
      setBtnLoading(true);
      const { data } = await api.post("/api/auth/login", {
        mobile,
        password,
      });
      console.log(data.user);

      if (data.success) {
        // Token Save
        localStorage.setItem("token", data.token);

        // User Save
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(data.message);

        if (data.user.role === "1") {
          navigate("/thekedar/dashboard");
        } else {
          navigate("/laber/dashboard");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setBtnLoading(false);
    }
  }

  return (
    <Layout>
      <div className="page-wrapper">
        {/* /.preloader */}
        <section
          className="signin-wrapper min-vh-100 clearfix bg-dark"
          style={{ backgroundImage: "url(images/signup.jpg)" }}
        >
          <div className="form-block min-vh-100 bg-dark">
            <form onSubmit={loginUser} style={{ marginTop: "5rem" }}>
              <input
                type="text"
                name="mobile"
                placeholder="Client code"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
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
                    Sign In
                  </>
                )}
              </button>
              <p className="sign-up-link">
                New to Payonline? <Link to="/register">Sign up</Link>
              </p>
            </form>
            <p className="copy-text">
              © Copyright 2025 by <a href="#">TemplatePath.com</a>
            </p>
          </div>
          {/* /.form-block */}
          <div
            className="background-block min-vh-100"
            style={{ backgroundImage: "url(images/signup.jpg)" }}
          ></div>
          {/* /.background-block */}
        </section>
        {/* /.signin-wrapper */}
      </div>
    </Layout>
  );
};

export default Login;
