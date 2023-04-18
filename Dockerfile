FROM node:lts-alpine3.16@sha256:418340baef60cf1c142e15d8378dcb0e7dd5145956c3a4ebbb0eba551c18a6f7

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
