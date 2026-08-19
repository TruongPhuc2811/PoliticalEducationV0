CREATE TABLE positions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_positions_code UNIQUE (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ranks (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_ranks_code UNIQUE (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE org_units (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    unit_type VARCHAR(20) NOT NULL,
    parent_id BIGINT NULL DEFAULT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_org_units_type CHECK (unit_type IN ('DAI_DOI', 'TRUNG_DOI', 'TIEU_DOI')),
    CONSTRAINT fk_org_units_org_units FOREIGN KEY (parent_id) REFERENCES org_units (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE school_years (
    id BIGINT NOT NULL AUTO_INCREMENT,
    label VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_school_years_label UNIQUE (label)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_test_types (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_quiz_test_types_code UNIQUE (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE accounts (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    display_name VARCHAR(200) NOT NULL,
    classification VARCHAR(20) NULL DEFAULT NULL,
    position_id BIGINT NULL DEFAULT NULL,
    rank_id BIGINT NULL DEFAULT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_accounts_username UNIQUE (username),
    KEY idx_accounts_is_active (is_active),
    CONSTRAINT ck_accounts_role CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'USER')),
    CONSTRAINT ck_accounts_classification CHECK (classification IN ('CAN_BO', 'CHIEN_SI') OR classification IS NULL),
    CONSTRAINT fk_accounts_positions FOREIGN KEY (position_id) REFERENCES positions (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_accounts_ranks FOREIGN KEY (rank_id) REFERENCES ranks (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE user_assignments (
    id BIGINT NOT NULL AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    org_unit_id BIGINT NOT NULL,
    effective_from DATETIME(3) NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_user_assignments_account UNIQUE (account_id),
    KEY idx_user_assignments_org_unit (org_unit_id),
    CONSTRAINT fk_user_assignments_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_user_assignments_org_units FOREIGN KEY (org_unit_id) REFERENCES org_units (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE user_assignment_history (
    id BIGINT NOT NULL AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    org_unit_id BIGINT NOT NULL,
    effective_from DATETIME(3) NOT NULL,
    effective_to DATETIME(3) NULL DEFAULT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_user_assignment_history_account_from (account_id, effective_from),
    KEY idx_user_assignment_history_org (org_unit_id, effective_from, effective_to),
    CONSTRAINT fk_user_assignment_history_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_user_assignment_history_org_units FOREIGN KEY (org_unit_id) REFERENCES org_units (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE invitations (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code_hash BINARY(32) NOT NULL,
    org_unit_id BIGINT NOT NULL,
    issuer_account_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    expires_at DATETIME(3) NULL DEFAULT NULL,
    consumed_by_account_id BIGINT NULL DEFAULT NULL,
    consumed_at DATETIME(3) NULL DEFAULT NULL,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_invitations_code_hash UNIQUE (code_hash),
    KEY idx_invitations_org_unit_status (org_unit_id, status),
    KEY idx_invitations_issuer (issuer_account_id),
    CONSTRAINT ck_invitations_status CHECK (status IN ('ACTIVE', 'CONSUMED', 'DISABLED', 'EXPIRED')),
    CONSTRAINT fk_invitations_org_units FOREIGN KEY (org_unit_id) REFERENCES org_units (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_invitations_issuer_accounts FOREIGN KEY (issuer_account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_invitations_consumed_accounts FOREIGN KEY (consumed_by_account_id) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE file_metadata (
    id BIGINT NOT NULL AUTO_INCREMENT,
    storage_key VARCHAR(500) NOT NULL,
    original_filename VARCHAR(500) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    storage_provider VARCHAR(30) NOT NULL DEFAULT 'LOCAL',
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_file_metadata_storage_key UNIQUE (storage_key),
    CONSTRAINT ck_file_metadata_size CHECK (file_size_bytes > 0),
    CONSTRAINT ck_file_metadata_provider CHECK (storage_provider IN ('LOCAL')),
    CONSTRAINT ck_file_metadata_status CHECK (status IN ('ACTIVE', 'DELETED')),
    CONSTRAINT fk_file_metadata_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE handbook_categories (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_handbook_categories_name UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE handbook_articles (
    id BIGINT NOT NULL AUTO_INCREMENT,
    category_id BIGINT NOT NULL,
    title VARCHAR(500) NOT NULL,
    body LONGTEXT NULL DEFAULT NULL,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    thumbnail_file_id BIGINT NULL DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    updated_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_handbook_articles_category_status (category_id, publish_status),
    KEY idx_handbook_articles_status (publish_status),
    FULLTEXT KEY idx_handbook_articles_fulltext (title, body),
    CONSTRAINT ck_handbook_articles_publish_status CHECK (publish_status IN ('DRAFT', 'PUBLISHED')),
    CONSTRAINT fk_handbook_articles_categories FOREIGN KEY (category_id) REFERENCES handbook_categories (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_handbook_articles_thumbnail_files FOREIGN KEY (thumbnail_file_id) REFERENCES file_metadata (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_handbook_articles_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_handbook_articles_updated_accounts FOREIGN KEY (updated_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE handbook_article_media (
    id BIGINT NOT NULL AUTO_INCREMENT,
    article_id BIGINT NOT NULL,
    media_type VARCHAR(20) NOT NULL,
    file_metadata_id BIGINT NULL DEFAULT NULL,
    external_url VARCHAR(2000) NULL DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_hkm_media_type CHECK (media_type IN ('IMAGE', 'VIDEO', 'EXTERNAL_VIDEO')),
    CONSTRAINT fk_handbook_article_media_articles FOREIGN KEY (article_id) REFERENCES handbook_articles (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_handbook_article_media_files FOREIGN KEY (file_metadata_id) REFERENCES file_metadata (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE resolutions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    issuing_body VARCHAR(200) NULL DEFAULT NULL,
    issued_date DATE NULL DEFAULT NULL,
    summary TEXT NULL DEFAULT NULL,
    body LONGTEXT NULL DEFAULT NULL,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    updated_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_resolutions_code UNIQUE (code),
    KEY idx_resolutions_publish_status (publish_status, issued_date DESC),
    CONSTRAINT ck_resolutions_publish_status CHECK (publish_status IN ('DRAFT', 'PUBLISHED')),
    CONSTRAINT fk_resolutions_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_resolutions_updated_accounts FOREIGN KEY (updated_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE resolution_topics (
    id BIGINT NOT NULL AUTO_INCREMENT,
    resolution_id BIGINT NOT NULL,
    title VARCHAR(500) NOT NULL,
    body LONGTEXT NULL DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_resolution_topics_resolution (resolution_id, sort_order),
    CONSTRAINT fk_resolution_topics_resolutions FOREIGN KEY (resolution_id) REFERENCES resolutions (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE resolution_documents (
    id BIGINT NOT NULL AUTO_INCREMENT,
    resolution_id BIGINT NULL DEFAULT NULL,
    topic_id BIGINT NULL DEFAULT NULL,
    file_metadata_id BIGINT NULL DEFAULT NULL,
    document_type VARCHAR(30) NOT NULL,
    external_url VARCHAR(2000) NULL DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_resolution_documents_type CHECK (document_type IN ('FILE', 'VIDEO', 'LINK')),
    CONSTRAINT ck_resolution_documents_exactly_one_parent CHECK ((resolution_id IS NOT NULL) + (topic_id IS NOT NULL) = 1),
    CONSTRAINT fk_resolution_documents_resolutions FOREIGN KEY (resolution_id) REFERENCES resolutions (id),
    CONSTRAINT fk_resolution_documents_topics FOREIGN KEY (topic_id) REFERENCES resolution_topics (id),
    CONSTRAINT fk_resolution_documents_files FOREIGN KEY (file_metadata_id) REFERENCES file_metadata (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE news_categories (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_news_categories_name UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE news_articles (
    id BIGINT NOT NULL AUTO_INCREMENT,
    category_id BIGINT NOT NULL,
    title VARCHAR(500) NOT NULL,
    body LONGTEXT NULL DEFAULT NULL,
    video_url VARCHAR(2000) NULL DEFAULT NULL,
    external_link VARCHAR(2000) NULL DEFAULT NULL,
    source_origin VARCHAR(50) NULL DEFAULT NULL,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    thumbnail_file_id BIGINT NULL DEFAULT NULL,
    published_at DATETIME(3) NULL DEFAULT NULL,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_news_articles_category_status (category_id, publish_status, published_at DESC),
    CONSTRAINT ck_news_articles_publish_status CHECK (publish_status IN ('DRAFT', 'PUBLISHED')),
    CONSTRAINT fk_news_articles_categories FOREIGN KEY (category_id) REFERENCES news_categories (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_news_articles_thumbnail_files FOREIGN KEY (thumbnail_file_id) REFERENCES file_metadata (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_news_articles_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE music_categories (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_music_categories_name UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE music_items (
    id BIGINT NOT NULL AUTO_INCREMENT,
    category_id BIGINT NOT NULL,
    title VARCHAR(500) NOT NULL,
    media_type VARCHAR(20) NOT NULL,
    file_metadata_id BIGINT NULL DEFAULT NULL,
    external_url VARCHAR(2000) NULL DEFAULT NULL,
    description TEXT NULL DEFAULT NULL,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_music_items_category_status (category_id, publish_status),
    CONSTRAINT ck_music_items_media_type CHECK (media_type IN ('LOCAL_UPLOAD', 'YOUTUBE', 'LINK')),
    CONSTRAINT ck_music_items_publish_status CHECK (publish_status IN ('DRAFT', 'PUBLISHED')),
    CONSTRAINT fk_music_items_categories FOREIGN KEY (category_id) REFERENCES music_categories (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_music_items_files FOREIGN KEY (file_metadata_id) REFERENCES file_metadata (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_music_items_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_questions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    question_type VARCHAR(20) NOT NULL,
    question_text TEXT NOT NULL,
    topic_tag VARCHAR(200) NULL DEFAULT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_quiz_questions_type CHECK (question_type IN ('SINGLE_CHOICE', 'TRUE_FALSE')),
    CONSTRAINT fk_quiz_questions_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_question_options (
    id BIGINT NOT NULL AUTO_INCREMENT,
    question_id BIGINT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct TINYINT(1) NOT NULL DEFAULT 0,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_quiz_question_options_questions FOREIGN KEY (question_id) REFERENCES quiz_questions (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_configs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(300) NOT NULL,
    test_type_id BIGINT NULL DEFAULT NULL,
    question_count INT NOT NULL,
    duration_seconds INT NOT NULL,
    pass_threshold DECIMAL(5,2) NOT NULL,
    attempt_limit INT NOT NULL,
    shuffle_questions TINYINT(1) NOT NULL DEFAULT 1,
    shuffle_answers TINYINT(1) NOT NULL DEFAULT 1,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    version INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_quiz_configs_question_count CHECK (question_count > 0),
    CONSTRAINT ck_quiz_configs_duration_seconds CHECK (duration_seconds > 0),
    CONSTRAINT ck_quiz_configs_pass_threshold CHECK (pass_threshold >= 0),
    CONSTRAINT ck_quiz_configs_attempt_limit CHECK (attempt_limit > 0),
    CONSTRAINT fk_quiz_configs_test_types FOREIGN KEY (test_type_id) REFERENCES quiz_test_types (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_quiz_configs_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_config_snapshot (
    id BIGINT NOT NULL AUTO_INCREMENT,
    quiz_config_id BIGINT NOT NULL,
    question_count INT NOT NULL,
    duration_seconds INT NOT NULL,
    pass_threshold DECIMAL(5,2) NOT NULL,
    attempt_limit INT NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_quiz_config_snapshot_configs FOREIGN KEY (quiz_config_id) REFERENCES quiz_configs (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_attempts (
    id BIGINT NOT NULL AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    quiz_config_id BIGINT NOT NULL,
    config_snapshot_id BIGINT NOT NULL,
    attempt_number INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    finalization_source VARCHAR(20) NULL DEFAULT NULL,
    started_at DATETIME(3) NOT NULL,
    expires_at DATETIME(3) NOT NULL,
    finalized_at DATETIME(3) NULL DEFAULT NULL,
    created_at DATETIME(3) NOT NULL,
    active_guard TINYINT AS (CASE WHEN status = 'ACTIVE' THEN 1 ELSE NULL END) STORED,
    PRIMARY KEY (id),
    KEY idx_quiz_attempts_account_config (account_id, quiz_config_id),
    KEY idx_quiz_attempts_account_config_status (account_id, quiz_config_id, status),
    KEY idx_quiz_attempts_expires (expires_at, status),
    CONSTRAINT uq_quiz_attempts_active_guard UNIQUE (account_id, quiz_config_id, active_guard),
    CONSTRAINT uq_quiz_attempts_account_config_number UNIQUE (account_id, quiz_config_id, attempt_number),
    CONSTRAINT ck_quiz_attempts_status CHECK (status IN ('ACTIVE', 'SUBMITTED', 'TIMEOUT_FINALIZED')),
    CONSTRAINT ck_quiz_attempts_finalization_source CHECK (finalization_source IN ('MANUAL', 'TIMEOUT')),
    CONSTRAINT fk_quiz_attempts_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_quiz_attempts_configs FOREIGN KEY (quiz_config_id) REFERENCES quiz_configs (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_quiz_attempts_snapshots FOREIGN KEY (config_snapshot_id) REFERENCES quiz_config_snapshot (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_attempt_questions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    attempt_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    position INT NOT NULL,
    question_type_snapshot VARCHAR(20) NOT NULL,
    question_text_snapshot TEXT NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_quiz_attempt_questions_attempt_pos UNIQUE (attempt_id, position),
    CONSTRAINT ck_quiz_attempt_questions_type CHECK (question_type_snapshot IN ('SINGLE_CHOICE', 'TRUE_FALSE')),
    CONSTRAINT fk_quiz_attempt_questions_attempts FOREIGN KEY (attempt_id) REFERENCES quiz_attempts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_quiz_attempt_questions_questions FOREIGN KEY (question_id) REFERENCES quiz_questions (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_attempt_question_options (
    id BIGINT NOT NULL AUTO_INCREMENT,
    attempt_question_id BIGINT NOT NULL,
    source_option_id BIGINT NULL DEFAULT NULL,
    position INT NOT NULL,
    option_text_snapshot TEXT NOT NULL,
    is_correct_snapshot TINYINT(1) NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_quiz_aqo_question_position UNIQUE (attempt_question_id, position),
    CONSTRAINT uq_quiz_aqo_question_id UNIQUE (attempt_question_id, id),
    CONSTRAINT fk_quiz_aqo_attempt_questions FOREIGN KEY (attempt_question_id) REFERENCES quiz_attempt_questions (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_quiz_aqo_source_options FOREIGN KEY (source_option_id) REFERENCES quiz_question_options (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_attempt_answers (
    id BIGINT NOT NULL AUTO_INCREMENT,
    attempt_question_id BIGINT NOT NULL,
    selected_attempt_option_id BIGINT NULL DEFAULT NULL,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_quiz_attempt_answers_slot UNIQUE (attempt_question_id),
    CONSTRAINT fk_quiz_attempt_answers_questions FOREIGN KEY (attempt_question_id) REFERENCES quiz_attempt_questions (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_quiz_attempt_answers_options FOREIGN KEY (attempt_question_id, selected_attempt_option_id) REFERENCES quiz_attempt_question_options (attempt_question_id, id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_results (
    id BIGINT NOT NULL AUTO_INCREMENT,
    attempt_id BIGINT NOT NULL,
    account_id BIGINT NOT NULL,
    quiz_config_id BIGINT NOT NULL,
    raw_score DECIMAL(6,2) NOT NULL,
    total_questions INT NOT NULL,
    correct_count INT NOT NULL,
    is_passed TINYINT(1) NOT NULL,
    finalization_source VARCHAR(20) NOT NULL,
    graded_at DATETIME(3) NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_quiz_results_attempt UNIQUE (attempt_id),
    KEY idx_quiz_results_account_config (account_id, quiz_config_id),
    KEY idx_quiz_results_account_config_score (account_id, quiz_config_id, raw_score DESC),
    CONSTRAINT ck_quiz_results_finalization_source CHECK (finalization_source IN ('MANUAL', 'TIMEOUT')),
    CONSTRAINT fk_quiz_results_attempts FOREIGN KEY (attempt_id) REFERENCES quiz_attempts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_quiz_results_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_quiz_results_configs FOREIGN KEY (quiz_config_id) REFERENCES quiz_configs (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE edu_programs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    description TEXT NULL DEFAULT NULL,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_edu_programs_publish_status CHECK (publish_status IN ('DRAFT', 'PUBLISHED')),
    CONSTRAINT fk_edu_programs_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE edu_topics (
    id BIGINT NOT NULL AUTO_INCREMENT,
    program_id BIGINT NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT NULL DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_edu_topics_programs FOREIGN KEY (program_id) REFERENCES edu_programs (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE edu_lectures (
    id BIGINT NOT NULL AUTO_INCREMENT,
    topic_id BIGINT NOT NULL,
    title VARCHAR(500) NOT NULL,
    body LONGTEXT NULL DEFAULT NULL,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_edu_lectures_topic (topic_id, sort_order),
    CONSTRAINT ck_edu_lectures_publish_status CHECK (publish_status IN ('DRAFT', 'PUBLISHED')),
    CONSTRAINT fk_edu_lectures_topics FOREIGN KEY (topic_id) REFERENCES edu_topics (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_edu_lectures_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE edu_documents (
    id BIGINT NOT NULL AUTO_INCREMENT,
    lecture_id BIGINT NOT NULL,
    file_metadata_id BIGINT NULL DEFAULT NULL,
    document_type VARCHAR(30) NOT NULL,
    external_url VARCHAR(2000) NULL DEFAULT NULL,
    title VARCHAR(300) NULL DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_edu_documents_lecture (lecture_id, sort_order),
    CONSTRAINT ck_edu_documents_type CHECK (document_type IN ('FILE', 'VIDEO', 'LINK', 'POWERPOINT')),
    CONSTRAINT fk_edu_documents_lectures FOREIGN KEY (lecture_id) REFERENCES edu_lectures (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_edu_documents_files FOREIGN KEY (file_metadata_id) REFERENCES file_metadata (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE edu_lecture_quiz_ref (
    id BIGINT NOT NULL AUTO_INCREMENT,
    lecture_id BIGINT NOT NULL,
    quiz_config_id BIGINT NOT NULL,
    created_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_edu_lecture_quiz_ref_lecture UNIQUE (lecture_id),
    CONSTRAINT fk_edu_lecture_quiz_ref_lectures FOREIGN KEY (lecture_id) REFERENCES edu_lectures (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_edu_lecture_quiz_ref_configs FOREIGN KEY (quiz_config_id) REFERENCES quiz_configs (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_edu_lecture_quiz_ref_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE hcm_teachings (
    id BIGINT NOT NULL AUTO_INCREMENT,
    content LONGTEXT NOT NULL,
    relevance_date DATE NULL DEFAULT NULL,
    source_citation VARCHAR(500) NULL DEFAULT NULL,
    context TEXT NULL DEFAULT NULL,
    meaning TEXT NULL DEFAULT NULL,
    image_file_id BIGINT NULL DEFAULT NULL,
    related_content_refs TEXT NULL DEFAULT NULL,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_hcm_teachings_date_status (relevance_date, publish_status),
    CONSTRAINT ck_hcm_teachings_publish_status CHECK (publish_status IN ('DRAFT', 'PUBLISHED')),
    CONSTRAINT fk_hcm_teachings_files FOREIGN KEY (image_file_id) REFERENCES file_metadata (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_hcm_teachings_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE weekly_questions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    period_opens_at DATETIME(3) NOT NULL,
    period_closes_at DATETIME(3) NOT NULL,
    period_year SMALLINT NULL DEFAULT NULL,
    period_week_label SMALLINT NULL DEFAULT NULL,
    question_text TEXT NOT NULL,
    correct_explanation TEXT NULL DEFAULT NULL,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_weekly_questions_opens_at UNIQUE (period_opens_at),
    KEY idx_weekly_questions_open_close (period_opens_at, period_closes_at),
    CONSTRAINT fk_weekly_questions_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE weekly_question_options (
    id BIGINT NOT NULL AUTO_INCREMENT,
    weekly_question_id BIGINT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct TINYINT(1) NOT NULL DEFAULT 0,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_weekly_question_options_question_id UNIQUE (weekly_question_id, id),
    CONSTRAINT fk_weekly_question_options_questions FOREIGN KEY (weekly_question_id) REFERENCES weekly_questions (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE weekly_submissions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    weekly_question_id BIGINT NOT NULL,
    selected_option_id BIGINT NOT NULL,
    is_correct TINYINT(1) NOT NULL,
    submitted_at DATETIME(3) NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_weekly_submissions_account_question UNIQUE (account_id, weekly_question_id),
    KEY idx_weekly_submissions_question (weekly_question_id),
    CONSTRAINT fk_weekly_submissions_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_weekly_submissions_questions FOREIGN KEY (weekly_question_id) REFERENCES weekly_questions (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_weekly_submissions_options FOREIGN KEY (weekly_question_id, selected_option_id) REFERENCES weekly_question_options (weekly_question_id, id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_policies (
    id BIGINT NOT NULL AUTO_INCREMENT,
    policy_name VARCHAR(200) NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE NULL DEFAULT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_by BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_comp_policies_created_accounts FOREIGN KEY (created_by) REFERENCES accounts (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_criteria (
    id BIGINT NOT NULL AUTO_INCREMENT,
    policy_id BIGINT NOT NULL,
    source_type VARCHAR(30) NOT NULL,
    score_value DECIMAL(8,4) NOT NULL,
    weight DECIMAL(8,4) NOT NULL,
    description TEXT NULL DEFAULT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_comp_criteria_policy_source_type UNIQUE (policy_id, source_type),
    CONSTRAINT ck_comp_criteria_source_type CHECK (source_type IN ('QUIZ_RESULT', 'WEEKLY_RESULT', 'MANUAL_ADJUSTMENT')),
    CONSTRAINT fk_comp_criteria_policies FOREIGN KEY (policy_id) REFERENCES comp_policies (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_periods (
    id BIGINT NOT NULL AUTO_INCREMENT,
    period_type VARCHAR(10) NOT NULL,
    period_year SMALLINT NOT NULL,
    period_number SMALLINT NOT NULL,
    policy_id BIGINT NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'OPEN',
    starts_at DATETIME(3) NOT NULL,
    ends_at DATETIME(3) NOT NULL,
    closed_at DATETIME(3) NULL DEFAULT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_comp_periods_type_year_number UNIQUE (period_type, period_year, period_number),
    KEY idx_comp_periods_status (status, period_type),
    CONSTRAINT ck_comp_periods_type CHECK (period_type IN ('WEEKLY', 'MONTHLY', 'YEARLY')),
    CONSTRAINT ck_comp_periods_status CHECK (status IN ('OPEN', 'CLOSED')),
    CONSTRAINT fk_comp_periods_policies FOREIGN KEY (policy_id) REFERENCES comp_policies (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_manual_adjustments (
    id BIGINT NOT NULL AUTO_INCREMENT,
    period_id BIGINT NOT NULL,
    account_id BIGINT NOT NULL,
    adjustment_type VARCHAR(10) NOT NULL,
    amount DECIMAL(10,4) NOT NULL,
    reason TEXT NOT NULL,
    issued_by_account_id BIGINT NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_comp_manual_adjustments_type CHECK (adjustment_type IN ('BONUS', 'PENALTY')),
    CONSTRAINT ck_comp_manual_adjustments_amount CHECK (amount > 0),
    CONSTRAINT fk_comp_manual_adjustments_periods FOREIGN KEY (period_id) REFERENCES comp_periods (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_manual_adjustments_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_manual_adjustments_issued_accounts FOREIGN KEY (issued_by_account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_quiz_source_selections (
    id BIGINT NOT NULL AUTO_INCREMENT,
    period_id BIGINT NOT NULL,
    account_id BIGINT NOT NULL,
    quiz_config_id BIGINT NOT NULL,
    selected_quiz_result_id BIGINT NOT NULL,
    selected_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_comp_quiz_source_period_account_config UNIQUE (period_id, account_id, quiz_config_id),
    CONSTRAINT uq_comp_quiz_source_period_result UNIQUE (period_id, selected_quiz_result_id),
    CONSTRAINT fk_comp_quiz_sources_periods FOREIGN KEY (period_id) REFERENCES comp_periods (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_quiz_sources_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_quiz_sources_configs FOREIGN KEY (quiz_config_id) REFERENCES quiz_configs (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_quiz_sources_results FOREIGN KEY (selected_quiz_result_id) REFERENCES quiz_results (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_contributions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    period_id BIGINT NOT NULL,
    account_id BIGINT NOT NULL,
    criteria_id BIGINT NOT NULL,
    source_type VARCHAR(30) NOT NULL,
    quiz_source_selection_id BIGINT NULL DEFAULT NULL,
    weekly_submission_id BIGINT NULL DEFAULT NULL,
    manual_adjustment_id BIGINT NULL DEFAULT NULL,
    contribution_value DECIMAL(10,4) NOT NULL,
    is_voided TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_comp_contributions_quiz_selection UNIQUE (quiz_source_selection_id),
    CONSTRAINT uq_comp_contributions_period_weekly_submission UNIQUE (period_id, weekly_submission_id),
    CONSTRAINT uq_comp_contributions_manual_adjustment UNIQUE (manual_adjustment_id),
    KEY idx_comp_contributions_period_account (period_id, account_id),
    KEY idx_comp_contributions_period_source (period_id, source_type),
    CONSTRAINT ck_comp_contributions_source_class CHECK (source_type IN ('QUIZ_RESULT', 'WEEKLY_RESULT', 'MANUAL_ADJUSTMENT')),
    CONSTRAINT ck_comp_contributions_exactly_one_source CHECK (
        (quiz_source_selection_id IS NOT NULL) + (weekly_submission_id IS NOT NULL) + (manual_adjustment_id IS NOT NULL) = 1
    ),
    CONSTRAINT ck_comp_contributions_source_type CHECK (
        (source_type = 'QUIZ_RESULT' AND quiz_source_selection_id IS NOT NULL AND weekly_submission_id IS NULL AND manual_adjustment_id IS NULL)
        OR (source_type = 'WEEKLY_RESULT' AND weekly_submission_id IS NOT NULL AND quiz_source_selection_id IS NULL AND manual_adjustment_id IS NULL)
        OR (source_type = 'MANUAL_ADJUSTMENT' AND manual_adjustment_id IS NOT NULL AND quiz_source_selection_id IS NULL AND weekly_submission_id IS NULL)
    ),
    CONSTRAINT fk_comp_contributions_periods FOREIGN KEY (period_id) REFERENCES comp_periods (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_contributions_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_contributions_criteria FOREIGN KEY (criteria_id) REFERENCES comp_criteria (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_contributions_quiz_sources FOREIGN KEY (quiz_source_selection_id) REFERENCES comp_quiz_source_selections (id),
    CONSTRAINT fk_comp_contributions_weekly_submissions FOREIGN KEY (weekly_submission_id) REFERENCES weekly_submissions (id),
    CONSTRAINT fk_comp_contributions_manual_adjustments FOREIGN KEY (manual_adjustment_id) REFERENCES comp_manual_adjustments (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_corrections (
    id BIGINT NOT NULL AUTO_INCREMENT,
    corrected_contribution_id BIGINT NOT NULL,
    correction_type VARCHAR(20) NOT NULL,
    new_value DECIMAL(10,4) NULL DEFAULT NULL,
    reason TEXT NOT NULL,
    authorized_by_account_id BIGINT NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_comp_corrections_type CHECK (correction_type IN ('VOID', 'ADJUST_VALUE')),
    CONSTRAINT fk_comp_corrections_contributions FOREIGN KEY (corrected_contribution_id) REFERENCES comp_contributions (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_corrections_authorized_accounts FOREIGN KEY (authorized_by_account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_individual_outcomes (
    id BIGINT NOT NULL AUTO_INCREMENT,
    period_id BIGINT NOT NULL,
    account_id BIGINT NOT NULL,
    total_score DECIMAL(12,4) NOT NULL,
    ranking_position INT NULL DEFAULT NULL,
    computed_at DATETIME(3) NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_comp_individual_outcomes_period_account UNIQUE (period_id, account_id),
    KEY idx_comp_individual_outcomes_period (period_id, total_score DESC),
    CONSTRAINT fk_comp_individual_outcomes_periods FOREIGN KEY (period_id) REFERENCES comp_periods (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_individual_outcomes_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_unit_outcomes (
    id BIGINT NOT NULL AUTO_INCREMENT,
    period_id BIGINT NOT NULL,
    org_unit_id BIGINT NOT NULL,
    unit_type VARCHAR(20) NOT NULL,
    eligible_member_count INT NOT NULL,
    total_score_sum DECIMAL(14,4) NOT NULL,
    normalized_avg DECIMAL(12,6) NOT NULL,
    ranking_position INT NULL DEFAULT NULL,
    computed_at DATETIME(3) NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_comp_unit_outcomes_period_unit UNIQUE (period_id, org_unit_id),
    KEY idx_comp_unit_outcomes_period_type (period_id, unit_type, normalized_avg DESC),
    CONSTRAINT ck_comp_unit_outcomes_type CHECK (unit_type IN ('DAI_DOI', 'TRUNG_DOI', 'TIEU_DOI')),
    CONSTRAINT fk_comp_unit_outcomes_periods FOREIGN KEY (period_id) REFERENCES comp_periods (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_unit_outcomes_org_units FOREIGN KEY (org_unit_id) REFERENCES org_units (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comp_member_attributions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    period_id BIGINT NOT NULL,
    account_id BIGINT NOT NULL,
    tieu_doi_id BIGINT NOT NULL,
    trung_doi_id BIGINT NOT NULL,
    dai_doi_id BIGINT NOT NULL,
    source_assignment_history_id BIGINT NULL DEFAULT NULL,
    attributed_at DATETIME(3) NOT NULL,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_comp_member_attr_period_account UNIQUE (period_id, account_id),
    KEY idx_comp_member_attr_period_tieu_doi (period_id, tieu_doi_id),
    CONSTRAINT fk_comp_member_attr_periods FOREIGN KEY (period_id) REFERENCES comp_periods (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_member_attr_accounts FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_member_attr_tieu_doi FOREIGN KEY (tieu_doi_id) REFERENCES org_units (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_member_attr_trung_doi FOREIGN KEY (trung_doi_id) REFERENCES org_units (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_member_attr_dai_doi FOREIGN KEY (dai_doi_id) REFERENCES org_units (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comp_member_attr_assignment_history FOREIGN KEY (source_assignment_history_id) REFERENCES user_assignment_history (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE learning_phases (
    id BIGINT NOT NULL AUTO_INCREMENT,
    school_year_id BIGINT NOT NULL,
    label VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_learning_phases_school_years FOREIGN KEY (school_year_id) REFERENCES school_years (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE popular_view_daily (
    id BIGINT NOT NULL AUTO_INCREMENT,
    content_domain VARCHAR(30) NOT NULL,
    content_id BIGINT NOT NULL,
    view_date DATE NOT NULL,
    view_count INT UNSIGNED NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_popular_view_daily_domain_id_date UNIQUE (content_domain, content_id, view_date),
    KEY idx_popular_view_daily_domain_date (content_domain, view_date),
    CONSTRAINT ck_popular_view_daily_domain CHECK (content_domain IN ('HANDBOOK', 'RESOLUTION', 'NEWS', 'EDU', 'HCM')),
    CONSTRAINT ck_popular_view_daily_count CHECK (view_count >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
