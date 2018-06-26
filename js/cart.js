$(function(){
	var cartId = getCookie("cartId");
	var cartObj = JSON.parse(getCookie("cart"));
	var str ="";
	for(var attr in cartObj){
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:cartId,goodsID:attr},function(data){
			console.log(data[0].price);
			str=`
			<li>
				<div class="single">
					<input type="checkbox">
				</div>
				<div class="cartImg">
					<img src="${data[0].goodsListImg}">
				</div>
				<div class="cartInfo">
				<a href="#">TUPLUS ONE</a>
				<p>${data[0].detail}</p>
				</div>
				<div class="cartPrice">
					
				</div>
				<div class="cartCount">
					<span>
						<span class="decAttr" data-id="${data[0].goodsID}">-</span>
						<strong>${cartObj[data[0].goodsID]}</strong>
						<span class="addAttr" data-id="${data[0].goodsID}">+</span>
					</span>
				</div>
				<div data-price="${data[0].price}" class="allPrice"></div>
				<div class="cartDelete">
					<a data-id="${data[0].goodsID}" class="delBtn">删除</a>
					<a>移入我的收藏</a>
				</div>
			</li>
			`;
			console.log(1)
			$("#myCart ul")[0].innerHTML+=str;
		})
	}
	
})
