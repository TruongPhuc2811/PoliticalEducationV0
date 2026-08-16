# UI GUIDELINE — V0.5

**Project:** Hệ thống Giáo dục Chính trị

**Document ID:** PES-UIG-V0.5

**Version:** 0.5

**Date:** 2026-08-16

**Status:** Accepted

**Depends on:** `docs/v0.2/FUNCTIONAL-SPECIFICATION.md`, `docs/v0.2/SCREEN-CATALOG.md`, `wireframes/WIREFRAME-SPEC.md`, P0 UI Reporting Acceptance

**Applies to:** P0 maintenance and future P1 UI implementation; not production branding approval

> V0.5 captures the validated UI direction and reusable rules derived from P0. Final organizational branding assets, exact identity colors and future visual refinements remain subject to project-owner approval.

---

## 1. Mục đích, trạng thái và cách dùng

Tài liệu chuẩn hóa những pattern đã được kiểm chứng qua P0 React UI ở desktop `1280×800` và mobile `375×812`. Developer dùng guideline này để giữ giao diện nhất quán khi bảo trì P0 hoặc triển khai P1, nhưng không được suy diễn business rule, API, database hoặc nhận diện tổ chức chưa được duyệt.

Thứ tự ưu tiên khi có xung đột:

1. Business/Functional Requirements.
2. Screen Catalog.
3. P0 Wireframe Review Ready.
4. UI Acceptance evidence.
5. UI Reference.
6. React/CSS prototype hiện tại.

Các nhãn trạng thái trong tài liệu:

- **Accepted (document):** guideline được phê duyệt làm baseline triển khai hiện tại; không tự nâng candidate/Pending item thành official branding.
- **Review Ready:** rule có đủ bằng chứng P0 để review và tái sử dụng.
- **Validated P0 candidate:** giá trị đã hoạt động trong P0 nhưng còn chờ phê duyệt nhận diện.
- **Implementation-derived / Review:** giá trị kỹ thuật hiện hữu, hữu ích cho triển khai nhưng không phải breakpoint/token tổ chức đã duyệt.
- **Pending:** chưa đủ nguồn để khóa.

## 2. Nguyên tắc thiết kế

1. **Trang trọng nhưng hiện đại:** thể hiện bối cảnh giáo dục chính trị bằng identity có kiểm soát; không biến mọi trang thành poster hoặc banner.
2. **Content first:** nội dung, thao tác học tập và nghiệp vụ quan trọng hơn trang trí.
3. **Module-first navigation:** đúng chín phân hệ phải nhận biết nhanh từ Home.
4. **Consistency:** thao tác cùng loại dùng hierarchy, trạng thái và placement tương đương.
5. **Clear state:** loading, empty, error, disabled, success và pending phải có text dễ hiểu.
6. **Responsive first:** desktop và mobile là hai target chính; không xem mobile là bản desktop bị thu nhỏ.
7. **Resource-conscious:** không preload, autoplay, polling hoặc load-all khi không có yêu cầu.
8. **Accessibility-aware:** semantic element, keyboard/focus và text status là baseline; không truyền đạt chỉ bằng màu.

## 3. Một product identity, hai ngôn ngữ portal

### 3.1 User Portal

- Content-first, module card lớn, hero/banner có kiểm soát và navigation đơn giản.
- Ưu tiên khả năng đọc article, học tập, quiz và ranking.
- Chrome quản trị tối thiểu; header chỉ giữ identity và account/control cần thiết.
- Surface nội dung sáng, khoảng thở rộng hơn Admin.

### 3.2 Admin Portal

- Operational, action-oriented, mật độ cao hơn User Portal.
- Desktop dùng sidebar + header + workspace; mobile dùng Drawer.
- Filter, table, form, modal và dashboard tạo hierarchy chính; không dùng decorative hero lớn.
- Widget lỗi/loading được cô lập; action quản trị phải rõ và có feedback.

### 3.3 Dùng chung và khác nhau

| Nhóm | Dùng chung | Khác nhau |
|---|---|---|
| Identity | Tên hệ thống, primary red, accent gold, font body, focus/state semantics | User lockup nổi bật hơn; Admin lockup gọn và operational |
| Navigation | Link/button semantics, active/disabled text | User header đơn giản; Admin sidebar/Drawer |
| Content | Heading, form, notice, status, pagination | User list/detail thoáng; Admin table/form dày hơn |
| Feedback | Loading/empty/error/success/pending có text | Dashboard hỗ trợ widget-level isolation và retry |

Không tạo hai brand độc lập cho hai portal.

## 4. Hệ màu semantic

| Token/Role | Candidate value | Usage | Restrictions | Status |
|---|---|---|---|---|
| Brand Primary | `#A7191F` | Identity, primary action, active emphasis | Không phủ toàn page body; kiểm tra contrast khi dùng nền | Validated P0 candidate |
| Brand Primary Strong | `#711014` | Heading/lockup đậm, gradient điểm nhấn | Không dùng cho body text dài trên nền tối | Validated P0 candidate |
| Accent / Gold | `#E5B53A` | Icon/accent, selected emphasis, decorative line | Không dùng cho body text dài hoặc trạng thái duy nhất | Validated P0 candidate |
| Background | `#F7F3EC` | Nền User Portal | Không thay surface đọc nội dung | Validated P0 candidate |
| Surface | `#FFFDF9` | Card, panel, content surface | Giữ contrast rõ với text/border | Validated P0 candidate |
| Surface subtle | `#F3ECE2` | Filter, muted region, secondary grouping | Không dùng thay disabled text | Validated P0 candidate |
| Text primary | `#241B1B` | Body, heading trên nền sáng | Không giảm opacity tùy tiện | Validated P0 candidate |
| Text secondary | `#716665` | Helper, metadata, caption | Không dùng cho thông tin bắt buộc nếu contrast kém | Validated P0 candidate |
| Border | `#DFD2C5` | Card, panel, table, divider | Không dùng làm dấu hiệu state duy nhất | Validated P0 candidate |
| Success | `#247346` | Success, answered, pass support | Luôn kèm text/icon; quiz result phải có “ĐẠT” | Review Ready |
| Warning | `#8C6B16` với nền `#FFF7DA` | Pending OI, caution, mock boundary | Không đồng nghĩa error; không che nội dung chính | Review Ready |
| Error | `#A6292E` | Validation, destructive/error feedback | Không leak lỗi kỹ thuật; luôn kèm text | Review Ready |
| Info | `#496D92` với nền `#EEF5FB` | Thông tin trung tính, prototype explanation | Không dùng để giả trạng thái business | Review Ready |
| Focus | `#1F66B1` | Outline focus-visible 3 px | Không loại bỏ outline nếu chưa có replacement tương đương | Review Ready |
| Disabled | Text `#766C68`, surface `#EEE9E5`, giảm saturation/opacity có kiểm soát | Control/card unavailable | Phải có label lý do/P1 state; không chỉ giảm opacity | Review Ready |

Giá trị chữ hoa/thường của mã màu không mang ý nghĩa. Brand values vẫn chờ project owner xác nhận cùng logo/asset chính thức.

## 5. Quy tắc dùng đỏ và vàng

- Đỏ ưu tiên identity, primary CTA, active emphasis và điểm nhấn có chủ ý.
- Vàng ưu tiên icon, accent, decorative detail và selected emphasis.
- Không dùng nền đỏ đậm cho toàn bộ body của page.
- Không dùng vàng cho đoạn body text dài.
- Không dùng gradient mạnh trên mọi card; module cards/Home hero là ngoại lệ đã có evidence.
- Surface đọc nội dung, form và table phải giữ nền sáng, contrast cao.
- Màu module có thể phân biệt entry point, nhưng title/status vẫn phải đọc được bằng text.

## 6. Typography

### 6.1 Font strategy

- Body/UI: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Editorial display/heading có kiểm soát: `Georgia, "Times New Roman", serif` cho User identity, hero và article; Admin page heading dùng UI sans-serif.
- Không tải thêm font trong baseline này. Nếu Inter không được host, system fallback là hợp lệ.

### 6.2 Semantic scale

| Role | Candidate | Guidance | Status |
|---|---|---|---|
| Display/Hero | `clamp(2.3rem, 5vw, 4.6rem)`, line-height khoảng `1.08` | Chỉ identity/hero chính | Validated P0 candidate |
| H1 | `clamp(2rem, 4vw, 3.25rem)`; Admin `1.8–2.45rem` | Một heading chính/page | Review Ready |
| H2 | `clamp(1.25rem, 2vw, 1.65rem)` | Section/card title | Review Ready |
| H3 | Theo body scale, weight mạnh | Subsection trong detail/form | Review Ready |
| Body | `1rem`, line-height tối thiểu khoảng `1.5` | Nội dung UI mặc định | Review Ready |
| Editorial body | khoảng `1.08rem`, line-height `1.8` | Article/detail dài | Validated P0 candidate |
| Body small/helper | `0.86–0.9rem` | Metadata/helper, không thay label | Review Ready |
| Label/button/table | `1rem` hoặc component default, weight `700` khi cần | Rõ action/field hierarchy | Review Ready |
| Eyebrow/caption | `0.66–0.8rem`, uppercase/letter-spacing có kiểm soát | Context, requirement/status | Review Ready |

Không dùng uppercase cho đoạn dài. Không dựa vào font serif để thể hiện trạng thái hay capability.

## 7. Spacing system

Scale nhỏ được khuyến nghị: `4, 8, 12, 16, 24, 32, 40, 48` px. Giá trị giữa scale chỉ dùng khi component library cần hoặc P0 pattern đã có evidence rõ.

| Context | Guideline | P0 evidence |
|---|---|---|
| Inline icon/text | `8–12` | Lockup/action gaps `10–12` |
| Form field nội bộ | `7–8` | Label-control-helper |
| Form stack/action group | `16` / `8–12` | Auth/Admin forms |
| Compact Admin panel | `14–18` | Filter/stat/table regions |
| User card/panel padding | `22–24` | Module/content/quiz/ranking panels |
| Section gap | `24–40` | Page heading, Home sections |
| Desktop page gutter | khoảng `20` mỗi bên tại max-width | `calc(100% - 40px)` |
| Mobile page gutter | `12` mỗi bên | `calc(100% - 24px)` |

Không tạo token cho mọi giá trị CSS hiện hữu; ưu tiên scale trên khi xây P1.

## 8. Border, radius và shadow

| Level | Candidate | Usage | Status |
|---|---|---|---|
| Input/control | radius `9–10px`, border semantic | Input, select, button | Review Ready |
| Panel/card | radius `14–16px` | Content, filter, quiz, Admin stats | Review Ready |
| Feature card | radius `20–24px` | Module card, result, media stage | Validated P0 candidate |
| No shadow | none | Table/filter/compact operational grouping | Review Ready |
| Subtle | `0 8px 24px rgba(69,34,24,.06)` | Content panel/card | Validated P0 candidate |
| Elevated | `0 14px 38px rgba(75,28,21,.10)` | Hero/result/elevated focus surface | Validated P0 candidate |

Không dùng shadow nặng trên mọi component. Modal/Drawer dùng elevation mặc định của Ant Design trừ khi có defect có bằng chứng.

## 9. Layout foundation

- User content max-width candidate: `1240px`; readable article candidate: `960px`; content listing candidate: `1180px`.
- Desktop User header candidate: cao tối thiểu `78px`, sticky khi viewport đủ; mobile có thể static để tiết kiệm không gian.
- Home hero có giới hạn chiều cao nội dung; không đẩy module grid quá sâu.
- Home module grid: ba cột desktop khi đủ rộng, hai cột trung gian, một cột mobile.
- Content list: main content + filter/sidebar desktop; một cột mobile.
- Detail: readable single column, media responsive và action gần media.
- Admin: sidebar `250px` là implementation value; workspace dùng phần còn lại. Mobile chuyển Drawer.
- Table luôn nằm trong container có `max-width: 100%`; khi không collapse được, cuộn ngang chỉ trong region có label.

Các số trên là guideline candidate/implementation value, không phải token tổ chức đã duyệt.

## 10. Responsive behavior

### 10.1 Validation viewport và breakpoint

- P0 đã validate ở desktop `1280×800` và mobile `375×812`.
- CSS hiện dùng breakpoint `980px` và `640px`; đây là **Implementation-derived / Review**, không phải breakpoint cuối.
- Tablet là vùng chuyển tiếp; V0.5 baseline không yêu cầu pixel-perfect tablet baseline.

### 10.2 Desktop

- Home ưu tiên ba module card/cột.
- User content được phép multi-column khi sidebar/context thật sự hữu ích.
- Admin dùng sidebar cố định và workspace đủ rộng.
- Filter/action nằm một hàng khi không làm giảm khả năng đọc.

### 10.3 Mobile

- Content chính một cột; CTA vẫn reachable và không bị che.
- Filter controls stack; reset `flex-basis` khi đổi trục sang column.
- Admin navigation dùng Drawer, đóng sau navigation.
- Table cuộn ngang trong region khi cần; không gây global document overflow.
- Quiz action wrap/stack; submit không cạnh tranh với Previous/Next.
- Header rút gọn secondary identity, không làm mất tên hệ thống.

## 11. User Portal Header

- Identity gồm emblem/logo placeholder, optional unit label và tên hệ thống.
- Account/control area ở phía đối diện, ít action; P0 chưa chứng minh cần global navigation lớn.
- Toàn lockup về Home là một target rõ, có accessible label.
- Mobile cho phép ẩn secondary unit line, thu emblem và stack account controls.
- Asset logo/đơn vị chính thức vẫn Pending; không dùng biểu tượng prototype như logo chính thức.

## 12. Home và Module Card canonical pattern

Home luôn hiển thị đúng chín phân hệ:

1. Cẩm nang người lính.
2. Học tập nghị quyết.
3. Đọc báo và nghe tin.
4. Kho tàng âm nhạc.
5. Kiểm tra trắc nghiệm.
6. Giáo dục chính trị.
7. Lời Bác Hồ dạy.
8. Mỗi tuần một câu hỏi.
9. Chấm điểm thi đua.

Module Card gồm icon hỗ trợ, index, title, description ngắn và availability/action label. Toàn card là click target khi khả dụng. Card không khả dụng dùng semantic disabled, giảm emphasis và text `P1/Sắp triển khai`; không tạo link chết.

- Desktop candidate min-height `220px`; mobile `185px`. Dùng min-height, không khóa chiều cao nếu title wrap.
- Title tối đa rõ ràng trong 1–2 dòng; description được wrap, không cắt mất thông tin chính.
- Hover dịch chuyển nhẹ tối đa khoảng `3px`; focus-visible bắt buộc.
- Màu card phân biệt module nhưng không thay title/icon/status text.
- Home hero và highlight không được làm chín entry point bị chìm.

## 13. Forms

- Mỗi field có label nhìn thấy; helper nằm gần control; error nằm ngay dưới field.
- Required/invalid/disabled/loading phải được thể hiện bằng text/semantics, không chỉ border color.
- Submit đang chạy disabled/loading để ngăn double-submit; success/error không làm mất input context.
- Password dùng password control và autocomplete phù hợp; không thêm password policy chưa có source.
- Select/file input giữ touch target dùng được. File presentation chỉ hiển thị tên/progress/error khi behavior tương ứng tồn tại.
- Với Ant Design controlled component + React Hook Form, dùng integration phù hợp như `Controller` khi native `register` contract không đủ; không làm yếu validation/type chỉ để nối form.
- `OI-005` chặn size-limit cụ thể; `OI-006` chặn lifecycle invitation.

## 14. Buttons và actions

| Variant | Dùng khi | Rule |
|---|---|---|
| Primary | Một hành động chính của context | Tránh nhiều primary CTA cạnh tranh |
| Secondary | Back, cancel, alternative action | Không lấn primary |
| Text/quiet | Navigation phụ, low-emphasis action | Vẫn có focus và label rõ |
| Destructive | Delete/remove irreversible hoặc cần confirm | Text cụ thể; confirm khi appropriate |
| Disabled | Action chưa khả dụng/P1/boundary | Phải giải thích lý do gần control |
| Loading | Action đang submit/request | Giữ label/context và chặn submit lặp |

Button label dùng động từ cụ thể. Icon không thay toàn bộ label cho action quan trọng.

## 15. Lists, tables và pagination

### 15.1 Content list

- Search/filter đặt trước list; giữ input khi error/retry.
- Item gồm thumbnail nhẹ, category/context, title, excerpt và action detail.
- Loading, no-result, no-data và error phải phân biệt.
- Không infinite scroll mặc định; growing collections dùng pagination.

### 15.2 Admin/ranking table

- Header rõ, row action gom trong vùng nhất quán; destructive action phân biệt bằng text/tone.
- Table dùng pagination và bounded data; không load-all.
- Empty/error nằm cùng context table, không tạo page trắng.
- Mobile: ưu tiên giữ cột nghiệp vụ cần thiết; nếu vẫn rộng, dùng labelled scroll region và không overflow document.
- Admin density có thể cao hơn User Portal nhưng không giảm touch/focus usability.

### 15.3 Pagination

- Hiển thị current page, total page nếu biết, Previous/Next và disabled boundary.
- Mobile cho phép wrap; controls vẫn theo thứ tự logic.
- Không dùng pagination control để ngầm load toàn bộ dữ liệu.

## 16. Modal và Drawer

### 16.1 Modal

Dùng cho confirmation, destructive confirmation và create/edit form nhỏ hoặc vừa. Có title, close/cancel rõ, focus management và action footer nhất quán. Không dùng modal cho workflow dài hoặc page-level hierarchy.

### 16.2 Drawer

Dùng cho mobile Admin navigation hoặc contextual action phù hợp. Drawer có title, close control, navigation focus và đóng sau khi chọn target. Không để overlay/body scroll sai hoặc mất đường quay lại.

## 17. Quiz UI

- Quiz list card hiển thị tên kỳ, số câu, thời gian cấu hình, điểm đạt và open/closed state.
- Question panel ưu tiên prompt; answer option toàn hàng là target, selected state có border/background và semantic selection.
- Navigator cho biết current/answered/unanswered bằng text/accessible label, không chỉ màu.
- Timer là vùng thời gian cấu hình. Visual không đồng nghĩa countdown hay auto-submit.
- Submit là explicit action, có confirmation; unanswered behavior chờ quyết định.
- Result hiện chỉ xác nhận **ĐẠT** hoặc **KHÔNG ĐẠT** bằng text rõ; không raw score.

Giữ mở `OI-007`, `OI-008`, `OI-009`; không encode attempt count, resume, timeout auto-submit, raw score, ranking metric hoặc tie-breaker.

## 18. Competition và Ranking

- Context phải nêu scope, period và subject/unit.
- Bảng/list gồm rank, đối tượng/đơn vị và trường điểm chỉ khi business policy cho phép.
- Loading/empty/error/blocked metric có text; mock score phải ghi nhãn mock hoặc dùng dấu gạch.
- Không tạo score color band, percentage, coefficient, weight hoặc tie-break guideline.

Giữ mở `OI-002`, `OI-012`, `OI-014`.

## 19. Dashboard

- Summary card gồm metric label, value/placeholder và note/source trạng thái.
- Widget loading/error độc lập; lỗi một widget không làm mất navigation hoặc widget khác.
- Retry là explicit action và phải có feedback; không polling mặc định.
- Quick action dẫn tới capability đã tồn tại.
- Popular content tiếp tục là placeholder chờ `OI-013`; không chọn views/likes/plays làm metric.

## 20. Media và document

- List dùng thumbnail/preview nhẹ; không tải file/video đầy đủ.
- Detail dùng explicit play/preview, không autoplay và không preload.
- Có download action khi requirement cho phép; preview không khả dụng dùng fallback rõ.
- Không chọn Office converter/library hoặc size-limit trong guideline.
- Giữ mở `OI-005` và `OI-015`.

## 21. State patterns

### 21.1 Loading

- Button loading cho thao tác nhỏ; section/widget loading cho vùng độc lập; page loading cho lazy route/page thật sự chưa sẵn sàng.
- Không dùng full-screen spinner cho thao tác cục bộ.

### 21.2 Empty

Empty state nêu context, lý do đơn giản và action phù hợp nếu có. Phân biệt: chưa có dữ liệu, search không kết quả, feature chưa cấu hình và P1 chưa triển khai.

### 21.3 Error

- Inline: validation gần field.
- Section/widget: lỗi cục bộ + explicit retry.
- Page: unavailable/not found/unauthorized và đường quay lại.
- Không hiển thị stack trace, exception hoặc path nội bộ.

### 21.4 Success và status

Success, pass, fail, pending và disabled luôn có text/icon/label; không chỉ màu. `ĐẠT/ KHÔNG ĐẠT` là text bắt buộc ở Quiz Result.

## 22. Mock and Pending Behavior

| Loại | Treatment | Không được làm |
|---|---|---|
| Mock data | Generic, non-sensitive, notice vừa đủ | Trình bày như dữ liệu production |
| Placeholder metric | Dấu gạch + label pending/source | Tạo số hoặc công thức giả |
| Pending OI | Notice gần action/state bị ảnh hưởng | Chuyển OI thành default rule |
| Local-only CRUD | Success text nói rõ reset/no persistence | Giả rằng backend đã lưu |
| P1 unavailable | Disabled card/item + label P1 | Link tới screen rỗng hoặc coi đã implement |

Notice phải rõ nhưng không lặp ở mọi block tới mức che nội dung. Khi integration thật tồn tại, thay mock boundary bằng contract đã được duyệt; không copy local mock state vào production logic.

## 23. Iconography và motion

- Dùng icon đã có trong stack; không thêm dependency icon riêng chỉ cho P1.
- Icon hỗ trợ label, không thay label cho action quan trọng; module icons phải phân biệt được.
- Destructive icon/action phải có text rõ, không dùng biểu tượng mơ hồ.
- Transition ngắn, nhẹ cho hover/focus; Modal/Drawer dùng behavior của Ant Design.
- Không animation decorative dài hoặc animation framework mới.
- Tôn trọng `prefers-reduced-motion`; P0 tắt transition khi preference này bật.

## 24. Accessibility baseline

- Heading semantic và một H1 chính/page.
- Input có label; helper/error được liên kết hoặc đặt gần control.
- Keyboard truy cập được link, button, table scroll region, modal và Drawer.
- `focus-visible` rõ; không xóa outline không có replacement.
- Status không color-only; contrast phải đủ đọc trên surface thực tế.
- Modal/Drawer có title, close và focus semantics.
- Click/touch target đủ dùng; P0 control chính hướng tới khoảng `40px` trở lên.

Đây là baseline cho prototype/P1, **không phải chứng nhận WCAG**. Contrast ratio và assistive-technology coverage chưa được audit/certify đầy đủ.

## 25. Resource-conscious UI và bundle guidance

Không mặc định autoplay media, preload video, polling, background timer, infinite list, huge image, base64 asset lớn, load-all rows hoặc tải toàn question bank.

Ưu tiên route-level lazy loading cho major feature page, on-demand media, pagination, thumbnail, bounded data, explicit refresh/export và current-question rendering. Không thêm dependency UI nặng khi React/Ant Design stack hiện tại đủ. Bundle warning phải được review bằng build evidence; V0.5 không đặt performance budget mới và không yêu cầu refactor shared chunks hiện tại.

P0 evidence: route lazy loading giảm entry JS xuống `30.15 kB`; largest shared JS chunk `297.79 kB`; CSS `20.22 kB`; không có cảnh báo chunk trên `500 kB`. Đây là evidence build, không phải performance budget.

## 26. Current P0 pattern inventory

| # | Pattern | Purpose | Used screens | Guideline status | Future reuse |
|---:|---|---|---|---|---|
| 1 | UserPortalHeader | Identity + account controls | User P0 screens | Review Ready | User P1 |
| 2 | Module Card | Chín entry points | `SCR-HOME-001` | Review Ready | Home/module discovery |
| 3 | Prototype/Pending Notice | Mock/OI/state boundary | All affected P0 | Review Ready | Pending/integration states |
| 4 | Pagination | Bounded growing collection | Handbook, Quiz, Ranking, Admin | Review Ready | P1 list/table/report |
| 5 | User content list/detail | Readable discovery/content | `SCR-HAN-002`, `SCR-HAN-003` | Review Ready | Resolution/News/Music/EDU/HCM |
| 6 | Quiz summary/list | Discovery + availability | `SCR-QUIZ-001` | Review Ready | Quiz/Weekly with OI review |
| 7 | Quiz question | Answer + navigation | `SCR-QUIZ-003` | Review Ready | Quiz only; weekly adapted carefully |
| 8 | Quiz result | Pass/fail presentation | `SCR-QUIZ-004` | Review Ready | Result state after policy approval |
| 9 | Ranking table | Scope/period/rank layout | `SCR-COMP-002` | Review Ready | Quiz/competition ranking after OI |
| 10 | Admin sidebar | Desktop operational nav | Admin P0 | Review Ready | Admin P1 |
| 11 | Admin mobile Drawer | Mobile operational nav | Admin P0 | Review Ready | Admin P1 |
| 12 | Admin filter panel | Search/filter before table | `SCR-ADM-008`, `SCR-ADM-004` | Review Ready | Admin content/report |
| 13 | Admin table | CRUD list/action region | `SCR-ADM-008`, `SCR-ADM-004` | Review Ready | Admin P1 |
| 14 | Admin Modal/Form | Small/medium create/edit | `SCR-ADM-008`, `SCR-ADM-004` | Review Ready | Admin P1 forms phù hợp |
| 15 | Dashboard summary placeholder | Metric/state isolation | `SCR-ADM-001` | Review Ready | Reporting after metric approval |

Bảng này không khóa React props/component API.

## 27. Design token status

| Token group | Status |
|---|---|
| Brand colors | Candidate / Review Ready |
| Semantic colors | Review Ready |
| Typography | Review Ready |
| Spacing | Review Ready |
| Radius | Review Ready |
| Shadows | Review Ready |
| Breakpoints | Implementation-derived / Review |
| Component patterns | Review Ready |
| Organizational logo/official brand assets | Pending — chưa được cung cấp chính thức |

## 28. Do / Don't

### Do

- Dùng một primary CTA rõ cho mỗi context.
- Dùng pagination cho list/table tăng trưởng.
- Giữ content surface sáng, dễ đọc.
- Dùng pending/mock label cho unresolved rule.
- Cô lập widget error/loading và dùng explicit retry.
- Kiểm tra global overflow ở desktop/mobile.

### Don't

- Biến toàn trang thành nền đỏ hoặc dùng vàng cho body text dài.
- Autoplay/preload nhiều media hoặc polling mặc định.
- Dùng màu thay text status.
- Đưa score/metric giả vào UI.
- Tạo horizontal document overflow.
- Dùng modal cho workflow dài.
- Tạo visual language mới riêng cho từng P1 module.

## 29. Open Issues ảnh hưởng guideline

| OI | UI boundary giữ nguyên | Cần quyết định trước |
|---|---|---|
| `OI-002` | Không formula/weight/tie-break/score band | Competition/report integration |
| `OI-005` | Không size-limit upload cụ thể | File validation implementation |
| `OI-006` | Generic invitation validity only | Auth registration integration |
| `OI-007` | Không attempts/resume/unanswered rule | Quiz integration |
| `OI-008` | Timer không đồng nghĩa auto-submit | Timeout implementation |
| `OI-009` | Result chỉ Đạt/Không đạt, không raw score | Quiz result/ranking integration |
| `OI-012` | Không dùng completion source giả | Competition backend |
| `OI-013` | Popular content là placeholder | Dashboard/report metric |
| `OI-014` | Neutral unit/scope, không assignment rule | Organization/competition design |
| `OI-015` | Preview fallback, không chọn converter | Document preview implementation |

Không OI nào được đóng bởi V0.5.

## 30. Handoff for P1 Screens

P1 implementation phải:

1. Reuse các V0.5 pattern phù hợp thay vì tạo visual language mới theo module.
2. Giữ User/Admin separation và một product identity.
3. Giữ responsive behavior, no-global-overflow và accessible state baseline.
4. Giữ pagination/on-demand media/bounded data/explicit refresh theo resource-conscious rules.
5. Chỉ encode behavior thật sau khi OI liên quan được quyết định.
6. Ghi source Screen/Requirement/Use Case và cập nhật traceability theo task implementation.
7. Không coi candidate brand tokens hoặc logo prototype là asset tổ chức chính thức.

## 31. Remaining visual decisions

V0.5 được Accepted làm baseline triển khai với các quyết định sau vẫn Pending: logo/asset đơn vị chính thức, exact identity colors, contrast measurement đầy đủ, font delivery strategy nếu muốn bắt buộc Inter, breakpoint/token naming và mức visual refinement cho P1. Các mục này không chặn acceptance của guideline; chúng chặn claim về nhận diện tổ chức chính thức và phải đi qua project-owner review hoặc change control trước khi được nâng trạng thái.

Next recommended task:

> Start V0.3 System Design for MVP backend/API/integration baseline.
