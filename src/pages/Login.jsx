import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { FaSignInAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Col, Row } from "react-bootstrap";
import authService from "../service/auth-service";

function Login() {
  const navigate = useNavigate();
  const { setLoading, isLoading, dispatch } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading();
    try {
      const userData = await authService.login(data);
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      navigate("/");
      toast("Login Successful", { type: "success" });
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    } finally {
      setLoading();
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controld="email">
              <Form.Control
                {...register("email", {
                  required: "Please, enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please, enter a valid email",
                  },
                })}
                placeholder="Enter email"
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

            <Button
              className="btn btn-sm"
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? "Pls, Wait" : "SIGN IN"}
            </Button>
          </Form>
        </Col>
      </Row>
    </section>
  );
}

export default Login;
