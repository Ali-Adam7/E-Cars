# E-Cars

Building E-Commerce Systems Project <br>

  ## Run using Docker:
  Each Microservice has a Docker File.<br>
  Run the Docker Compose file from the main folder using: <br>
  
  `docker-compose up` <br>
  
  Then run NextJS client using: <br>
  
   `npm run dev` or `npm run start` <br>

   The client is at http://localhost


## Run Locally:

- For each Microservice folder:
 cd into the folder: `cd <serviceName>`
1) Install dependencies:<br>

   `npm install`

2) add .env file in the main directory with the database connection string: <br>

`DATABASE_URL=mysql://username:password@127.0.0.1:3306/<serviceName>`

4) Initialize Prisma ORM:<br>

   `npx prisma migrate dev --name init`
   
6) Generate Prisma Client:<br>

   `npx prisma generate`
   
8) Run the microservice:<br>

  For Development:
  
  `npm run dev`

  For a Production Build:
  
  `npm run start`
  <br>

   The client is at http://localhost

  
