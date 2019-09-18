import { memorize, safeParse } from './generalUtils';

describe('generalUtils', () => {
  describe('memorize', () => {
    let concat: jest.Mock;
    beforeEach(() => {
      concat = jest.fn().mockReturnValue('ab');
    });

    it('should memorize a functions return values', () => {
      const wrappedConcat = memorize(concat);
      expect(wrappedConcat('a', 'b')).toEqual('ab');
      wrappedConcat('a', 'b');
      expect(concat.mock.calls).toHaveLength(1);
    });

    it('should enforce a max cache value', () => {
      const wrappedConcat = memorize(concat, 2);
      wrappedConcat('1', '1');
      wrappedConcat('2', '2');
      wrappedConcat('3', '3');
      wrappedConcat('2', '2');
      expect(concat.mock.calls).toHaveLength(3);
    });
  });

  describe('safeParse', () => {
    it('should parse a string', () => {
      expect(safeParse('{"a":1}')).toEqual({ a: 1 });
    });

    it('should use a fallback when parsing fails', () => {
      expect(safeParse('{', 'fallback')).toEqual('fallback');
    });

    it('should return the entry item when parsing fails and there is no fallback', () => {
      expect(safeParse('{')).toEqual('{');
    });
  });
});
