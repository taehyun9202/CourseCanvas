import React from 'react'

function CourseLists(props) {
    return (
        <div>
            {props.user.courses.map(course => (
                <div>
                    <a href={`/${course._id}`}>{course.name}</a>
                </div>
            ))}
        </div>
    )
}

export default CourseLists
