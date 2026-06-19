package com.sentinelai.soc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SentinelAiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SentinelAiApplication.class, args);
    }
}
