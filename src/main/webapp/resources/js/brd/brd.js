"use strict";
var brd = brd || {};
brd = (() => {
    const WHEN_ERR = '호출하는 js는 찾을수 없습니다.'
    let context, js;
    let brd_vuejs, uname, navijs, navi_vuejs;
    let init = () => {
        context = $.ctx()
        js = $.js()
        brd_vuejs = js + '/vue/brd_vue.js'
        navijs = js + '/cmm/navi.js'
        navi_vuejs = js + '/vue/navi_vue.js'
        alert('brd1' + context)
    }

    let onCreate = () => {
        init()
        alert('brd onCreate _ : ' + context)
        $.when(
            $.getScript(brd_vuejs),
            $.getScript(navi_vuejs)
        ).done(() => {
            setContentView()
            navi.onCreate()
        }).fail(() => {
            alert(WHEN_ERR)
        })
    }

    let setContentView = () => {
        $('head')
            .html(brd_vue.brd_head({
                css: $.css(),
                img: $.img()
            }))
        $('body').addClass('bg-light')
            .html(brd_vue.brd_body({
                css: $.css(),
                img: $.img()
            }))
        $(navi_vue.nav()).appendTo('#naviId')
        $('#recent_updates .media').remove()
        $('#recent_updates .d-block').remove()

        recent_updates()
    }

    let recent_updates = () => {
        alert('recent_updates 의 _:' + context)
        $('#recent_updates .media').remove()
        $('#writeid').remove()
        $('#recent_updates .d-block').remove()
        $.getJSON(context + '/articles/', d => {
            alert("recent_update 성공!! : " + context)
            $.each(d, (i, j) => {
                $('<div class="media text-muted pt-3">' +
                    '          <i class="fas fa-edit  fa-2x"></i>' +
                    '          <p id="id_' + i + '"class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">' +
                    '          </p></div>').appendTo('#recent_updates')
                $('<strong class="d-block text-gray-dark">@<a>' + j.uid + '</a></strong>')
                    .appendTo("#id_" + i)
                    .click(() => {
                        alert('아이디클릭 ')
                    })
                $('<a>' + j.title + '</a>')
                    .appendTo("#id_" + i)
                    .click(() => {
                        alert('제목클릭')
                        detail(j)

                    })
            })
        })
    }

    let write = () => {
        if (!context) {
            init();
        }
        alert('글쓰기로 이동 context : ' + context)
        $('#recent_updates').html(brd_vue.brd_write())
        $('#writeid').remove()
        $('#form_write input[name="writer"]').val(getCookie("USERID"))
        $('<input>', {
                style: 'float:right;width:100px;margin-right:10px',
                value: "취소"
            }).addClass('btn btn-danger')
            .appendTo('#form_write')
            .click(() => {
            	   $('#recent_updates div.container-fluid').remove()
            	   recent_updates()
            })
        $('<input>', {
                style: 'float:right;width:100px;margin-right:10px',
                value: "전송"
            }).addClass('btn btn-primary')
            .appendTo('#form_write')
            .click(e => {
                alert('글쓰기 얼럿' + context)
                e.preventDefault();
                alert('글 입력 완료')
                let json = {
                    uid: $('#form_write input[name="writer"]').val(),
                    title: $('#form_write input[name="title"]').val(),
                    content: $('#form_write textarea[name="content"]').val()
                }
                alert('글 쓰기 : id' + json.uid)
                alert('글 쓰기 제목: ' + json.title)
                alert('글 쓰기 내용: ' + json.content)
                alert('글쓰기 경로' + context + '/articles/')
                e.preventDefault();
                alert('전송!!')

                $.ajax({
                    url: context + '/articles/',
                    type: 'POST',
                    data: JSON.stringify(json),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: d => {
                        $('#recent_updates div.container-fluid').remove()
                        alert('brd write _ :' + context)
                        recent_updates()
                    },
                    error: e => {
                        alert('brd write ajax실패')
                    }
                })
            })
    }
    let detail = x => {
        alert('넘기는 seq 값 ' + x)
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
        $('<input>', {
                value: '수정',
                style: 'float:right;width:100px;margin-right:10px',
            }).addClass('btn btn-danger')
            .appendTo('#form_write')
            .click(e => {
                e.preventDefault();
                alert('수정!!')
                article_update(x)

            })
        $('<input>', {
                value: '삭제',
                style: 'float:right;width:100px;margin-right:10px',
            }).addClass('btn btn-primary')
            .appendTo('#form_write')
            .click(e => {
                e.preventDefault()
                article_delete(x)
            })
    }

    let article_update = x => {
        alert('update로 들어옴 ' + x.artseq)
        let json = {
            uid: $('#form_write input[name="writer"]').val(),
            title: $('#form_write input[name="title"]').val(),
            content: $('#form_write textarea[name="content"]').val()
        }
        $.ajax({
            url: context + '/articles/' + x.artseq,
            type: 'PUT',
            data: JSON.stringify(json),
            dataType: 'json',
            contentType: 'application/json',
            success: d => {
                alert('update ajax 성공')
                $('#recent_updates form_write').remove()
                recent_updates()
            },
            error: e => {
                alert('update ajax 실패')
            }
        })
    }
    let article_delete = x => {
        $.ajax({
            url: context + '/articles/' + x.artseq,
            type: 'DELETE',
            contentType: 'application/json',
            success: d => {
                alert('article_delete ajax삭제성공')
                $('#recent_updates div.container-fluid').remove()
                recent_updates()

            },
            error: e => {
                alert('article_delete ajax 삭제 실패')
            }

        })

    }

    return {
        onCreate,
        write
    };
})();