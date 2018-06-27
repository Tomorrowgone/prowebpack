$(function(){
	function userInfo(){
		if(getCookie("username")!=undefined){
			$(".log_reg")[0].innerHTML="<span>用户：</span><i>"+getCookie("username")+"</i>";
			$(".hello")[0].innerHTML="<span class='hello'>Hi！"+getCookie("username")+"</span>"
		}
	}
	userInfo();
	function goCart(){
		$(".inde_goCart").click(function(){
			console.log(1)
			if(getCookie("username")){
				window.location.href = "../htmls/cart.html";
			}else{
				window.location.href = "../htmls/login.html";
			}
			
		})
	}
	goCart();
  	(function autoImg(){
  		//轮播图
            $(".scrollImg ul").append($(".scrollImg ul li").eq(0).clone());
             
            var timer=null;
            var count=0;//0-4 
            var k=0;//0-4 记录原点的位置
             
            timer=setInterval(autoPlay,3000);
            function autoPlay(){
                count++;
                if(count==5){
                    $(".scrollImg ul").css("left",0)
                    count=0;
                }
                $(".scrollImg ul").stop().animate({"left":-count*520+"px"},800)
                k++;
                if(k==5){
                     
                    k=0;
                }
                $(".auIndex li").eq(k).addClass("current").siblings().removeClass("current")
            }
            $(".auIndex li").click(function(){
                $(this).addClass("current").siblings().removeClass("current")
                k=$(this).index();
                count=k;
                $(".scrollImg ul").stop().animate({"left":-k*520+"px"})
                 
            })
            $(".scrollImg").mouseenter(function(){
                clearInterval(timer);
            });
            $(".scrollImg").mouseleave(function(){
                timer = setInterval(autoPlay,3000)
            })
            //控制左边箭头
            $(".last").click(function(){
                count--;
                if(count==-1){
                    count=4;
                    $(".scrollImg ul").css("left",-520+"px")
                }
                $(".scrollImg ul").stop().animate({"left":-count*520+"px"})
                k=count;
                $(".auIndex li").eq(k).addClass("current").siblings().removeClass("current")
            })
            //控制右边箭头
            $(".next").click(function(){
                count++;
                if(count==5){
                    count=0;
                    $(".scrollImg ul").css("left",0)
                }
                $(".scrollImg ul").stop().animate({"left":-count*520+"px"})
                k++;
                if(k==5){
                    k=0;
                     
                }
                $(".auIndex li").eq(k).addClass("current").siblings().removeClass("current")
            });
  	})();
		  function autoImg1(){
		  	//轮播图
            $(".scrollImg1 ul").append($(".scrollImg1 ul li").eq(0).clone());
             
            var timer=null;
            var count=0;//0-4 
            var k=0;//0-4 记录原点的位置
             
            timer=setInterval(autoPlay,4000);
            function autoPlay(){
                count++;
                $(".scrollImgIndex").html(count+1)
                if(count==5){
                    $(".scrollImg1 ul").css("left",0)
                    count=0;
                }
                $(".scrollImg1 ul").stop().animate({"left":-count*520+"px"},1000)
                k++;
                if(k==5){
                     
                    k=0;
                }
                $(".auIndex1 li").eq(k).addClass("current").siblings().removeClass("current")
            }
            $(".auIndex1 li").click(function(){
                $(this).addClass("current").siblings().removeClass("current")
                k=$(this).index();
                count=k;
                
                $(".scrollImg1 ul").stop().animate({"left":-k*520+"px"})
                 
            })
            $(".scrollImg1").mouseenter(function(){
                clearInterval(timer);
            });
            $(".scrollImg1").mouseleave(function(){
                timer = setInterval(autoPlay,4000)
            })
		  }
		  autoImg1();
		  
		  
		  /*-------userTab_List菜单--------*/
		 function userTab_List(){
		 	$(".userTab_List li").hover(function(){
		 		var _index = $(this).index();
		 		$(".notice_list ul").eq(_index).css("display","block").siblings().css("display","none");
		 	})
		 }
		 userTab_List();
		 /*进入列表页*/
		function goProList(){
			$(".proUl li").click(function(){
				console.log($(this).attr("data-id"));
				var classID = $(this).attr("data-id");
				setCookie("goPro",classID);
				window.location.href= "htmls/proList.html"
			})
		}
		goProList();
		 $.ajax({
		 	type:"get",
		 	url:"http://datainfo.duapp.com/shopdata/getclass.php",
		 	async:true,
		 	success:function(data){
		 		data = JSON.parse(data)
		 		console.log(data)
		 	}
		 });
		 function getHotGoods(){
		 	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",function(data){
		 		var $HotGoodsList = $(".hotGoods_list ul");
		 		var str ="";
		 		for (var i =0;i<data.length;i++) {
		 			str+=`
		 				<li>
							<a class='Hot_img' href=''>
								<img src='${data[i].goodsListImg}' alt='' />
							</a>
							<a class='Hot_tit' href=''>${data[i].goodsName}</a>
							<div class='Hot_like'>
								<span>月售231</span>
								<span>收藏4123</span>
							</div>
							<div class='Hot_price'>
								<a href="">
									￥:
									<span>${data[i].price}</span>
								</a>
								<a href="">￥:${data[i].price+1}</a>
								<a href=""></a>
							</div>
						</li>
		 			`;
		 		}
		 		$HotGoodsList.html(str);
		 	})
		 }
		 getHotGoods();
})
