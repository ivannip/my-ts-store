
From node:16 as base
WORKDIR /root/
COPY ./frontend/. ./frontend/.

COPY ./backend/. ./backend/.

# COPY .env /root/.

RUN npm ci --prefix ./backend
RUN npm run build --prefix ./backend

RUN npm ci --prefix ./frontend
RUN npm run build --prefix ./frontend

EXPOSE 3001
CMD [ "node", "./backend/dist/app.js" ]