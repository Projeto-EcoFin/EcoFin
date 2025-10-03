import React from "react";
import "./Button.css";

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  return (
    <button
      {...props}
      className={`custom-btn ${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
