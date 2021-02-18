import axios from 'axios'
import React, { useState } from 'react'

function Grade(props) {
    const [ attendence, setAttendence ] = useState(props.student.grade.attendence)
    const [ quiz, setQuiz ] = useState(props.student.grade.quiz)
    const [ project, setProject ] = useState(props.student.grade.project)
    const [ midterm, setMidTerm ] = useState(props.student.grade.midterm)
    const [ final, setFinal ] = useState(props.student.grade.final)

    const updateGrade = () => {
        const updateInfo = []
        props.course.students.map(student => {
            if(student._id !== props.student._id) {
                updateInfo.push(student)
            }
        })
        updateInfo.push({
            _id: props.student._id,
            name: props.student.name,
            email: props.student.email,
            grade: {
                attendence: attendence,
                quiz: quiz,
                project: project,
                midterm: midterm,
                final: final
            }
        })
        console.log(updateInfo)
        axios.put(`http://localhost:8000/api/courses/${props.course?._id}`, { students: updateInfo })
            .then(res => console.log(res))
            .catch(err => console.log(err))

        // // 2.update new course to student.course array
        console.log(props.student._id)
        axios.get(`http://localhost:8000/api/users/${props.student._id}`)
            .then(res => {
                const updateUser = []
                res.data[0].courses.map(course => {
                    if(course._id !== props.course._id) {
                        updateUser.push(course)
                    }
                })
                
                updateUser.push({
                    _id: props.course._id,
                    name: props.course.name,
                    professor: {
                        _id: props.course.professor._id,
                        name: props.course.professor.name,
                        email: props.course.professor.email
                    },
                    grade: {
                        attendence: attendence,
                        quiz: quiz,
                        project: project,
                        midterm: midterm,
                        final: final
                    }
                })
                // console.log("updateUser: ", updateUser)
                axios.put(`http://localhost:8000/api/users/${props.student._id}`, { courses: updateUser })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => console.log(err))
            })
    }
    return (
        <div className="professorManage_student">
            <h4>{props.student.name}</h4>
            <form >
            <div className="grades">
                    <div className="grade">
                        <label>Attendence</label>
                        <input type="number" value={attendence} onChange={e => setAttendence(e.target.value)}/>
                    </div>
                    <div className="grade">
                        <label>Quiz</label>
                        <input type="number" value={quiz} onChange={e => setQuiz(e.target.value)}/>
                    </div>
                    <div className="grade">
                        <label>Project</label>
                        <input type="number" value={project} onChange={e => setProject(e.target.value)}/>
                    </div>
                    <div className="grade">
                        <label>Mid-term</label>
                        <input type="number" value={midterm} onChange={e => setMidTerm(e.target.value)}/>
                    </div>
                    <div className="grade">
                        <label>Final</label>
                        <input type="number" value={final} onChange={e => setFinal(e.target.value)}/>
                    </div>
                    <div className="save">
                        <p className="updateGrade" onClick={updateGrade}>Update</p>
                    </div>
            </div>
            </form>
        </div>
    )
}

export default Grade
