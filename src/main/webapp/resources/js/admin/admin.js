"use strict";
var admin = admin || {};
admin = (() => {
    const WHEN_ERR = '호출하는 js가 없습니다.';
    let context, js ,css ,img;
    let navi_vuejs ,auth_vuejs;
    let navijs;
    let init = () => {
    	context= $.ctx()
        js = $.js()
        css = $.css()
        img = $.img()
        navi_vuejs = js+'/vue/navi_vue.js'
        navijs = js + '/cmm/navi.js'
        
    }
    let onCreate = () => {
        alert('환영합니다.')
        init()
       $.when(
    		   $.getScript(navi_vuejs),
    		   $.getScript(navijs)
       ).done(()=>{ 
    	   alert('admin onCreate done alert')
    	   setContentView()})
    	   .fail(()=>{WHEN_ERR})
    }
    let setContentView = () => { //js  에서의 맨 처음 화면이다. 
//      $('#login_form_id').remove()
        $('body').empty()
        $(navi_vue.navi()).appendTo('body')
        $('#nav_scroller_id').remove()
        navi.onCreate()
        
        $('<table id="tab">'+
        '  <tr>'+
        '  </tr>'+
        '</table>')  // key값 무조건 string이기 때문에 '' 생량가능 value는 생략 불가, json이기때문에 , 로 속성 추가                            
        .css({ width : '80%', height : '80%', border :'1px solid black', margin: '0 auto' })
        .appendTo('body')    // body에 오버로딩
        
        $.each(
            [{ id : 'left', width : '20%'},
            { id : 'right', width : '80%'}],
            (i, j)=>{
            $('<td id="'+ j.id +'"></td>')
            .css({border: '1px solid #ddd', width: j.width, 'vertical-align': 'top'})
            .appendTo('#tab tr')
        })
        
        $.each([    // name을 주고 구분
        	{txt : '웹크롤링', name : 'web_crawl'},
            {txt : '고객관리', name : 'cust_mgmt'},
            {txt : '상품등록', name : 'item_reg'},
            {txt : '상품조회', name : 'item_srch'},
            {txt : '상품수정', name : 'item_mod'},
            {txt : '상품삭제', name : 'item_del'}],
            (i, j)=>{
                $('<div name="'+ j.name +'">'+ j.txt +'</div>')
                .appendTo('#left')
                .click(function(){
            //        let that = $(this).attr('name')
                    $(this).addClass('active')
                    $(this).siblings().removeClass('active')
                    switch($(this).attr('name')){
                    case 'web_crawl' :
                    	web_crawl()
                        break
                    case 'item_reg' :
                        
                        break
                    case 'item_srch' :
                        
                        break
                    case 'item_mod' :
                        
                        break    
                    case 'item_del' :
                        
                        break        
                    }
            })
        })
        $('#left div').css({border: '1px solid #ddd', margin: 'auto 0', 'line-height': '50px'})
    }
/*    <form action="/action_page.php">
    <select name="cars" size="4" multiple>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi">Audi</option>
    </select>
    <br><br>
    <input type="submit">
  </form>*/
    let web_crawl =()=>{
    	alert('admin web_crawl alert') 
//    	 $('<table id="tab">'+
//        '  <tr>'+
//        '  </tr>'+
//        '</table>')  // key값 무조건 string이기 때문에 '' 생량가능 value는 생략 불가, json이기때문에 , 로 속성 추가                            
//        .css({ width : '80%', height : '80%', border :'1px solid black', margin: '0 auto' })
//        .appendTo('#right')    // body에 오버로딩
        
    /*	$.each([
    		{txt:'naver', name:'nave'},
    		{txt:'google', name:'google'},
    		{txt:'nate',name:'nate'}
    	],(i,j)=>{ $('< name="'+ j.name +'">'+ j.txt +'</tr>')
    		 .appendTo('#right')})*/
//    		 <option value="volvo">Volvo</option>
//    <option value="saab">Saab</option>
//    <option value="fiat">Fiat</option>
//    <option value="audi">Audi</option>
    		 $(' <form id ="web_crawl_form"action="/action_page.php">'+
				  '  <select name="cars" size="1" ></select>'+
				  '  <input type="submit">'+
				  '<input type="text" name="serch">'+
				  '</form>')
   				  .appendTo('#right')
   	           $.each([
   	        	   {value:'news', text:'뉴스'},
   	        	   {value:'webtoon', text:'웹툰'},
   	        	   {value:'Shopping', text:'쇼핑'}
   	        	   
   	           ],(i,j)=>{
   	        	  $(' <option value="'+j.value+'">'+j.text+'</option>')
   	        	  .appendTo('#web_crawl_form select[name="cars"]')
   	           })
    }
    
    return {onCreate}
    	
})();