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
        img:listProduct[id].image,
        quantity: 1,
    }
    index = listProductBuy.findIndex(s => s.code === codeProduct && s.username == flag);
    console.log(index);
    if (index !== -1) {
        listProductBuy[index].quantity++;
    } else {
        listProductBuy.push(productBuy);
    }
    console.log(listProductBuy);
    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
}

// Hiển thị sản phẩm trên index.html
function renderProduct() {
    let productContainer = ""
    for (let i = 0; i < listProduct.length; i++) {
        productContainer += `            
        <div class="card col-5 col-lg-3 col-xl-3" style="margin: 10px 10px">
            <div class="boxImg">
                <img class="card-img-top" src="${listProduct[i].image}" />
            </div>
            <div class="card-body">
                <h3 class="card-title" style="text-align:center"> ${listProduct[i].name} </h3>
                <div class="order" style="">
                    <span class="price"> ${listProduct[i].price.toLocaleString('en-US')} </span>
                    <button type="button" class="btn btn-lg buttonBuy" style="margin:0; padding:10px 5px;"
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


function view(id) {
document.getElementById("myModalLabel").innerHTML=`<b>${listProduct[id].name}</b>`;
document.getElementById("modal-price").innerHTML = listProduct[id].price.toLocaleString('en-US');
document.getElementById("productViewName").innerHTML= listProduct[id].describe;
document.getElementById("modal-img").innerHTML=`<img class="card-img-top" src="${listProduct[id].image}" />`
document.getElementById("modal-footer").innerHTML=`
<button style="font-size: 15px;" type="button" class="btn btn-default" data-dismiss="modal" onclick="closeModal()">Đóng
</button>
<button style="font-size: 15px;background-color: rgb(236, 0, 139);border:none" type="button" 
class="btn btn-primary" onclick="buy(${id})">Thêm vào giỏ hàng</button>
`;
renderProductBuy();
$('#myModal').modal('hide')
}
function closeModal(){
    $('#myModal').modal('hide')
}

function renderProductBuy() {
    let listProductBuy = JSON.parse(localStorage.getItem("listProductBuy"));
    let productBuy="";
    console.log(flag);
    for (let i=0;i<listProductBuy.length;i++){
        if (listProductBuy[i].username==flag){
            productBuy+=`<tbody><tr>
            <td rowspan="3" style="width:30%"><img class="card-img-top" src="${listProductBuy[i].img}" /></td>
            </tr>
            <tr><td>${listProductBuy[i].name}</td></tr>
            <tr><td>${listProductBuy[i].price}</td></tr>
            <tr><td><button onclick="downP(${i})">-</button> ${listProductBuy[i].quantity}<button onclick="upP(${i})">+</button></td>
        </tr></tbody>`;
        }
        document.getElementById("productBuy").innerHTML=productBuy;
    }

}
renderProductBuy();

function upP(index) {
    listProductBuy[index].quantity++;
    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
    renderProductBuy();
    renderCount();
}
function downP(index) {
    listProductBuy[index].quantity--;
    localStorage.setItem("listProductBuy", JSON.stringify(listProductBuy));
    renderProductBuy();
    renderCount();
}


function renderCount() {
    let sum = 0;
    for (i = 0; i < listProductBuy.length; i++) {
        if (listProductBuy[i].username==flag){
            sum += listProductBuy[i].quantity;
    }
}
    // let result = sum;
    // document.getElementById("").innerHTML = result;
}

