const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('Tests the core routes of the app', () => {
	it('should receive a status of 200 and a welcome message when visiting /api', () => {
		return request(app)
			.get('/api')
			.expect(200)
			.then(({ body }) => {
				const msg = body.msg;
				console.log(msg);
				expect(msg).toEqual('Welcome to the API');
			});
	});
});
describe('ENDPOINT: GET /api/topics', () => {
	describe('happy path:', () => {
		it('should receive the status of 200 with the rows of the database', () => {
			return request(app)
				.get('/api/topics')
				.expect(200)
				.then(({ body }) => {
					expect(body.topics).toEqual([
						{
							slug: 'mitch',
							description: 'The man, the Mitch, the legend',
						},
						{ slug: 'cats', description: 'Not dogs' },
						{
							slug: 'paper',
							description: 'what books are made of',
						},
					]);
				});
		});
	});
});

describe.only('ENDPOINT: GET GET /api/articles', () => {
	describe('happy Path', () => {
		it('STATUS: 200, it receive a 200 status and a rows from the database ', () => {
			return request(app)
				.get('/api/articles')
				.expect(200)
				.then(({ body }) => {
					console.log(body);
					const articles = body.articles;

					articles.forEach(article => {
						//console.log(article)
						expect(article).toEqual(
							expect.objectContaining({
								article_id: expect.any(Number),
								title: expect.any(String),
								body: expect.any(String),
								votes: expect.any(Number),
								topic: expect.any(String),
								author: expect.any(String),
								created_at: expect.anything(),
							})
						);
					});
				});
		});
	});
});
