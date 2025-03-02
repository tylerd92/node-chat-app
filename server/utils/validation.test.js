import {expect} from 'chai';
import {isRealString} from './validation.js';

describe('isRealString', () => {

    it('should reject non-string values', () => {
        var notString = 4;
        var res = isRealString(notString);
        expect(res).to.equal(false);
    });

    it('should reject string with only spaces', () => {
        var onlySpaces = '     ';
        var res = isRealString(onlySpaces);
        expect(res).to.equal(false);
    });

    it('should allow string with non space characters', () => {
        var aString = '  Tyler  ';
        var res = isRealString(aString);
        expect(res).to.equal(true);
    })
});