import React, { useState } from 'react'
import './Sidebar.css'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import Modal from 'react-modal'
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import CourseLists from './CourseLists'

function Sidebar(props) {
    const [ isOpen, setIsOpen ] = useState('')
    const [ openModal, setOpenModal ] = useState(false)
    const [ user, setUser ] = useState(props.user)
    const [ courseName, setCourseName ] = useState('')
    const [ courseCapacity, setCourseCapacity ] = useState(0)
    const history = useHistory();

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

    const createCourse = e => {
        e.preventDefault()
        const newCourse = {
            name : courseName,
            capacity : courseCapacity,
            professor: {
                _id: user.id,
                name: user.name,
                email: user.email
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
                user.courses = [...user.courses, courseToAdd]
                axios.put(`http://localhost:8000/api/users/${user.id}`, { courses: user.courses })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        
    }
    return (
        <div className={`sidebar ${isOpen}`}>
            <div className="courseList">
                <div className="courses">
                    <h3>{user.name}</h3>
                    <CourseLists user={user} />
                </div>
                <div className="createCourse">
                    <button onClick={openModalHandler}>Create Course</button>
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
