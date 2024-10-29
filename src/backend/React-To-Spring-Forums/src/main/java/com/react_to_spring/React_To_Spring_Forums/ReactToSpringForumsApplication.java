package com.react_to_spring.React_To_Spring_Forums;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableFeignClients // Enable Feign clients
public class ReactToSpringForumsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReactToSpringForumsApplication.class, args);
	}

}
