const db = require('../db/connection.js');

const {
	topicData,
	userData,
} = require('../db/data/test-data/index.js');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed.js');
const { formatDataForEntry } = require('../db/utils');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('tests the format utility function', () => {
	describe('tests with simple data in variables', () => {
		it('should return an array', () => {
			expect(formatDataForEntry([])).toEqual([]);
		});
		it('should convert an array of object to an array of array with a single object', () => {
			const input = [
				{
					description: 'The man, the Mitch, the legend',
					slug: 'mitch',
				},
			];
			const output = [['The man, the Mitch, the legend', 'mitch']];
			expect(formatDataForEntry(input)).toEqual(output);
		});
		it('should convert an array of object to an array of array with a multiple objects', () => {
			const input = [
				{
					description: 'The man, the Mitch, the legend',
					slug: 'mitch',
				},
				{
					description: 'Not dogs',
					slug: 'cats',
				},
				{
					description: 'what books are made of',
					slug: 'paper',
				},
			];
			const output = [
				['The man, the Mitch, the legend', 'mitch'],
				['Not dogs', 'cats'],
				['what books are made of', 'paper'],
			];
			expect(formatDataForEntry(input)).toEqual(output);
		});
	});
	describe('tests with sample data from the DB seed test data', () => {
		
		it('should return the array topic data in the array in array format', () => {
			const output = [
				['The man, the Mitch, the legend', 'mitch'],
				['Not dogs', 'cats'],
				['what books are made of', 'paper'],
			];
			expect(formatDataForEntry(topicData)).toEqual(output);
		});
		it('should return the array user data in the array in array format', () => {
			const output = [
				[
					'butter_bridge',
					'jonny',
					'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
				],
				[
					'icellusedkars',
					'sam',
					'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
				],
				[
					'rogersop',
					'paul',
					'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
				],
				[
					'lurker',
					'do_nothing',
					'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
				],
			];
			expect(formatDataForEntry(userData)).toEqual(output);
		});
	});
});
describe('these tests are for the integrity of the database', () => {
	describe('formatting for each table', () => {
		it('should return a properly formatted set of rows for topics', () => {
			return db.query('SELECT * FROM topics').then(({ rows }) => {
				rows.forEach(row => {
					expect(row).toEqual(
						expect.objectContaining({
							slug: expect.any(String),
							description: expect.any(String),
						})
					);
				});
			});
		});
		it('should return a properly formatted set of rows for users', () => {
			return db.query('SELECT * FROM users').then(({ rows }) => {
				rows.forEach(row => {
					expect(row).toEqual(
						expect.objectContaining({
							username: expect.any(String),
							avatar_url: expect.any(String),
							name: expect.any(String),
						})
					);
				});
			});
		});
		it('should return a properly formatted set of rows for articles', () => {
			return db.query('SELECT * FROM articles').then(({ rows }) => {
				rows.forEach(row => {
					expect(row).toEqual(
						expect.objectContaining({
							article_id: expect.any(Number),
							author: expect.any(String),
							body: expect.any(String),
							created_at: expect.anything(),
							title: expect.any(String),
							topic: expect.any(String),
							votes: expect.any(Number),
						})
					);
				});
			});
		});
		it('should return a properly formatted set of rows for articles', () => {
			return db.query('SELECT * FROM comments').then(({ rows }) => {
				rows.forEach(row => {
					expect(row).toEqual(
						expect.objectContaining({
							comment_id: expect.any(Number),
							author: expect.any(String),
							article_id: expect.any(Number),
							votes: expect.any(Number),
							created_at: expect.anything(),
							body: expect.any(String),
						})
					);
				});
			});
		});
	});
});
