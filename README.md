# E-Cars
 Building E-Commerce Systems Project <br>
How to run the project:
- For each Microservice folder:
 cd into the folder: `cd <serviceName>`
1) Install dependencies:<br>
   `npm install`

2) add .env file in the main directory with the database connection string: <br>
`DATABASE_URL=mysql://username:password@127.0.0.1:3306/<serviceName>`
4) Initialize Prisma ORM:<br>
   `npx prisma migrate dev --name init`
5) Generate Prisma Client:<br>
   `npx prisma generate`
6) Run the microservice:<br>
  For Development:
  `npm run dev`

  For a Production Build:
  `npm run build` then `npm run start`

