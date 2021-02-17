import axios from 'axios'
import React, { useState, useEffect } from 'react'

function ProfessorCourseGrade(props) {
    const [ studentList, setStudentList ] = useState([])

    // this wont update page when student added
    useEffect(() => {
        setStudentList(props.course?.students)
    }, [props.course?.students])

    return (
        <div>
            {studentList?.map(student => (
                <div>{student.name}</div>
            ))}
        </div>
    )
}

export default ProfessorCourseGrade
