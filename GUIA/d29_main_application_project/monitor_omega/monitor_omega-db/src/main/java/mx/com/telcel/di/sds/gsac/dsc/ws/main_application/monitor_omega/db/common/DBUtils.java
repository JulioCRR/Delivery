package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.common;

import org.apache.commons.lang.StringUtils;

/**
 *
 * @author Juan
 */
public class DBUtils {

    private static final String NEW_LINE = "\r\n";
    private static final String DISPLAY_BORDER = StringUtils.repeat("#", 80) + NEW_LINE;

    public static Double getDouble(String number) {
        try {
            return Double.parseDouble(number.replaceAll("%", ""));
        } catch (Exception ex) {
            return null;
        }
    }

    public static Integer getInteger(String number) {
        try {
            return Integer.parseInt(number);
        } catch (Exception ex) {
            return null;
        }
    }

    public static String getDisplayFormatted(char[] displayArray) {
        StringBuilder sb = new StringBuilder();
        sb.append(DISPLAY_BORDER);
        for (int i = 0; i < 24; i++) {
            for (int j = 0; j < 80; j++) {
                sb.append(displayArray[i * 80 + j]);
            }
            sb.append(NEW_LINE);
        }
        sb.append(DISPLAY_BORDER);
        return sb.toString();
    }
}
