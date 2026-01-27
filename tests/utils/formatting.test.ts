import { formatDate, formatNumber, truncateText, capitalize, slugify } from '@/utils/formatting';

describe('Formatting Utilities', () => {
  // Date formatting tests
  describe('formatDate function', () => {
    it('formats date to default format', () => {
      const date = new Date('2023-05-15');
      expect(formatDate(date)).toBe('May 15, 2023');
    });

    it('formats date to custom format', () => {
      const date = new Date('2023-05-15');
      expect(formatDate(date, 'DD/MM/YYYY')).toBe('15/05/2023');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-05-15');
      expect(formatDate(date, 'MM/DD/YYYY')).toBe('05/15/2023');
    });

    it('handles different date formats', () => {
      expect(formatDate(new Date())).toBeDefined();
      expect(formatDate('2023-05-15')).toBeDefined();
      expect(formatDate(1684108800000)).toBeDefined(); // Unix timestamp
    });

    it('formats with time when requested', () => {
      const date = new Date('2023-05-15T14:30:00');
      expect(formatDate(date, 'YYYY-MM-DD HH:mm')).toBe('2023-05-15 14:30');
    });

    it('handles invalid dates', () => {
      expect(() => formatDate('invalid-date')).toThrow();
      expect(() => formatDate(NaN as any)).toThrow();
    });

    it('formats dates in different locales', () => {
      const date = new Date('2023-05-15');
      expect(formatDate(date, 'MMMM D, YYYY', 'en-US')).toBe('May 15, 2023');
      expect(formatDate(date, 'D MMMM YYYY', 'en-GB')).toBe('15 May 2023');
    });

    it('formats relative times', () => {
      const recentDate = new Date();
      recentDate.setHours(recentDate.getHours() - 1);
      expect(formatDate(recentDate, 'relative')).toBe('1 hour ago');
    });

    it('formats past dates correctly', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5);
      expect(formatDate(pastDate)).toContain('ago');
    });

    it('formats future dates correctly', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      expect(formatDate(futureDate)).toContain('in');
    });

    it('handles leap years', () => {
      const leapYearDate = new Date('2024-02-29');
      expect(formatDate(leapYearDate)).toContain('2024');
    });

    it('formats dates with different timezones', () => {
      const date = new Date('2023-05-15T10:00:00Z');
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss z', 'UTC')).toContain('UTC');
    });

    it('formats month names correctly', () => {
      for (let month = 0; month < 12; month++) {
        const date = new Date(2023, month, 15);
        const formatted = formatDate(date, 'MMMM');
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        expect(formatted).toBe(months[month]);
      }
    });

    it('formats day names correctly', () => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      for (let i = 0; i < 7; i++) {
        const date = new Date(2023, 4, 21 + i); // Starting from a Sunday
        const formatted = formatDate(date, 'dddd');
        expect(formatted).toBe(days[i]);
      }
    });

    it('formats abbreviated month names', () => {
      for (let month = 0; month < 12; month++) {
        const date = new Date(2023, month, 15);
        const formatted = formatDate(date, 'MMM');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        expect(formatted).toBe(months[month]);
      }
    });

    it('formats abbreviated day names', () => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 0; i < 7; i++) {
        const date = new Date(2023, 4, 21 + i); // Starting from a Sunday
        const formatted = formatDate(date, 'ddd');
        expect(formatted).toBe(days[i]);
      }
    });

    it('handles year formatting', () => {
      const date = new Date('2023-05-15');
      expect(formatDate(date, 'YY')).toBe('23');
      expect(formatDate(date, 'YYYY')).toBe('2023');
    });

    it('formats hours, minutes, and seconds', () => {
      const date = new Date('2023-05-15T14:30:45');
      expect(formatDate(date, 'HH')).toBe('14');
      expect(formatDate(date, 'mm')).toBe('30');
      expect(formatDate(date, 'ss')).toBe('45');
    });

    it('formats 12-hour clock', () => {
      const date = new Date('2023-05-15T14:30:00');
      expect(formatDate(date, 'hh:mm A')).toBe('02:30 PM');
    });

    it('formats dates with ordinal suffixes', () => {
      const date = new Date('2023-05-21');
      expect(formatDate(date, 'MMMM Do YYYY')).toBe('May 21st 2023');
    });
  });

  // Number formatting tests
  describe('formatNumber function', () => {
    it('formats integers', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('formats decimals', () => {
      expect(formatNumber(1234.567)).toBe('1,234.567');
    });

    it('formats with custom decimal places', () => {
      expect(formatNumber(1234.567, 2)).toBe('1,234.57');
      expect(formatNumber(1234.567, 1)).toBe('1,234.6');
    });

    it('formats negative numbers', () => {
      expect(formatNumber(-1234567)).toBe('-1,234,567');
    });

    it('formats zero', () => {
      expect(formatNumber(0)).toBe('0');
    });

    it('formats very large numbers', () => {
      expect(formatNumber(123456789012345)).toBe('123,456,789,012,345');
    });

    it('formats very small decimals', () => {
      expect(formatNumber(0.000001)).toBe('0.000001');
    });

    it('formats percentages', () => {
      expect(formatNumber(0.85, 2, 'percent')).toBe('85.00%');
      expect(formatNumber(0.1234, 1, 'percent')).toBe('12.3%');
    });

    it('formats currency', () => {
      expect(formatNumber(1234.56, 2, 'currency')).toBe('$1,234.56');
    });

    it('formats with different locales', () => {
      expect(formatNumber(1234567, 2, 'decimal', 'de-DE')).toBe('1.234.567,00');
      expect(formatNumber(1234567, 2, 'decimal', 'fr-FR')).toBe('1 234 567,00');
    });

    it('formats with custom separators', () => {
      expect(formatNumber(1234567, 0, 'decimal', 'en-US', { thousandsSeparator: '.', decimalSeparator: ',' })).toBe('1.234.567');
    });

    it('formats exponential notation', () => {
      expect(formatNumber(1000000, 2, 'exponential')).toBe('1.00e+6');
    });

    it('formats with abbreviations', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(10000)).toBe('10,000');
      expect(formatNumber(100000)).toBe('100,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
    });

    it('handles NaN', () => {
      expect(formatNumber(NaN)).toBe('NaN');
    });

    it('handles infinity', () => {
      expect(formatNumber(Infinity)).toBe('Infinity');
      expect(formatNumber(-Infinity)).toBe('-Infinity');
    });

    it('formats scientific notation', () => {
      expect(formatNumber(0.000000123, 3, 'scientific')).toBe('1.230e-7');
    });

    it('formats different currencies', () => {
      expect(formatNumber(1234.56, 2, 'currency', 'en-US', { currency: 'USD' })).toBe('$1,234.56');
      expect(formatNumber(1234.56, 2, 'currency', 'en-GB', { currency: 'GBP' })).toBe('£1,234.56');
      expect(formatNumber(1234.56, 2, 'currency', 'ja-JP', { currency: 'JPY' })).toBe('¥1,235');
    });

    it('formats with accounting notation (parentheses for negative)', () => {
      expect(formatNumber(-1234.56, 2, 'accounting')).toBe('(1,234.56)');
    });

    it('formats ordinal numbers', () => {
      expect(formatNumber(1, 0, 'ordinal')).toBe('1st');
      expect(formatNumber(2, 0, 'ordinal')).toBe('2nd');
      expect(formatNumber(3, 0, 'ordinal')).toBe('3rd');
      expect(formatNumber(4, 0, 'ordinal')).toBe('4th');
      expect(formatNumber(11, 0, 'ordinal')).toBe('11th');
      expect(formatNumber(21, 0, 'ordinal')).toBe('21st');
    });
  });

  // Text truncation tests
  describe('truncateText function', () => {
    it('truncates text to specified length', () => {
      const longText = 'This is a very long text that needs to be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long...');
    });

    it('uses custom suffix', () => {
      const longText = 'This is a very long text that needs to be truncated';
      expect(truncateText(longText, 20, ' [more]')).toBe('This is a very [more]');
    });

    it('does not truncate if text is shorter than limit', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });

    it('handles empty string', () => {
      expect(truncateText('', 10)).toBe('');
    });

    it('handles limit of 0', () => {
      expect(truncateText('Any text', 0)).toBe('');
    });

    it('preserves words when possible', () => {
      const text = 'This is a sentence with words';
      expect(truncateText(text, 10)).toBe('This is a...');
    });

    it('handles single character', () => {
      expect(truncateText('A', 5)).toBe('A');
    });

    it('handles whitespace', () => {
      expect(truncateText('   spaced   ', 5)).toBe('   ...');
    });

    it('handles punctuation', () => {
      const text = 'Hello, world! How are you?';
      expect(truncateText(text, 15)).toBe('Hello, world!...');
    });

    it('handles special characters', () => {
      const text = 'Text with émojis 😊 and síñgültáres';
      expect(truncateText(text, 20)).toBe('Text with émojis 😊...');
    });

    it('truncates at word boundaries', () => {
      const text = 'This is a test of the emergency broadcast system';
      expect(truncateText(text, 15, '...', true)).toBe('This is a test...');
    });

    it('handles very long words', () => {
      const text = 'Supercalifragilisticexpialidocious is a very long word';
      expect(truncateText(text, 10)).toBe('Supercali...');
    });

    it('handles multiple spaces', () => {
      const text = 'Word    with    multiple    spaces';
      expect(truncateText(text, 10)).toBe('Word    wi...');
    });

    it('handles line breaks', () => {
      const text = 'Line one\nLine two\nLine three';
      expect(truncateText(text, 10)).toBe('Line one\n...');
    });

    it('handles tabs', () => {
      const text = 'Tab\there\tand\there';
      expect(truncateText(text, 8)).toBe('Tab\ther...');
    });

    it('handles HTML entities', () => {
      const text = 'Text with &amp; &lt; &gt; entities';
      expect(truncateText(text, 20)).toBe('Text with &amp; &lt;...');
    });

    it('preserves Unicode characters', () => {
      const text = 'Café résumé naïve';
      expect(truncateText(text, 10)).toBe('Café résu...');
    });

    it('handles mixed scripts', () => {
      const text = 'English 中国人 العربية';
      expect(truncateText(text, 12)).toBe('English 中国...');
    });
  });

  // Capitalization tests
  describe('capitalize function', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('handles already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('handles mixed case', () => {
      expect(capitalize('hELLo')).toBe('Hello');
    });

    it('handles multiple words', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    it('handles whitespace', () => {
      expect(capitalize(' hello')).toBe(' hello');
      expect(capitalize('  world')).toBe('  world');
    });

    it('handles numbers', () => {
      expect(capitalize('123abc')).toBe('123abc');
    });

    it('handles special characters', () => {
      expect(capitalize('!hello')).toBe('!hello');
    });

    it('handles accented characters', () => {
      expect(capitalize('éclair')).toBe('Éclair');
    });

    it('handles all caps', () => {
      expect(capitalize('HELLO')).toBe('Hello');
    });

    it('handles all lower', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('handles mixed with numbers', () => {
      expect(capitalize('test123word')).toBe('Test123word');
    });

    it('handles punctuation mid-string', () => {
      expect(capitalize('hello-world')).toBe('Hello-world');
      expect(capitalize('hello_world')).toBe('Hello_world');
    });

    it('handles Unicode characters', () => {
      expect(capitalize('café')).toBe('Café');
      expect(capitalize('naïve')).toBe('Naïve');
    });

    it('handles Cyrillic characters', () => {
      expect(capitalize('привет')).toBe('Привет');
    });

    it('handles Chinese characters', () => {
      // Chinese doesn't have case, so it should remain the same
      expect(capitalize('你好')).toBe('你好');
    });

    it('handles mixed scripts', () => {
      expect(capitalize('hello 世界')).toBe('Hello 世界');
    });
  });

  // Slugify tests
  describe('slugify function', () => {
    it('converts spaces to hyphens', () => {
      expect(slugify('hello world')).toBe('hello-world');
    });

    it('converts to lowercase', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('handles multiple spaces', () => {
      expect(slugify('hello    world')).toBe('hello-world');
    });

    it('removes leading/trailing spaces', () => {
      expect(slugify('  hello world  ')).toBe('hello-world');
    });

    it('handles empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('handles single word', () => {
      expect(slugify('hello')).toBe('hello');
    });

    it('replaces underscores with hyphens', () => {
      expect(slugify('hello_world')).toBe('hello-world');
    });

    it('removes periods', () => {
      expect(slugify('hello.world')).toBe('helloworld');
    });

    it('handles accented characters', () => {
      expect(slugify('résumé')).toBe('resume');
    });

    it('handles apostrophes', () => {
      expect(slugify('don\'t stop')).toBe('dont-stop');
    });

    it('handles various punctuation', () => {
      expect(slugify('Hello (World)!')).toBe('hello-world');
    });

    it('handles mixed case', () => {
      expect(slugify('HeLLo WoRLD')).toBe('hello-world');
    });

    it('handles numbers', () => {
      expect(slugify('test 123')).toBe('test-123');
    });

    it('handles all special characters', () => {
      expect(slugify('!@#$%^&*()_+-=[]{}|;:,.<>?')).toBe('');
    });

    it('preserves alphanumeric characters', () => {
      expect(slugify('abc123XYZ')).toBe('abc123xyz');
    });

    it('handles Unicode characters', () => {
      expect(slugify('café naïve')).toBe('cafe-naive');
    });

    it('handles Cyrillic characters', () => {
      expect(slugify('Привет мир')).toBe('privet-mir');
    });

    it('handles Chinese characters', () => {
      expect(slugify('你好 世界')).toBe('ni-hao-shi-jie');
    });
  });
});