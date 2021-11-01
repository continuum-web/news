const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const { formatDataForEntry } = require('../db/utils');

// beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('tests the format utility function', () => {
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
        expect(formatDataForEntry(input)).toEqual(output)
    })
    
});
