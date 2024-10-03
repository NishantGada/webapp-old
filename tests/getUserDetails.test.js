import express from 'express';
import { getUserDetails } from "../controllers/user-controller";
import { checkValidUser } from '../controllers/user-controller';
const request = require('supertest');

const app = express();
app.get('/self', getUserDetails);

const testUser = {
    "id": 7,
    "firstName": "Test 8",
    "lastName": "Test 8",
    "email": "test8@gmail.com",
    "accountUpdated": "2024-10-03T16:34:30.792Z",
    "accountCreated": "2024-10-03T16:34:30.792Z"
}

test('should return 400 if request body is present', async () => {
    const res = await request(app)
        .get('/self')
        .set('content-length', '10');

    expect(res.status).toBe(400);
    expect(res.body).toEqual("");
});