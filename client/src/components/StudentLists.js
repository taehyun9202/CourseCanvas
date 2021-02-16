import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './StudentLists.css'

function StudentLists(props) {
    const [ studentList, setStudentList ] = useState()
    useEffect(() => {
        axios.get('http://localhost:8000/api/students')
            .then(res => {
                console.log(res.data)
                setStudentList(res.data)
            }
                )
    }, [props])

    const addStudentHandler = () => {
        
    }
    return (
        <div className="studentLists">
            <h5>Add students to {props.course?.name}</h5>
            <div className="list">
                {studentList?.map(student => (
                    <button className="student" onClick={() => addStudentHandler(student._id)}>
                        <h5>{student.name}</h5>
                        <p>({student._id})</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default StudentLists
