package com.example.cetrificationpoject.exception;
import com.example.cetrificationpoject.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
    public class GlobalExceptionHandler {
        @ExceptionHandler(UserAlreadyExistsException.class)
        public ResponseEntity<ApiResponse> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
            ApiResponse response = new ApiResponse(HttpStatus.CONFLICT.value(), e.getMessage(),true);
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiResponse> handleBadCredentialsException(InvalidCredentialsException e) {
        ApiResponse response = new ApiResponse(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), true);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse> handleRuntimeException(RuntimeException e) {
        ApiResponse response = new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An error occurred: " + e.getMessage(), true);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    }


