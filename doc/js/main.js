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
let renderOrder = JSON.parse(localStorage.getItem("renderOrder"));
if (renderOrder == null) {
	renderOrder = []
}
document.getElementById("orderQuantity").innerHTML=renderOrder.length;


