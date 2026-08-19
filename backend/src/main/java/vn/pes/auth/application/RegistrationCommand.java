package vn.pes.auth.application;

/**
 * Application input for V1 self-registration. Secrets are transient and must never be logged,
 * persisted, or returned.
 */
public record RegistrationCommand(
        String username,
        String rawPassword,
        String passwordConfirmation,
        String displayName,
        String invitationCode) {
}
