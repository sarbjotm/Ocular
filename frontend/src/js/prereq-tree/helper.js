export async function fetchPrereqFromHTML(term, year, subject, code) {
    var prereqLine = "";

    try {
        const response = await fetch(`/courses/info/${subject.toUpperCase()}/${code.toUpperCase()}`);
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        prereqLine = data["prerequisite"];
    } catch (error) {
        console.error(error);
    }

    return prereqLine;
}
