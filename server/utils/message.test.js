import {expect} from 'chai';
import {generateMessage, generateLocationMessage} from './message.js';

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Tyler';
        const text = 'Test message';
        const res = generateMessage(from, text);
        expect(res.from).to.equal(from);
        expect(res.text).to.equal(text);
        expect(res.createdAt).to.be.a('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Admin';
        const latitude = 13;
        const longtitude = 19;
        const url = 'https://google.com/maps?q=13,19';
        const message = generateLocationMessage(from, latitude, longtitude);

        expect(message.from).to.equal(from);
        expect(message.url).to.equal(url);
        expect(message.createdAt).to.be.a('number');

    });
}); 