FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm test
EXPOSE 3000
CMD ["npm", "start"]
