import React, { useState, useEffect } from "react";

import { fetchPrereqFromHTML } from "./helper";

import baseCourses from "../../json/base-courses.json";

export const Tree = () => {
    
    const term = "summer";
    const year = "2021";
    const subject = "cmpt";
    const code = "376w";

    
    const [treeData, setTreeData] = useState({});

    useEffect(async () => {
        var searchedCourse = [];
        var courseToBeSearched = [];

        const prereqLine = await fetchPrereqFromHTML(term, year, subject, code);
        baseCourses["COURSE_CODE"].forEach(baseCourse => {
            if (prereqLine.includes(baseCourse)) { // add all prereq courses into search queue
                courseToBeSearched.push(baseCourse);
            }
        });
        
        searchedCourse.push(`${subject.toUpperCase()} ${code.toUpperCase()}`);
        console.log("courseToBeSearched", courseToBeSearched);
        console.log("searchedCourse", searchedCourse);
        
        courseToBeSearched.forEach(async course => {
            const prereqLine = await fetchPrereqFromHTML(term, year, course.split(" ")[0].toLowerCase(), course.split(" ")[1].toLowerCase());
            baseCourses["COURSE_CODE"].forEach(baseCourse => {
                if (prereqLine.includes(baseCourse) && searchedCourse.indexOf(baseCourse) === -1) { // add all prereq courses that haven't been searched into search queue
                    courseToBeSearched.push(baseCourse);
                }
            });

            courseToBeSearched = courseToBeSearched.filter(c => c != course);
            console.log("courseToBeSearched", courseToBeSearched);
            console.log("searchedCourse", searchedCourse);
        });
    }, []);

    return(
        <></>
    );
};
