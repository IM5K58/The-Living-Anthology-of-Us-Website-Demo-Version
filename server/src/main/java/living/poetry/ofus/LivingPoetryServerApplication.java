package living.poetry.ofus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class LivingPoetryServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LivingPoetryServerApplication.class, args);
	}

}
