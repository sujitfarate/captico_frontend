# Use official Nginx image
FROM nginx:latest

# Copy website files into Nginx folder
COPY ./build /usr/share/nginx/html

# Expose port 80
EXPOSE 80
