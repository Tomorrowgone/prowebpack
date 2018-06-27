$(function(){
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;//手机号
	var myreg2=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;//只含有数字和字母，6-10位
	$(".register").click(function(){
		var user = $("#user").val();
		var pwd = $("#pwd").val();
		var flag1 = false,flag2=false;
		if(myreg.test(user)){
			flag1 = true;
			
		}else{
			alert("手机号码错误")
		}
		if(myreg2.test(pwd)){
			flag2 = true;
			
		}else{
			alert("密码格式错误");
		}
		
		if(flag1&&flag2){
			$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"register",userID:user,password:pwd},function(data){
				
				data = JSON.parse(data)
				console.log(data)
				
				if(data==1){
					alert("注册成功");
					window.location.href= "login.html";
				}else if(data==0){
					alert("用户名已存在")
				}
			})
		}
	})
})
