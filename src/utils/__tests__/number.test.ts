import { humanize } from '../number';

describe('number', () => {
  it('should humanize numbers', () => {
    expect(humanize(1)).toEqual('1');
    expect(humanize(999)).toEqual('1k');
    expect(humanize(1000)).toEqual('1k');
    expect(humanize(1432)).toEqual('1k');
    expect(humanize(142536)).toEqual('143k');
    expect(humanize(999999)).toEqual('1m');
    expect(humanize(1000000)).toEqual('1m');
    expect(humanize(5432897)).toEqual('5m');
    expect(humanize(999999999)).toEqual('1b');
    expect(humanize(1000000000)).toEqual('1b');
  });

  it('should preserve `precision` number of decimal places', () => {
    const opts = { precision: 1 };
    expect(humanize(1, opts)).toEqual('1');
    expect(humanize(1000, opts)).toEqual('1k');
    expect(humanize(1234, opts)).toEqual('1.2k');
    expect(humanize(1562, opts)).toEqual('1.6k');
  });

  it('should transform the letter to uppercase', () => {
    const opts = { upperCase: true };
    expect(humanize(1, opts)).toEqual('1');
    expect(humanize(1000, opts)).toEqual('1K');
    expect(humanize(1000000, opts)).toEqual('1M');
    expect(humanize(1000000000, opts)).toEqual('1B');
  });

  it('should add a space between the number and the letter', () => {
    const opts = { space: true };
    expect(humanize(1, opts)).toEqual('1');
    expect(humanize(1000, opts)).toEqual('1 k');
    expect(humanize(1000000, opts)).toEqual('1 m');
    expect(humanize(1000000000, opts)).toEqual('1 b');
  });
});
