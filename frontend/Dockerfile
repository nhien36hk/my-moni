FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# Mặc định chạy server dev của Vite để hỗ trợ Hot Reload
CMD ["npm", "run", "dev", "--", "--host"]
