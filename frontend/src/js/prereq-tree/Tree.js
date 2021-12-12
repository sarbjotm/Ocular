import React, { useState, useEffect } from "react";

import { fetchPrereqFromHTML } from "./helper";

import { Graphviz } from 'graphviz-react';

import baseCourses from "../../json/base-courses.json";

export const Tree = () => {
    const [term, setTerm] = useState("fall");
    const [year, setYear] = useState("2021");
    const [subject, setSubject] = useState("cmpt");
    const [code, setCode] = useState("470");
    const [treeData, setTreeData] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    async function loadPrereqTree() {
        setIsLoading(true);

        var searchedCourse = [];
        var courseToBeSearched = [];
        var connection = "";

        const prereqLine = await fetchPrereqFromHTML(term, year, subject, code);
        baseCourses["COURSE_CODE"].forEach(baseCourse => {
            if (prereqLine.includes(baseCourse)) { // add all prereq courses into search queue
                courseToBeSearched.push(baseCourse);
                connection += `${subject.toUpperCase()}${code.toUpperCase()} -> ${baseCourse.replace(/\s/g, "")};\n`; // whitespace between subject and code needs to be removed before plotting
            }
        });

        searchedCourse.push(`${subject.toUpperCase()} ${code.toUpperCase()}`);
        // console.log("courseToBeSearched", courseToBeSearched);
        // console.log("searchedCourse", searchedCourse);

        while (courseToBeSearched.length) {
            let course = courseToBeSearched[0];
            const prereqLine = await fetchPrereqFromHTML(term, year, course.split(" ")[0].toLowerCase(), course.split(" ")[1].toLowerCase());
            baseCourses["COURSE_CODE"].forEach(baseCourse => {
                if (prereqLine.includes(baseCourse) && searchedCourse.indexOf(baseCourse) === -1) { // add all prereq courses that haven't been searched into search queue
                    courseToBeSearched.push(baseCourse);
                    connection += `${course.replace(/\s/g, "")} -> ${baseCourse.replace(/\s/g, "")};\n`; // whitespace between subject and code needs to be removed before plotting
                }
            });

            searchedCourse.push(course);
            courseToBeSearched = courseToBeSearched.filter(c => c !== course);
            // console.log("courseToBeSearched", courseToBeSearched);
            // console.log("searchedCourse", searchedCourse);
        }

        // console.log(connection);
        let data = `digraph {${connection}}`;
        setTreeData(data);
        setIsLoading(false);
    }

    useEffect(async () => {
        loadPrereqTree();
    }, []);

    function handleSubmit(_event) {
        loadPrereqTree();
    }

    return(
        <>
            <div>
                <div className="ui two column stackable grid">
                    <div className="column">
                        <div className="ui center aligned container">
                            <p>
                                <b>Term: </b>
                                <select className="ui selection dropdown" value={term} onChange={(e) => setTerm(e.target.value.toLowerCase())}>
                                    <option selected value="spring">spring</option>
                                    <option value="summer">summer</option>
                                    <option value="fall">fall</option>
                                </select>
                            </p>
                            <p>
                                <b>Year: </b>
                                <div className="ui input">
                                    <input type="text" value={year} onChange={(e) => setYear(e.target.value.toLowerCase())} min="2019" max="2022" step="1" />
                                </div>
                            </p>
                            <p>
                                <b>Subject: </b>
                                <select className="ui selection dropdown" value={subject} onChange={e => setSubject(e.target.value.toLowerCase())}>
                                    <option selected value="cmpt">CMPT</option>
                                    <option value="macm">MACM</option>
                                </select>
                            </p>
                            <p>
                                <b>Course Number: </b>
                                <div className="ui input">
                                    <input className="ui input" type="text" value={code} onChange={(e) => setCode(e.target.value.toLowerCase())} />
                                </div>
                            </p>
                            <button className="ui inverted red button" onClick={handleSubmit}>Make a tree</button>
                        </div>
                    </div>
                    <div className="middle aligned column">
                    {isLoading ? "Loading..." : <Graphviz dot={treeData} />}
                    </div>
                </div>
                <div className="ui vertical divider" />
            </div>
        </>
    );
};
