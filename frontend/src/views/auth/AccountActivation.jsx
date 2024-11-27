import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountActivation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login"); // Redirect to login page
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="text-primary">Account Activated!</h1>
        <p className="lead">
          We’ll take you to the login page in just a moment.
        </p>
      </div>
    </div>
  );
};

export default AccountActivation;
