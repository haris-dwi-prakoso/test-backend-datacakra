const dotenv = (require("dotenv").config()).parsed;
module.exports = {
    "development": {
        "username": dotenv.DB_USER_DEV,
        "password": dotenv.DB_PASS_DEV,
        "database": dotenv.DB_NAME_DEV,
        "host": dotenv.DB_HOST_DEV,
        "dialect": "postgres"
    },
    "test": {
        "username": dotenv.DB_USER_TEST,
        "password": dotenv.DB_PASS_TEST,
        "database": dotenv.DB_NAME_TEST,
        "host": dotenv.DB_HOST_TEST,
        "dialect": "postgres"
    },
    "production": {
        "username": dotenv.DB_USER_PROD,
        "password": dotenv.DB_PASS_PROD,
        "database": dotenv.DB_NAME_PROD,
        "host": dotenv.DB_HOST_PROD,
        "dialect": "postgres"
    }
}
