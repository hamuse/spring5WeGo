"use strict";
var study = study || {};
study = (()=>{
	const WHEN_ERR = 'study js를 호출할 수 없습니다 .'
	let init =()=>{}
	let onCreate=()=>{
		init()
		$.when(
				$.getScript()
		).done(()=>{
			setContentView()
		}).fail(()=>{
			alert(WHEN_ERR)
		})
		
	}
	let setContentView=()=>{
		
		$.ajax({
			url : '',
			type : '',
			data : {},
			dataType:'',
			contentType:'',
			success: d =>{},
			error: e =>{}
		})
	}
	return{onCreate}
})()