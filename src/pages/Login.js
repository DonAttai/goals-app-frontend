import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const { login, error, loading } = useContext(AuthContext);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const userData = { email, password };
        await login(userData);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(error);
    }

    setFormData({
      email: "",
      password: "",
    });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <section>
      <h2 className="login-heading">
        <FaSignInAlt />
        Log In{" "}
      </h2>
      <Row className="justify-content-center align-items-center ">
        <Col md="auto">
          {error && <span>{error.message}</span>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controld="email">
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter a valid email"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter password"
                autoComplete="off"
              />
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
