import React, { useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import {
  validateRequiredFields,
  validateEmail,
} from "../../utils/formValidations";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStateUpdate = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError("");
    const { email, password } = user;

    // All Fields Are Required
    const requiredError = validateRequiredFields({
      email,
      password,
    });
    if (requiredError) {
      setError(requiredError);
      return;
    }

    // Email Must Be Valid
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    // TODO.... check for server side errors
    // Account not activated, Invalid email or password, No user found with this email

    const { data, error } = await login(email, password);
    if (error) {
      setIsLoading(false);
      alert(error);
      setUser({ email: "", password: "" });
    } else {
      navigate("/");
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <BaseHeader />
      <section
        className="container d-flex flex-column vh-100"
        style={{ marginTop: "150px" }}
      >
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold">Sign in</h1>
                  <span>
                    Don’t have an account?
                    <Link to="/register/" className="ms-1">
                      Sign up
                    </Link>
                  </span>
                </div>
                {/* Form */}
                <form
                  className="needs-validation"
                  onSubmit={handleSubmit}
                  noValidate=""
                >
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      onChange={handleStateUpdate}
                      value={user.email}
                    />
                    <div className="invalid-feedback">
                      Please enter valid username.
                    </div>
                  </div>
                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      value={user.password}
                      onChange={handleStateUpdate}
                    />
                    <div className="invalid-feedback">
                      Please enter valid password.
                    </div>
                  </div>
                  {/* Checkbox */}
                  <div className="d-lg-flex justify-content-between align-items-center mb-4">
                    {/* <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberme"
                        required=""
                      />
                      <label className="form-check-label" htmlFor="rememberme">
                        Remember me
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div> */}
                    <div>
                      <Link to="/forgot-password/">Forgot your password?</Link>
                    </div>
                  </div>
                  <div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Sign in <i className="fas fa-sign-in-alt"></i>
                      </button>
                    </div>
                  </div>
                  {error ? <div style={{ color: "red" }}>{error}</div> : ""}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Login;
