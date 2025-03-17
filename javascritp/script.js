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
    // thêm sự kiện vào checkbox
    const checkbox = cell5.querySelector(".deleteCheckbox");
    checkbox.addEventListener("change", toggleDeleteInput);
  }
// Hàm xóa người dùng dựa trên checkbox hoặc STT
function deleteUser() {
  const checkboxes = document.querySelectorAll(".deleteCheckbox");
  const table = document.getElementById("userTable").getElementsByTagName("tbody")[0];
  let anyChecked = false;

  // Duyệt qua các checkbox từ cuối danh sách về đầu để xóa nhiều hàng mà không bị lỗi
  for (let i = checkboxes.length - 1; i >= 0; i--) {
    if (checkboxes[i].checked) {
      anyChecked = true;
      table.deleteRow(i);
      userIndex--;

      //Gọi hàm delete ở PHP 
    }
  }

  // Nếu không có checkbox nào được chọn, xóa theo STT
  if (!anyChecked) {
    const deleteIndex = document.getElementById("deleteIndex").value;

    if (deleteIndex.trim() === "" || isNaN(deleteIndex) || deleteIndex <= 0 || deleteIndex > userIndex) {
      alert("Vui lòng nhập chỉ số hợp lệ.");
      return;
    }

    table.deleteRow(deleteIndex - 1);

    // Gọi hàm delete ở PHP
    userIndex--;
  }

  updateRowIndexes(); // Cập nhật lại STT sau khi xóa
  toggleDeleteInput(); // Cập nhật trạng thái trường nhập STT
}

// Cập nhật lại STT sau khi xóa
function updateRowIndexes() {
  const table = document.getElementById("userTable").getElementsByTagName("tbody")[0];
  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[0].innerHTML = i + 1;
  }
}

// Hàm kiểm tra xem có checkbox nào được chọn hay không và vô hiệu hóa
function toggleDeleteInput() {
  //Chú ý: Lấy tất cả check box thuộc class delete checkbox
  const checkboxes = document.querySelectorAll(".deleteCheckbox");
  let anyChecked = false;

  checkboxes.forEach(function(checkbox)
 {
    if (checkbox.checked) {
      anyChecked = true;  
    }
  });

  document.getElementById("deleteIndex").disabled = anyChecked;
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