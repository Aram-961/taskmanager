'use client'
import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from 'next/link';


const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
});

const AuthBox = ({ register }) => {

    const [values, setValues] = useState({});

    const formik = useFormik({
        initialValues: values,
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: schema,
    });

    const handleSubmit = (values) => {
        console.log("Form submitted", values);
    };

    return (
        <div className="auth">
            <div className="auth__box">
                <div className="auth__header">
                    <h1>{register ? "register" : "Login"}</h1>
                </div>

                <form>
                    {register && (
                        <div className="auth__field">
                            <label for="">Name</label>
                            <input type="text" />
                        </div>
                    )}

                    <div className="auth__field">
                        <label for="">Email</label>
                        <input type="text" />
                    </div>


                    <div className="auth__field">
                        <label for="">Password</label>
                        <input type="password" />
                    </div>

                    {register && (
                        <div className="auth__field">
                            <label for="">Confirm Password</label>
                            <input type="password" />
                            <p className="auth__error">Something went wrong</p>
                        </div>
                    )}

                    <div className="auth__footer">
                        <p className="auth__error">Something went wrong</p>
                        <Link href="/Register">
                            <button className="btn btn">{register ? "Register" : "Login"}</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default AuthBox;