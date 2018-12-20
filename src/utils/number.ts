const mapping = [
  { number: 1000000000, postfix: 'b' },
  { number: 1000000, postfix: 'm' },
  { number: 1000, postfix: 'k' },
];

export interface IHumanizeOptions {
  /**
   * Adds a space between the number and the letter
   */
  space?: boolean;
  /**
   * Transform the letter to uppercase
   */
  upperCase?: boolean;
  /**
   * The number of decimal places that have to be preserved
   */
  precision?: number;
}

export function humanize(
  num: number,
  { space, upperCase, precision = 0 }: IHumanizeOptions = {},
): string {
  for (const map of mapping) {
    let fixedNumber: number | string = num / map.number;
    // We do this to prevent things like `1.0k`
    fixedNumber = Number.isInteger(fixedNumber) ? fixedNumber : fixedNumber.toFixed(precision);
    // If the number given is smaller than the current divider we have to continue to the next.
    // However, we wanna handle cases like `999` being transformed to `1k`
    if (map.number > num && Number(fixedNumber) < 1) continue;

    return `${fixedNumber}${space ? ' ' : ''}${
      upperCase ? map.postfix.toUpperCase() : map.postfix
    }`;
  }
  return num.toString();
}
