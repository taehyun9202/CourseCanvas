import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Course.css'
import ProfessorCourseGrade from './ProfessorCourseGrade'
import StudentLists from './StudentLists'
function Course(props) {
    const [ course, setCourse ] = useState(null)

    // first, need to get course info
    useEffect(() => {
        axios.get(`http://localhost:8000/api/courses/${props.match.params.id}`)
            .then(res => {
                setCourse(res.data[0])
                })
            .catch(err => console.log(err))
    }, [props])
    return (
        <div className="course">
            <div className="title">
                <h2>Welcome Course {course?.name}</h2>
                <div className="title_left">
                    <h2>{course?.professor.name}</h2>
                    <p>{course?.professor.email}</p>
                </div>
            </div>
            <div className="content">
                <div className="right">
                    <ProfessorCourseGrade course={course}/>
                </div>
                <div className="left">
                    <StudentLists course={course} />
                </div>
            </div>

        </div>
    )
}

export default Course
