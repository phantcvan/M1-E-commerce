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
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").innerHTML =
        `<span class="welcome"><b>Xin chào, ${flag}</b></span><br>   
  <a onclick="logout()" class="logout"><b>Đăng xuất</b></a>
  `
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
// Lưu sản phẩm người dùng chọn vào localStorage
function buy(id) {
    if (flag == "") {
        window.location.href = "./login.html";
    }
    // console.log(flag);
    let priceProduct = Number(document.getElementsByClassName("price")[id].textContent.replace(/,/g, ''));
    // console.log(priceProduct);
    let nameProduct = document.getElementsByClassName("card-title")[id].textContent;
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

// Hiển thị sản phẩm trên index.html
function renderProduct() {
    let productContainer = ""
    for (let i = 0; i < listProduct.length; i++) {
        productContainer += `            
        <div class="card col-5 col-md-3 col-xl-2" style="margin:5px 23px">
            <div class="boxImg">
                <img class="card-img-top imgProduct" src="${listProduct[i].image}" />
            </div>
            <div class="card-body" style="padding:0px">
                <h3 class="card-title" style="text-align:center"> ${listProduct[i].name} </h3>
                <div class="order" style="">
                    <span class="price"> ${listProduct[i].price.toLocaleString('en-US')} </span>
                    <button type="button" class="btn btn-lg buttonBuy" style="margin:0; padding:10px 5px;font-size:1.5rem"
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
renderProduct();

// Lấy các button được tạo ra từ dữ liệu trong localStorage
const buttons = document.querySelectorAll('.buttonBuy');

// Thêm sự kiện "click" vào từng button
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Hiển thị modal pop up
        $('#myModal').modal('show');
    });
});

// Hiển thị chi tiết sản phẩm khi click vào "Chi tiết"
function view(id) {
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
    // const offcanvas = document.querySelector('.cart');

    // Thêm lắng nghe cho sự kiện click của button
    button.addEventListener('click', function () {
        closeModal()
        // Thay đổi thuộc tính aria-expanded của khối div để mở nó
        offcanvas.setAttribute('aria-expanded', 'true');
    });

}


function closeModal() {
    $('#myModal').modal('hide')
}

// Hiển thị sản phẩm đã chọn trong giỏ hàng
function renderProductBuy() {
    let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));
    let productBuy = "";
    console.log(listProductBuy);
    document.getElementById("productBuy").innerHTML ="";
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
            document.getElementById("productBuy").innerHTML = productBuy;
        }
    }
    renderCount();
    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
}
renderProductBuy();

// Tăng số lượng hàng
function upP(index) {
    listProductBuy[index].quantity++;
    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
    renderProductBuy();
    renderCount();
}

// Giảm số lượng hàng
function downP(index) {
    listProductBuy[index].quantity--;
    if (listProductBuy[index].quantity == 0) {
        console.log(listProductBuy[index]);
        listProductBuy.splice(index, 1);
        // renderProductBuy();
    }

    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
    renderProductBuy();
    renderCount();
}

// Tính số lượng hàng và tổng số tiền
function renderCount() {
    let quantityAll = 0;
    let sum=0;
    for (i = 0; i < listProductBuy.length; i++) {
        if (listProductBuy[i].username == flag) {
            quantityAll += listProductBuy[i].quantity;
            sum+=listProductBuy[i].price*listProductBuy[i].quantity;
        }
    }
    console.log(sum);
    document.getElementById("totalAmount").innerHTML = `${sum.toLocaleString('en-US')}`;
    document.getElementById("totalButton").innerHTML=`<button class="totalAmount" onclick="pay()">Mua hàng</button>`
}
renderCount();

// Yêu cầu người dùng nhập thông tin mua hàng
function pay(){
    document.getElementById("noti").innerHTML=`<div class="row">
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
document.getElementById("totalButton").innerHTML=`<button style="background-color:rgb(236, 0, 139);font-size:1.7rem" 
                            class="totalAmount" onclick="clientPay()">Thanh toán</button>`

}
// Hoàn thành đơn hàng
function clientPay(){
    // let clientName1 = document.getElementById("payClient").value;
    // let clientTel1 = document.getElementById("payTel").value;
    // let clientAdd1 = document.getElementById("payAddress").value;
    let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));
    
    let clientBuy = listProductBuy.filter(item => item.username == flag);
    // let clientInfo={
    //     clientName:clientName1,
    //     clientTel:clientTel1,
    //     clientAdd:clientAdd1,
    // }
    // clientBuy.push(clientInfo)
    console.log(clientBuy);

}
clientPay()

// Tạo button hiển thị danh mục sản phẩm
let productList = JSON.parse(localStorage.getItem('productList'));







