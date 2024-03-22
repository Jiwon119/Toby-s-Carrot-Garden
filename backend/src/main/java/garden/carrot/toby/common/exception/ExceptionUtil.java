package garden.carrot.toby.common.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.springframework.stereotype.Component;

import garden.carrot.toby.common.logback.DiscordNotifier;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class ExceptionUtil {
	private final DiscordNotifier discordNotifier;
	private final StringBuilder sb = new StringBuilder();

	public static String exceptionToString(Exception ex) {
		StringWriter sw = new StringWriter();
		ex.printStackTrace(new PrintWriter(sw));
		return sw.toString();
	}

	public void sendExceptionToDiscord(Exception ex) {
		sb.setLength(0);
		sb.append("🚨 Exception 발생! 🚨\n");
		sb.append(ExceptionUtil.exceptionToString(ex)).append("\n");
		discordNotifier.notify(sb.toString());
	}
}
