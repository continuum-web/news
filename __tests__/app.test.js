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
		it('STATUS: 200, it receive a 200 status and a rows from the database ', () => {
			return request(app)
				.get('/api/articles')
				.expect(200)
				.then(({ body }) => {
					const { articles } = body;

					articles.forEach(article => {
						expect(article).toEqual(
							expect.objectContaining({
								article_id: expect.any(Number),
								author: expect.any(String),
								body: expect.any(String),
								comment_count: expect.any(String),
								created_at: expect.anything(),
								title: expect.any(String),
								topic: expect.any(String),
								votes: expect.any(Number),
							})
						);
					});
				});
		});
		describe('Should allow queries', () => {
			it('should allow the user to pass through a sort_by Query that defaults to date', () => {
				return request(app)
					.get('/api/articles?sort_by=created_at')
					.expect(200)
					.then(articles => {
						expect(articles).toBeSortedBy('created_at');
					});
			});
			it('should allow the user to pass sort_by=Votes', () => {
				return request(app)
					.get('/api/articles?sort_by=votes')
					.expect(200)
					.then(articles => {
						expect(articles).toBeSortedBy('votes');
					});
			});
		});
		describe('Should allow topics', () => {
			it('should allow the user to pass through a topic ', () => {
				return request(app)
					.get('/api/articles?topic=cats')
					.expect(200)
					.then(({ body }) => {
						const { articles } = body

						articles.forEach(article => {
							expect(article.topic).toEqual('cats')
						})
					});
			});
			it('should allow the user to pass through a topic ', () => {
				return request(app)
					.get('/api/articles?topic=mitch')
					.expect(200)
					.then(({ body }) => {
						const { articles } = body;
						console.log(articles)
						articles.forEach(article => {
							expect(article.topic).toEqual('mitch');
						});
					});
			});
		});
		describe('Should allow user to sort ASC or DESC', () => {
			it('should allow the user to pass through a sort direction defaulting to DESC', () => {
				return request(app)
					.get('/api/articles?order=asc')
					.expect(200)
					.then(({ body }) => {
						const articles = body.articles;

						expect(articles).toBeSortedBy('created_at');
					});
			});
			it('Tests to allow sorting article_id column', () => {
				return request(app)
					.get('/api/articles?sort_by=article_id&order=asc')
					.expect(200)
					.then(({ body }) => {
						const articles = body.articles;

						expect(articles).toBeSortedBy('article_id');
					});
			});
		});
	});
	describe('SAD PATH', () => {
		describe('Should allow queries', () => {
			it('Should get a status 400 bad request when trying to sort by an invalid column', () => {
				return request(app)
					.get('/api/articles?sort_by=POTATO')
					.expect(400)
					.then(({ body }) => {
						const { msg } = body;
						expect(msg).toEqual('bad request');
					});
			});
		});
		describe('Should test for empty and incorrect topics', () => {
			it('checks for an empty topic', () => {
				return request(app)
					.get('/api/articles?topic=paper')
					.expect(404)
					.then(({ body }) => {
						const { msg } = body
						expect(msg).toEqual('not found')
					});
			});
			it('checks for an NOT a topic', () => {
				return request(app)
					.get('/api/articles?topic=NOTATOPIC')
					.expect(400)
					.then(({ body }) => {
						const { msg } = body;
						expect(msg).toEqual('bad request');
					});
			});
		});
	});
})

describe('ENDPOINT: GET /api/articles/:article_id', () => {
	describe('happy Path', () => {
		it('STATUS: 200, it receive a 200 status and a rows from the database ', () => {
			const articleRequired = 1;
			return request(app)
				.get('/api/articles/1')
				.expect(200)
				.then(({ body }) => {
					const { articles } = body;
					expect(articles).toEqual([
						{
							article_id: 1,
							title: 'Living in the shadow of a great man',
							body: 'I find this existence challenging',
							votes: 100,
							topic: 'mitch',
							author: 'butter_bridge',
							created_at: '2020-07-09T20:11:00.000Z',
							comment_count: '11',
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
					expect(msg).toEqual('bad request'); //change to bad req
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

describe('ENDPOINT: PATCH /api/articles/:article_id', () => {
	describe('Happy Path', () => {
		it('should get a response on patching', () => {
			const body = {
				inc_votes: 2,
			};
			return request(app)
				.patch('/api/articles/1')
				.send(body)
				.expect(202)
				.then(({ body }) => {
					expect(body).toEqual({
						article_id: 1,
						title: 'Living in the shadow of a great man',
						body: 'I find this existence challenging',
						votes: 102,
						topic: 'mitch',
						author: 'butter_bridge',
						created_at: '2020-07-09T20:11:00.000Z',
					});
				});
		});
	});
	describe('SAD PATH:', () => {
		it('should test for incorrect article id example not an INT', () => {
			const article_id = 'NotAnInt';
			const body = {
				inc_votes: 2,
			};
			return request(app)
				.patch(`/api/articles/${article_id}`)
				.send(body)
				.expect(400)
				.then(({ body }) => {
					const msg = body.msg;
					expect(msg).toEqual('bad request');
				});
		});
		it('STATUS 404: should check for a number but handle if its NOT in the db', () => {
			const article_id = '9999';
			const body = {
				inc_votes: 2,
			};
			return request(app)
				.patch(`/api/articles/${article_id}`)
				.send(body)
				.expect(404)
				.then(({ body }) => {
					const msg = body.msg;
					expect(msg).toEqual('Not Found');
				});
		});
		it('STATUS 400: should check for a if inc_votes is a number', () => {
			const article_id = '1';
			const body = {
				inc_votes: 'NotAnInt',
			};
			return request(app)
				.patch(`/api/articles/${article_id}`)
				.send(body)
				.expect(400)
				.then(({ body }) => {
					const msg = body.msg;
					expect(msg).toEqual('bad request');
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

					comments.forEach(comment => {
						expect(comment).toEqual(
							expect.objectContaining({
								article_id: expect.any(Number),
								title: expect.any(String),
								body: expect.any(String),
								votes: expect.any(Number),
								topic: expect.any(String),
								author: expect.any(String),
								created_at: expect.anything(),
								comment_id: expect.any(Number),
							})
						);
					});
				});
		});
	});
});

describe('ENDPOINT: POST /api/articles/:article_id/comments', () => {
	describe('HAPPY PATH: ', () => {
		it('should get status 200 when posting to /api/articles/:article_id/comments ', () => {
			const article_id = 1;
			const body = { username: 'lurker', body: 'test' };
			return request(app)
				.post(`/api/articles/${article_id}/comments`)
				.send(body)
				.expect(201)
				.then(data => {
					const { comment } = data.body;

					expect(comment).toEqual({
						comment_id: 19,
						author: 'lurker',
						article_id: 1,
						votes: 0,
						created_at: expect.any(String),
						body: 'test',
					});
				});
		});
	});
});

describe('ENDPOINT: DELETE /api/comments/comment_id', () => {
	it('RETURNS status 200', () => {
		const comment_id = 3;
		return request(app).delete(`/api/comments/${comment_id}`).expect(204);
	});
})
