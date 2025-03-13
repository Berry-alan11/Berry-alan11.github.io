// Khai báo biến userIndex để đánh số thứ tự người dùng
let userIndex = 0;
// Hàm lưu thông tin người dùng
function saveUserInfo() {
    const username = document.getElementById("username").value;
    const useraddress = document.getElementById("useraddress").value;
  
    if (username.trim() === "" || useraddress.trim() === "") {
      alert("Vui lòng nhập đầy đủ tên và địa chỉ.");//Hiện ra thông báo không nhập đủ thông tin
      return;
    }
  // Tạo một object chứa thông tin người dùng
    const userInfo = {
      name: username,
      address: useraddress
    };
  // Chuyển object thành JSON
    const userInfoJSON = JSON.stringify(userInfo);
    addToTable(username, useraddress, userInfoJSON);
  
    //gọi hàm đến back end để thêm vào CSDL
  
    document.getElementById("nameInput").value = "";
    document.getElementById("addressInput").value = "";
  }
  // Hàm thêm thông tin người dùng vào bảng HTML
  function addToTable(username, useraddress, userInfoJSON) {
    userIndex++;
  
    const table = document.getElementById("userTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
  
    const cell1 = newRow.insertCell(0); // STT
    const cell2 = newRow.insertCell(1); // Tên người dùng
    const cell3 = newRow.insertCell(2); // Địa chỉ
    const cell4 = newRow.insertCell(3); // Dữ liệu JSON
    const cell5 = newRow.insertCell(4); // Xóa (Checkbox)
  
  
    cell1.innerHTML = userIndex;
    cell2.innerHTML = username;
    cell3.innerHTML = useraddress;
    cell4.innerHTML = userInfoJSON;
    cell5.innerHTML = `<input type="checkbox" class="deleteCheckbox" onchange="toggleDeleteInput()">`;
  }
// hàm tự động disable nút xóa khi không có checkbox nào được chọn
 function toggleDeleteInput(){
  const deleteInput = document.getElementById("delete");
  const deleteCheckbox = document.getElementsByClassName("deleteCheckbox").length>0;
  deleteInput.disabled = anyChecked;
 }
// Hàm xóa người dùng theo yêu cầu:
// - Nếu có checkbox được chọn: xóa theo checkbox (ưu tiên)
// - Nếu không checkbox nào được chọn: xóa theo STT nhập vào
function deleteUser() {
  const checkedBoxes = document.querySelectorAll(".deleteCheckbox:checked");
  const tableBody = document.getElementById("userTable").getElementsByTagName("tbody")[0];

  if (checkedBoxes.length > 0) {
    // Xóa các dòng được chọn bằng checkbox
    checkedBoxes.forEach(function(checkbox) {
      const row = checkbox.parentElement.parentElement;
      row.remove();
    });
  } else {
    // Xóa theo STT nhập vào
    let deleteIndex = document.getElementById("delete").value;
    deleteIndex = parseInt(deleteIndex);
    if (isNaN(deleteIndex) || deleteIndex < 1) {
      alert("Vui lòng nhập số thứ tự hợp lệ để xóa.");
      return;
    }
    let rows = tableBody.rows;
    let found = false;
    for (let i = 0; i < rows.length; i++) {
      let stt = parseInt(rows[i].cells[0].innerText);
      if (stt === deleteIndex) {
        rows[i].remove();
        found = true;
        break;
      }
    }
    if (!found) {
      alert("Không tìm thấy người dùng với STT đã nhập.");
    }
  }
  // Cập nhật lại số thứ tự (STT)
  updateSTT();
  // Xóa nội dung ô nhập STT sau khi xóa
  document.getElementById("delete").value = "";
  // Cập nhật trạng thái disable của input xóa
  toggleDeleteInput();
}

// Hàm cập nhật lại số thứ tự cho các dòng trong bảng
function updateSTT() {
  const tableBody = document.getElementById("userTable").getElementsByTagName("tbody")[0];
  const rows = tableBody.rows;
  userIndex = 0;
  for (let i = 0; i < rows.length; i++) {
    userIndex++;
    rows[i].cells[0].innerText = userIndex;
  }
}

// Gắn sự kiện vào nút Lưu và nút Xóa khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function() {

  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", saveUserInfo);

  const deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener("click", deleteUser);

  const userForm = document.getElementById("userForm");
  userForm.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn hành động mặc định của Enter (gửi form)
      saveUserInfo(); // Gọi hàm lưu thông tin
    }
  });
});