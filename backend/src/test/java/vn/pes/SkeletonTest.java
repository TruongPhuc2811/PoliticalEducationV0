package vn.pes;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class SkeletonTest {

    @Test
    void repositorySkeletonIsActive() {
        assertThat("political-education-backend").isNotBlank();
    }
}
