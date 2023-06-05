import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaSignInAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Col, Row } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const { login, error } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h2 className="login-heading">
        <FaSignInAlt />
        Log In{" "}
      </h2>
      <Row className="justify-content-center align-items-center ">
        <Col md="auto">
          {error && <span>{error.message}</span>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controld="email">
              <Form.Control
                {...register("email", {
                  required: "Please,enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please, enter a valid email",
                  },
                })}
                placeholder="Enter a valid email"
                autoComplete="off"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                {...register("password", {
                  required: "Please, enter your password",
                })}
                type="password"
                placeholder="Enter password"
                autoComplete="off"
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}

              <span className="d-flex justify-content-start">
                <Form.Text className="px-2 ">
                  Don't have an account?{" "}
                  <Link className="px-2 " to="/register">
                    Register
                  </Link>
                </Form.Text>
              </span>
            </Form.Group>

            <Button className="btn btn-sm" type="submit" variant="primary">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </section>
  );
}

export default Login;
