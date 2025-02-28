import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        fontFamily: "'Roboto', sans-serif",
        color: "#333",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "600px", padding: "20px" }}>
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#ff6347", 
            marginBottom: "20px",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "#555",
            marginBottom: "30px",
            fontWeight: "300",
          }}
        >
          Oops! The page you are looking for doesn't exist.
        </p>
        <p
          style={{
            fontSize: "18px",
            color: "#777",
            marginBottom: "40px",
          }}
        >
          It seems you've encountered a broken link or an incorrect URL.
        </p>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            backgroundColor: "#ff6347",
            padding: "15px 30px",
            borderRadius: "5px",
            fontSize: "18px",
            fontWeight: "500",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e55347")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6347")}
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
