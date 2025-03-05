import {expect} from 'chai';
import {isRealString} from './validation.js';

describe('isRealString', () => {

    it('should reject non-string values', () => {
        const notString = 4;
        const res = isRealString(notString);
        expect(res).to.equal(false);
    });

    it('should reject string with only spaces', () => {
        const onlySpaces = '     ';
        const res = isRealString(onlySpaces);
        expect(res).to.equal(false);
    });

    it('should allow string with non space characters', () => {
        const aString = '  Tyler  ';
        const res = isRealString(aString);
        expect(res).to.equal(true);
    })
});