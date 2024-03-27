package garden.carrot.toby.api.story.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

public class QuizDto {

	@Getter
	@AllArgsConstructor
	public static class SubmitQuizRequest {

		private MultipartFile analysisImage;
		private int quizId;
	}

	@Getter
	@AllArgsConstructor
	public static class SubmitQuizResponse {
		private String imageUrl;
		private int memberQuizId;
	}

	@Getter
	@AllArgsConstructor
	public static class QuizResultResponse {
		private int score;
	}


	@Getter
	@AllArgsConstructor
	@ToString
	public static class ProducerData {
		private String imageKey;
		private int memberId;
		private int quizId;
		private String correctAnswer;
	}

}