package vn.pes.auth.application;

public final class DuplicateUsernameException extends RuntimeException {

    public DuplicateUsernameException() {
        super("Username is already in use.");
    }
}
