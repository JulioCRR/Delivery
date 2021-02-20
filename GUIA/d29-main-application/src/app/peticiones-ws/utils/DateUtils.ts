import { StringUtils } from './StringUtils';
import * as moment from 'moment';

export class DateUtils {
  constructor() { }

  static formatDate(date: Date, format: string, defaultText?: string): string {
    if (date == null || StringUtils.isBlank(format)) {
      return defaultText ? defaultText : '';
    }
    let mDate = moment(date);
    if (!mDate.isValid()) {
      return defaultText ? defaultText : '';
    }
    return mDate.format(format);
  }
}
