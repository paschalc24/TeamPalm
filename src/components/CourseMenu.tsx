import { useState } from "react"
import Overlay from "./Overlay"

function CourseMenu() {

    let courses = ["Software Development", "Intro to Filler Text", "Stats Displaying 101", "Psychology of Crunch"];
    const [selectedCourse, setSelectedCourse] = useState(-1);

    /*
    function toggleVisibility(course: string) {

        
        const courseUI = document.getElementsByClassName(course);
        const othersUI = document.querySelectorAll("." + courses.join(",."));

        othersUI.forEach(c => {
            c.style.display = "none";
        });

        courseUI.forEach(c => {
            c.style.display = "block";
        });
        

        return;
    }
    */
    
    const handleClick = (event: MouseEvent) => {console.log(event)};

    return (
        <>
            <h1>Courses</h1>
            <ul className="list-group">
                {courses.map((course, index) => (
                    <li className = {selectedCourse == index ? "list-group-item active" : "list-grounp-item"}
                    key={course} onClick={() => setSelectedCourse(index)}>
                        {course}
                    </li>
                ))}
            </ul>

            <ul className="overlays">
                {courses.map((course, index) => (
                    <Overlay course={course} activeCourse={courses[selectedCourse]}></Overlay>
                ))
                }
            </ul>
        </>
    );
}

export default CourseMenu;