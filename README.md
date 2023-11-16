# E-Cars
 Building E-Commerce Systems Project <br>
How to run the project:
- For each Microservice folder:
 cd into the folder: `cd <serviceName>`
1) Install dependencies:<br>
   `npm install`
2) Initialize Prisma ORM:<br>
   `npx prisma migrate dev --name init`
3) Generate Prisma Client:<br>
   `npx prisma generate`
4) Run the microservice:<br>
  For Development:
  `npm run dev`

  For a Production Build:
  `npm run build` then `npm run start`

