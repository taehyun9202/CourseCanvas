import React from 'react'

function CourseLists(props) {
    return (
        <div>
            {props.courses.map(course => (
                <div>
                    <a 
                        href={`/${course._id}`}
                        style={{
                            color: "#660000",
                            fontSize: "18px",
                            fontWeight: "700"
                        }}
                    >{course.name}</a>
                </div>
            ))}
        </div>
    )
}

export default CourseLists