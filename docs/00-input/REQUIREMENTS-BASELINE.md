# REQUIREMENTS BASELINE

**Project:** Hệ thống Giáo dục Chính trị  
**Baseline:** 0  
**Date:** 2026-08-14  
**Status:** Accepted as analysis input

## 1. Project goals

Xây dựng một hệ thống giáo dục chính trị cho một đơn vị, phục vụ khoảng 500 người dùng, sử dụng qua website responsive trên máy tính và điện thoại.

Mục tiêu bao gồm:
- Số hóa và quản lý nội dung giáo dục chính trị.
- Cung cấp tài liệu học tập và tra cứu.
- Tổ chức kiểm tra trắc nghiệm.
- Cung cấp câu hỏi kiến thức hàng tuần.
- Tự động hóa một phần chấm điểm thi đua và bảng xếp hạng.
- Cung cấp dashboard báo cáo cơ bản cho chỉ huy/admin.

## 2. Main modules

1. Cẩm nang người lính.
2. Học tập nghị quyết.
3. Đọc báo và nghe tin.
4. Kho tàng âm nhạc.
5. Kiểm tra trắc nghiệm.
6. Giáo dục chính trị.
7. Lời Bác Hồ dạy.
8. Mỗi tuần một câu hỏi.
9. Chấm điểm thi đua.

## 3. Users and access

- Hệ thống phục vụ một đơn vị.
- Cơ cấu người dùng nghiệp vụ được chia theo Cán bộ và Chiến sĩ.
- Các vai trò hệ thống:
  - SUPER_ADMIN
  - ADMIN
  - USER
- Admin quản lý toàn bộ 9 phân hệ.
- Không phân quyền dữ liệu theo nhiều đơn vị trong V1.
- Admin được đăng nội dung trực tiếp, không có workflow duyệt.
- Người dùng tự đăng ký bằng tên đăng nhập/mật khẩu và cần mã giới thiệu do Admin cấp.
- Không yêu cầu 2FA trong V1.

## 4. Key module requirements

### 4.1 Cẩm nang người lính
- Nội dung theo Danh mục → Bài viết.
- Hỗ trợ văn bản, ảnh, video.
- Có tìm kiếm trong phân hệ.
- Không cần yêu thích/đọc sau.

### 4.2 Học tập nghị quyết
- Quản lý thông tin nghị quyết, file tài liệu, video và tài liệu liên quan.
- Có thể chia thành chuyên đề/bài học.
- Mục tiêu chính là đọc/xem nội dung.
- Không theo dõi tiến độ học và không có kiểm tra riêng.

### 4.3 Đọc báo và nghe tin
- Admin có thể tự đăng nội dung.
- Có định hướng lấy thêm nội dung từ nguồn ngoài nhưng nguồn chưa chốt.
- Hỗ trợ tin chữ, video, link bài báo.
- Có chuyên mục.
- Không lưu lịch sử đọc/nghe.

### 4.4 Kho tàng âm nhạc
- Nhạc cách mạng, truyền thống, về Đảng, Bác Hồ, quân đội và đơn vị.
- Hỗ trợ video upload và nội dung từ YouTube.
- Không playlist, không yêu thích, không thống kê lượt nghe trong MVP.

### 4.5 Kiểm tra trắc nghiệm
- Có ngân hàng câu hỏi.
- Câu hỏi một đáp án đúng hoặc đúng/sai.
- Phân loại theo chủ đề.
- Đề thi được sinh ngẫu nhiên từ ngân hàng.
- Cấu hình số câu, thời gian làm bài, điểm đạt.
- Đảo thứ tự câu hỏi/đáp án.
- Kết quả hiển thị Đạt/Không đạt.
- Kết quả ảnh hưởng điểm thi đua.
- Có bảng xếp hạng.

### 4.6 Giáo dục chính trị
- Cấu trúc: Chương trình → Chủ đề → Bài giảng → Tài liệu → Kiểm tra.
- Bài giảng hỗ trợ bài viết, PowerPoint, video.
- Không theo dõi tiến độ học trong MVP.

### 4.7 Lời Bác Hồ dạy
- Hiển thị mỗi ngày một lời dạy.
- Có nội dung, ngày/thời điểm, nguồn, hoàn cảnh, ý nghĩa, hình ảnh và nội dung liên quan.
- Hiển thị “Lời Bác Hồ dạy hôm nay” trên trang chủ.

### 4.8 Mỗi tuần một câu hỏi
- Mỗi tuần 1 câu hỏi kiến thức dạng trắc nghiệm.
- Hệ thống tự chấm.
- Có công khai đáp án/lời giải.
- Kết quả được cộng vào điểm thi đua.

### 4.9 Chấm điểm thi đua
- Đối tượng: cá nhân, trung đội, đại đội.
- Có xếp hạng cá nhân, tiểu đội, trung đội, đại đội.
- Điểm tự động lấy từ hoạt động hệ thống và có thể gồm hoàn thành học tập, kiểm tra, câu hỏi tuần, tham gia hoạt động, điểm cộng/trừ.
- Công thức chi tiết chưa chốt, cần đề xuất ở version thiết kế nghiệp vụ.
- Công khai bảng xếp hạng.
- Chu kỳ tuần, tháng, năm.

## 5. Reporting

Dashboard tối thiểu:
- Tổng quân số.
- Điểm thi đua.
- Xếp hạng.
- Nội dung phổ biến.

Báo cáo theo:
- Ngày.
- Tuần.
- Tháng.
- Năm.

Xuất Excel.

## 6. Technical baseline

- Java 21.
- Spring Boot 4.1.x.
- Modular Monolith.
- REST API.
- Spring Security.
- Spring Data JPA / Hibernate.
- Flyway.
- Maven Wrapper.
- MySQL 8.4 LTS.
- React + TypeScript.
- Vite.
- React Router.
- TanStack Query.
- React Hook Form.
- Zod.
- Ant Design.
- Local filesystem abstraction for V1; có thể nâng cấp S3-compatible storage sau.
- OpenAPI 3 / Swagger UI.
- JUnit 5 / Mockito / Spring Boot Test.
- Playwright + TypeScript.
- Nginx.
- Spring Boot Actuator.
- Không sử dụng Docker.
- Không sử dụng Testcontainers.
- Quản lý source code và dự án bằng GitHub.

## 7. Delivery milestones

- UI prototype/reporting target: 2026-08-21.
- MVP completion target: before 2026-09-20.

## 8. Open issues

| ID | Vấn đề | Trạng thái |
|---|---|---|
| OI-001 | Nguồn báo/tin bên ngoài được phép tích hợp | Chưa chốt |
| OI-002 | Bộ tiêu chí và công thức chấm điểm thi đua | Chưa chốt |
| OI-003 | Hạ tầng/server triển khai production | Chưa chốt |
| OI-004 | Dữ liệu thật ban đầu để nhập hệ thống | Chưa chốt |
| OI-005 | Giới hạn dung lượng file/video upload | Chưa chốt |

## 9. UI reference

`docs/00-input/ui-reference/ui-reference-01.png`

Ảnh mẫu được sử dụng như visual reference cho User Portal, không phải yêu cầu clone 1:1.
