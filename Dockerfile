FROM node:18

WORKDIR /weather

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4173

CMD npm run preview