// Hàm lấy ngày giờ hiện tại và hiển thị lên trang web 
function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    document.getElementById('submitTime').innerText = date +
        " " + time;
}
// Khi trang tải hoàn tất, lấy ngày giờ hiện tại
window.onload = function () {
    getCurrentDateTime();
};
// hàm thu thập dữ liệu từ các ô nhập liệu 
function submitForm() {
    // Bước 1: Thu thập thông tin từ các ô nhập liệu và submitTime
    let tenMonHoc = document.getElementById("tenMonHoc").value;
    let tenGiangVien = document.getElementById("tenGiangVien").value;
    let hoTenSinhVien = document.getElementById("hoTenSinhVien").value;
    let submitTime = document.getElementById("submitTime").innerText;

    // Kiểm tra các ô nhập liệu có rỗng không
    if (tenMonHoc === "" || tenGiangVien === "" || hoTenSinhVien === "") {
        alert("Vui lòng điền đầy đủ thông tin: Tên môn học, Tên giảng viên, Họ tên sinh viên!");
        return;
    }

    // Bước 2: Thu thập dữ liệu từ các radio button (11 tiêu chí)
    // tạo một đối tượng rỗng có tên criteria để lưu trữ điểm số từng tiêu chí
    let criteria = {};
    let totalScore = 0;
    for (let i = 1; i <= 11; i++) {
        // Lấy radio button đã được chọn cho tiêu chí thứ i
        let radio = document.querySelector('input[name="' + i + '"]:checked');
        if (!radio) {
            alert("Vui lòng chọn đầy đủ 11 tiêu chí khảo sát!");
            return;
        }
        criteria[`Tiêu Chí ${i}`] = radio.value;
        totalScore += parseInt(radio.value);
    }
    let averageScore = totalScore / 11;

    // Bước 3: Tạo đối tượng JSON theo cấu trúc mong muốn
    let surveyData = {
        "tenMonhoc": tenMonHoc,
        "tenGiangVien": tenGiangVien,
        "tenSinhVien": hoTenSinhVien,
        "submitTime": submitTime,
        "criteria": criteria
    };

    // Chuyển đối tượng thành chuỗi JSON
    let jsonString = JSON.stringify(surveyData, null, 2);

    // Hiển thị kết quả JSON bên dưới nút "Gửi Khảo Sát"
    document.getElementById("jsonData").innerText = jsonString;
    // Hiển thị điểm trung bình (nếu cần)
    document.getElementById("soDiem").innerText = "Điểm trung bình của giảng viên: " + averageScore.toFixed(2);
}

