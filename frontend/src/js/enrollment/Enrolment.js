import React, {useState} from "react";
import {checkPrereqBeforeEnrolment} from "./helper";
import baseCourses from "../../json/base-courses.json";

export const Enrolment = () => {
    const [enrollingCourse, setEnrollingCourse] = useState("CMPT 470");

    async function handleSubmit(_event) {
        const checkPass = await checkPrereqBeforeEnrolment(enrollingCourse);

        if (checkPass) {
            console.log("Enrolling into Course: ", enrollingCourse);
        }
    }

    return(
        <div>
            <label>
                <b> Choose course to enroll: </b>
                <select onChange={(event) => setEnrollingCourse(event.target.value)}>
                    <option value="" disabled selected hidden> Select course to enroll </option>
                    {
                        baseCourses["COURSE_CODE"].map( course => {
                            return (<option value={course}>{course}</option>);
                        })
                    }
                </select>
                <button onClick={handleSubmit}> Enroll </button>
            </label>
        </div>
    );
};
