(function () {
	"use strict";

	var treeviewMenu = $('.app-menu');

	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function(event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

	// Activate sidebar treeview toggle
	$("[data-toggle='treeview']").click(function(event) {
		event.preventDefault();
		if(!$(this).parent().hasClass('is-expanded')) {
			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
		}
		$(this).parent().toggleClass('is-expanded');
	});

	// Set initial active toggle
	$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

	//Activate bootstrip tooltips
	$("[data-toggle='tooltip']").tooltip();

})();
function renderAdmin() {
	let listUser = JSON.parse(localStorage.getItem("listUser"));
	if (listUser == null) {
		listUser = []
	}
	document.getElementById("userQuantity").innerHTML=listUser.length;
	let listProduct = JSON.parse(localStorage.getItem("listProduct"));
	if (listProduct == null) {
		listProduct = []
	}
	document.getElementById("productQuantity").innerHTML=listProduct.length;
	let orderManage = JSON.parse(localStorage.getItem("orderManage"));
	if (orderManage == null) {
		orderManage = []
	}
	document.getElementById("orderQuantity").innerHTML=orderManage.length;
	let count=0;
	for (let i = 0; i < listProduct.length; i++) {
		if (listProduct[i].status=="Sắp hết") {
			count++;
		}
		
	}
	document.getElementById("outOfStock").innerHTML=count;
	
}
renderAdmin()


