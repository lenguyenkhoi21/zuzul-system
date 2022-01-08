package com.zuzul.zuzulimageservice.common.advice;

import com.zuzul.zuzulimageservice.common.exception.NoCorrelationID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandleControllers {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionHandleControllers.class);

    @ExceptionHandler(NoCorrelationID.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String serverExceptionHandler(Exception ex) {
        logger.error(ex.getMessage(),ex);
        return "Error";
    }
}
