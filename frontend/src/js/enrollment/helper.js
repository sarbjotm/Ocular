import {fetchPrereqFromHTML} from "../prereq-tree/helper";

export async function checkPrereqBeforeEnrolment(course) {
    const term = "fall";
    const year = "2021";
    const subject = course.split(" ")[0].toLowerCase();
    const code = course.split(" ")[1].toLowerCase();

    const prereqLine = await fetchPrereqFromHTML(term, year, subject, code);
    /*
        > Check if a current user database exists
            > if no -> throw error and break ; else continue
        > Grab course and check if user has all prerequisites
            -> if yes -> return true ; else return false
    */

    //  For now just returning true 
    return true;
}

export function enrollInto(course) {
    /*
        > Update the user database
    */
}
