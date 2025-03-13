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
    // Bước 1: Thu thập thông tin từ các ô nhập liệu
    let tenMonHoc = document.getElementById("tenMonHoc").value;
    let tenGiangVien = document.getElementById("tenGiangVien").value;
    let hoTenSinhVien = document.getElementById("hoTenSinhVien").value;

    // Kiểm tra xem các ô nhập liệu có trống không
    if (tenMonHoc === "" || tenGiangVien === "" || hoTenSinhVien === "") {
        alert("Vui lòng điền đầy đủ thông tin: Tên môn học, Tên giảng viên, Họ tên sinh viên!");
        return; // Dừng lại nếu thiếu thông tin
    }
    // Bước 2: Thu thập giá trị từ các radio buttons đã chọn
    let selectedRadios = document.querySelectorAll('input[type="radio"]:checked');
    let totalScore = 0; // Tổng điểm
    let numberOfCriteria = selectedRadios.length; // Số tiêu chí đã chọn

    // Kiểm tra xem có chọn đủ 11 tiêu chí chưa
    if (numberOfCriteria < 11) {
        alert("Vui lòng chọn đầy đủ 11 tiêu chí khảo sát!");
        return; // Dừng lại nếu thiếu tiêu chí
    }
    // Tính tổng điểm từ các radio buttons đã chọn
    selectedRadios.forEach(function (radio) {
        totalScore += parseInt(radio.value);
    });
    // tính điểm trung bình 
    let averageScore = totalScore / numberOfCriteria;

    // Lấy danh sách các checkbox đã chọn
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let criteria = {};

    // Duyệt qua các checkbox và thêm vào đối tượng JSON
    checkboxes.forEach((checkbox, index) => {
        criteria[`Tiêu chí ${index + 1}`] = checkbox.value;
    })

    // Bước 3: Hiển thị kết quả lên trang web   
    document.getElementById("soDiem").innerText = "Điểm trung bình của giảng viên: " + averageScore.toFixed(2);

    // hàm thu thập dữ liệu check box 
    let criteriaList = document.getElementById("criteriaList");
}

