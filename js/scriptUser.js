let flag = localStorage.getItem("flag");
console.log(flag);
let listUser = JSON.parse(localStorage.getItem("listUser"));
if (flag != "") {
  for (let i = 0; i < listUser.length; i++) {
    if (listUser[i].username == flag) {
      document.getElementById("imageAvatar").innerHTML = `
        <a href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" 
        aria-expanded="false"><img style="border-radius: 50%;width:50px;height:50px;margin:10px" 
        src="${listUser[i].avatar}" alt="">
        </a>`
      document.getElementById("hello").innerHTML =
        `<span class="welcome"><b>Xin chào, ${flag}</b></span><br>   `
    }
  }
}
function logout() {
  localStorage.setItem("flag", "");
  window.location.href = "index.html";
}


// Lấy thông tin ảnh do người dùng chọn
function inputImg() {
  document.getElementById("profile").innerHTML = `<form class="row" >
  <div class="form-group col-md-12">
  <label class="control-label">Chọn ảnh đại diện mới</label>
  <div id="myfileupload">
    <input type="file" id="imageInput" name="ImageUpload">
  </div>
  <div id="thumbbox">
    <img width="200" alt="preview" id="preview">
  </div>
</div>
</form>
</div>
<button class="btn btn-save" type="button" onclick="saveImg()">Lưu lại</button>
<a class="btn btn-cancel" href="userInfo2.html">Hủy bỏ</a>`
  // Lấy thẻ hình ảnh từ HTML
  let imgElement = document.getElementById('preview');
  let imageInput = document.getElementById('imageInput');
  document.getElementById("preview").src = imageInput;
  let newAvatar = document.getElementById('preview');
  imageInput.onchange = function (event) {
    let file = event.target.files[0];
    // Đọc tệp ảnh và chuyển đổi nó thành dữ liệu URL
    let reader = new FileReader();
    reader.onload = function (event) {
      let dataUrl = event.target.result;
      // Thiết lập nguồn ảnh của đối tượng ảnh với dữ liệu URL
      newAvatar.src = dataUrl;
      localStorage.setItem('newAvatar', dataUrl);
    };
    reader.readAsDataURL(file);
  };
}
// Cập nhật ảnh đại diện
function saveImg() {
  // let listUser = JSON.parse(localStorage.getItem("listUser"));
  let newAvatar = localStorage.getItem("newAvatar");

  for (let i = 0; i < listUser.length; i++) {
    if (listUser[i].username == flag) {
      listUser[i].avatar = newAvatar;
    }
  }
  localStorage.setItem("listUser", JSON.stringify(listUser));
  setTimeout(function () {
    location.reload();
  }, 100);
}


function changePassword() {
  document.getElementById("profile").innerHTML = `<form >
  <div class="wrap-input100 validate-input  col-12 col-md-6 col-lg-4">
  <input autocomplete="off" class="input100" type="password" placeholder="Nhập mật khẩu cũ"
  name="current-password" id="oldPass" style="color:rgb(61,33,24);padding:0px 15px;">
  <i id="eye" onclick="show()"  style="color:rgb(61,33,24);" class="fa-solid fa-eye-slash field-icon click-eye"></i>
</div>
  <div class="wrap-input100 validate-input  col-12 col-md-6 col-lg-4">
  <input autocomplete="off" class="input100" type="password" placeholder="Nhập mật khẩu mới"
    name="current-password" id="newPass1" style="color:rgb(61,33,24);padding:0px 15px;">
  <i id="eye" onclick="show()"  style="color:rgb(61,33,24);" class="fa-solid fa-eye-slash field-icon click-eye"></i>
</div>
<div class="wrap-input100 validate-input  col-12 col-md-6 col-lg-4">
<input autocomplete="off" class="input100" type="password" placeholder="Nhập lại mật khẩu"
name="current-password" id="newPass2" style="color:rgb(61,33,24);padding:0px 15px;">
<i id="eye" onclick="show()"  style="color:rgb(61,33,24);" class="fa-solid fa-eye-slash field-icon click-eye"></i>
</div>
<p id="noti" style="font-size:1rem"></p>
<button class="btn btn-save" type="button" onclick="savePassword()">Lưu lại</button>
<a class="btn btn-cancel" href="userInfo2.html">Hủy bỏ</a>`

}

function savePassword() {
  let oldPass = document.getElementById("oldPass").value;
  let newPass1 = document.getElementById("newPass1").value;
  let newPass2 = document.getElementById("newPass2").value;
  if (oldPass==""||newPass1==""||newPass2==""){
    document.getElementById("noti").innerHTML=`<b>Hãy điền đầy đủ thông tin!</b>`
    return;
  }
  
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  for (let i = 0; i < listUser.length; i++) {
    if (listUser[i].username==flag){
      if (oldPass!=listUser[i].password) {
        document.getElementById("noti").innerHTML=`<b>Mật khẩu không chính xác. Hãy nhập lại!</b>`
        return;
      }
      else if (oldPass==newPass1) {
        document.getElementById("noti").innerHTML=`<b>Mật khẩu mới trùng với mật khẩu cũ. Hãy nhập lại!</b>`
        return;
      }
      else if (newPass1!=newPass2){
        document.getElementById("noti").innerHTML=`<b>Mật khẩu không trùng khớp. Hãy nhập lại!</b>`;
        return;
      }
      else if (newPass1.length<6){
        document.getElementById("noti").innerHTML=`<b>Mật khẩu phải có từ 6 ký tự trở lên</b>`;
        return;
      }
      else {
        listUser[i].password=newPass1;
        document.getElementById("noti").innerHTML=`<b>Mật khẩu đã được cập nhật!</b>`;
        localStorage.setItem("listUser", JSON.stringify(listUser));
        setTimeout(function () {
          location.reload();
        }, 1000);
      }
    }

  }
}
