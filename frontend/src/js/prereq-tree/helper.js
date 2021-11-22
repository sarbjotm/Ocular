export async function fetchPrereqFromHTML(term, year, subject, code) {
    const prereqRegex = /<h4>Prerequisites((.|\n)*)<\/li>/gm;
    var prereqLine = "";

    try {
        const sectionResponse = await fetch(`https://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${subject}/${code}`);
        const sectionData = await sectionResponse.json();
        const section = sectionData[0]["value"]; // get the first available section
        const outlineResponse = await fetch(`https://www.sfu.ca/outlines.html?${year}/${term}/${subject}/${code}/${section}`);
        const outline = await outlineResponse.text();
        prereqLine = outline.match(prereqRegex)[0];
        console.log(prereqLine);
    } catch (error) {
        console.error(error);
    }

    return prereqLine;
}