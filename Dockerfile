FROM node:10.19.0
RUN mkdir -p /home/easyshop/api
WORKDIR /home/easyshop/api
COPY . ./
RUN npm install --quiet
EXPOSE 8000
CMD [ "npm", "start" ]
