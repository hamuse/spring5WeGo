"use strict";
var auth = auth || {};
auth = (() => {
    const WHEN_ERR = '호출하는 JS를 찾을수 없습니다.'
    let context, js;
    let auth_vuejs;
    let brdjs, routerjs, cookiejs,adminjs;
    let init = () => {
        context = $.ctx()
        js = $.js()
        auth_vuejs = js + '/vue/auth_vue.js'
        brdjs = js + '/brd/brd.js'
        routerjs = js + '/cmm/router.js'
        cookiejs = js + '/cmm/cookie.js'
        adminjs = js +'/admin/admin.js'
    }
    let onCreate = () => {
        init();
        $.when(
            $.getScript(auth_vuejs),
            $.getScript(brdjs),
            $.getScript(cookiejs),
            $.getScript(routerjs),
            $.getScript(adminjs)
        ).done(() => {
            setContentView()
            $('#a_go_join').click(e => {
                e.preventDefault()
                $('head').html(auth_vue.join_head())
                $('body').html(auth_vue.join_body())
                $('#userid').keyup(() => {
                    if ($('#userid').val().length > 2) {
                        $.ajax({
                            url: context + '/users/' + $('#userid').val() + '/exist',
                            contentType: 'application/json',
                            success: d => { // sender, d가 자바에서 map, d.uid
                                // map의 키값
                                alert('AJAX 성공 아이디 : ' + d.msg)
                                if (d.msg === 'SUCCESS') {
                                    $('#dupl_check')
                                        .val('사용가능한 아이디입니다.')
                                        .css('color', 'blue')
                                } else {
                                    $('#dupl_check')
                                        .val('이미 사용가능한 id  입니다')
                                        .css('color', 'red')
                                    alert('회원가입 실패 ')
                                }
                            }
                        })
                        alert('키업')
                    }
                });
                $('<button>', {
                        text: '회원가입', // 값을 주면 세터가 됨.
                        href: '#',
                        click: e => {
                            e.preventDefault();
                            join()
                        }
                    })
                    .addClass('btn btn-primary btn-lg btn-block')
                    .appendTo('#join_btn')

            })
        }).fail(() => {
            alert(WHEN_ERR)
        })
    }
    let setContentView = () => {
        $('head')
            .html(auth_vue.login_head({
                css: $.css(),
                img: $.img()
            }))
        $('body')
            .html(auth_vue.login_body({
                css: $.css(),
                img: $.img()
            }))
            .addClass('text-center')
        $('#uid').val('aaa')
        $('#pwd').val('aaa')
        login()
        access()
    }
    let join = () => {
        let data = {
            uid: $('#userid').val(),
            pwd: $('#password').val(),
            uname: $('#uname').val()
        }
        alert('전송아이디 : ' + data.uid)
        $.ajax({
            url: context + '/users/',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: data => { // sender, d가 자바에서 map, d.uid map의
                // 키값
                alert('AJAX 성공 아이디 : ' + data.msg)
                if (data.msg === 'SUCCESS') {
                    $('head')
                        .html(auth_vue.login_head({
                            css: $.css(),
                            img: $.img()
                        }))
                    $('body')
                        .html(auth_vue.login_body({
                            css: $.css(),
                            img: $.img()
                        }))
                        .addClass('text-center')
                    login()
                } else {
                    alert('회원가입 실패 ')
                }
            },
            error: e => { // receiver,
                alert('AJAX 실패');
            }
        })
    }

    let login = () => {
        $('<button>', {
                text: "Sign in",
                click: e => {
                    e.preventDefault()
                    alert(context + '클릭성공')
                    $.ajax({
                        url: context + '/users/' + $('#uid').val(),
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify({
                            uid: $('#uid').val(),
                            pwd: $('#pwd').val()
                        }),
                        contentType: 'application/json',
                        success: d => {
                            setCookie("USERID", d.uid)
                            alert('로그인 세션부분:' + getCookie("USERID"))
                            brd.onCreate()
                        },
                        error: e => {
                            alert('에이작스 에러!!!!')
                        }
                    })
                }

            }).addClass('btn btn-primary btn-lg btn-block')
            .appendTo('#btn_login')
    }

    let existId = x => {
        /*		let data = { uid : $('#userid').val()}
        		alert('전송아이디 : '+ data.uid )
        			$.ajax({ 
        				url : _+'/users/'+x+'/exist',
        				type : 'GET',
        				contentType : 'application/json',
        				success : data => {    // sender, d가 자바에서 map, d.uid map의 키값
        					if(data.msg === 'SUCCESS'){
        						alert('existId AJAX 성공')
        						return true;
        					}else{
        						alert('existId AJAX 실패 ')
        						return false;
        					}
        				},
            			error : e => { // receiver,
            					alert('exist error AJAX 실패');
            			}        
        })*/
    }
    let access = () => {
        $('#a_go_admin').click(() => {
           /* let ok = confirm('사원입니까?')
            if (ok) {
                let eid = prompt('사원번호를 입력하시오')
                alert('입력한 사번 :' + eid)
                alert('_ 경로' + context)
                $.ajax({
                    url: context + '/admins/' + eid + '/access',
                    type: 'POST',
                    data: JSON.stringify({
                        eid: eid,
                        pwd: prompt('비밀번호를 입력하시오')
                    }),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: d => {
                    	 
                        if (d.msg === 'SUCCESS') {
                            admin.onCreate()
                            alert('로그인 되었습니다.')
                        } else {
                            alert('접근권한이 없습니다.')
                            app.run(context)
                        }
                    },
                    error: e => {
                        alert('ajax 실패')
                    }
                })
            }*/
        	 admin.onCreate()
        })
    }
    return {
        onCreate: onCreate,
        join,
        login
    }

})();