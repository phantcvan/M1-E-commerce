/* =========================================== */
/* =========================================== */
function loginAdmin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password-field").value;

  let result = document.getElementById("toast-body");
  //Đặt 1 Admin ảo để đăng nhập quản trị
  if (username == "admin" && password == "123456") {
    var myToast = new bootstrap.Toast(document.querySelector('.toast'));
    result.innerHTML = `<div class="toast-header">
    <strong class="mr-auto">Đăng nhập thành công</strong>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast"
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="toast-body">
    Xin chào, ADMIN!
    </div>`;
    myToast.show();
    window.location = "doc/index.html";

  }

  else {
    result.innerHTML = `<div class="toast-header">
    <strong class="mr-auto">Xin thử lại</strong>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast"
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="toast-body">
    Tên người dùng hoặc mật khẩu không đúng
    </div>`
      ;
    myToast.show();
    return;
  }
}

