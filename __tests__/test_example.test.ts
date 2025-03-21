import { describe, expect, it } from '@jest/globals';

describe('Test suit example for whatever...', () => {
    it('should pass after 2 seconds, but this is a bad test...', (done) => {
        setTimeout(() => {
            console.log('This message is displayed after 2 seconds');
            expect(1).toBe(1);
            done();
        }, 2000);
    });

    it('should pass just pass...', () => {
        expect(1).toBe(1);
    });
});
