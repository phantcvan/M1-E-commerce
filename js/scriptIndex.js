let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
let flag = localStorage.getItem("flag");
let listUser = JSON.parse(localStorage.getItem("listUser"));
if (flag != "") {
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].username==flag){
            document.getElementById("login").style.display = "none";
            document.getElementById("userInfo").innerHTML=`
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" 
            aria-expanded="false"><img style="border-radius: 50%;width:50px;height:50px" src="${listUser[i].avatar}" alt="">
            </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown" style="border:none;padding: 0px 5px;margin:5px">
                <li  style="border:none;padding: 0px 5px"><p id="hello"></p></li>
                <li><hr class="dropdown-divider"></li>
                <li  style="border:none;padding: 0px 5px">
                    <a style="color:rgb(61,33,24);font-size:1.7rem;padding:0px;" class="dropdown-item" href="./userInfo.html">
                    <p>Chỉnh sửa thông tin cá nhân</p></a>
                </li>
                <li  style="border:none;padding: 0px 5px">
                    <a style="color:rgb(61,33,24);font-size:1.7rem;padding:0px;" class="dropdown-item" href="">
                    <p>Chi tiết đơn hàng</p></a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li style="border:none;padding: 0px 5px"><p id="logout"></p></li>
              </ul>
        `
            document.getElementById("hello").innerHTML =
                `<span class="welcome"><b>Xin chào, ${flag}</b></span><br>   `
            document.getElementById("logout").innerHTML =
                `<a onclick="logout()" class="logout"><b>Đăng xuất</b></a>`
        }
    }
}
function logout() {
    localStorage.setItem("flag", "");
    window.location.href = "index.html";
}

window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

// giỏ hàng
let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));
let listProduct = JSON.parse(localStorage.getItem("listProduct"));





// Hiển thị sản phẩm trên index.html
function renderList() {
    let productList = JSON.parse(localStorage.getItem("productList"));
    let productListRender = `<button id="buttonList0" class="buttonListActive" onclick="renderProduct(0)">All</button>`
    for (let i = 1; i <= productList.length; i++) {
        productListRender += `<button id="buttonList${i}" class="buttonListDis" onclick="renderProduct(${i})">${productList[(i - 1)]}</button>`
    }
    document.getElementById("list").innerHTML = productListRender;
    let productContainer = ""
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].quantity==0){
            continue;
        }
        productContainer += `            
        <div class="card col-5 col-md-3 col-xl-2">
            <div class="boxImg">
                <img class="card-img-top imgProduct" src="${listProduct[i].image}" />
            </div>
            <div class="card-body" style="padding:0px">
                <h3 class="card-title" style="text-align:center"> ${listProduct[i].name} </h3>
                <div class="order" style="">
                    <span class="price"> ${listProduct[i].price.toLocaleString('en-US')} </span>
                    <button type="button" class="btn btn-lg buttonBuy" style="margin:0; padding:5px 5px;font-size:1.5rem"
                    data-toggle="modal" data-target="#myModal" onclick="view(${i})">
                    Chi tiết
                    </button>
                    </div>
                    </div>
                    </div>`;
        // <button style="padding: 10px" href="#" class="buttonBuy" onclick="buy(${i})">Thêm vào giỏ hàng</button>
        document.getElementById("box-container").innerHTML = productContainer;
    }

}


renderList();
// Hiển thị sản phẩm
function renderProduct(id) {
    // Thêm class "buttonListActive" vào button DANH MỤC được click
    let clickedButton = document.getElementById(`buttonList${id}`);

    clickedButton.classList.remove('buttonListDis');
    clickedButton.classList.add('buttonListActive');
    // Loại bỏ class "buttonListActive" khỏi tất cả các button DANH MỤC CÒN LẠI
    let productList = JSON.parse(localStorage.getItem("productList"));
    let a = productList.length;
    for (let j = 0; j <= a; j++) {
        if (j != id) {
            document.getElementById(`buttonList${j}`).classList.remove('buttonListActive');
            document.getElementById(`buttonList${j}`).classList.add('buttonListDis');
        }
    }

    //Hiển thị sản phẩm theo danh mục
    let productContainer = ""
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].list == productList[(id - 1)]) {
            if (listProduct[i].quantity==0){
                continue;
        }
            productContainer += `            
        <div class="card col-5 col-md-3 col-xl-2">
            <div class="boxImg">
                <img class="card-img-top imgProduct" src="${listProduct[i].image}" />
            </div>
            <div class="card-body" style="padding:0px">
                <h3 class="card-title" style="text-align:center"> ${listProduct[i].name} </h3>
                <div class="order" style="">
                    <span class="price"> ${listProduct[i].price.toLocaleString('en-US')} </span>
                    <button type="button" class="btn btn-lg buttonBuy" style="margin:0; padding:5px 5px;font-size:1.5rem"
                    data-toggle="modal" data-target="#myModal" onclick="view(${i})">
                    Chi tiết
                    </button>
                </div>
            </div>
        </div>`;
        }
        if (id == 0) {
            if (listProduct[i].quantity==0){
                continue;
            }
            productContainer += `            
            <div class="card col-5 col-md-3 col-xl-2">
                <div class="boxImg">
                    <img class="card-img-top imgProduct" src="${listProduct[i].image}" />
                </div>
                <div class="card-body" style="padding:0px">
                    <h3 class="card-title" style="text-align:center"> ${listProduct[i].name} </h3>
                    <div class="order" style="margin-bottom:5px">
                        <span class="price"> ${listProduct[i].price.toLocaleString('en-US')} </span>
                        <button type="button" class="btn btn-lg buttonBuy" style="margin:0; padding:5px 5px;font-size:1.5rem"
                        data-toggle="modal" data-target="#myModal" onclick="view(${i})">
                        Chi tiết
                        </button>
                        </div>
                        </div>
                        </div>`;

        }
        // <button style="padding: 10px" href="#" class="buttonBuy" onclick="buy(${i})">Thêm vào giỏ hàng</button>
        document.getElementById("box-container").innerHTML = productContainer;
    }


}
renderProduct()

// Tìm kiếm sản phẩm
function searchProduct(){
    let listProduct = JSON.parse(localStorage.getItem("listProduct"));
    let searchValue = document.getElementById("search-bar").value;
    console.log(searchValue);
    if (searchValue == "") {
        document.getElementById("searchResult").innerHTML =
        "Hãy nhập thông tin vào ô tìm kiếm";
      return;
    }
    let foundProduct = false;
    let productSearch=""
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
            productSearch += `            
            <div class="card col-5 col-md-3 col-xl-2">
                <div class="boxImg">
                    <img class="card-img-top imgProduct" src="${listProduct[i].image}" />
                </div>
                <div class="card-body" style="padding:0px">
                    <h3 class="card-title" style="text-align:center"> ${listProduct[i].name} </h3>
                    <div class="order" style="">
                        <span class="price"> ${listProduct[i].price.toLocaleString('en-US')} </span>
                        <button type="button" class="btn btn-lg buttonBuy" style="margin:0; padding:5px 5px;font-size:1.5rem"
                        data-toggle="modal" data-target="#myModal" onclick="view(${i})">
                        Chi tiết
                        </button>
                        </div>
                        </div>
                        </div>`;
            foundProduct = true;
        }
    }
    if (!foundProduct) {
        document.getElementById("searchResult").innerHTML =
          "Không có kết quả phù hợp";
      }
      else {
        window.location.href = '#product';
        document.getElementById("box-container").innerHTML = productSearch;
      }


}



// Hiển thị chi tiết sản phẩm khi click vào "Chi tiết"
function view(id) {
    // Lấy các button được tạo ra từ dữ liệu trong localStorage
    const buttons = document.querySelectorAll('.buttonBuy');

    // Thêm sự kiện "click" vào từng button
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            // Hiển thị modal pop up
            $('#myModal').modal('show');
        });
    });
    document.getElementById("myModalLabel").innerHTML = `<b>${listProduct[id].name}</b>`;
    document.getElementById("modal-price").innerHTML = listProduct[id].price.toLocaleString('en-US');
    document.getElementById("productViewName").innerHTML = listProduct[id].describe;
    document.getElementById("modal-img").innerHTML = `<img class="card-img-top" src="${listProduct[id].image}" />`
    document.getElementById("modal-footer").innerHTML = `
<button style="font-size: 15px;" type="button" class="btn btn-default" data-dismiss="modal" onclick="closeModal()">Đóng
</button>
<button style="font-size: 15px;background-color: rgb(236, 0, 139);border:none" type="button" 
class="btn btn-primary viewMore" onclick="buy(${id})">Thêm vào giỏ hàng</button>
`;
    renderProductBuy();
    // Lấy đối tượng button và khối div
    const button = document.querySelector('.viewMore');
    const offcanvas = document.querySelector('.cart');

    // Thêm lắng nghe cho sự kiện click của button
    button.addEventListener('click', function () {
        closeModal()
        // Thay đổi thuộc tính aria-expanded của khối div để mở nó
        offcanvas.setAttribute('aria-expanded', 'true');
    });

}
// Lưu sản phẩm người dùng chọn vào localStorage
function buy(id) {
    let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));
    console.log("LIST PRODUCT BUY - BUY-->", listProductBuy);
    document.getElementById("noti").innerHTML = ""
    if (flag == "") {
        window.location.href = "./login.html";
    }
    // console.log(flag);
    let priceProduct = Number(document.getElementsByClassName("price")[id].textContent.replace(/,/g, ''));
    // console.log(priceProduct);
    let nameProduct = document.getElementsByClassName("card-title")[id].textContent.trim();
    let codeProduct = listProduct[id].code
    // console.log(nameProduct);
    if (listProductBuy == null) {
        listProductBuy = [];
    }
    // console.log("code",codeProduct);
    // console.log("username",flag);
    let productBuy = {
        username: flag,
        name: nameProduct,
        code: codeProduct,
        price: priceProduct,
        img: listProduct[id].image,
        quantity: 1,
        customName: "",
        customTel: "",
        customAdd: "",
        orderID: 0,
    }
    index = listProductBuy.findIndex(s => s.code === codeProduct && s.username == flag);
    // console.log(index);
    if (index !== -1) {
        listProductBuy[index].quantity++;
    } else {
        listProductBuy.push(productBuy);
    }
    console.log(listProductBuy);
    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
    renderProductBuy();
}


function closeModal() {
    $('#myModal').modal('hide')
}
function closeCart() {
    $('#cart').modal('hide')
}


// Hiển thị sản phẩm đã chọn trong giỏ hàng
function renderProductBuy() {
    let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));
    console.log("SP ĐÃ CHỌN -->", listProductBuy);
    let productBuy = "";
    // console.log(listProductBuy);
    document.getElementById("productBuy").innerHTML = "";
    for (let i = 0; i < listProductBuy.length; i++) {
        if (listProductBuy[i].username == flag) {
            productBuy += `<tr >
            <td rowspan="3" style="width:30%;padding-bottom:10px"><img class="card-img-top" src="${listProductBuy[i].img}" /></td>
            <td style="font-size: 15px;padding-left:10px">${listProductBuy[i].name}</td></tr>
            <tr><td style="font-size: 18px;padding-left:10px;font-weight:500;color:rgb(236, 0, 139)">${listProductBuy[i].price.toLocaleString('en-US')}</td></tr>
            <tr><td style="font-size: 12px;padding:0px 10px 10px"><button style="width: 30px;" onclick="downP(${i})">-</button>
            <span style="font-size: 12px;padding:0px 10px;color:rgb(56, 9, 21);font-weight:400;">${listProductBuy[i].quantity}</span>
            <button style="width: 30px;" onclick="upP(${i})">+</button></td>
            </tr>`;
        }
        document.getElementById("productBuy").innerHTML = productBuy;
    }
    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
    renderCount();
}
renderProductBuy();

// Tăng số lượng hàng
function upP(index) {
    let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));
    listProductBuy[index].quantity++;
    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
    renderProductBuy();
    renderCount();
}

// Giảm số lượng hàng
function downP(index) {
    let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));

    listProductBuy[index].quantity--;
    if (listProductBuy[index].quantity == 0) {
        // console.log(listProductBuy[index]);
        listProductBuy.splice(index, 1);
        // renderProductBuy();
    }

    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
    renderProductBuy();
    renderCount();
}

// Tính số lượng hàng và tổng số tiền
function renderCount() {
    let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));
    let quantityAll = 0;
    console.log("SL HÀNG", quantityAll);
    let sum = 0;
    for (i = 0; i < listProductBuy.length; i++) {
        if (listProductBuy[i].username == flag) {
            quantityAll += listProductBuy[i].quantity;
            sum += listProductBuy[i].price * listProductBuy[i].quantity;
        }
    }
    localStorage.setItem("sum", JSON.stringify(sum));
    document.getElementById("totalAmount").innerHTML = `<span style="color:rgb(56,9,21);font-size: 16px;">Tổng tiền hàng: </span>
    <span style="font-size: 20px">${sum.toLocaleString('en-US')}</span>`;
    document.getElementById("totalButton").innerHTML = `<button class="totalAmount" onclick="pay()">Mua hàng</button>`
    localStorage.setItem("quantityCart", quantityAll);
    document.getElementById("totalProductCart").innerHTML = quantityAll;
}
renderCount();
// Yêu cầu người dùng nhập thông tin mua hàng
function pay() {
    let sum1 = JSON.parse(localStorage.getItem("sum"));
    if (sum1 == 0) {
        document.getElementById("totalAmount").innerHTML = ``
        document.getElementById("totalButton").innerHTML = `
        <button style="color:rgb(56,9,21);font-size: 16px;" data-bs-dismiss="offcanvas">
        <span style="color:rgb(56,9,21);font-size: 20px;">Quay về trang sản phẩm</span></button>`
        setTimeout(function () {
            window.location = "./index.html#product";
        }, 500);
        return;
    }
    document.getElementById("noti").innerHTML = `<div class="row">
    <div class="form-group col-6">
        <label class="control-label">Tên người nhận:</label>
        <input style="padding:5px;font-size:1.3rem" class="form-control" type="text" required id="payClient">
    </div>
    <div class="form-group col-6">
        <label class="control-label">Số điện thoại nhận hàng:</label>
        <input style="padding:5px;font-size:1.3rem"  class="form-control" type="number" required id="payTel">
    </div>
</div>
<div class="row">
    <div class="form-group col-md-12">
        <label class="control-label">Địa chỉ nhận hàng:</label>
        <input style="padding:5px;font-size:1.3rem" class="form-control" type="text" required id="payAddress">
    </div>
</div>
`;
    document.getElementById("totalButton").innerHTML = `<button style="background-color:rgb(236, 0, 139);font-size:1.7rem" 
                            class="totalAmount" onclick="clientPay()">Thanh toán</button>`

}
// Hoàn thành đơn hàng
function clientPay() {
    let customName1 = document.getElementById("payClient").value;
    let customTel1 = document.getElementById("payTel").value;
    let customAdd1 = document.getElementById("payAddress").value;
    let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));
    // validate thông tin
    if (customName1==""||customTel1==""||customAdd1==""){
        document.getElementById("request").innerHTML=`Hãy nhập đầy đủ thông tin!`;
        return;
    }
    if (customTel1.length<10){
        document.getElementById("request").innerHTML=`Hãy nhập đúng số điện thoại!`;
        return;
    }

    
    for (let i = 0; i < listProductBuy.length; i++) {
        if (listProductBuy[i].username == flag) {
            listProductBuy[i].customName = customName1;
            listProductBuy[i].customTel = customTel1;
            listProductBuy[i].customAdd = customAdd1;
            // console.log("ORDER ID -->", listProductBuy[i].orderID);
        }
    }
    
    let listProduct = JSON.parse(localStorage.getItem("listProduct"));
    // Trừ số lượng hàng trong kho
    for (let i=0;i < listProduct.length; i++){
        for (let j=0;j<listProductBuy.length; j++){
            if (listProductBuy[j].username == flag&&listProduct[i].name.trim()==listProductBuy[j].name.trim()){
                listProduct[i].quantity-=listProductBuy[j].quantity;
            }
        }
    }

    
    localStorage.setItem("listProduct", JSON.stringify(listProduct));

    // Lưu mảng mới gồm các sản phẩm đã lưu. Nếu mảng đã có thì ghi thêm vào
    let listPay = JSON.parse(localStorage.getItem("listPay"));
    if (listPay == null) {
        listPay = []
    }

    // Lưu ID đơn hàng
    let orderID = 0;
    for (let i = 0; i < listPay.length; i++) {
        if (listPay[i].username == flag) {
            if (listPay[i].orderID > orderID) {
                orderID = listPay[i].orderID;
            }
        }
    }

    let idNew = orderID + 1;
    for (i = 0; i < listProductBuy.length; i++) {
        if (listProductBuy[i].username == flag) {
            listProductBuy[i].orderID = idNew;
        }
    }
    for (let i = 0; i < listProductBuy.length; i++) {
        if (listProductBuy[i].username == flag) {
            listPay.push(listProductBuy[i])
        }
    }
    localStorage.setItem("listPay", JSON.stringify(listPay));



    // Xoá hiển thị trên giỏ hàng
    document.getElementById("noti").innerHTML = `<span style="color:rgb(56,9,21);font-size: 16px;">Đơn hàng thành công!</span>
        <button style="color:rgb(56,9,21);font-size: 16px;" data-bs-dismiss="offcanvas">`
    renderCount()

    setTimeout(function () {
        window.location = "./index.html#product";
    }, 500);

    
    // Xoá sp trên Local
    let listProductRemove = [];
    for (let i = 0; i < listProductBuy.length; i++) {
        if (listProductBuy[i].username != flag) {
            listProductRemove.push(listProductBuy[i]);
        }
    }
    
    localStorage.setItem("listProductBuy", JSON.stringify(listProductRemove));
    
    // }
    
    renderProductBuy();
    renderCount();


}







