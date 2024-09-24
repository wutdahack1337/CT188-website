//======================TIM KIEM=============================================
let formtimkiem = document.getElementById("formtimkiem");
let otimkiem = document.getElementById("otimkiem");
let search = document.getElementById("search");

function Submit(){
	if (otimkiem.value.length > 0){
		formtimkiem.submit();
	}	
}

function CheckEnter(event){
	if (event.key == "Enter"){
		Submit();
	}	
}

otimkiem.addEventListener("keydown", CheckEnter);
search.addEventListener("click", Submit);

//=======================DANG NHAP====================================//
function CheckDataLogin(){
	let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	let email = document.getElementById("email");
	if (emailReg.test(email.value) == false){
		alert("Vui lòng nhập đúng email của bạn");
		return false;
	};
	
	let password = document.getElementById("password");
	if (password.value.length < 8){
		alert("Vui lòng nhập đúng mật khẩu của bạn");
		return 0;
	}

	return 1;
}

//======================================DANG KY=====================//
function CheckDataSignup(){
	let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	let email = document.getElementById("email");
	if (emailReg.test(email.value) == false){
		alert("Vui lòng nhập đúng email của bạn");
		return 0;
	};
	
	let password = document.getElementById("password");
	if (password.value.length < 8){
		alert("Vui lòng nhập đúng mật khẩu có trên 8 kí tự");
		return 0;
	}

	let password2 = document.getElementById("password2");
	if (password2.value != password.value){
		alert("Hai mật khẩu chưa thật sự giống nhau");
		return 0;
	}

	return 1;
}
//====================================LIEN HE=======================
function CheckDataContact(){
	let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	let email = document.getElementById("email");
	if (emailReg.test(email.value) == false){
		alert("Vui lòng nhập đúng email của bạn");
		return 0;
	};
	
	let name = document.getElementById("name");
	if (name.value.length < 4){
		alert("Vui lòng nhập đúng tên của bạn");
		return 0;
	}

	let content = document.getElementById("content");
	if (content.value.length < 10){
		alert("Vui lòng nhập nội dung nhiều hơn 10 chữ");
		return 0;
	}
	return 1;
}
//=========================SẢN PHẨM=========================
let itemList = {
	"sp001": {
		"name": "Sữa Chua Vị Kiwi",
		"price": 21000,
		"photo": "./TH_B1_Data/images/sanpham/kiwi.jpg"
	},
	"sp002": {
		"name": "Sữa Chua Vị Xoài", 
		"price": 22000,
		"photo": "./TH_B1_Data/images/sanpham/mango.jpg"
	}, 
	"sp003": {
		"name": "Sữa Chua Dưa Lưới", 
		"price": 23000,
		"photo": "./TH_B1_Data/images/sanpham/cantaloupe.jpg"
	}
};

function addCart(code){
	let inputsp = document.getElementById(code);
	let number = parseInt(inputsp.value);
	
	if (typeof localStorage[code] === "undefined"){
		window.localStorage.setItem(code, number);
	} else {
		let current = parseInt(window.localStorage.getItem(code));
		console.log(code + " " + current);
		if (number + current > 100){
			alert("Bạn đã đặt quá số lượng cho phép, chúng tôi chỉ cho bạn mua tối đa 100 cái loại này");
			window.localStorage.setItem(code, 100);
		} else {
			window.localStorage.setItem(code, current + number);
		}
	}
}

//==================GIỎ HÀNG=================
let cart = document.getElementById("cart");

function Nav(){
	window.location.href = "donhang.html"
}
cart.addEventListener("click", Nav);

function removeCart(code){
	if (typeof window.localStorage[code] !== "undefined"){
		window.localStorage.removeItem(code);
		location.reload(1);
	}
}

function discountRate(){
	let d = new Date();
	let weekday = d.getDay();
	let totalMins = d.getHours()*60 + d.getMinutes();

	if (weekday >= 1 && weekday <= 3 && ((totalMins >= 420 && totalMins <= 660) || (totalMins >= 780 && totalMins <= 1020))){
		return 0.1;
	}
	return 0;
}

function showCart(){
	let tbody = document.querySelector("tbody");
	let tfoot = document.querySelector("tfoot");
	let TotalPreTax = 0;
	for (let key in localStorage){
		let orderNumber = localStorage.getItem(key);	
		if (orderNumber != null && orderNumber > 0){
			let item = itemList[key];
			let photo = item.photo;
			let name = item.name;
			let price = item.price;
			let orderNumber = localStorage.getItem(key);			

			//=======================TBODY=======
			let tr = document.createElement("tr");

			let tdimg = document.createElement("td");
			let img = document.createElement("img");
			img.src = photo; img.style.width = "100px";
			tdimg.appendChild(img);
			tr.appendChild(tdimg);

			let tdname = document.createElement("td");
			tdname.appendChild(document.createTextNode(name));
			tr.appendChild(tdname);

			let tdnumber = document.createElement("td");
			tdnumber.appendChild(document.createTextNode(orderNumber));
			tr.appendChild(tdnumber);

			let tdprice = document.createElement("td");
			tdprice.appendChild(document.createTextNode(price + " VND"));
			tr.appendChild(tdprice);

			let tdtotal = document.createElement("td");
			tdtotal.appendChild(document.createTextNode(price * orderNumber + " VND"));
			tr.appendChild(tdtotal);

			let tddelete = document.createElement("td");
			let trash = document.createElement("i");
			trash.setAttribute("href", key);
			trash.setAttribute("data-code", key);
			trash.setAttribute("class", "fa-solid fa-trash");
			trash.setAttribute("onclick", "removeCart(this.dataset.code)")
			tddelete.appendChild(trash);
			tr.appendChild(tddelete);

			tbody.appendChild(tr);


			TotalPreTax += price * orderNumber;
		}
	}	

	//=============== TOTAL PRETAX====
	let tr_totalpretax = document.createElement("tr");
	let td_totalpretax = document.createElement("td");
	td_totalpretax.colSpan = "6";

	td_totalpretax.appendChild(document.createTextNode("Tổng thành tiền (A) = " + TotalPreTax + " VND"));
	tr_totalpretax.appendChild(td_totalpretax);
	tfoot.appendChild(tr_totalpretax);

	//================DISCOUNT=====
	let discount = TotalPreTax * discountRate();
	let tr_discount = document.createElement("tr");
	let td_discount = document.createElement("td");
	td_discount.colSpan = "6";

	td_discount.appendChild(document.createTextNode("Chiết khấu (B) = " + discountRate() + " x A = " + discount + " VND"));
	tr_discount.appendChild(td_discount);
	tfoot.appendChild(tr_discount);

	//=============TAX==========
	let tax = 0.1 * (TotalPreTax - discount);
	let tr_tax = document.createElement("tr");
	let td_tax = document.createElement("td");
	td_tax.colSpan = "6";

	td_tax.appendChild(document.createTextNode("Thuế (C) = 10% x (A - B) = " + tax + " VND"));
	tr_tax.appendChild(td_tax);
	tfoot.appendChild(tr_tax);

	//=============TOTAL==========
	let total = TotalPreTax - discount + tax;
	let tr_total = document.createElement("tr");
	let td_total = document.createElement("td");
	td_total.colSpan = "6";

	td_total.appendChild(document.createTextNode("Tổng đơn hàng = A - B + C = " + total + " VND"));
	tr_total.appendChild(td_total);
	tfoot.appendChild(tr_total);

	//============BUTTON=====
	let button = document.createElement("button");
	button.appendChild(document.createTextNode("Xác Nhận Đơn Hàng"));

	let tr_button = document.createElement("tr");
	let td_button = document.createElement("td");
	td_button.colSpan = "6";

	td_button.appendChild(button);
	tr_button.appendChild(td_button);
	tfoot.appendChild(tr_button);
}

window.onstorage = () => {location.reload(1)}; // don hang tu cap nhat khi co thay doi

//============QUANG CAO================
let d = new Date();
let ads = "Khách hàng có ngày sinh trong tháng " + d.getMonth() + " sẽ được tặng 2 phần sữa chua dâu cho đơn hàng đầu tiên trong tháng.";

let W = $(window).width() / 2 - $("main").width();
$(document).ready(function(){
	$("footer").append("<div id='adscontainer'><span id='adstext'><h2>" + ads + "</h2.</span></div>");
	
	function adsVerEffect(){
		$("#adscontainer").addClass("adsvercontainer container");
		$("#adscontainer").css("width", W);
		$("#adstext").addClass("adsvertext adstext");
		$("#adstext").css("top", $("#adscontainer").height());
		$("#adstext").animate(
			{"top": "-=" + ($("#adscontainer").height() + $("#adstext").height())}, 30000, function(){
				adsVerEffect();
			}
		);
	}

	function adsHorEffect(){
		$("#adscontainer").addClass("adshorcontainer container");
		$("#adscontainer").css("left", $("main").position().left);
		$("#adscontainer").css("width", $("main").width());
		$("#adstext").addClass("adshortext adstext");
		$("#adstext").css("left", $("#adscontainer").width());
		$("#adstext").animate(
			{left: "-=" + ($("#adscontainer").width() + $("#adstext").width())},
			30000,
			function(){
				adsHorEffect();
			}
		);
	}

	
	if (W >= 200){
		adsVerEffect();
	} else {
		adsHorEffect();
	}
});