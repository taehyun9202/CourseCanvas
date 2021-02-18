import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Course.css'
import ProfessorManage from './ProfessorManage'
import StudentLists from './StudentLists'
function Course(props) {
    const [ course, setCourse ] = useState(null)
    const [ attendence, setAttendence ] = useState(0)
    const [ quiz, setQuiz ] = useState(0)
    const [ project, setProject ] = useState(0)
    const [ midterm, setMidTerm ] = useState(0)
    const [ final, setFinal ] = useState(0)
    // first, need to get course info
    useEffect(() => {
        axios.get(`http://localhost:8000/api/courses/${props.match.params.id}`)
            .then(res => {
                setCourse(res.data[0])
                })
            .catch(err => console.log(err))
    }, [props])

    axios.get(`http://localhost:8000/api/users/${props.user?._id}`)
        .then(res => {
            res.data[0]?.courses.map(one => {
                if(one._id === course._id) {
                    setAttendence(one.grade.attendence)
                    setQuiz(one.grade.quiz)
                    setProject(one.grade.project)
                    setMidTerm(one.grade.midterm)
                    setFinal(one.grade.final)
                }
            })})
    const renderContent = () => {
        if (!props.user) {
            return null
        } else {
            if (props.user && props.user.student) {
                return (
                    <div className="scores">
                        <div className="score">
                            <h3>Attendence</h3>
                            <h3>{attendence}/10</h3>
                        </div>
                        <div className="score">
                            <h3>Quiz</h3>
                            <h3>{quiz}/15</h3>
                        </div>
                        <div className="score">
                            <h3>Project</h3>
                            <h3>{project}/25</h3>
                        </div>
                        <div className="score">
                            <h3>Midterm</h3>
                            <h3>{midterm}/25</h3>
                        </div>
                        <div className="score">
                            <h3>Final</h3>
                            <h3>{final}/25</h3>
                        </div>
                        <div className="score">
                            <h3>Total</h3>
                            <h3>{ parseInt(attendence) + parseInt(quiz) + parseInt(project) + parseInt(midterm) + parseInt(final) }/100</h3>
                        </div>
                    </div>
                )
            } else if( props.user && !props.user.student) {
                return (
                    <div className="content">
                        <div className="right">
                            <ProfessorManage course={course}/>
                        </div>
                        <div className="left">
                            <StudentLists course={course} />
                        </div>
                    </div>
                )
            }
        }
        
    }
    return (
        <div className="course">
            <div className="title">
                <h2>Welcome Course {course?.name}</h2>
                <div className="title_left">
                    <h2>{course?.professor.name}</h2>
                    <p>{course?.professor.email}</p>
                </div>
            </div>
            {renderContent()}
        </div>
    )
}

export default Course
