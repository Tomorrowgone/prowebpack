
$(function(){
	var oZoomBox = document.getElementById("zoomBox");
	var oMidArea = document.getElementById("midArea");
	var midImg =oMidArea.children[0];
	var oZoom = document.getElementById("zoom");
	var oBigArea = document.getElementById("bigArea");
	var oBigImg = oBigArea.children[0];
	var smallArea=document.getElementById("smallArea");		
	var smaImg = smallArea.children[0];
	var goodsId = getCookie("goodsId");
	var cartId = getCookie("cartId");
	console.log(goodsId);
	console.log(cartId);
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:cartId,goodsID:goodsId},function(data){
		oBigImg.src= data[0].goodsListImg;
		smaImg.src = data[0].goodsListImg;
		midImg.src = data[0].goodsListImg;
		var str = `
			<div class="Info_tit">
							${data[0].detail}
						</div>
						<div class="Info_price">
							<p class="Tprice">
								<span>
								￥：${data[0].price+1}
								</span>
								<i></i>
							</p>
							<p class="Nprice">
								<span>
								￥：
								</span>
								<i>${data[0].price}</i>
							</p>
						</div>
						<div class="Info_buy">
							<a>立即购买</a>
							<a class='addcart' data-cart_id = '${cartId}' data-id='${data[0].goodsID}'>加入购物车</a>
						</div>
		`;
		$("#detailInfo").html(str)
		$(".addcart").click(function(){
			if(getCookie("cart")!=undefined){
				var obj = JSON.parse(getCookie("cart"));
			}else{
				var obj={}
			}
			var goodsID = $(".addcart").attr("data-id");
			if(obj[goodsID]==undefined){
				obj[goodsID]=1;
			}else{
				obj[goodsID]++;
			}
			var objStr = JSON.stringify(obj);
			console.log(obj)
			setCookie("cart",objStr,7);
			setCookie("cartId",cartId,7);
			window.location.href="../htmls/cart.html";
		})
	})
	function move(){
		oMidArea.onmouseover = function(){
					oZoom.style.display = "block";
					oBigArea.style.display = "block";
				}
				oMidArea.onmouseout = function(){
					oZoom.style.display = "none";
					oBigArea.style.display = "none";
				}
				oMidArea.onmousemove = function(e){
					var evt = e || event;
					var _left = evt.pageX -oZoomBox.offsetLeft - oZoom.offsetWidth/2;
					var _top = evt.pageY - oZoomBox.offsetTop -oZoom.offsetHeight/2;
					
					
					if(_left<=0){
						_left = 0;
					}
					if(_left >= oMidArea.offsetWidth-oZoom.offsetWidth){
						_left = oMidArea.offsetWidth-oZoom.offsetWidth;
					}
					
					if(_top<=0){
						_top = 0;
					}
					
					if(_top>=oMidArea.offsetHeight-oZoom.offsetHeight){
						_top=oMidArea.offsetHeight-oZoom.offsetHeight;
					}
					oZoom.style.left = _left + "px";
					oZoom.style.top = _top + "px";
					
					//大图移动
					oBigImg.style.left = -oZoom.offsetLeft/oMidArea.offsetWidth*oBigImg.offsetWidth + "px";
					oBigImg.style.top = -oZoom.offsetTop/oMidArea.offsetHeight*oBigImg.offsetHeight + "px";
					
				}
	}
	move();
})
			
		
			
			