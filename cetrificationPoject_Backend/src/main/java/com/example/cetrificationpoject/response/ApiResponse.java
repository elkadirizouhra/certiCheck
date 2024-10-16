package com.example.cetrificationpoject.response;

public class ApiResponse {
    private boolean open;
    private int status;
    private String message;

    public ApiResponse(int status, String message , boolean open) {
        this.status = status;
        this.message = message;
        this.open=open;

    }

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

