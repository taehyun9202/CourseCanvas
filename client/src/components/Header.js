import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header(props) {
    const [user, setUser] = useState(props.user)
    return (
        <div className="header">
            <a href="/"><h3>Scholar</h3></a>
            { user.name ? 
                <h5>Hello {user.name}</h5> :
            <div className="login">
                <input type="email" placeholder="Enter Email"/>
                <input type="password" placeholder="Enter Password"/>
                <button>Log in</button>
            </div>
            }
        </div>
    )
}

export default Header
