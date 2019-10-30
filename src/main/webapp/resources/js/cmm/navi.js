var navi = navi || {}
navi = (()=>{
		const WHEN_ERR = '호출하는 js를 찾을수 없습니다.';
		let gps,js;
		let brd_vuejs,uname,brdjs,navi_vue_js, authjs;

		let init=()=>{
			alert('navi  init gps : '+ gps)
			gps= $.ctx()
			js = $.js()
			brd_vuejs = js+'/vue/brd_vue.js'
			brdjs = js+'/brd/brd.js'
			navi_vue_js = js+'/vue/navi_vue.js'
			authjs = js+'/cmm/auth.js'
			$userid = document.cookie
			
		}
		let onCreate =()=>{
			init()
			$.when(
					$.getScript(authjs),
					$.getScript(brdjs)
			).done(()=>{
				
			}).fail(()=>{alert(WHEN_ERR)})
			setContentView()
		}
		let setContentView=()=>{
				 $('<a>',{
					 click: e => {
					e.preventDefault()
					 brd.write()
					 alert('navi 글쓰기'+_)
					 },
					 text : '글쓰기'
				 })
				 .addClass('nav-link')
				 .appendTo('#go_write')
				 
				  $('<a>',{
					 click: e => {
						 e.preventDefault()
						alert('로그아웃 버튼')
						deleteCookie()
						app.run(_)
						
					 },
					 text : '로그아웃'
				 })
				 .addClass('nav-link')
				 .appendTo('#logout_Btn')
				 
				   $('<a>',{
					 click: e => {
						 e.preventDefault()
						alert('마이페이지 버튼')
					 },
					 text : '마이페이지'
				 })
				 .addClass('nav-link')
				 .appendTo('#mypage_Btn')
			}
		
		return {onCreate}
})();