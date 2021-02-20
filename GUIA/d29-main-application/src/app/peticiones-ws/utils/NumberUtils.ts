export class NumberUtils {
  constructor() { }

  static isBetween(input: number, min: number, max: number): boolean {
    return (min < input && input < max);
  }

  static isNotBetween(input: number, min: number, max: number): boolean {
    return !this.isBetween(input, min, max);
  }

  static isInRange(input: number, min: number, max: number): boolean {
    return (min <= input && input <= max);
  }

  static isNotInRange(input: number, min: number, max: number): boolean {
    return !this.isInRange(input, min, max);
  }
}
