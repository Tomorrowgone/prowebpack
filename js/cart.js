$(function(){
	var cartId = getCookie("cartId");
	if(getCookie("cart") !==undefined){
		var cartObj = JSON.parse(getCookie("cart"));
	}else{
		var cartObj ={};
		$("#myCart ul")[0].innerHTML="<p class='empty_cart'>购物车空空如也<a href='../index.html'>去购物</a></p>"
	}
	
	var str ="";
	var str2 ="";
	var all =0;
	for(var attr in cartObj){
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:cartId,goodsID:attr},function(data){
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
				<div data-price="${data[0].price}" class="cartPrice">
					￥：${data[0].price}
				</div>
				<div class="cartCount">
					<span>
						<span class="decAttr" data-id="${data[0].goodsID}">-</span>
						<strong>${cartObj[data[0].goodsID]}</strong>
						<span class="addAttr" data-id="${data[0].goodsID}">+</span>
					</span>
				</div>
				<div data-price="${data[0].price}" class="allPrice"><strong>￥：</strong><span>${data[0].price*cartObj[data[0].goodsID]}</span></div>
				<div class="cartDelete">
					<a data-id="${data[0].goodsID}" class="delBtn">删除</a>
					<a>移入我的收藏</a>
				</div>
			</li>
			`;
			all+= data[0].price*cartObj[data[0].goodsID];
//			console.log(all)
			var str2 = "<div><label for=''><input type='checkbox' id='checkOther'>反选</label></div><div class='tot'>总计：￥:<i class='totP'>"+all+"</i></div><div class='pay'>结算</div>"
			$("#myCart ul")[0].innerHTML+=str;
			$(".titPrice")[0].innerHTML=str2;
			/*点击删除商品*/
			$(".delBtn").click(function(){
				var goodsId = $(this).attr("data-id");
				$(this).parent().parent().remove();
				delete cartObj[goodsId];
				setCookie("cart",JSON.stringify(cartObj),7)
				
				
				/*总价*/
				
				var tot = 0;
				for(var i=0;i<$(".allPrice").length;i++){
//					console.log($(".titPrice"))
					console.log($(".allPrice").eq(i).find("span")[0])
					var tot=Number(tot)+Number($(".allPrice").find("span")[i].innerHTML);
				}
				$(".totP")[0].innerHTML=tot;
			})
			/*点击+商品数量+1*/
			$(".addAttr").click(function(){
//				$(this).parent().parent().siblings(".allPrice")[0].innerHTML+=cartObj[AgoodsId]*price+".00";
				var price= $(this).parent().parent().siblings(".cartPrice").attr("data-price");
				var AgoodsId = $(this).attr("data-id");
				if(cartObj[AgoodsId]>=20){
					cartObj[AgoodsId]=20;
				}else{
					cartObj[AgoodsId]++;
				}
				
				setCookie("cart",JSON.stringify(cartObj),7)
//				console.log($(this).parent().parent().siblings(".allPrice")[0])
				$(this).parent().parent().siblings(".allPrice")[0].children[1].innerHTML=cartObj[AgoodsId]*price+".00";
				$(this).parent()[0].children[1].innerHTML=cartObj[AgoodsId];
				
				/*总价*/
				
				var tot = 0;
				for(var i=0;i<$(".allPrice").length;i++){
//					console.log($(".titPrice"))
					console.log($(".allPrice").eq(i).find("span")[0])
					var tot=Number(tot)+Number($(".allPrice").find("span")[i].innerHTML);
				}
				$(".totP")[0].innerHTML=tot;
			})
			
			
			/*点击-商品数量-1*/
			$(".decAttr").click(function(){
				var price= $(this).parent().parent().siblings(".cartPrice").attr("data-price");
				var DgoodsId = $(this).attr("data-id");
				if(cartObj[DgoodsId]<=1){
					cartObj[DgoodsId]=1;
				}else{
					cartObj[DgoodsId]--;
				}
				
				setCookie("cart",JSON.stringify(cartObj),7);
				$(this).parent().parent().siblings(".allPrice")[0].children[1].innerHTML=cartObj[DgoodsId]*price+".00";
				$(this).parent()[0].children[1].innerHTML=cartObj[DgoodsId];
				
				/*总价*/
				
				var tot = 0;
				for(var i=0;i<$(".allPrice").length;i++){
//					console.log($(".titPrice"))
					console.log($(".allPrice").eq(i).find("span")[0])
					var tot=Number(tot)+Number($(".allPrice").find("span")[i].innerHTML);
				}
				$(".totP")[0].innerHTML=tot;
			})
			
		})
	}
})
