import express from 'express';
import { createNewUser } from "../controllers/user-controller";
const request = require('supertest');

const app = express();
app.get('/self', createNewUser);

test('should return 200', async () => {
    const testUser = {
        "firstName": "Test 8",
        "lastName": "Test 8",
        "email": "test8@gmail.com",
        "password": "test8"
    }

    const res = await request(app)
        .get('/self')
        .send(testUser)
        .set('content-length', JSON.stringify(testUser).length.toString());

    expect(res.status).toBe(200);
    expect(res.body).toEqual();
}, 20000);