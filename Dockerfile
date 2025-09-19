# Use official Nginx image
FROM nginx:latest

# Copy production build files into Nginx
COPY ./dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
