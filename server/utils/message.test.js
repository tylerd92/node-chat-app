var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');  

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = 13;
        var longtitude = 19;
        var url = 'https://google.com/maps?q=13,19';
        var message = generateLocationMessage(from, latitude, longtitude);

        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(message.createdAt).toBeA('number');

    });
}); 