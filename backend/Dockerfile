FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
# Mặc định chạy nodemon
CMD ["npm", "run", "dev"]
