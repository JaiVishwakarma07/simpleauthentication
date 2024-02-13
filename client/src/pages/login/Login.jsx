import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8800/api/login', { email, password })
            localStorage.setItem("token", JSON.stringify(res.data));
            navigate("/")
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit} >
                <input type="email" placeholder='email' name='email' onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='password' name='password' onChange={e => setPassword(e.target.value)} />
                <button>login</button>
            </form>
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default Login