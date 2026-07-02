import React, { useState } from 'react'
import Layout from '../HeadSection/Layout'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import api from '../../api/axios';
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const {data} = await api.post(
          "/api/auth/register",
          {
            name,
            fatherName,
            mobile,
            email,
            password,
            address
          }
        );
        if (data.success) { 
        toast.success(data.message);
        navigate("/login");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }

  return (
    <Layout>
     <div className="container-fluid p-0 bg-dark " style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>

      

        {/* RIGHT SIDE - FORM */}
        <div className="col-12 col-lg-6 m-auto bg-dark d-flex align-items-center     justify-content-center py-5 px-3">
          <div className="w-100" style={{ maxWidth: "480px",marginTop: "10rem" }}>
            <div className="bg-black  border border-secondary rounded-4 shadow-lg p-4 p-sm-5">

              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <i className="bi bi-person-plus-fill text-primary fs-4" />
                </div>
                <h4 className="text-white fw-bold mb-1">Create Account</h4>
                <p className="text-secondary small mb-0">Apna account abhi banao — bilkul free!</p>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label text-white-50 small fw-semibold">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-secondary bg-opacity-25 border-secondary text-primary" style={{ width: "42px" }}>
                      <i className="bi bi-person-fill" />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-secondary bg-opacity-25 border-secondary text-white"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Father's Name */}
                <div className="mb-3">
                  <label className="form-label text-white-50 small fw-semibold">Father's Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-secondary bg-opacity-25 border-secondary text-primary" style={{ width: "42px" }}>
                      <i className="bi bi-people-fill" />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-secondary bg-opacity-25 border-secondary text-white"
                      placeholder="Father Name"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Mobile + Email */}
                <div className="row g-2 mb-3">
                  <div className="col-sm-6">
                    <label className="form-label text-white-50 small fw-semibold">Mobile</label>
                    <div className="input-group">
                      <span className="input-group-text bg-secondary bg-opacity-25 border-secondary text-primary" style={{ width: "42px" }}>
                        <i className="bi bi-telephone-fill" />
                      </span>
                      <input
                        type="tel"
                        className="form-control bg-secondary bg-opacity-25 border-secondary text-white"
                        placeholder="+91 XXXXX"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label text-white-50 small fw-semibold">Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-secondary bg-opacity-25 border-secondary text-primary" style={{ width: "42px" }}>
                        <i className="bi bi-envelope-fill" />
                      </span>
                      <input
                        type="email"
                        className="form-control bg-secondary bg-opacity-25 border-secondary text-white"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label text-white-50 small fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-secondary bg-opacity-25 border-secondary text-primary" style={{ width: "42px" }}>
                      <i className="bi bi-lock-fill" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control bg-secondary bg-opacity-25 border-secondary text-white"
                      placeholder="Strong password banao"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="input-group-text bg-secondary bg-opacity-25 border-secondary text-white"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ width: "42px" }}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                  <div className="form-text text-secondary" style={{ fontSize: "11px" }}>
                    Min 8 characters, ek number aur symbol zaroor ho.
                  </div>
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label text-white-50 small fw-semibold">Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-secondary bg-opacity-25 border-secondary text-primary align-items-start pt-2" style={{ width: "42px" }}>
                      <i className="bi bi-geo-alt-fill" />
                    </span>
                    <textarea
                      className="form-control bg-secondary bg-opacity-25 border-secondary text-white"
                      rows={3}
                      placeholder="Ghar no., Street, City, State - PIN"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="form-check mb-4">
                  <input className="form-check-input border-secondary" type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                  <label className="form-check-label text-secondary small" htmlFor="terms">
                    I agree to the <a href="#" className="text-primary text-decoration-none fw-semibold">Terms & Conditions</a>
                  </label>
                </div>

                {/* Submit */}
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary fw-bold py-2 rounded-3">
                    <i className="bi bi-check2-circle me-2" />Register Now
                  </button>
                </div>

                {/* Divider */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <hr className="flex-grow-1 border-secondary" />
                  <span className="text-secondary small">Or</span>
                  <hr className="flex-grow-1 border-secondary" />
                </div>

                <p className="text-center text-secondary small mb-0">
                  You Have An Account ?{" "}
                  <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                    Login
                  </Link>
                </p>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
    </Layout>
  );
}

export default Register