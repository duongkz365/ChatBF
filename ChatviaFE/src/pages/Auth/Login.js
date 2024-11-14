import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/actions";
import { loginProfileRequest } from "../../redux/profile/actions";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
  InputGroup,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
//i18n
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  const [userName, setUserName] = useState("");
  const [passwordHash, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      navigate('/dashboard')
      console.log("Người dùng đang đăng nhập");
    } else {
      console.log("Chua có token");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (checkbox) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("passwordHash", passwordHash);
      localStorage.setItem("checkbox", JSON.stringify(checkbox));
    }
    dispatch(loginProfileRequest(userName, passwordHash));


    console.log("click");
  };

  document.title = "Chat App | Login"

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    const savedPasswordHash = localStorage.getItem("passwordHash");
    const savedCheckbox = JSON.parse(localStorage.getItem("checkbox"));

    if (savedUserName && savedPasswordHash && savedCheckbox) {
      setUserName(savedUserName);
      setPassword(savedPasswordHash);
      setCheckbox(savedCheckbox);
    }
  }, []);

  const handleCheckboxChange = (e) => {
    setCheckbox(e.target.checked);

    if (!e.target.checked) {
      localStorage.removeItem("userName");
      localStorage.removeItem("passwordHash");
      localStorage.removeItem("checkbox");
    }
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="text-center mb-4">
                <Link to="/" className="auth-logo mb-5 d-block">
                  <img
                    src={logodark}
                    alt=""
                    height="30"
                    className="logo logo-dark"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="30"
                    className="logo logo-light"
                  />
                </Link>

                <h4>{t("Sign in")}</h4>
                <p className="text-muted mb-4">
                  {t("Sign in to continue to Chatvia")}.
                </p>
              </div>

              <Card>
                <CardBody className="p-4">
                  <div className="p-3">
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <Label className="form-label">{t("Username")}</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span
                            className="input-group-text text-muted"
                            id="basic-addon3"
                          >
                            <i className="ri-user-2-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Enter User Name"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                          />
                        </InputGroup>
                      </div>
                      <FormGroup className="mb-4">
                        <div className="float-end">
                          <Link
                            to="/forget-password"
                            className="text-muted font-size-13"
                          >
                            {t("Forgot password")}?
                          </Link>
                        </div>
                        <Label className="form-label">{t("Password")}</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span className="input-group-text text-muted">
                            <i className="ri-lock-2-line"></i>
                          </span>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={passwordHash}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="form-check mb-4">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="remember-check"
                          checked={checkbox}
                          onChange={(e) => handleCheckboxChange(e)}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="remember-check"
                        >
                          {t("Remember me")}
                        </Label>
                      </div>

                      <div className="d-grid">
                        <Button
                          color="primary"
                          block
                          className=" waves-effect waves-light"
                          type="submit"
                        >
                          {t("Sign in")}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  {t("Don't have an account")} ?{" "}
                  <Link
                    to="/register"
                    className="font-weight-medium text-primary"
                  >
                    {" "}
                    {t("Register now")}{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} {t("Chatvia")}.{" "}
                  {t("Crafted with")}{" "}
                  <i className="mdi mdi-heart text-danger"></i>{" "}
                  {t("by Dinh Duong Ky")}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
