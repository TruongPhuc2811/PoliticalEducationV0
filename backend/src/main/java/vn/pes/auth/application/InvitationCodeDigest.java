package vn.pes.auth.application;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

final class InvitationCodeDigest {

    byte[] sha256(String rawInvitationCode) {
        try {
            return MessageDigest.getInstance("SHA-256")
                    .digest(rawInvitationCode.getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 is unavailable.", exception);
        }
    }
}
