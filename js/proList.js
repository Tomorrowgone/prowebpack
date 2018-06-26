$(function(){
	var classID = getCookie("goPro");
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:classID,linenumber:30},function(data){
		var str = "";
		
		for (var i=0;i<data.length;i++) {
			str+=`
			<li data-id="${data[i].goodsID}">
							<a class='Pro_img' >
								<img src='${data[i].goodsListImg}' alt='' />
							</a>
							<a class='Pro_tit' >${data[i].goodsName}</a>
							<div class='Pro_price'>
								<a >
									￥:
									<span>${data[i].price}</span>
								</a>
								<a >￥:${data[i].price+1}</a>
								<a ></a>
							</div>
			</li>`;
		}
		console.log(1)
		$("#proList ul").html(str);
		console.log($("#proList ul li"))
		$("#proList ul li").click(function(){
			var goodsId = $(this).attr("data-id");
			setCookie("goodsId",goodsId,7);
			setCookie("cartId",classID,7);
			window.location.href="detail.html";
		})
	})
})
