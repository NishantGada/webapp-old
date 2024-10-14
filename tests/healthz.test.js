import express from 'express';
import { get } from '../controllers/healthz-controller';
const app = express();
const request = require('supertest');

app.get('/healthz', get);

test('test-case-1:: should return 200 method not allowed for "GET" request', async () => {
    const res = await request(app)
        .get('/healthz')

    expect(res.status).toBe(404);
    expect(res.body).toEqual("");
});

test('test-case-2:: should return 400 for unexpected query params', async () => {
    const res = await request(app)
        .get('/healthz?123')

    expect(res.status).toBe(400);
    expect(res.body).toEqual("");
});

test('test-case-3:: should return 400 for unexpected query params', async () => {
    const res = await request(app)
        .get('/healthz/?x=asd')

    expect(res.status).toBe(400);
    expect(res.body).toEqual("");
});
