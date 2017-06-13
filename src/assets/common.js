/**
 *
 */
function $kk(){
	(function($) {
				//成功响应的回调函数
				var success = function(response) {
					var dataType = dataTypeEl.value;
					if (dataType === 'json') {
						response = JSON.stringify(response);
					} else if (dataType === 'xml') {
						response = new XMLSerializer().serializeToString(response).replace(/</g, "&lt;").replace(/>/g, "&gt;");
					}
					respnoseEl.innerHTML = response;
				};
				//设置全局beforeSend
				$.ajaxSettings.beforeSend = function(xhr, setting) {
					//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
					mui.toast('beforeSend演示,');
					console.log('beforeSend:::' + JSON.stringify(setting));
				};
				//设置全局complete
				$.ajaxSettings.complete = function(xhr, status) {
					console.log('complete:::' + status);
				}
				var ajax = function() {
					//利用RunJS的Echo Ajax功能测试
					var url = 'https://service.dcloud.net.cn/ajax/echo/';
					//请求方式，默认为Get；
					var type = methodEl.value;
					//预期服务器范围的数据类型
					var dataType = dataTypeEl.value;
					//发送数据
					var data = {
						name: "mui",
						version: "pre-release",
						author: "chb",
						description: "最接近原生APP体验的高性能前端框架"
					};
					url = url + (dataType === 'html' ? 'text' : dataType);
					respnoseEl.innerHTML = '正在请求中...';
					if (type === 'get') {
						if (dataType === 'json') {
							$.getJSON(url, data, success);
						} else {
							$.get(url, data, success, dataType);
						}
					} else if (type === 'post') {
						$.post(url, data, success, dataType);
					}
				};
				//发送请求按钮的点击事件
				document.getElementById("confirm").addEventListener('tap', function() {
					if(network){
						ajax();
					}else{
						mui.toast("当前网络不给力，请稍后再试");
					}
				});
				//点击描述中链接时，打开对应网页介绍；
				$('body').on('tap', 'a', function(e) {
					var href = this.getAttribute('href');
					if (href) {
						if (window.plus) {
							plus.runtime.openURL(href);
						} else {
							location.href = href;
						}
					}
				});
			})(mui);
	
}

/*
 var mask=mui.createMask();//遮罩层
mui(documengt.body).on('tap','#login',function(){
    mui.ajax('http://127.0.0.1/login',{
    data:{
        userName:userName,
        userPwd:userPwd
    },
    dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
    beforeSend: function() {
        plus.nativeUI.showWaiting(title, options);
        mask.show();//显示遮罩层
    },
    complete: function() {
        plus.nativeUI.closeWaiting();
        mask.closed();//关闭遮罩层
    },
    success: function(data) {
        //服务器返回响应，根据响应结果，分析是否登录成功； 
        if(data=='1'){
            mui.alert('登录成功');
        }
    },
    error: function(xhr, type, errorThrown) {
        mui.alert('服务器连接超时，请稍后再试’);
    }
}
});*/

/*
 $.ajax({
         type: "GET",
         url: "test.json",
         data: {username:$("#username").val(), content:$("#content").val()},
         timeout:3000,
         async:true,//false  异步
         
         dataType: "json",
         beforeSend:function(){
         	console.log(this);
         	console.log("beforeSend");
         },
         complete:function(){
         	console.log(this);
         	console.log("complete");
         },
         success: function(data){
                     $('#resText').empty();   //清空resText里面的所有内容
                     var html = ''; 
                     $.each(data, function(commentIndex, comment){
                           html += '<div class="comment"><h6>' + comment['username']
                                     + ':</h6><p class="para"' + comment['content']
                                     + '</p></div>';
                     });
                     $('#resText').html(html);
      	},
      	error:function(XMLHttpRequest, textStatus, errorThrown){
          //通常情况下textStatus和errorThrown只有其中一个包含信息
          console.log(this); //调用本次ajax请求时传递的options参数
       }
     });
     
*/



/**
 * 计算当前日期时间的n天day 
 */