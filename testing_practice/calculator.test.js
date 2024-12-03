import { calculator } from './calculator';

test('adds two numbers correctly', () => {
    expect(calculator.add(2, 3)).toBe(5);
});

test('subtracts two numbers correctly', () => {
    expect(calculator.subtract(5, 3)).toBe(2);
});

test('multiplies two numbers correctly', () => {
    expect(calculator.multiply(2, 3)).toBe(6);
});

test('divides two numbers correctly', () => {
    expect(calculator.divide(6, 3)).toBe(2);
});

test('returns error when dividing by zero', () => {
    expect(calculator.divide(6, 0)).toBe('Error: Division by zero');
});
