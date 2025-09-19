- name: Checkout repository
  uses: actions/checkout@v3

- name: Install Node dependencies
  run: npm install

- name: Build Vite project
  run: npm run build

- name: Deploy to Docker Nginx
  run: |
    docker cp dist/. mysite-nginx:/usr/share/nginx/html
    docker exec mysite-nginx nginx -s reload
