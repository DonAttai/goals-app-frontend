import React, { useState, useEffect, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const { register, error, loading, setLoading } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      console.log(error.message);
    }
  }, [error, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      navigate("/register");
    } else {
      const userData = {
        name,
        email,
        password,
        password2,
      };

      try {
        await register(userData);
        setLoading();
        navigate("/login");
      } catch (error) {
        return error.message;
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    }

    if (loading) {
      return <Loader />;
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
          {error && <span className="text-danger">{error.message}</span>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter name"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="password2">
              <Form.Control
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                placeholder="Confirm passwrod"
                autoComplete="off"
              />
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
