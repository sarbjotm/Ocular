# ocd-project

# Features
- Batch Approve functionality for administrators to use
- Session-based authentication
- Prerequisite tree
- Calendar view of courses

# Note
Docker Compose does not guarantee that the database will be fully seeded before the backend container is ready, which will cause the backend to fail because the session table (for logins) is not created yet. To fix this issue, restart the ocd-project_web_X container before using the application.

# Routes
- http://localhost:8080/users/login
- localhost:8080/users/logout

Other functionality is not fully integrated into the release application (we have components for the calendar view/other UI but have not integrated them into our frontend framework yet because we want to organize it properly).
