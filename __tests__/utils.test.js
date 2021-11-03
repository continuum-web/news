const db = require('../db/connection.js');

const {
	articleData,
	commentData,
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
		// it('should return the array article data in the array in array format', () => {
		// 	const output = [
		// 		[
		// 			'Living in the shadow of a great man',
		// 			'mitch',
		// 			'butter_bridge',
		// 			'I find this existence challenging',
		// 			'Thu Jul 09 2020 22:11:00 GMT+0100 (British Summer Time)',
		// 			100,
		// 		],
		// 		[
		// 			'Sony Vaio; or, The Laptop',
		// 			'mitch',
		// 			'icellusedkars',
		// 			'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
		// 			'Fri Oct 16 2020 07:03:00 GMT+0100 (British Summer Time)',
		// 			0,
		// 		],
		// 		[
		// 			'Eight pug gifs that remind me of mitch',
		// 			'mitch',
		// 			'icellusedkars',
		// 			'some gifs',
		// 			'Tue Nov 03 2020 09:12:00 GMT+0000 (Greenwich Mean Time)',
		// 			0,
		// 		],
		// 		[
		// 			'Student SUES Mitch!',
		// 			'mitch',
		// 			'rogersop',
		// 			'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
		// 			'Wed May 06 2020 03:14:00 GMT+0100 (British Summer Time)',
		// 			0,
		// 		],
		// 		[
		// 			'UNCOVERED: catspiracy to bring down democracy',
		// 			'cats',
		// 			'rogersop',
		// 			'Bastet walks amongst us, and the cats are taking arms!',
		// 			'Mon Aug 03 2020 15:14:00 GMT+0100 (British Summer Time)',
		// 			0,
		// 		],
		// 		[
		// 			'A',
		// 			'mitch',
		// 			'icellusedkars',
		// 			'Delicious tin of cat food',
		// 			'Sun Oct 18 2020 03:00:00 GMT+0100 (British Summer Time)',
		// 			0,
		// 		],
		// 		[
		// 			'Z',
		// 			'mitch',
		// 			'icellusedkars',
		// 			'I was hungry.',
		// 			'Tue Jan 07 2020 14:08:00 GMT+0000 (Greenwich Mean Time)',
		// 			0,
		// 		],
		// 		[
		// 			'Does Mitch predate civilisation?',
		// 			'mitch',
		// 			'icellusedkars',
		// 			'Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!',
		// 			'Fri Apr 17 2020 03:08:00 GMT+0100 (British Summer Time)',
		// 			0,
		// 		],
		// 		[
		// 			"They're not exactly dogs, are they?",
		// 			'mitch',
		// 			'butter_bridge',
		// 			'Well? Think about it.',
		// 			'Sat Jun 06 2020 11:10:00 GMT+0100 (British Summer Time)',
		// 			0,
		// 		],
		// 		[
		// 			'Seven inspirational thought leaders from Manchester UK',
		// 			'mitch',
		// 			'rogersop',
		// 			"Who are we kidding, there is only one, and it's Mitch!",
		// 			'Thu May 14 2020 06:15:00 GMT+0100 (British Summer Time)',
		// 			0,
		// 		],
		// 		[
		// 			'Am I a cat?',
		// 			'mitch',
		// 			'icellusedkars',
		// 			'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
		// 			'Wed Jan 15 2020 22:21:00 GMT+0000 (Greenwich Mean Time)',
		// 			0,
		// 		],
		// 		[
		// 			'Moustache',
		// 			'mitch',
		// 			'butter_bridge',
		// 			'Have you seen the size of that thing?',
		// 			'Sun Oct 11 2020 13:24:00 GMT+0100 (British Summer Time)',
		// 			0,
		// 		],
		// 	];
		// 	expect(formatDataForEntry(articleData)).toEqual(output);
		// });
		// it('should return the array comment data in the array in array format', () => {
		// 	const output = [
		// 		[
		// 			"Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
		// 			16,
		// 			'butter_bridge',
		// 			9,
		// 			'Mon Apr 06 2020 14:17:00 GMT+0100 (British Summer Time)',
		// 		],
		// 		[
		// 			'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
		// 			14,
		// 			'butter_bridge',
		// 			1,
		// 			'Sat Oct 31 2020 03:03:00 GMT+0000 (Greenwich Mean Time)',
		// 		],
		// 		[
		// 			'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
		// 			100,
		// 			'icellusedkars',
		// 			1,
		// 			'Sun Mar 01 2020 01:13:00 GMT+0000 (Greenwich Mean Time)',
		// 		],
		// 		[
		// 			' I carry a log — yes. Is it funny to you? It is not to me.',
		// 			-100,
		// 			'icellusedkars',
		// 			1,
		// 			'Sun Feb 23 2020 12:01:00 GMT+0000 (Greenwich Mean Time)',
		// 		],
		// 		[
		// 			'I hate streaming noses',
		// 			0,
		// 			'icellusedkars',
		// 			1,
		// 			'Tue Nov 03 2020 21:00:00 GMT+0000 (Greenwich Mean Time)',
		// 		],
		// 		[
		// 			'I hate streaming eyes even more',
		// 			0,
		// 			'icellusedkars',
		// 			1,
		// 			'Sat Apr 11 2020 23:02:00 GMT+0100 (British Summer Time)',
		// 		],
		// 		[
		// 			'Lobster pot',
		// 			0,
		// 			'icellusedkars',
		// 			1,
		// 			'Fri May 15 2020 22:19:00 GMT+0100 (British Summer Time)',
		// 		],
		// 		[
		// 			'Delicious crackerbreads',
		// 			0,
		// 			'icellusedkars',
		// 			1,
		// 			'Tue Apr 14 2020 22:19:00 GMT+0100 (British Summer Time)',
		// 		],
		// 		[
		// 			'Superficially charming',
		// 			0,
		// 			'icellusedkars',
		// 			1,
		// 			'Wed Jan 01 2020 03:08:00 GMT+0000 (Greenwich Mean Time)',
		// 		],
		// 		[
		// 			'git push origin master',
		// 			0,
		// 			'icellusedkars',
		// 			3,
		// 			'Sat Jun 20 2020 09:24:00 GMT+0100 (British Summer Time)',
		// 		],
		// 		[
		// 			'Ambidextrous marsupial',
		// 			0,
		// 			'icellusedkars',
		// 			3,
		// 			'Sun Sep 20 2020 01:10:00 GMT+0100 (British Summer Time)',
		// 		],
		// 		[
		// 			'Massive intercranial brain haemorrhage',
		// 			0,
		// 			'icellusedkars',
		// 			1,
		// 			'Mon Mar 02 2020 07:10:00 GMT+0000 (Greenwich Mean Time)',
		// 		],
		// 		[
		// 			'Fruit pastilles',
		// 			0,
		// 			'icellusedkars',
		// 			1,
		// 			'Mon Jun 15 2020 12:25:00 GMT+0100 (British Summer Time)',
		// 		],
		// 		[
		// 			'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.',
		// 			16,
		// 			'icellusedkars',
		// 			5,
		// 			'Tue Jun 09 2020 07:00:00 GMT+0100 (British Summer Time)',
		// 		],
		// 		[
		// 			"I am 100% sure that we're not completely sure.",
		// 			1,
		// 			'butter_bridge',
		// 			5,
		// 			'Tue Nov 24 2020 00:08:00 GMT+0000 (Greenwich Mean Time)',
		// 		],
		// 		[
		// 			'This is a bad article name',
		// 			1,
		// 			'butter_bridge',
		// 			6,
		// 			'Sun Oct 11 2020 17:23:00 GMT+0100 (British Summer Time)',
		// 		],
		// 		[
		// 			'The owls are not what they seem.',
		// 			20,
		// 			'icellusedkars',
		// 			9,
		// 			'Sat Mar 14 2020 17:02:00 GMT+0000 (Greenwich Mean Time)',
		// 		],
		// 		[
		// 			'This morning, I showered for nine minutes.',
		// 			16,
		// 			'butter_bridge',
		// 			1,
		// 			'Tue Jul 21 2020 02:20:00 GMT+0100 (British Summer Time)',
		// 		],
		// 	];
		// 	expect(formatDataForEntry(commentData)).toEqual(output);
		// });
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
