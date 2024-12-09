# Datacakra Backend Developer Test
## Structure
- config: Contains database configuration
- controllers: Contains the code handling requests and responses
- db: Contains items necessary for database definition and connection
    - migrations: Contains database migrations generated by Sequelize
    - models: Contains database table model definitions
- enums: Contains additional enum definitions
- middlewares: Contains additional middleware used such as authorization
- routes: Contains route definitions used by the service
- services: Contains data access layer logic used by the controllers
- tests: Contains test script definitions
- index.ts: The program handling app startup and connection

## API Routes
- User (`/user`)
    - Sign up (`POST /signup`)
    - Log in (`POST /login`)
    - Get user data (`GET /:id`)
    - Update user data (`PUT /:id`)
    - Deactivate user (`DELETE /:id`)
    - Verify user (`POST /verify/:id`)
- Profile Activity (`/activity`)
    - Get target list (`GET /next`)
    - Register activity (`POST /action`)
- Payment (`/payment`)
    - Create payment (`POST /`)
    - Mark as paid (`PUT /:id`)

## Running the service
- Run `npm install` to install module dependencies needed
- Set up a .env file following the example shown in .env.example
- Run `npx sequelize-cli db:migrate` to migrate database definitions in the current environment
- Run either `npm run dev` or `npm run build` then `npm start` to start the service