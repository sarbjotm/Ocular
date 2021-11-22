import React, { useState, useEffect } from "react";

export const Tree = () => {
    const prereqRegex = /<li class="prereq"> <h4>Prerequisite.+?<\/li>/;
    const term = "spring";
    const year = "2022";
    const subject = "cmpt";
    const code = "120";
    
    //const [outline, setOutline] = useState("");

    useEffect(async () => {
        try {
            const sectionResponse = await fetch(`https://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${subject}/${code}`);
            const sectionData = await sectionResponse.json();
            const section = sectionData[0]["value"]; // get the first available section
            const outlineResponse = await fetch(`https://www.sfu.ca/outlines.html?${year}/${term}/${subject}/${code}/${section}`);
            const outline = await outlineResponse.text();
            const prereqLine = await outline.match(prereqRegex);
            console.log(prereqLine);
        } catch (error) {
            console.error(error);
        }

        // get pre-req
    }, []);

    return(
        <></>
    );
};
