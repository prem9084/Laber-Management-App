import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Layout from "../HeadSection/Layout";

/* ================= LOCAL STORAGE HELPERS ================= */
const STORAGE_KEY = "user";

const defaultProfile = {
  name: "",
  email: "",
  mobile: "",
  password: "",
  address: "",
  role: "Labour",
};

function loadProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultProfile, ...JSON.parse(saved) };
  } catch (e) {
    console.error("Error reading profile from localStorage", e);
  }
  return defaultProfile;
}

function saveProfile(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving profile to localStorage", e);
  }
}

/* ================= ROLE OPTIONS ================= */
const ROLE_OPTIONS = ["Labour", "Mason", "Helper", "Electrician", "Plumber", "Painter", "Carpenter", "Supervisor"];

/* ================= COVER + AVATAR ================= */
const CoverSection = ({ profile, editing, setEditing }) => {
  const initials = profile.name
    ? profile.name
        .trim()
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "NA";

  return (
    <div className="position-relative mb-5">
      {/* Cover */}
      <div className="rounded w-100 bg-primary" style={{ height: "180px" }}></div>

      {/* Avatar + Name Row */}
      <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-end gap-3 px-3 px-md-4 mt-n5">
        {/* Avatar */}
        <div className="bg-warning text-dark rounded-circle border border-4 border-white shadow d-flex align-items-center justify-content-center fw-bold fs-3 flex-shrink-0" style={{ width: "110px", height: "110px" }}>
          {initials}
        </div>

        {/* Name + Role */}
        <div className="text-center text-sm-start pb-1 flex-grow-1 mt-4">
          <h3 className="fw-bold mb-0">{profile.name || "Your Name"}</h3>
          <p className="text-muted mb-0">{profile.role =='1' ? 'Admin' : 'User'}</p>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2 pb-1 flex-shrink-0">
          <button
            type="button"
            className="btn btn-warning fw-semibold"
            onClick={() => setEditing(!editing)}
          >
            <i className={`bi ${editing ? "bi-x-lg" : "bi-pencil"} me-1`}></i>
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= PROFILE FORM (EDIT MODE) ================= */
const ProfileForm = ({ form, handleChange, handleSubmit }) => (
  <div className="card border-0 shadow-sm mb-4">
    <div className="card-body p-4">
      <h6 className="fw-bold text-uppercase text-muted mb-3">Edit Profile</h6>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          {/* <div className="col-12 col-md-6">
            <label className="form-label">Work Role</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div> */}

          <div className="col-12">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter full address"
              rows="2"
            ></textarea>
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary px-4">
            <i className="bi bi-check-lg me-1"></i>Save Profile
          </button>
        </div>
      </form>
    </div>
  </div>
);

/* ================= ABOUT CARD (VIEW MODE) ================= */
const AboutCard = ({ profile }) => (
  <div className="card border-0 shadow-sm mb-4">
    <div className="card-body p-4">
      <h6 className="fw-bold text-uppercase text-muted mb-3">Profile Details</h6>

      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <div className="d-flex align-items-center gap-2 text-muted">
            <i className="bi bi-person text-warning"></i>
            <span>{profile.name || "Not added"}</span>
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="d-flex align-items-center gap-2 text-muted">
            <i className="bi bi-telephone text-warning"></i>
            <span>{profile.mobile || "Not added"}</span>
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="d-flex align-items-center gap-2 text-muted">
            <i className="bi bi-envelope text-warning"></i>
            <span>{profile.email || "Not added"}</span>
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="d-flex align-items-center gap-2 text-muted">
            <i className="bi bi-briefcase text-warning"></i>
            <span>{profile.role == '1' ? 'Admin' : profile.role == '0' ? 'User' : "Not added"}</span>
          </div>
        </div>

        <div className="col-12">
          <div className="d-flex align-items-start gap-2 text-muted">
            <i className="bi bi-geo-alt text-warning"></i>
            <span>{profile.address || "Not added"}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ================= PROFILE COMPLETION ================= */
const ProfileCompletion = ({ profile }) => {
  const fields = ["name", "mobile", "email", "address", "role"];
  const filled = fields.filter((f) => profile[f] && profile[f].toString().trim() !== "").length;
  const percent = Math.round((filled / fields.length) * 100);

  return (
    <div className="card border-0 shadow-sm mb-4 bg-dark text-white">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold">Profile Completion</span>
          <span className="fw-bold text-warning">{percent}%</span>
        </div>
        <div className="progress mb-3">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${percent}%` }}
            aria-valuenow={percent}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
          {fields.map((f) => {
            const done = profile[f] && profile[f].toString().trim() !== "";
            return (
              <li key={f} className="d-flex align-items-center gap-2 small">
                <i className={`bi ${done ? "bi-check-circle-fill text-warning" : "bi-circle text-secondary"}`}></i>
                <span className={done ? "text-white" : "text-secondary"}>
                  {f.charAt(0).toUpperCase() + f.slice(1)} {done ? "added" : "missing"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */
function ProfilePage() {
  const [profile, setProfile] = useState(defaultProfile);
  const [form, setForm] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadProfile();
    setProfile(loaded);
    setForm(loaded);
  }, []);

  // If no profile saved yet, open edit mode automatically
  useEffect(() => {
    if (!profile.name && !profile.mobile) {
      setEditing(true);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile(form);
    setProfile(form);
    setEditing(false);
  };

  return (
    <Layout>
      <div className="d-flex flex-column flex-md-row" style={{ minHeight: "100vh", marginTop: "9rem" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="flex-grow-1 bg-light">
          <div className="container-fluid px-3 px-md-4 py-4">
            {/* Cover + Avatar */}
            <CoverSection profile={profile} editing={editing} setEditing={setEditing} />

            {/* Body */}
            <div className="row g-4">
              {/* Left col */}
              <div className="col-12 col-lg-4">
                <ProfileCompletion profile={profile} />
              </div>

              {/* Right col */}
              <div className="col-12 col-lg-8">
                {editing ? (
                  <ProfileForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
                ) : (
                  <AboutCard profile={profile} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;