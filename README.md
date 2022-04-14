# Giải thích phương pháp tối ưu

Sử dụng React.memo, useMemo, useCallback

- component app sẽ thường xuyên được rerender vì curentTime cập nhật liên tục. việc này khiến cho các component con là Block, Text sẽ bị rerender dù không cần thiết.

- Vì thế cả 2 component con là Block và Text đều được bọc trong react.memo để hạn chế việc rerender không cần thiết khi props truyền vào là không thay đổi.

- useCallback được sử dụng để cache hàm updateCurentTime , nó sẽ không khởi tạo lại hàm cho dù compponet app rerender liên tục. Điều này giúp cho việc truyền hàm này qua props sẽ không làm các component con rerender.

- useMemo được sử dụng để cache giá trị của hàm arr.map() điều này giúp cho giá trị startTimeCommentArr chỉ thay đổi khi commentList thay đổi (không bị gọi lại hàm arr.map cho dù component block có bị rerender).
