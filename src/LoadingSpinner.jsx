import React from "react";

const LoadingSpinner = ({ message = "Just a minute..." }) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "250px",
    width: "100%",
    color: "#1ABC9C"
  }}>
    <div className="custom-spinner" />
    <div style={{ marginTop: 20, fontWeight: 600, fontSize: "1.2rem" }}>{message}</div>
    <style>
      {`
        .custom-spinner {
          border: 6px solid #e0f7f4;
          border-top: 6px solid #1ABC9C;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}
    </style>
  </div>
);

export default LoadingSpinner;