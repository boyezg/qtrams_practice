// caesarCipher.js
export function caesarCipher(str, shift) {
    return str
        .split('')
        .map((char) => {
            if (/[a-zA-Z]/.test(char)) {
                const base = char < 'a' ? 65 : 97;
                return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
            }
            return char;
        })
        .join('');
}
