import express from 'express';
import { getUserDetails } from "../controllers/user-controller";
import { checkValidUser } from '../controllers/user-controller';
const request = require('supertest');

const app = express();
app.get('/v1/user/self', getUserDetails);

const testUser = {
    "id": 7,
    "firstName": "Test 8",
    "lastName": "Test 8",
    "email": "test8@gmail.com",
    "accountUpdated": "2024-10-03T16:34:30.792Z",
    "accountCreated": "2024-10-03T16:34:30.792Z"
}

test('test-case-1:: should return 400 if request body is present', async () => {
    const res = await request(app)
        .get('/v1/user/self')
        .send(testUser)
        .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body).toEqual("");
});

test('test-case-2:: should return 200 for basic auth match', async () => {
    const res = await request(app)
        .get('/v1/user/self')
        .auth('test1@gmail.com', 'test1');

    expect(res.status).toBe(200);
});

test('test-case-3:: should return 400 for basic auth mismatch', async () => {
    const res = await request(app)
        .get('/v1/user/self')
        .auth('test1@gmail.com', 'test2');

    expect(res.status).toBe(400);
    expect(res.body).toEqual("");
});

test('test-case-4:: should return 401 for basic auth for missing username', async () => {
    const res = await request(app)
        .get('/v1/user/self')
        .auth('', 'test2');

    expect(res.status).toBe(401);
});

test('test-case-5:: should return 400 for basic auth for missing password', async () => {
    const res = await request(app)
        .get('/v1/user/self')
        .auth('test1@gmail.com', '');

    expect(res.status).toBe(401);
});