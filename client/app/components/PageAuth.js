'use client'
import Link from "next/link";
import '../main.scss'
import AuthBox from "./AuthBox";

const pageAuth = ({ isRegister }) => {

    return (
        <div className="auth">
            <div className="auth__box">
                <AuthBox register={isRegister} />
            </div>
        </div>
    )
};

export default pageAuth;