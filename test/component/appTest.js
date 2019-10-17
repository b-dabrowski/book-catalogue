const httpClient = require('supertest');
const assert = require('assert');
const app = require('../../src/app');

describe('Book inventory', function () {
    it('allows to stock up the items', async function () {
        const request = httpClient(app);

        for(let i = 100 ; i < 200; ++i) {
            await request
                .post('/book')
                .send({
                    title: "JavaScript in Action",
                    authors: ["James Smith", "Kate Donovan"],
                    isbn: `0123456${i}`,
                    description: "The ultimate JS book!"
                })
                .set('Content-Type', 'application/json')
                .expect(302);
        }

        // POST/REDIRECT
        const createResult = await request
            .post('/book')
            .send({
                title: "JavaScript in Action",
                authors: ["James Smith", "Kate Donovan"],
                isbn: "0123456789",
                description: "The ultimate JS book!"
            })
            .set('Content-Type', 'application/json')
            .expect(302);
        // GET
        const readResult = await request.get(createResult.header.location).set("Accept", "application/json").expect(200);

        assert.deepStrictEqual(readResult.body, {
            title: "JavaScript in Action",
            slug: "javascript-in-action",
            authors: ["James Smith", "Kate Donovan"],
            isbn: "0123456789",
            description: "The ultimate JS book!"
        });

        await request.delete(createResult.header.location).expect(204);

        await request.get(createResult.header.location).expect(404);
    })
});
