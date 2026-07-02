import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";

const PrintLaberSheet = () => {
  const [finalData, setFinalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") || "Thekedar";
  const adminName = JSON.parse(user)?.name || "Thekedar";
  const fetchFinalData = async () => {
    try {
      const { data } = await api.get(
        "/api/attendence/final-sheet",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setFinalData(data.data || []);
    } catch (error) {
      console.error("Error fetching final data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinalData();
  }, []);

  const siteName = finalData?.[0]?.siteName || "";

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

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
  const originalTitle = document.title;

  // Site name se clean filename banaya (spaces, special chars hata diye)
  const cleanSiteName = (siteName || "Site").trim().replace(/[\\/:*?"<>|]/g, "");
  const fileName = `${cleanSiteName} लेबर का हिसाब`;

  document.title = fileName;

  window.print();

  // Print dialog band hote hi title wapas original kar do
  setTimeout(() => {
    document.title = originalTitle;
  }, 500);
};

if (loading) {
  return (
    <div
      style={{
        padding: "60px",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      Loading...
    </div>
  );
}
  return (
    <div className="print-page">
      {/* Toolbar - print me hide */}
      <div className="toolbar no-print">
        <button onClick={() => window.close()} className="btn-close">
          ← Back
        </button>
        <button onClick={handlePrint} className="btn-print">
          🖨 Print / Save PDF
        </button>
      </div>

      {/* A4 Sheet */}
      <div className="sheet">
        {/* Letterhead */}
        <div className="letterhead">
          <div className="lh-side lh-left">
            <span className="lh-label">Thekedar</span>
            <span className="lh-value">{adminName}</span>
          </div>
          <div className="lh-center">
            <div className="lh-brand">Laber App</div>
            <h1>{siteName} साइट का मज़दूर हिसाब</h1>
            <span className="lh-date">Date: {today}</span>
          </div>
          <div className="lh-side lh-right">
            <span className="lh-label">Site</span>
            <span className="lh-value">{siteName}</span>
          </div>
        </div>

        {/* Table */}
        <table className="hisab-table">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>मज़दूर का नाम</th>
              <th>साइट का नाम</th>
              <th>ठंडी की हाजिरी</th>
              <th>गरम की हाजिरी</th>
              <th>कुल बने</th>
              <th>खरचा</th>
              <th>बाकी</th>
            </tr>
          </thead>
          <tbody>
            {finalData.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "#888",
                  }}
                >
                  कोई रिकॉर्ड उपलब्ध नहीं है
                </td>
              </tr>
            ) : (
              finalData.map((e, index) => (
                <tr key={index}>
                  <td className="text-left">
                    {e.laberName} S/O {e.fatherName}
                  </td>
                  <td>{e.siteName}</td>
                  <td>
                    {e.thandiAttendance} × ₹{e.thandiRate} = ₹{e.thandiAmount}
                  </td>
                  <td>
                    {e.garamAttendance} × ₹{e.garamRate} = ₹{e.garamAmount}
                  </td>
                  <td className="fw-bold text-success">₹ {e.totalIncome}</td>
                  <td className="fw-bold text-danger">₹ {e.totalExpense}</td>
                  <td className="fw-bold text-success">₹ {e.baki}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="2" style={{ textAlign: "right" }}>
                कुल
              </th>
              <th>{totals.thandiAttendance} हाजिरी</th>
              <th>{totals.garamAttendance} हाजिरी</th>
              <th className="fw-bold text-success">₹ {totals.totalIncome}</th>
              <th className="fw-bold text-danger">₹ {totals.totalExpense}</th>
              <th className="fw-bold text-success">₹ {totals.baki}</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <style>{`
        * { box-sizing: border-box; }

        .print-page {
          background: #6b7280;
          min-height: 100vh;
          padding: 24px 0;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .toolbar {
          max-width: 210mm;
          margin: 0 auto 16px auto;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 0 4px;
        }

        .btn-print, .btn-close {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .btn-print {
          background: #16a34a;
          color: #fff;
        }
        .btn-print:hover { background: #15803d; }

        .btn-close {
          background: #fff;
          color: #333;
        }
        .btn-close:hover { background: #eee; }

        /* ===== A4 Sheet ===== */
        .sheet {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: #fff;
          padding: 15mm 12mm;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }

        /* ===== Letterhead ===== */
        .letterhead {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 2.5px solid #1a1a1a;
          padding-bottom: 12px;
          margin-bottom: 22px;
        }

        .lh-side { display: flex; flex-direction: column; min-width: 120px; }
        .lh-left { align-items: flex-start; }
        .lh-right { align-items: flex-end; }

        .lh-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #6b7280;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .lh-value {
          font-size: 16px;
          font-weight: 700;
          color: #111;
        }

        .lh-center { flex: 1; text-align: center; }

        .lh-brand {
          font-size: 11px;
          color: #9ca3af;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 2px;
        }

        .lh-center h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          color: #111;
          letter-spacing: 0.3px;
        }

        .lh-date {
          font-size: 11.5px;
          color: #6b7280;
        }

        /* ===== Table ===== */
        .hisab-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }

        .hisab-table thead th {
          background: #1f2937;
          color: #fff;
          padding: 10px 8px;
          font-weight: 700;
          text-align: center;
          border: 1px solid #1f2937;
          font-size: 11.5px;
        }

        .hisab-table tbody td {
          padding: 9px 8px;
          text-align: center;
          border: 1px solid #d1d5db;
          color: #1f2937;
        }

        .hisab-table tbody td.text-left { text-align: left; }

        .hisab-table tbody tr:nth-child(even) {
          background: #f9fafb;
        }

        .hisab-table tfoot th {
          background: #e5e7eb;
          color: #111;
          padding: 10px 8px;
          border: 1.5px solid #1f2937;
          font-size: 12.5px;
          font-weight: 800;
        }

        .baki-cell {
          color: #b91c1c !important;
          font-weight: 800 !important;
        }

        /* ===== Signatures ===== */
        .sign-row {
          display: flex;
          justify-content: space-between;
          margin-top: 60px;
          padding: 0 10px;
        }

        .sign-box {
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #374151;
        }

        .sign-line {
          width: 150px;
          border-top: 1.5px solid #374151;
          margin-bottom: 8px;
        }

        .footer-note {
          text-align: center;
          font-size: 10px;
          color: #9ca3af;
          margin-top: 40px;
          border-top: 1px solid #e5e7eb;
          padding-top: 8px;
        }

        /* ===== PRINT ===== */
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          html, body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .no-print { display: none !important; }

          .print-page {
            background: #fff;
            padding: 0;
          }

          .sheet {
            width: 100%;
            min-height: auto;
            margin: 0;
            padding: 12mm 10mm;
            box-shadow: none;
          }

          .hisab-table thead { display: table-header-group; }
          .hisab-table tfoot { display: table-footer-group; }
          .hisab-table tr { page-break-inside: avoid; }
        }
      `}</style>
    </div>
  );
};

export default PrintLaberSheet;
