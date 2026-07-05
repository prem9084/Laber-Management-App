import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* ================= NAV ITEMS — yahan se add/remove karo ================= */

/* ================= STYLES ================= */
const S = {
  sidebar: {
    width: 220,
    minHeight: "100%",
    background: "#1a1f2e",
    display: "flex",
    flexDirection: "column",
  },
  brand: {
    padding: "16px 16px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  brandText: {
    color: "#FFC107",
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#FFC107",
    color: "#1a1f2e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  navWrap: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 8px 0",
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.25)",
    padding: "10px 12px 4px",
    margin: 0,
  },
  navLink: (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 12px",
    borderRadius: 8,
    marginBottom: 2,
    textDecoration: "none",
    fontSize: 13.5,
    fontWeight: 500,
    background: isActive ? "rgba(255,193,7,0.15)" : "transparent",
    color: isActive ? "#FFC107" : "rgba(255,255,255,0.55)",
    transition: "background 0.15s, color 0.15s",
    cursor: "pointer",
    border: "none",
    width: "100%",
    textAlign: "left",
  }),
  badge: {
    marginLeft: "auto",
    background: "#FFC107",
    color: "#1a1f2e",
    fontSize: 10,
    fontWeight: 700,
    padding: "1px 6px",
    borderRadius: 20,
    lineHeight: 1.6,
  },
  footer: {
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "12px 8px",
  },
  signout: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    fontWeight: 500,
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
};

/* ================= SIDEBAR CONTENT ================= */
const SidebarContent = ({ onNavClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const initials = user?.name
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  // ✅ Yahan rakho
 const navItems = [
  ...(user?.role === "1"
    ? [
        { icon: "bi-house-fill", label: "होम", path: "/thekedar/dashboard" },
        { icon: "bi-people-fill", label: "सभी मज़दूर", path: "/thekedar/users" },
        {
          icon: "bi-person-badge-fill",
          label: "हाज़िरी लगाएँ",
          path: "/thekedar/attendence",
        },
        { icon: "bi-cash-stack", label: "मज़दूर का खर्च जोड़ें", path: "/thekedar/expence" },
        { icon: "bi-building", label: "साइट जोड़ें", path: "/thekedar/site_name" },
        { icon: "bi-file-earmark-text", label: "हिसाब की लिस्ट", path: "/thekedar/final_sheet" },
        { icon: "bi-person-fill", label: "प्रोफ़ाइल", path: "/thekedar/profile" },
      ]
    : []),

  ...(user?.role === "0"
    ? [
        { icon: "bi-house-fill", label: "होम", path: "/laber/dashboard" },
        { icon: "bi-calendar-check", label: "मेरी हाज़िरी", path: "/laber/myattendence" },
        { icon: "bi-cash-coin", label: "मेरे खर्च", path: "/laber/myexpence" },
        { icon: "bi-person-fill", label: "प्रोफ़ाइल", path: "/laber/profile" },
      ]
    : []),
];

  const handleNav = (path) => {
    navigate(path);
    if (onNavClick) onNavClick();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div style={S.sidebar}>
      {/* Brand */}
      <div style={S.brand}>
        <div style={S.brandText}>
          <i className="bi bi-grid-fill"></i>
          payonline
        </div>
        <div style={S.profile}>
          <div style={S.avatar}>{initials}</div>
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 13,
                lineHeight: 1.2,
              }}
            >
              {user.name}
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
              {user.email}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={S.navWrap}>
        <p style={S.sectionLabel}>Menu</p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                to={item.path}
                style={S.navLink(isActive)}
                
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }
                }}
              >
                <i
                  className={`bi ${item.icon}`}
                  style={{ fontSize: 16, width: 18 }}
                ></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div style={S.footer}>
        <button
          style={S.signout}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "#ff6b6b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
          }}
          onClick={() => {
            logout();
          }}
        >
          <i className="bi bi-box-arrow-left" style={{ fontSize: 15 }}></i>
          LOG OUT
        </button>
      </div>
    </div>
  );
};

/* ================= MAIN EXPORT — Desktop + Mobile dono handle karta hai ================= */
const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ---- MOBILE TOP BAR ---- */}
      <div
        className="d-flex d-md-none align-items-center justify-content-between px-3 py-2"
        style={{
          background: "#1a1f2e",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <span style={{ color: "#FFC107", fontWeight: 700, fontSize: 16 }}>
          <i className="bi bi-grid-fill" style={{ marginRight: 8 }}></i>
          payonline
        </span>
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            background: "none",
            border: "1px solid rgba(255,193,7,0.4)",
            borderRadius: 6,
            padding: "4px 10px",
            color: "#FFC107",
            cursor: "pointer",
          }}
        >
          <i className="bi bi-list" style={{ fontSize: 20 }}></i>
        </button>
      </div>

      {/* ---- MOBILE OVERLAY ---- */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 200,
          }}
        />
      )}

      {/* ---- MOBILE DRAWER ---- */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: mobileOpen ? 0 : "-240px",
          width: 220,
          height: "100%",
          zIndex: 201,
          transition: "left 0.25s ease",
        }}
      >
        <SidebarContent onNavClick={() => setMobileOpen(false)} />
      </div>

      {/* ---- DESKTOP SIDEBAR ---- */}
      <div
        className="d-none d-md-flex"
        style={{
          width: 220,
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
