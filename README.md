# Ocular

For students to view course grades, track their current schedule, enroll in next semester's courses and plan future courses by examining prerequesites.

## Installation

1. Clone this repo.
2. Run `docker-compose up -d`.
3. Go to http://localhost:8080/ (the login page).

## Accounts

Access to the email address is not necessary.

- Admin/superuser: username `admin`, password `admin`, email `admin@test.com`
- Regular student: username `student`, password `student`, email `student@test.com`

## Features

- All students can sign up but before they can access the system, they must be manually approved by an administrator
- Password reset
- View grades/credits for taken and future courses, sorted by year and semester.
- Calendar view for all current courses
- Enrollment in future courses
- Prerequiste tree for all courses in the system

## Note
If there is an ECONNREFUSED/TCP error, this is because the backend container was ready and tried to contact the DB container before it was fully seeded. (Docker Compose does not guarantee that the database will be fully seeded before the backend container is ready) Restart the ocd-project_web_X container before using the application using `docker restart ocd-project_web_1` if this occurs.

## Credits

Team OnlyCenteredDivs (OCD)


