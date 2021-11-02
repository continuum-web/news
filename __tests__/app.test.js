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
				//console.log(msg);
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

describe('ENDPOINT: GET /api/articles', () => {
	describe('happy Path', () => {
		it.only('STATUS: 200, it receive a 200 status and a rows from the database ', () => {
			return request(app)
				.get('/api/articles')
				.expect(200)
				.then(({ body }) => {
					//console.log(body);
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
                                comment_count: expect.any(Number)
							})
						);
					});
				});
		});
	});
});

describe('ENDPOINT: GET /api/articles/:article_id', () => {
	describe('happy Path', () => {
		it.only('STATUS: 200, it receive a 200 status and a rows from the database ', () => {
			const articleRequired = 1;
			return request(app)
				.get('/api/articles/1')
				.expect(200)
                .then(({ body } ) => {
					console.log(`THIS IS THE BODY`, body);
					const articles = body.articles;
					expect(articles).toEqual([
						{
							article_id: 1,
							title: 'Living in the shadow of a great man',
							body: 'I find this existence challenging',
							votes: 100,
							topic: 'mitch',
							author: 'butter_bridge',
                            created_at: '2020-07-09T20:11:00.000Z',
                            comment_count: 11
						},
					]);
				});
		});
    });
    describe('SAD PATH, tests GET /api/articles/:article_id', () => {
		it('should test for incorrect article id example not an INT', () => {
			const article_id = 'NotAnInt';
			return request(app)
				.get(`/api/articles/${article_id}`)
				.expect(400)
				.then(({ body }) => {
					const msg = body.msg;
					expect(msg).toEqual('invalid data type');
				});
		});
		it('STATUS 404: should check for a number but handle if its NOT in the db', () => {
			const article_id = '9999';
			return request(app)
				.get(`/api/articles/${article_id}`)
				.expect(404)
				.then(({ body }) => {
					const msg = body.msg;
					expect(msg).toEqual('not found');
				});
		});
	});
});

describe('ENDPOINT: GET /api/articles/:article_id/comments', () => {
	describe('happy Path', () => {
		it('STATUS: 200, it receive a 200 status and a rows from the comments table ', () => {
			const articleRequired = 1;
			return request(app)
				.get(`/api/articles/${articleRequired}/comments`)
				.expect(200)
				.then(({ body }) => {
                    const comments = body.comments;
                    //console.log(comments)
                    comments.forEach((comment) => {
                        expect(comment).toEqual(
						
								expect.objectContaining({
									article_id: expect.any(Number),
									title: expect.any(String),
									body: expect.any(String),
									votes: expect.any(Number),
									topic: expect.any(String),
									author: expect.any(String),
                                    created_at: expect.anything(),
                                    comment_id: expect.any(Number)
								})
							
						);
                    })
				});
		});
	});
});

