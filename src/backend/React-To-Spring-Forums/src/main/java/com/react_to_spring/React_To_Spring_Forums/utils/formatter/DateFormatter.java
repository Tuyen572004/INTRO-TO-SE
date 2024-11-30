package com.react_to_spring.React_To_Spring_Forums.utils.formatter;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class DateFormatter {
    Map<Long, Function<LocalDateTime, String>> formatterMap;

    public DateFormatter() {
        formatterMap = new LinkedHashMap<>();
        formatterMap.put(60L, this::formatSeconds);
        formatterMap.put(3600L, this::formatMinutes);
        formatterMap.put(86400L, this::formatHours);
        formatterMap.put(Long.MAX_VALUE, this::formatDays);
    }

    public String format(LocalDateTime dateTime) {
        long elapsedSeconds = ChronoUnit.SECONDS.between(dateTime, Instant.now());

        Function<LocalDateTime, String> formatter = formatterMap.entrySet().stream()
                .filter(longFunctionEntry -> elapsedSeconds < longFunctionEntry.getKey())
                .findFirst()
                .get()
                .getValue();

        return formatter.apply(dateTime);
    }

    private String formatSeconds(LocalDateTime dateTime) {
        long elapsedSeconds = ChronoUnit.SECONDS.between(dateTime, Instant.now());

        return String.format("%d seconds", elapsedSeconds);
    }

    private String formatMinutes(LocalDateTime dateTime) {
        long elapsedMinutes = ChronoUnit.MINUTES.between(dateTime, Instant.now());

        return String.format("%d minutes", elapsedMinutes);
    }

    private String formatHours(LocalDateTime dateTime) {
        long elapsedHours = ChronoUnit.HOURS.between(dateTime, Instant.now());

        return String.format("%d hours", elapsedHours);
    }

    private String formatDays(LocalDateTime dateTime) {
        LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.from(dateTime), ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;

        return localDateTime.format(formatter);
    }
}
