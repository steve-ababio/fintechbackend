# Fintech Backend

## 1. Install Dependencies
    1. Run npm install to install all the dependencies

## 2. Create and setup Database (postgresql)
    1. Run npx prisma db push to  push this schema to your database.
    2. Run npx prisma generate to generate prisma client to run queries on the database.

## 3. Start the REST API server
    Run npm run start to start the server

## 4. Provide values for the following environment variables
    1. PORT
    2. SMTP_USERNAME
    3. SMTP_PASSWORD
    4. EMAIL_SECRET
    5. AUTH_SECRET
    6. DATABASE_URL