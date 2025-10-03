FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install  --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "index.js"]
