import React, { useState } from 'react'
import './Sidebar.css'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import Modal from 'react-modal'
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'
import CourseLists from './CourseLists'
import { useHistory } from 'react-router-dom'

function Sidebar(props) {
    const [ isOpen, setIsOpen ] = useState('active')
    const [ openModal, setOpenModal ] = useState(false)
    const [ courseName, setCourseName ] = useState('')
    const [ courseCapacity, setCourseCapacity ] = useState(0)
    const history = useHistory();
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isSelected, setIsSelected ] = useState(true)

    function openModalHandler() {
        setOpenModal(true);
    }
      function closeModalHandler(){
        setOpenModal(false);
    }

    const ClickHander = () => {
        if (isOpen === 'active') {
            setIsOpen('')
        }
        else {
            setIsOpen('active')
        }
    }

    const onChangeHandler = () => {
        setIsSelected(!isSelected)
    }

    const register = e => {
        e.preventDefault()
        const usertoLogin = { name: name, email: email, password: password, student: isSelected }
        axios.post('http://localhost:8000/api/signup', usertoLogin)
        .then(res => {
                console.log(res.data)
                localStorage.setItem('id', res.data.user.id)
                localStorage.setItem('token', res.data.token)
            })
        .catch(err => console.log(err))
    }
    const createCourse = e => {
        e.preventDefault()
        const newCourse = {
            name : courseName,
            capacity : courseCapacity,
            professor: {
                _id: props.user._id,
                name: props.user.name,
                email: props.user.email
            }
        }
        axios.post('http://localhost:8000/api/Courses', newCourse)
            .then(res => {
                const courseToAdd = {
                    _id: res.data._id,
                    name: res.data.name,
                    capacity: res.data.capacity,
                    professor: res.data.professor
                }
                console.log(props.user.courses)
                props.user.courses = [...props.user.courses, courseToAdd]
                console.log(props.user.courses)
                axios.put(`http://localhost:8000/api/users/${props.user._id}`, { courses: props.user.courses })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        setCourseName('')
        setCourseCapacity(0)
    }

    const renderCreateCourse = () => {
        if (props.user && !props.user.student) {
            return (
                <button onClick={openModalHandler}>Create Course</button>
            )
        }
    }
    return (
        <div className={`sidebar ${isOpen}`}>
            <div className="courseList">
                {props.user ? 
                    <div className="courses">
                        <h3>{props.user.name}</h3> 
                        <CourseLists courses={props.user.courses} />
                    </div> :
                    <div className="registerform">
                        <h3>Register</h3>
                        <form onSubmit={register}>
                            <div>
                                <label>Student?</label>
                                <input type="checkbox" checked={isSelected} onChange={onChangeHandler} />
                            </div>
                            <div>
                                <label>Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button className="registerButton">Register</button>
                        </form>
                    </div>
                }
                <div className="createCourse">
                    {renderCreateCourse()}
                </div>
            </div>
            <div className="open" onClick={ClickHander}>
                { isOpen === "active" ?
                    <KeyboardArrowLeftIcon /> :
                    <KeyboardArrowRightIcon />
                }
            </div>

            <Modal
                isOpen={openModal}
                onRequestClose={closeModalHandler}
                className="courseModal"
                contentLabel="Example Modal"
            >
                <CloseIcon className="close" onClick={closeModalHandler} />
                <h1>Create Course</h1>
                <form>
                    <label>Course Name</label>
                    <input type="text" value={courseName} onChange={e => setCourseName(e.target.value)} />
                    <label>Couse Hour</label>
                    <div className="hour">
                        <input type="time"/>
                        <input type="time"/>
                    </div>
                    <label>Course Capacity</label>
                    <input type="text" value={courseCapacity} onChange={e => setCourseCapacity(e.target.value)}/>
                    <button onClick={createCourse}>Create Course</button>
                </form>
            </Modal>
        </div>
    )
}

export default Sidebar
