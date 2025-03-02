import {expect} from 'chai';
import {generateMessage, generateLocationMessage} from './message.js';

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Tyler';
        var text = 'Test message';
        var res = generateMessage(from, text);
        expect(res.from).to.equal(from);
        expect(res.text).to.equal(text);
        expect(res.createdAt).to.be.a('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = 13;
        var longtitude = 19;
        var url = 'https://google.com/maps?q=13,19';
        var message = generateLocationMessage(from, latitude, longtitude);

        expect(message.from).to.equal(from);
        expect(message.url).to.equal(url);
        expect(message.createdAt).to.be.a('number');

    });
}); 