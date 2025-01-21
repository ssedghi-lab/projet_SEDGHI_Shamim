FROM node:22.12.0-slim

WORKDIR /usr/src/app
COPY ./ ./
RUN npm clean-install
CMD ["node", "./server.js"]