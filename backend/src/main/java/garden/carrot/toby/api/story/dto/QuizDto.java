package garden.carrot.toby.api.story.dto;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

import garden.carrot.toby.domain.quizdata.entity.QuizType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

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

	@Getter
	@AllArgsConstructor
	@Builder
	public static class QuizDataResponse implements Serializable {

		private Integer quizId;
		private String correctAnswer;
		private QuizType quizType;
	}
}
