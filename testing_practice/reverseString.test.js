import { reverseString } from './reverseString';

test('reverses a string', () => {
    expect(reverseString('hello')).toBe('olleh');
});

test('returns an empty string when input is empty', () => {
    expect(reverseString('')).toBe('');
});
