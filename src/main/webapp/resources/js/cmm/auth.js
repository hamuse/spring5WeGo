"use strict";
var auth = auth || {};
auth =(()=>{
	const WHEN_ERR = '호출하는 JS를 찾을수 없습니다.'
	let _, js;
	let auth_vuejs;
	let init =()=>{
		_ = $.ctx();
		js= $.js();
	   auth_vuejs = js + '/vue/auth_vue.js'
	}
	let onCreate =()=>{
		init();
		$.getScript(auth_vuejs).done(()=>{
			setContentView()
			$('#a_go_join').click(e=>{
				e.preventDefault()
				join()
			})
		}).fail(()=>{alert(WHEN_ERR)})
	}
	let setContentView =() =>{
		login()
	}
	let join =()=>{
		$('head')
        .html( auth_vue.join_head())
		$('body')
		.html( auth_vue.join_body())
		
//</*button  class="btn btn-primary btn-lg btn-block" type="submit">Join</button>*/
$('<button>', {
text : '회원가입',    //    값을 주면 세터가 됨.
href : '#',
click : e=>{
	alert('uid : '+ $('#userid').val())
	e.preventDefault();
    let data = { uid : $('#userid').val(), pwd : $('#password').val(),uname: $('#uname').val()}
    alert('전송아이디 : '+ data.uid )
    $.ajax({ 
        url : _+'/user/join',
        type : 'POST',
        dataType : 'json',
        data : JSON.stringify(data),
        contentType : 'application/json',
        success : d => {    // sender, d가 자바에서 map, d.uid map의 키값
            alert('AJAX 성공 아이디 : '+ d.uid + ', 성공 비번 : ' + d.pwd)
            login()
        },
        error : e => {        // receiver,
            alert('AJAX 실패');
        }        
    })
}
})
.addClass('btn btn-primary btn-lg btn-block')
.appendTo('#join_btn')
	
	}
	let login =()=>{
	     let x = {css: $.css(), img: $.img()}
         $('head')
		.html(auth_vue.login_head(x))
		$('body')
		.html(auth_vue.login_body(x))
		.addClass ('text-center')
	
		$('<button>',{
	    	 
	    	 text : "Sign in",
	    	 click : e =>{
	    		 e.preventDefault()
	    		 	alert(_+'클릭성공')
					$.ajax({
						url: _+'/user/login',
						type:'POST',
						dataType:'json',
						data:JSON.stringify({ 
							uid: $('#uid').val(),
							pwd:$('#pwd').val()
						}),
						contentType:'application/json',
						success: d =>{
							alert(d.uname+'~님 환영합니다 .')
							mypage(d)
						},
						error: e =>{
							alert('에이작스 에러!!!!')
						}
					
	    		
	    	})
	    			 
	    		 }
		
	}).addClass('btn btn-primary btn-lg btn-block')
	.appendTo('#btn_login')
		
	}
	let mypage =d=>{
			$('head')
			.html('마이페이지 헤드')
			$('body')
			.html('uname:'+d.uname)
			
		
		
	}


	return{onCreate, join,login,mypage}
	
})();