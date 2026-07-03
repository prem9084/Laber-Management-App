import React, { useEffect, useRef } from "react";
import Layout from "../HeadSection/Layout";
import Chart from "chart.js/auto";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import api from "../../api/axios";

/* ================= CHART CONFIG ================= */
// const chartConfigs = {
//   bar: {
//     type: "bar",
//     data: {
//       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
//       datasets: [
//         { label: "Sales",   data: [65, 59, 80, 70, 85, 75, 90, 70], backgroundColor: "#FFC107" },
//         { label: "Revenue", data: [45, 55, 65, 60, 70, 80, 75, 65], backgroundColor: "#003D5B" },
//       ],
//     },
//     options: { responsive: true, maintainAspectRatio: true },
//   },
//   doughnut: {
//     type: "doughnut",
//     data: {
//       datasets: [{ data: [45, 55], backgroundColor: ["#FFC107", "#E9ECEF"] }],
//     },
//     options: { responsive: true, maintainAspectRatio: true },
//   },
//   area: {
//     type: "line",
//     data: {
//       labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
//       datasets: [
//         { label: "Growth", data: [30, 50, 45, 70, 65, 85, 75, 90], borderColor: "#FFC107", fill: true },
//       ],
//     },
//     options: { responsive: true, maintainAspectRatio: true },
//   },
// };

/* ================= STATS ================= */
const Stats = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const id = user?.id;
  const [attendance, setAttendance] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [totalAttendance, setTotalAttendance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [todayExpense, setTodayExpense] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);
  const [finalData, setFinalData] = useState([]);
  const [todayTotalExpense, setTodayTotalExpense] = useState(0);
  const [totals, setTotals] = useState({
    thandiAttendance: 0,
    garamAttendance: 0,
    totalIncome: 0,
    totalExpense: 0,
    baki: 0,
  });
  const getAllMyAttendence = async () => {
    try {
      const { data } = await api.get(`/api/laber/my-attendence/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendance(data.attendance);
      setTotalAttendance(data.totalAttendance);
    } catch (error) {
      console.log("Error fetching attendance:", error);
    }
  };
  const getAllMyExpences = async () => {
    try {
      const { data } = await api.get(`/api/laber/my-expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(data.expenses);
      setTotalExpense(data.totalExpense);
      setTodayExpense(data.todayExpense);
    } catch (error) {
      console.log("Error fetching expenses:", error);
    }
  };

  // for Admin

  const getUser = async () => {
    try {
      const { data } = await api.get("/api/auth/all-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalUsers(data.totalUsers);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFinalData = async () => {
    try {
      const { data } = await api.get(
        "/api/attendence/final-sheet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Today's Total Expense:", data.todayTotalExpense);
      setFinalData(data.data);
      setTodayTotalExpense(data.todayTotalExpense);
      setTotals(data.totals);
    } catch (error) {
      console.error("Error fetching final data:", error);
    }
  };

  // const totals = finalData.reduce(
  //   (acc, item) => {
  //     acc.thandiAttendance += item.thandiAttendance || 0;
  //     acc.garamAttendance += item.garamAttendance || 0;
  //     acc.totalIncome += item.totalIncome || 0;
  //     acc.totalExpense += item.totalExpense || 0;

  //     acc.baki += item.baki || 0;
  //     return acc;
  //   },
  //   {
  //     thandiAttendance: 0,
  //     garamAttendance: 0,
  //     totalIncome: 0,
  //     totalExpense: 0,
  //     todayExpense: 0,

  //     baki: 0,
  //   },
  // );

  useEffect(() => {
    getAllMyExpences();
    getAllMyAttendence();
    getUser();
    fetchFinalData();
  }, []);

  const data =
    role === "1"
      ? [
          {
            icon: "bi-currency-dollar",
            label: "सभी मजदूरों की सूची",
            value: totalUsers,
            color: "#0d6efd",
          },
          {
            icon: "bi-share",
            label: "कुल ठंडी हाज़िरी",
            value: totals.thandiAttendance,
            color: "#198754",
          },
          {
            icon: "bi-share",
            label: "कुल गरम हाज़िरी",
            value: totals.garamAttendance,
            color: "#198754",
          },
          {
            icon: "bi-star",
            label: "मज़दूरों के कुल बने",
            value: `₹${totals.totalIncome || 0}`,
            color: "#FFC107",
          },
          {
            icon: "bi-hand-thumbs-up",
            label: "आज का लेबर खर्च",
            value: `₹${todayTotalExpense || 0}`,
            color: "#fd7e14",
          },
          {
            icon: "bi-star",
            label: "सभी मज़दूरों का खर्चा",
            value: `₹${totals.totalExpense || 0}`,
            color: "#FFC107",
          },
          {
            icon: "bi-star",
            label: "मज़दूरों का कुल बाकी",
            value: `₹${totals.baki || 0}`,
            color: "#FFC107",
          }
          
        ]
      : [
          {
            icon: "bi-share",
            label: "My Attendence",
            value: totalAttendance || 0,
            color: "#198754",
          },
          {
            icon: "bi-hand-thumbs-up",
            label: "आज का खर्च",
            value: `₹${todayExpense || 0}`,
            color: "#fd7e14",
          },
          {
            icon: "bi-star",
            label: "कुल खर्च",
            value: `₹${totalExpense || 0}`,
            color: "#FFC107",
          },
        ];
  return (
    <div className="row g-3">
      {data.map((d, i) => (
        <div key={i} className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-3 d-flex flex-row align-items-center gap-3">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                flexShrink: 0,
                background: d.color + "18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                className={`bi ${d.icon}`}
                style={{ fontSize: 20, color: d.color }}
              ></i>
            </div>

            <div>
              <div style={{ fontSize: 12, color: "#888" }}>{d.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{d.value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ================= DASHBOARD PAGE ================= */
function AdminDashboard() {
  const chartsRef = useRef({});

  // useEffect(() => {
  //   Object.entries(chartConfigs).forEach(([key, config]) => {
  //     const canvas = document.getElementById(key + "Chart");
  //     if (canvas) {
  //       const ctx = canvas.getContext("2d");
  //       if (chartsRef.current[key]) chartsRef.current[key].destroy();
  //       chartsRef.current[key] = new Chart(ctx, JSON.parse(JSON.stringify(config)));
  //     }
  //   });
  //   return () => { Object.values(chartsRef.current).forEach((c) => c?.destroy()); };
  // }, []);

  return (
    <Layout>
      {/*
        marginTop: "9rem"  — Layout navbar ki height (apni navbar ke hisaab se adjust karo)
        Mobile pe Sidebar khud apna fixed topbar render karta hai
      */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginTop: "9rem",
        }}
        className="flex-md-row"
      >
        {/* ✅ COMMON SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT
            Mobile pe paddingTop 0 — kyunki Sidebar ka spacer div already 48px space deta hai
            Desktop pe normal padding
        */}
        <div
          style={{ flex: 1, minWidth: 0, background: "#f8f9fa" }}
          className="px-3 px-md-4 py-4"
        >
          <h4 className="fw-bold mb-4" style={{ color: "#1a1f2e" }}>
            Dashboard
          </h4>

          <Stats />

          {/* <div className="row mt-4 g-3">
            <div className="col-12 col-lg-6">
              <div className="card border-0 shadow-sm rounded-3 p-3">
                <p className="fw-semibold mb-2" style={{ fontSize: 13, color: "#888" }}>Sales vs Revenue</p>
                <canvas id="barChart"></canvas>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="card border-0 shadow-sm rounded-3 p-3">
                <p className="fw-semibold mb-2" style={{ fontSize: 13, color: "#888" }}>Distribution</p>
                <canvas id="doughnutChart"></canvas>
              </div>
            </div>
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-3 p-3">
                <p className="fw-semibold mb-2" style={{ fontSize: 13, color: "#888" }}>Weekly Growth</p>
                <canvas id="areaChart"></canvas>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
