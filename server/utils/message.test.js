var expect = require('expect');

var {generateMessage} = require('./message');  

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Tyler';
        var text = 'Test message';
        var res = generateMessage(from, text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(res.createdAt).toBeA('number');
    });
});