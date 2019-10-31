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
    	/*$('#form_join').remove()
        $('body').append(navi_vue.nav())*/
//  	$('body').empty()
//  	$(navi_vue.nav())
//   	.appendTo('body')
//  	$('<table id="tab"><tr><td id="left"></td><td id ="right"></td></tr></table>')
//      .css({ width : '80%', height : '80%', border :'1px solid black', margin: '0 auto' })
//      .appendTo('body')
//  		$('<table id="tab"><tr><td id="left"></td><td id ="right"></td></tr></table>')
//      .css({ width : '80%', height : '80%', border :'1px solid black', margin: '0 auto' })
//      .appendTo('body')
////      let arr1 = [{id :'left',width:'20%'},{id:'right', width: '80%'}]
//	$.each([{id :'left',width:'20%'},{id:'right', width: '80%'}]
//		,(i,j)=>{
//			$('<td id="'+j.id+'"></td>)
//			.css({border: '2px solid black', width: j.width, 'vertical-align' : 'top'})
//			.appendTo('#tab tr')
//		})
//  	$.each(arr1,(i,j)=>{
//  			let left = ({border: '2px solid black', width:'20%', 'vertical-align' : 'top'})
//  			let right=({border: '2px solid black', width:'80%', 'vertical-align' : 'top'})
//  		j === "left" ? a= left : a= right
//  				.css(a)
//  				.append
  	
//   	$('#navi2delet').remove()
    	$.each([
    			{txt: '고객관리', name: 'cust_mgmt'},
    			{txt:'상품등록',name:'item_reg'},
    			{txt:'상품조회',name:'item_serch'},
    			{txt:'상품수정',name:'item_mod'},
    			{txt:'상품삭제',name:'item_del'},
    	],(i,j) =>{
    		$('<div name="'+j.name+'">'+j.txt+'</div>')
    		
    	})
    }
    
    return {onCreate}
    	
})();