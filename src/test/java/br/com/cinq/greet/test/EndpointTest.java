package br.com.cinq.greet.test;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.isEmptyOrNullString;
import static org.junit.Assert.assertThat;

import br.com.cinq.greet.model.Greeting;

import java.net.URL;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestTemplate;

import br.com.cinq.greet.Application;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes=Application.class)
@WebIntegrationTest(randomPort = true)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class EndpointTest {
	
	@Value("${local.server.port}")
	private int port;
	private URL base;
	private RestTemplate template;
	
	@Before
	public void setUp() throws Exception {
		this.base = new URL("http://localhost:" + port);
		this.template = new TestRestTemplate();
	}

	@Test
	public void getEmptyGreeting() {
		ResponseEntity<Greeting> response = template.getForEntity(base.toString() + "/greeting", Greeting.class);
		assertThat(response.getBody().getMessage(), isEmptyOrNullString());
	}

	@Test
	public void postNewGreeting() {
		Greeting greeting = new Greeting();
		greeting.setMessage("Test message");
		ResponseEntity<String> response = template.postForEntity(base.toString() + "/greeting", greeting, String.class);
		assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
	}

	@Test
	public void postNewInvalidGreeting() {
		Greeting greeting = new Greeting();
		greeting.setMessage("Test");
		ResponseEntity<String> response = template.postForEntity(base.toString() + "/greeting", greeting, String.class);
		assertThat(response.getStatusCode(), equalTo(HttpStatus.BAD_REQUEST));
	}

	@Test
	public void getNewGreeting() {
		Greeting greeting = new Greeting();
		greeting.setMessage("Test message");
		ResponseEntity<String> postResponse = template.postForEntity(base.toString() + "/greeting", greeting, String.class);
		assertThat(postResponse.getStatusCode(), equalTo(HttpStatus.OK));

		ResponseEntity<Greeting> getResponse = template.getForEntity(base.toString() + "/greeting", Greeting.class);
		assertThat(getResponse.getBody().getMessage(), equalTo(greeting.getMessage()));
	}

}
