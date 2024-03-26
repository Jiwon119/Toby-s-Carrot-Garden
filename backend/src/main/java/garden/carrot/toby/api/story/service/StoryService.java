package garden.carrot.toby.api.story.service;

import garden.carrot.toby.api.auth.util.MemberUtil;
import garden.carrot.toby.api.story.dto.QuizDto.ProducerData;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizRequest;
import garden.carrot.toby.api.story.util.KafkaProducer;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.common.s3.dto.S3Dto;
import garden.carrot.toby.common.s3.service.S3Service;
import garden.carrot.toby.domain.memberquiz.entity.MemberQuiz;
import garden.carrot.toby.domain.memberquiz.repository.MemberQuizRepository;
import garden.carrot.toby.domain.quizdata.entity.QuizData;
import garden.carrot.toby.domain.quizdata.repository.QuizDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoryService {

	private final MemberQuizRepository memberQuizRepository;
	private final QuizDataRepository quizDataRepository;
	private final KafkaProducer kafkaProducer;
	private final S3Service s3Service;
	private final MemberUtil memberUtil;

	@Transactional
	public String submitQuiz(SubmitQuizRequest dto) throws Exception{

		int memberId = memberUtil.getLoginMember().getId();
		QuizData quizData = quizDataRepository.findById(dto.getQuizId())
			.orElseThrow(() -> new CustomException(ErrorCode.NO_ID, dto.getQuizId()));

		// s3 데이터 저장
		S3Dto s3 = s3Service.uploadFile(dto.getAnalysisImage());

		// kafka 데이터 전송
		ProducerData data = new ProducerData(s3.getFileKey()
			, memberId, dto.getQuizId(), quizData.getCorrectAnswer());
		kafkaProducer.sendMessage(data, quizData.getQuizType().toString());

		MemberQuiz quiz = MemberQuiz.builder()
			.quizData(quizData)
			.imageUrl(s3.getFileUrl())
			.score(-1).build();
		memberQuizRepository.save(quiz);

		return s3.getFileUrl();
	}

}