import request from 'supertest';
import app from '../index';

describe("Sign Up", () => {
    it('Registers inputted user data into the databasa', async () => {
        const response = await request(app).post('/user/signup').send({
            email: "test@sample.com",
            username: "test1",
            password: "test123"
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("User successfully registered.");
    })
});

describe("Login", () => {
    it('Signs user in and returns user data and token', async () => {
        const response = await request(app).post('/user/login').send({
            email: "test@sample.com",
            password: "test123"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.user.email).toBe("test@sample.com");
        expect(response.body.user.username).toBe("test1");
        expect(typeof response.body.token).toBe("string");
    })
})