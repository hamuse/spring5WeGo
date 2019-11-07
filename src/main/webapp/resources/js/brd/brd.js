"use strict";
var brd = brd || {};
brd =(()=>{
	const WHEN_ERR='호출하는 js는 찾을수 없습니다.'
	let context,js;
	let brd_vuejs, uname, $uid, navijs, navi_vuejs , page_vuejs,compo_vuejs;
	let init = ()=> {
		context= $.ctx()
		js = $.js()
		brd_vuejs = js+'/vue/brd_vue.js'
		navijs = js+'/cmm/navi.js'
		navi_vuejs= js+'/vue/navi_vue.js'
		page_vuejs = js+'/vue/page_vue.js'
		compo_vuejs=js+'/vue/compo_vue.js'
		
	
	}
	let onCreate = ()=>{
		init()
		$.when(
				$.getScript(brd_vuejs),
				$.getScript(navi_vuejs),
				$.getScript(page_vuejs),
				$.getScript(compo_vuejs)
		).done(()=>{
			setContentView()
			 navi.onCreate()
		}).fail(()=>{
			alert(WHEN_ERR)
		})
	}
	let setContentView=()=>{
		$('head')
		.html(brd_vue.brd_head({css:$.css(), img: $.img()}))
		$('body').addClass('text-center')
		.html(brd_vue.brd_body({css:$.css(), img:$.img()}))
		$(navi_vue.navi()).appendTo('#naviId')
		 $('#recent_updates .media').remove()
		 $('#recent_updates .d-block').remove()
		 recent_updates({page: '1' , size: '5'})
		
		
		
	}
// ' <a class="nav-link" href="#">글쓰기 <span
// class="sr-only">(current)</span></a>'+
	let recent_updates= x =>{
		alert('호출된 페이지 번호:'+x.page)
		 $('#recent_updates .media').remove()
		 $('#writeid').remove()
		 $('#recent_updates .d-block').remove()
		 $('#recent_updates .container').remove()
		 $('#paging_form').remove()
		 $.getJSON( context+'/articles/page/'+x.page+'/size/'+x.size, d =>{
			 let pxy = d.pxy
			 alert('recent_updates의 d 갯수'+Object.keys(d).length)
			 alert("성공!!")
					$.each(d.articles, (i,j)=>{
						$('<div class="media text-muted pt-3">'+
					'          <i class="fas fa-edit  fa-2x"></i>'+
					'          <p id="id_'+i+'"class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'+
					'          </p></div>').appendTo('#recent_updates')
						$('<strong class="d-block text-gray-dark">@<a>'+j.uid+'</a></strong>')
							.appendTo("#id_"+i)
							.click(()=>{
								alert('아이디클릭 ')
						})
						$('<a>'+j.title+'</a>')
							.appendTo("#id_"+i)
							.click(()=>{
								alert('제목클릭')
								detail(j)
					})
				})
				 $(page_vue.page())
				 .appendTo('#recent_updates')
				 $('#pagination').empty()
				 
				 if(pxy.existPrev){
					   $('<li class="page-item"><a class="page-link" href="#">이전</a></li>')
						 .appendTo('#pagination')
						 	 .click(e=>{
						 		  e.preventDefault()        
							 recent_updates({page: pxy.prevBlock ,size: pxy.pageSize})
						 })
				 }
						 let i = 0;
						    for(i = pxy.startPage; i <= pxy.endPage ; i++) {
						    	if(pxy.pageNum == i){
						    		$('<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>')
									 .appendTo('#pagination')
									 .addClass('active')
						    	}else{
						    	$('<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>')
								 .appendTo('#pagination')
								 .click(function(){
									 alert('페이지 번호 >>>' + $(this).children('.page-link').text())
									 recent_updates({page: $(this).children('.page-link').text() , size: pxy.pageSize})
								 })
						    	}		 
						    }
				 
				 if(pxy.existNext){
					  $('<li class="page-item"><a class="page-link" href="#">다음</a></li>')
						 .appendTo('#pagination')
						 .click(e=>{
							  e.preventDefault()        
							 recent_updates({page: pxy.nextBlock ,size:pxy.pageSize })
						 })
				 }
				 $(compo_vue.pageSize())
				 .appendTo('#pageSize')
				 $('#listSizeSelectDiv ui[class="select_list"').empty()
				 $('<form id="paging_form" action="">'+
			               '  <select name="site" size="1" >'+    //    multiple
			               '  </select>'+
			               '</form>')
			           .appendTo('#recent_updates')
			           $.each([{sub:'5',val:'5'}, {sub:'10',val:'10'}, {sub:'15',val:'15'}], (i, j)=>{
			               $('<option value="'+ j.val +'">'+ j.sub +'개 보기</option>')
			               .appendTo('#paging_form select')
			           })
				 
			           $('#paging_form option[value="'+pxy.pageSize+'"]').attr('selected','true')
			           $('#paging_form').change(()=>{
			        	   alert('선택한 보기:'+$('#paging_form option:selected').text())
			        	   recent_updates({page: '1' , size: $('#paging_form option:selected').val()})
			           })
		 })
	}
	let write=()=>{
		if (!context) {
            init();
        }
		alert('글쓰기로 이동')
		$('#recent_updates').html(brd_vue.brd_write())
    	$('#writeid').remove()
    	$('#form_write input[name="writer"]').val(getCookie("USERID"))
    	$('<input>',{
    		style:'float:right;width:100px;margin-right:10px',
    		value: "취소"
    	}).addClass('btn btn-danger')
    	.appendTo('#form_write')
    	.click(()=>{
			
		})
    	$('<input>',{
    		style:'float:right;width:100px;margin-right:10px',
    		value: "전송"
    	}).addClass('btn btn-primary')
    	.appendTo('#form_write')
    	.click(e=>{
    		alert('글쓰기 얼럿'+context)
    		e.preventDefault();
    		alert('글 입력 완료')
    		let json = {
   				uid : $('#form_write input[name="writer"]').val(),
  				title : $('#form_write input[name="title"]').val(),
    			content : $('#form_write textarea[name="content"]').val()
    		}
    		alert('글 쓰기 : id'+json.uid)
    		alert('글 쓰기 제목: '+json.title)
    		alert('글 쓰기 내용: '+json.content)
    		alert('글쓰기 경로'+context+'/articles/')
			e.preventDefault();
			alert('전송!!')
			
			$.ajax({
				url: context+'/articles/',
				type: 'POST',
				data: JSON.stringify(json),
				dataType: 'json',
				contentType:'application/json',
				success : d =>{
					$('#recent_updates div.container-fluid').remove()
					alert('brd write _ :'+context)
					recent_updates({page: '1' , size: '5'})
				},
				error: e =>{
					alert('brd write ajax실패')
				}
			})
		})
	}
	let detail = x =>{
		alert('넘기는 seq 값 '+x)
		$('#recent_updates').html(brd_vue.brd_write())
		$('#recent_updates div.container-fluid h1').html('ARTICLE WRITING')
		$('#form_write input[name="writer"]').val(x.uid)
		$('#form_write input[name="title"]').val(x.title)
		$('#form_write textarea[name="content"]').val(x.content)
    	$('#writeid').remove()
    	
    	
    	/*
		 * <input type="reset" class="btn btn-danger"
		 * style="float:right;width:100px;margin-right:10px" value="CANCEL"/>' +'<input
		 * name="write" type="submit" class="btn btn-primary"
		 * style="float:right;width:100px;margin-right:10px" value="SUBMIT"/>
		 */	
    	$('<input>',{
    		value: '수정',
    		style:'float:right;width:100px;margin-right:10px',
    	}).addClass('btn btn-danger')
    	.appendTo('#form_write')
    	.click(e=>{
			e.preventDefault();
			alert('수정!!')
			article_update(x)
			
		})
    	$('<input>',{
    		value: '삭제',
    		style:'float:right;width:100px;margin-right:10px',
    	}).addClass('btn btn-primary')
    	.appendTo('#form_write')
    	.click(e=>{
    		e.preventDefault()
    		article_delete(x)
    	})
	}
	
	let article_update =x=>{
				alert('update로 들어옴 '+x.artseq)
				let json={
				uid:$('#form_write input[name="writer"]').val(),
  				title:$('#form_write input[name="title"]').val(),
    			content:$('#form_write textarea[name="content"]').val()
		}
		$.ajax({
			url: context+'/articles/'+x.artseq,
			type:'PUT',
			data:JSON.stringify(json),
			dataType:'json',
			contentType:'application/json',
			success: d =>{
				alert('update ajax 성공')
				$('#recent_updates div.container-fluid').remove()
				recent_updates()
			},
			error: e =>{
				alert('update ajax 실패')
			}
			
		})
    	
	}
	let article_delete = x=>{
		$.ajax({
			url:context+'/articles/'+x.artseq,
			type:'DELETE',
			contentType:'application/json',
			success: d =>{
				alert('article_delete ajax삭제성공')
				$('#recent_updates div.container-fluid').remove()
				recent_updates()
			},
			error: e =>{
				alert('article_delete ajax 삭제 실패')
			}
		})
	}
	
	return{onCreate,write};
})();