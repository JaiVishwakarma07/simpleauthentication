import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8800/api/register', { email, password })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit} >
                <input type="email" placeholder='email' name='email' onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='password' name='password' onChange={e => setPassword(e.target.value)} />
                <button>register</button>
            </form>
            <Link to='/login'>Login</Link>
        </div>
    )
}

export default register