import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

//Import formik validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import actions and helpers
import { forgetPassword, apiError } from '../../redux/actions';

//i18n
import { useTranslation } from 'react-i18next';

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import { forgetPasswordRequest } from '../../redux/profile/actions';

/**
 * Forget Password component
 * @param {*} props 
 */
const ForgetPassword = (props) => {

    const [email, setEmail] = useState("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    function validateEmail(email) {
        // Regular expression for validating an email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    document.title = "Forgot Password | Chatvia React - Responsive Bootstrap 5 Chat App"
    const handleSubmit = (e) => {
        e.preventDefault();
        if(email !== "" && validateEmail(email)){
            setIsAlertVisible(false)
            dispatch(forgetPasswordRequest(email));
            setEmail("");
        }else { 
            console.log("error")
            setIsAlertVisible(true)
        }
    }

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <div className="text-center mb-4">
                                <Link to="/" className="auth-logo mb-5 d-block">
                                    <img src={logodark} alt="" height="30" className="logo logo-dark" />
                                    <img src={logolight} alt="" height="30" className="logo logo-light" />
                                </Link>

                                <h4>{t('Reset Password')}</h4>
                                <p className="text-muted mb-4">{t('Reset Password With Chatvia.')}</p>

                            </div>

                            <Card>
                                <CardBody className="p-4">
                                
                                    <div className="p-3">
    
                                      {isAlertVisible &&  <Alert color="danger" variant="wanning" className="text-center mb-4">{t('Email is Require')}!</Alert>}
                                        <Form >

                                            <FormGroup className="mb-4">
                                                <Label className="form-label">{t('Email')}</Label>
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <span className="input-group-text border-light text-muted">
                                                        <i className="ri-mail-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className="form-control form-control-lg border-light bg-soft-light"
                                                        placeholder="Enter Email"
                                                        onChange={e => setEmail(e.target.value)}
                                                        value={email}
                                                       
                                                    />
                                                </InputGroup>
                                            </FormGroup>

                                            <div className="d-grid">
                                                <Button onClick={e => handleSubmit(e)} color="primary" block className="waves-effect waves-light" type="submit">{t('Reset')}</Button>
                                            </div>

                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            <div className="mt-5 text-center">
                                <p>{t('Remember It')} ? <Link to="login" className="font-weight-medium text-primary"> {t('Signin')} </Link> </p>
                                <p>© {new Date().getFullYear()} {t('Chatvia')}. {t('Crafted with')} <i className="mdi mdi-heart text-danger"></i> {t('by Themesbrand')}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error, passwordResetStatus } = state.Auth;
    return { user, loading, error, passwordResetStatus };
};

export default connect(mapStateToProps, { forgetPassword, apiError })(ForgetPassword);