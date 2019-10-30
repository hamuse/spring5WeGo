"use strict";
function Session(x){
	sessionStorage.setItem('ctx',x);
	sessionStorage.setItem('js',x+'/resources/js');
	sessionStorage.setItem('css',x+'/resources/css');
	sessionStorage.setItem('img',x+'/resources/img');
	return{
		ctx : () =>{return sessionStorage.getItem('ctx');},
		js: ()=>{return sessionStorage.getItem('js');},
		css: ()=>{return sessionStorage.getItem('css');},
		img: ()=>{return sessionStorage.getItem('img');}
	}
}
//function User(s){
//	sessionStorage.setItem('uname', s.uname);
//	sessionStorage.setItem('uid', s.uid);
//	sessionStorage.setItem('pwd', s.pwd);
//	return{
//		uname : () =>{return sessionStorage.getItem('uname');},
//		uid : () =>{return sessionStorage.getItem('uid');},
//		pwd : () =>{return sessionStorage.getItem('pwd');}
//	}
//}