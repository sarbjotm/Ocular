FROM nginx:latest

# Copy a local file when building the image:
# Helpful: https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY planner /planner
COPY logout.js /static/logout.js
COPY login.css /static/login.css

# The command to run when the container starts (default for this image would be fine too):
CMD nginx -g "daemon off; error_log /dev/stdout info;"