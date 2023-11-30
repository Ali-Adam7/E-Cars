FROM node


WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

RUN npm install



# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .




EXPOSE 3000

RUN npm run build

CMD  npm run start 


