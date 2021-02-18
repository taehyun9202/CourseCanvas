import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './ProfessorManage.css'
import Grade from './Grade'
function ProfessorManage(props) {
    const [ studentList, setStudentList ] = useState([])
    const [ attendence, setAttendence ] = useState(0)
    const [ quiz, setQuiz ] = useState(0)
    const [ project, setProject ] = useState(0)
    const [ midterm, setMidTerm ] = useState(0)
    const [ final, setFinal ] = useState(0)

    useEffect(() => {
        setStudentList(props.course?.students)
    }, [props.course?.students])

    return (
        <div className="professorManage">
            <div className="professorManage_list">
                {studentList?.map(student => (
                    <Grade student={student} course={props.course} />
                
                ))}
            </div>
        </div>
    )
}

export default ProfessorManage

