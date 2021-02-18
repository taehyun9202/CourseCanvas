import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Header.css'
import Modal from 'react-modal'
import CloseIcon from '@material-ui/icons/Close';

function Header(props) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ openModal, setOpenModal ] = useState(false)
    const history = useHistory();
    function openModalHandler() {
        setOpenModal(true);
    }
      function closeModalHandler(){
        setOpenModal(false);
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        const usertoLogin = { email, password }
        axios.post('http://localhost:8000/api/signIn', usertoLogin)
        .then(res => {
                localStorage.setItem('id', res.data.user.id)
                localStorage.setItem('token', res.data.token)
            })
        .catch(err => console.log(err))
    }

    return (
        <div className="header">
            <a href="/"><h3>Scholar</h3></a>
            { props.user?.name ? 
                <h5>Hello {props.user.name}</h5> :
            <div className="login">
                <form onSubmit={onSubmitHandler}>
                    <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button>Log in</button>
                </form>
            </div>
            }

            <Modal
                isOpen={openModal}
                onRequestClose={closeModalHandler}
                className="courseModal"
                contentLabel="Create Course Modal"
            >
                <CloseIcon className="close" onClick={closeModalHandler} />
            </Modal>
        </div>
    )
}

export default Header
