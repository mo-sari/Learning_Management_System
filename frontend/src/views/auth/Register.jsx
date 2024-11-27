import React, { useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link } from "react-router-dom";
import { register } from "../../utils/auth";
import {
  validateRequiredFields,
  validatePasswordStrength,
  validatePasswordMatch,
  validateEmail,
} from "../../utils/formValidations";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [error, setError] = useState(null);

  const handleStateUpdate = (e) => {
    setError("");
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, re_password } = user;

    // All Fields Are Required
    const requiredError = validateRequiredFields({
      name,
      email,
      password,
      re_password,
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

    // Passwords Must Match
    const passwordMatchError = validatePasswordMatch(password, re_password);
    if (passwordMatchError) {
      setError(passwordMatchError);
      return;
    }

    // Passwords Must Be Strong
    const passwordStrengthError = validatePasswordStrength(password);
    if (passwordStrengthError) {
      setError(passwordStrengthError);
      return;
    }

    const { error } = await register(name, email, password, re_password);
    if (error) {
      if (error.response && error.response.data.email) {
        setError("Email already exists");
      }
      setUser({ name: "", email: "", password: "", re_password: "" });
    } else {
      setUser({ name: "", email: "", password: "", re_password: "" });
      alert(
        'You should activate your account first, we"ve already sent you an email'
      );
    }
  };

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
                  <h1 className="mb-1 fw-bold">Sign up</h1>
                  <span>
                    Already have an account?
                    <Link to="/login/" className="ms-1">
                      Sign In
                    </Link>
                  </span>
                </div>
                {/* Form */}
                <form className="needs-validation" noValidate="">
                  {/* name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      placeholder="Enter name"
                      value={user.name}
                      onChange={handleStateUpdate}
                    />
                  </div>
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
                      value={user.email}
                      onChange={handleStateUpdate}
                    />
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
                  </div>
                  <div className="mb-3">
                    <label htmlFor="re_password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="re_password"
                      className="form-control"
                      name="re_password"
                      placeholder="**************"
                      value={user.re_password}
                      onChange={handleStateUpdate}
                    />
                  </div>
                  <div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn btn-primary"
                      >
                        Sign Up <i className="fas fa-user-plus"></i>
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

export default Register;
