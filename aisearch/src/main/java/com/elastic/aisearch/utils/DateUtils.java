package com.elastic.aisearch.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtils {
    private static final DateTimeFormatter INPUT_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter OUTPUT_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static String toElasticDate(String inputDate) {
        try {
            LocalDate date = LocalDate.parse(inputDate, INPUT_FORMATTER);
            return date.format(OUTPUT_FORMATTER);
        } catch (Exception e) {
            return inputDate;
        }
    }
}
