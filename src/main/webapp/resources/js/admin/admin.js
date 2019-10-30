"use strict";
var admin = admin || {};
admin = (()=>{
	const WHEN_ERR = '호출하는 js가 없습니다.';
	let _, js;
	let init =()=>{
		_= $.ctx()
		js = $.js()
	}
	let onCreate=()=>{
		init()
		setContentView()
	}
	let setContentView=()=>{}
	return {}
})();