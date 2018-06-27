$(function(){
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;//手机号
	var myreg2=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;//只含有数字和字母，6-10位
	$(".login").click(function(){
		var user = $("#user").val();
		var pwd = $("#pwd").val();
		if(myreg.test(user)&&myreg2.test(pwd)){
			$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"login",userID:user,password:pwd},function(data){
				
				data = JSON.parse(data)
				console.log(data)
				
				if(data==2){
					alert("用户名密码不符");
					window.location.href= "login.html";
				}else if(data==0){
					alert("用户名不存在")
				}else{
					setCookie("username",data.userID,7)
					window.location.href = "../index.html"; 
				}
			})
		}else{
			alert("用户名密码不合法")
		}
	})
})
