export class StringUtils {
  constructor() { }

  static isEmpty(text: string): boolean {
    if (text === undefined || text == null) {
      return true;
    }
    return (text.length == 0);
  }

  static isBlank(text: string): boolean {
    return this.isEmpty(text) || (text.trim().length == 0);
  }

  static isNotEmpty(text: string): boolean {
    return !this.isEmpty(text);
  }

  static isNotBlank(text: string): boolean {
    return !this.isBlank(text);
  }

  static trim(text: string): string {
    return this.trimToEmpty(text);
  }

  static trimToEmpty(text: string): string {
    if (this.isBlank(text)) {
      return '';
    }
    return text.trim();
  }

  static trimToNull(text: string): string {
    if (this.isBlank(text)) {
      return null;
    }
    return text.trim();
  }

  static hasMinChars(text: string, minimum: number): boolean {
    return minimum <= this.trimToEmpty(text).length;
  }

  static hasMaxChars(text: string, maximum: number): boolean {
    return maximum <= this.trimToEmpty(text).length;
  }

  static hasCharsRange(text: string, minimum: number, maximum: number): boolean {
    return this.hasMinChars(text, minimum) && !this.hasMaxChars(text, maximum);
  }

  static toUpperCase(text: string, trim?: boolean): string {
    if (this.isBlank(text)) {
      return '';
    }
    if (trim) {
      return text.trim().toUpperCase();
    }
    return text.toUpperCase();
  }

  static toLowerCase(text: string, trim?: boolean): string {
    if (this.isBlank(text)) {
      return '';
    }
    if (trim) {
      return text.trim().toLowerCase();
    }
    return text.toLowerCase();
  }

  static defaultString(text: string, defaultText?: string): string {
    if (text == null) {
      if (defaultText == null) {
        return '';
      }
      return defaultText;
    }
    return text;
  }

  static defaultIfBlank(text: string, defaultText?: string): string {
    return this.defaultString(this.trimToNull(text), defaultText);
  }

  static isEqual(text: string, compareText: string): boolean {
    return (this.trimToEmpty(text) === this.trimToEmpty(compareText));
  }

  static isEqualOrDefault(text: string, compareText: string, defaultText: string, compareBoth?: boolean): boolean {
    if (this.isEqual(text, compareText)) {
      return true;
    }
    if (this.isEqual(text, defaultText)) {
      return true;
    }
    if (compareBoth) {
      return this.isEqual(compareText, defaultText);
    }
    return false;
  }
}
