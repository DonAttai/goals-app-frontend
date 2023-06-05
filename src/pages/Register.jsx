import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/login");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="register-page">
      <h2 className="register-heading">
        <FaUser />
        Create an account
      </h2>
      <Row className="justify-content-center">
        <Col md="4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Control
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must not be less than 3 characters",
                  },
                })}
                placeholder="Enter your name"
                autoComplete="off"
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Enter a valid email"
                autoComplete="off"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 4,
                    message: "must not be less than 4 characters",
                  },

                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please, enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "password must not be less than 8 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "password must not be more than 15 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Confirm passwrod"
                autoComplete="off"
                {...register("confirmPassword", {
                  required: "Confirm password is required",

                  validate: (value) => {
                    const { password } = getValues();
                    return value === password || "Passwords do not match ";
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
              <span className="d-flex justify-content-start">
                <Form.Text className="px-3">
                  Have an account?{" "}
                  <Link className="px-2 " to="/login">
                    Login
                  </Link>
                </Form.Text>
              </span>
            </Form.Group>
            <Button type="submit" className="btn btn-sm">
              Create Account
            </Button>
          </Form>
        </Col>
      </Row>
    </section>
  );
}
export default Register;
