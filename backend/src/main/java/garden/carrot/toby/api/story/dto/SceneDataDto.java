package garden.carrot.toby.api.story.dto;

import java.io.Serializable;

import garden.carrot.toby.domain.scenedata.entity.SceneType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class SceneDataDto {

	@Getter
	@AllArgsConstructor
	public static class SceneDataResponse implements Serializable {

		@Setter
		private Integer sceneId;
		private SceneType sceneType;
		@Setter
		private QuizDto.QuizDataResponse quiz;
		private String sceneImageUrl;
		private String content;
		@Setter
		private String voice;
	}
}
