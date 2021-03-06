const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

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
	describe('Happy Path', () => {
		it.only('STATUS: 200, it receive a 200 status and a rows from the database ', () => {
			return request(app)
				.get('/api/articles')
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).toHaveLength(12);
					articles.forEach(article => {
						expect(article).toEqual(
							expect.objectContaining({
								article_id: expect.any(Number),
								author: expect.any(String),
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
		describe('Status 200: check default response for  for sort Order', () => {
			it('should check if the database returns an order as default creates_at and desc', () => {
				return request(app)
					.get('/api/articles')
					.expect(200)
					.then(({ body: { articles } }) => {
						expect(articles).toHaveLength(12);
						expect(articles).toBeSortedBy('created_at', {
							descending: true,
						});
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
		describe.only('Should allow topics', () => {
			it('should allow the user to pass through a topic ', () => {
				return request(app)
					.get('/api/articles?topic=cats')
					.expect(200)
					.then(({ body }) => {
						const { articles } = body;

						articles.forEach(article => {
							expect(article.topic).toEqual('cats');
						});
					});
			});
			it('should allow the user to pass through a topic ', () => {
				return request(app)
					.get('/api/articles?topic=mitch')
					.expect(200)
					.then(({ body }) => {
						const { articles } = body;

						articles.forEach(article => {
							expect(article.topic).toEqual('mitch');
						});
					});
			});
		});
		describe('Should allow user to sort ASC or DESC', () => {
			it('should allow the user to pass through a sort direction defaulting to DESC', () => {
				return request(app)
					.get('/api/articles?order=desc')
					.expect(200)
					.then(({ body }) => {
						const articles = body.articles;

						expect(articles).toBeSortedBy('created_at', {
							descending: true,
						});
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
			it('Should get a status 400 bad request when trying to sort by an invalid order ie ASC or DESC', () => {
				return request(app)
					.get('/api/articles?order=POTATO')
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
						const { msg } = body;
						expect(msg).toEqual('not found');
					});
			});
			it('checks for an NOT a topic', () => {
				return request(app)
					.get('/api/articles?topic=NOTATOPIC')
					.expect(404)
					.then(({ body }) => {
						const { msg } = body;
						expect(msg).toEqual('not found');
					});
			});
		});
	});
});

describe('ENDPOINT: GET /api/articles/:article_id', () => {
	describe('Happy Path', () => {
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
					expect(body.msg).toEqual('not found');
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
	describe('Happy Path', () => {
		it('STATUS: 200, it receive a 200 status and a rows from the comments table ', () => {
			const articleRequired = 1;
			return request(app)
				.get(`/api/articles/${articleRequired}/comments`)
				.expect(200)
				.then(({ body }) => {
					const comments = body.comments;

					expect(comments).toHaveLength(11);

					comments.forEach(comment => {
						expect(comment).toEqual(
							expect.objectContaining({
								article_id: 1,
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
});

describe('ENDPOINT: GET /api/users', () => {
	describe('Happy Path', () => {
		it('STATUS: 200should return an array of users', () => {
			return request(app)
				.get('/api/users')
				.expect(200)
				.then(({ body: { users } }) => {
					expect(users).toHaveLength(4);
					expect(users).toEqual([
						{
							username: 'butter_bridge',
							avatar_url:
								'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
							name: 'jonny',
						},
						{
							username: 'icellusedkars',
							avatar_url:
								'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
							name: 'sam',
						},
						{
							username: 'rogersop',
							avatar_url:
								'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
							name: 'paul',
						},
						{
							username: 'lurker',
							avatar_url:
								'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
							name: 'do_nothing',
						},
					]);
				});
		});
		it('STATUS: 200 should return a single user with the :user_id', () => {
			const user_id = 'icellusedkars';
			return request(app)
				.get(`/api/users/${user_id}`)
				.expect(200)
				.then(({ body: { users } }) => {
					expect(users).toHaveLength(1);
					expect(users[0]).toEqual({
						username: 'icellusedkars',
						avatar_url:
							'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
						name: 'sam',
					});
				});
		});
	});
	describe('Sad Path', () => {
		it('Status: 404 not found when passed an unknown user', () => {
			const user_id = 'banana';
			return request(app)
				.get(`/api/users/${user_id}`)
				.expect(404)
				.then(({ body: { msg } }) => {
					expect(msg).toEqual('not found');
				});
		});
		it('STATUS: 400 bad request when passed something this is not a string', () => {
			const user_id = 2;
			return request(app)
				.get(`/api/users/${user_id}`)
				.expect(400)
				.then(({ body: { msg } }) => {
					expect(msg).toEqual('bad request');
				});
		});
	});
});
