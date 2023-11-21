package im.zego.reactnative;

import android.graphics.Bitmap;
import android.util.Base64;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

public class ZegoUtils {
    /* Utils */

    public static boolean boolValue(Boolean number) {
        return number != null && number;
    }

    public static int intValue(Number number) {
        return number != null ? number.intValue() : 0;
    }

    public static long longValue(Number number) {
        return number != null ? number.longValue() : 0;
    }

    public static float floatValue(Number number) {
        return number != null ? number.floatValue() : .0f;
    }

    public static double doubleValue(Number number) {
        return number != null ? number.doubleValue() : .0f;
    }

    public static int[] intArrayValue(ArrayList<Integer> integerArrayList) {
        int[] ret = new int[integerArrayList.size()];
        Iterator<Integer> iterator = integerArrayList.iterator();
        for (int i = 0; i < ret.length; i++) {
            ret[i] = iterator.next();
        }
        return ret;
    }

    public static float[] floatArrayValueFromDoubleArray(ArrayList<Double> floatArrayList) {
        float[] ret = new float[floatArrayList.size()];
        Iterator<Double> iterator = floatArrayList.iterator();
        for (int i = 0; i < ret.length; i++) {
            ret[i] = iterator.next().floatValue();
        }
        return ret;
    }

    public static String getStackTrace(Exception e) {
        StringBuilder message = new StringBuilder();
        if (e != null) {
            message.append(e.getClass()).append(": ").append(e.getMessage()).append(" | ");
            StackTraceElement[] elements = e.getStackTrace();
            for (StackTraceElement stackTraceElement : elements) {
                message.append(stackTraceElement.toString()).append(" | ");
            }
        }
        return message.toString();
    }

    /**
     * bitmap 转base64
     * @param bitmap BitMap
     * @return base64
     */
    public static String bitmapToBase64(Bitmap bitmap) {
        String result = null;
        ByteArrayOutputStream baos = null;
        try {
            if (bitmap != null) {
                baos = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);

                baos.flush();
                baos.close();

                byte[] bitmapBytes = baos.toByteArray();
                result = Base64.encodeToString(bitmapBytes, Base64.DEFAULT);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (baos != null) {
                    baos.flush();
                    baos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}
