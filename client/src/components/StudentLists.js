import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './StudentLists.css'
import { useHistory } from 'react-router-dom'

function StudentLists(props) {
    const [ studentList, setStudentList ] = useState()
    var history = useHistory();
    const getUserlist = () => {
        axios.get('http://localhost:8000/api/students')
            .then(res => {
                setStudentList(res.data)
            })
    }

    const addStudentHandler = student => {
        // when you add student
        // 1.update new student to course.student array
        // does it have to contain all student info?
        const userToAdd = {
            _id: student._id,
            name: student.name,
            email: student.email,
            grade: {
                attendence: 0,
                quiz: 0,
                project: 0,
                midterm: 0,
                final: 0
            }
        }
        const courseStudent = [...props.course.students, userToAdd]
        axios.put(`http://localhost:8000/api/courses/${props.course?._id}`, { students: courseStudent })
            .then(res => console.log(res))
            .catch(err => console.log(err))

        // 2.update new course to student.course array
        const courseToAdd = {
            _id: props.course?._id,
            name: props.course?.name,
            professor: props.course?.professor,
            grade: {
                attendence: 0,
                quiz: 0,
                project: 0,
                midterm: 0,
                final: 0
            }
        }
        const studentCouorse = [...student.courses, courseToAdd]
        console.log(studentCouorse)
        console.log(student._id)
        axios.put(`http://localhost:8000/api/users/${student._id}`, { courses: studentCouorse })
            .then(res => {
                console.log(res)
                history.push(`/${props.course?._id}`)
            })
            .catch(err => console.log(err))
    }
    
    const checkEnrollment = student => {
        var enrolled = false
        student.courses.map(course => {
            if (course._id === props.course?._id) {
                enrolled = true
            }
        })
        if (enrolled === false) {
            return  <button className="studentList_student" onClick={() => addStudentHandler(student)}>
                        <h5>{student.name}</h5>
                        <p>({student._id})</p>
                    </button>
        }
    }
    useEffect(() => {
        getUserlist()
    }, [checkEnrollment, props])
    
    return (
        <div className="studentLists">
            <h5>Add students to {props.course?.name}</h5>
            <div className="studentlist_list">
                {studentList?.map(student => (
                    checkEnrollment(student)
                ))}
            </div>
        </div>
    )
}

export default StudentLists
