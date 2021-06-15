FROM node AS builder
WORKDIR /usr/app
COPY . .
COPY package*.json .
RUN npm ci
COPY ./prisma ./prisma
RUN npx prisma migrate deploy
RUN npm run build

FROM node:14.17-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install --only=prod
COPY --from=builder /usr/app/prisma ./prisma
COPY --from=builder /usr/app/dist ./dist

EXPOSE 5000
CMD [ "node", "dist/index.js" ]