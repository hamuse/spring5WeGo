package com.wego.web.brd;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.log4j.Log4j;

import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;
import com.wego.web.cmm.IConsumer;
import com.wego.web.cmm.IFunction;
import com.wego.web.cmm.IPredicate;
import com.wego.web.cmm.ISupplier;
import com.wego.web.pxy.Proxy;
import com.wego.web.pxy.ProxyMap;
import com.wego.web.usr.User;
import com.wego.web.usr.UserCtrl;
import com.wego.web.usr.UserMapper;
import com.wego.web.utl.Printer;

@RestController
@RequestMapping("/articles")
@Log4j
public class ArticleCtrl {
	private static final Logger logger = LoggerFactory.getLogger(ArticleCtrl.class);
/*	@Autowired
	Map<String, Object> map;*/
	@Autowired
	Article art;
	@Autowired
	Printer printer;
	@Autowired
	ArticleMapper articleMapper;
	@Autowired
	List<Article> list;
	@Autowired Proxy pxy;
	@Autowired ProxyMap map;

	@PostMapping("/")
	public Map<?, ?> write(@RequestBody Article param) {
		printer.accept("write 들어옴" + param.toString());
		param.setBoardType("게시판");
		IConsumer<Article> c = s -> articleMapper.insertArticle(param);
		c.accept(param);
		ISupplier<String> t = () -> articleMapper.countArticle();
		map.accept(Arrays.asList("msg","count"), Arrays.asList("SUCCESS", t.get()));
		return map.get();
	}

	/*
	 * @GetMapping("/") public List<Article> list(){ list.clear();
	 * ISupplier<List<Article>> p = ()->articleMapper.selectAll();
	 * printer.accept("전체 글목록\n"+p.get());
	 * 
	 * return p.get(); }
	 */
	@GetMapping("/page/{pageNo}/size/{pageSize}")
	public Map<?, ?> list(@PathVariable String pageSize,@PathVariable String pageNo) {
		printer.accept("pageSize"+pageSize);
		pxy.setPageNum(pxy.parseInt(pageNo));
		pxy.setPageSize(pxy.parseInt(pageSize));
		pxy.paging();
		list.clear();
		ISupplier<List<Article>> p = () -> articleMapper.selectpagination(pxy);
		printer.accept("해당 페이지 글 목록\n" + p.get());
		int ran =pxy.random(10,100);
		printer.accept("랜던수 100~1000:" + ran);
		/*map.accept(Arrays.asList("articles","pages","pxy"), Arrays.asList(p.get(),Arrays.asList(1,2,3,4,5),pxy));*/
		map.accept(Arrays.asList("articles","pxy"), Arrays.asList(p.get(),pxy));
		return map.get();
	}

	@GetMapping("/count")
	public Map<?, ?> count() {
		logger.info("count : ");
		ISupplier<String> t = () -> articleMapper.countArticle();
		logger.info("count" + t.get());
		map.accept(Arrays.asList("count"), Arrays.asList(t.get()));
		return map.get();
	}

	@GetMapping("/{artseq}")
	public Article read(@PathVariable String artseq, @RequestBody Article param) {

		return null;
	}

	@PutMapping("/{artseq}")
	public Map<?, ?> updateArticle(@PathVariable String artseq, @RequestBody Article param) {
		logger.info("update 1: " + param.toString());
		param.setArtseq(artseq);
		param.setBoardType("게시판");
		IConsumer<Article> t = p -> articleMapper.updateArticle(param);
		t.accept(param);
		logger.info("update 2 : " + param.toString());
		map.accept(Arrays.asList("updateArticle"), Arrays.asList("SUCCESS"));
		return map.get();
	}

	@DeleteMapping("/{artseq}")
	public String removeArticle(@PathVariable String artseq) {
		IConsumer<String> t = s -> articleMapper.deleteArticle(artseq);
		t.accept(artseq);
		return "SUCCESS";
	}
}
