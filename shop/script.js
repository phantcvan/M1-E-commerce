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
function buy(id) {
    if (flag == "") {
        window.location.href = "./login.html";
    }
    let priceProduct = Number(document.getElementsByClassName("price")[id].textContent.replace(/,/g, ''));
    console.log(priceProduct);
    let nameProduct = document.getElementsByClassName("title")[id].textContent;
    // console.log(nameProduct);
    if (listProductBuy == null) {
        listProductBuy = [];
    }
    let productBuy = {
        name: nameProduct,
        price: priceProduct,
        quantity: 1,
    }
    index = listProductBuy.findIndex(s => s.name === nameProduct);
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
    let listProduct = JSON.parse(localStorage.getItem("listProduct"));
    let productContainer = ""
    for (let i = 0; i < listProduct.length; i++) {
        productContainer += `
        <div class="box" id="box">
        <div class="boxImg">
            <img class="imgProduct" src="${listProduct[i].image}" />
        </div>
        <div class="content">
        <h3 class="title"> ${listProduct[i].name} </h3>
        <p class="describe">${listProduct[i].describe}</p>
        <div class="order">
            <span class="price"> ${listProduct[i].price.toLocaleString('en-US')} </span>
            <button href="#" onclick="buy(0)">ORDER</button>
        </div>
    </div>
    </div>
`
        document.getElementById("box-container").innerHTML = productContainer;
    }
}
renderProduct();

