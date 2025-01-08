
FROM node:lts

RUN mkdir /myapp
COPY ./* /myapp
WORKDIR /myapp

RUN npm ci
RUN npx playwright install --with-deps

