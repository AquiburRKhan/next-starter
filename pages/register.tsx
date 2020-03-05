import React, { useState } from 'react'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(email, password, confirmPassword)
    };

    return (
        <div className="authBox">
            <form className="authForm" onSubmit={handleSubmit}>
                <h1>Register Form</h1>
                <div>
                    <input placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" placeholder="Enter Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register;
