package com.tessi.portail.dynamicForms.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.WebKeys;
import com.tessi.portail.dynamicForms.Constants;
import com.tessi.portail.dynamicForms.model.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Konstantinos Karavitis
 **/
public class SecureRequestHandlerInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	MessageSource messageSource;

	Logger logger = LoggerFactory.getLogger(SecureRequestHandlerInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		User user = (User) request.getAttribute(WebKeys.USER);
		if (user == null) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			ErrorResponse error = new ErrorResponse();
			error.setErrorCode(HttpStatus.UNAUTHORIZED.value());
			error.setMessage(
					messageSource.getMessage(Constants.APPLICATION_ERROR_UNAUTHORIZED, null, request.getLocale()));
			response.getWriter().write(new ObjectMapper().writeValueAsString(error));
			return false;
		}
		logger.info("user = " + user.getScreenName());
		ThemeDisplay themeDisplay = (ThemeDisplay) request.getAttribute(WebKeys.THEME_DISPLAY);
		if (themeDisplay != null) {
			logger.info("getCompanyId = " + themeDisplay.getCompanyId());
			String siteType2 = (String) themeDisplay.getLayout().getGroup().getExpandoBridge().getAttribute("type");
			logger.info("siteType2 = " + siteType2);
		}
		return true;
	}
}
