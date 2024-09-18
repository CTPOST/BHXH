<?php
session_start(); // Bắt đầu session

$filename = 'counter.txt'; // File chứa tổng số lượt truy cập

// Kiểm tra file có tồn tại không, nếu không thì tạo mới với giá trị 0
if (!file_exists($filename)) {
    file_put_contents($filename, 0);
}

// Đọc tổng số lượt truy cập từ file
$total_count = (int)file_get_contents($filename);

// Nếu session chưa tồn tại (tức là người dùng mới), tăng tổng số lượt truy cập
if (!isset($_SESSION['visited'])) {
    $_SESSION['visited'] = true;
    $total_count++; // Tăng tổng số lượt truy cập
    file_put_contents($filename, $total_count); // Cập nhật tổng số vào file
}

// Thời gian timeout cho một phiên (5 phút)
$session_timeout = 10; // 300 giây (5 phút)

// File lưu thông tin các session
$session_file = 'sessions.txt';
if (file_exists($session_file)) {
    // Đọc danh sách session từ file
    $sessions = json_decode(file_get_contents($session_file), true);
} else {
    $sessions = [];
}

// Cập nhật hoặc thêm session hiện tại vào danh sách nếu session này chưa tồn tại
$sessions[session_id()] = time();

// Xóa những session đã hết hạn (hơn 5 phút không hoạt động)
foreach ($sessions as $session_id => $last_activity) {
    if ($last_activity < (time() - $session_timeout)) {
        unset($sessions[$session_id]); // Xóa session hết hạn
    }
}

// Lưu lại danh sách session còn hoạt động vào file
file_put_contents($session_file, json_encode($sessions));

// Số người đang truy cập là số session còn hoạt động
$active_sessions = count($sessions);

// Trả về kết quả JSON
echo json_encode([
    'total_count' => $total_count,     // Tổng số lượt truy cập
    'active_sessions' => $active_sessions  // Số người đang truy cập
]);
?>

