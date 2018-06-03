const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        var notString = 4;
        var res = isRealString(notString);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var onlySpaces = '     ';
        var res = isRealString(onlySpaces);
        expect(res).toBe(false);
    });

    it('should allow string with non space characters', () => {
        var aString = '  Tyler  ';
        var res = isRealString(aString);
        expect(res).toBe(true);
    })
});