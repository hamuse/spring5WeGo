package com.wego.web.pxy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.wego.web.brd.ArticleMapper;
import com.wego.web.cmm.ISupplier;
import com.wego.web.utl.Printer;

import lombok.Data;

@Component @Data @Lazy
public class Proxy {
	private int totalCount, pageCount,
						pageNum , pageSize, 
						startRow,endRow ,startPage
						, endPage,nextBlock,prevBlock,
						blockCount,blockNum;
	private boolean existPrev, existNext;
	private String search;
	private final int BLOCK_SIZE = 5;
	private List<Integer> pages;
	@Autowired Printer p;
	@Autowired ArticleMapper articleMapper;
	
	public  void paging() {
		ISupplier<String> s = () ->articleMapper.countArticle();
		 totalCount =	 Integer.parseInt(s.get());
		 pageCount = (totalCount % pageSize !=0)?(totalCount /pageSize)+1 : totalCount / pageSize;
	     startRow = (pageNum < 1)? 0 : (pageNum-1)*pageSize;
	    endRow = 0;
	 //pageNum index 은 페이지 숫자 
	//pageCount 는 페이지 갯수 
	 //blockCount 는 block의 총 갯수 ? 
	    //blockNUM 은 
	    //size  는 한 페이지 에서 길이? 몇개냐 
	    //block 은 page로 구성되어있다? 
	    //page 는 row 로 되어있고 ? 
	    
	    
	 /*   if(pageNum ==pageCount ) {
	    	endRow = totalCount -1;
	    }else {
	    	endRow =startRow+pageSize-1;
	    }*/
	    endRow =(pageNum ==pageCount)?totalCount -1:startRow+pageSize-1;
	     blockCount = 0;  //
	    startPage = 0;
	    endPage = 0;
	    blockNum = 0;
	    blockCount = (pageCount % BLOCK_SIZE !=0)?(pageCount/BLOCK_SIZE)+1 : pageCount / BLOCK_SIZE;
	    /*(totalCount % pageSize !=0)?(totalCount /pageSize)+1 : totalCount / pageSize;*/
	    blockNum = (pageNum-1)/BLOCK_SIZE;
	    startPage = blockNum *BLOCK_SIZE +1;
//	    endPage = (blockCount-1 ==blockNum )? : ; 
	    endPage= (blockCount-1 == blockNum ) ? pageCount: startPage+(BLOCK_SIZE-1);
	   /* boolean existPrev = false;
	    existPrev =  (pageNum == pageCount) ? true : false ;
	    boolean existNext = false;
	    existNext = (pageNum == startPage && pageNum==1) ? true :  false; */
//	    boolean existPrev = (blockNum !=0) ? true : false ;
         existPrev = (blockNum !=0)  ;
	   /* boolean existNext = (blockNum < blockCount-1)? true : false;*/
	     existNext = (blockNum < blockCount-1);
	     pages = new ArrayList<>();
	     for(int i = startPage; i <= endPage ; i++) {
			  pages.add(i);
		  }
     nextBlock = startPage + pageSize ; 
     prevBlock = startPage - pageSize;
	}//blockNum은 인덱스 숫자 
		//blockCount 는 갯수 
	
	public int parseInt(String param) {
		Function<String, Integer> f = s -> Integer.parseInt(s);
		return f. apply(param);
	}
	public List<?> crawl(Map<?,?> paramMap){
		String url = "https://"+paramMap.get("site")+"/";
		List<String> proxylist = new ArrayList<>();
		proxylist.clear();
    	try {
			Connection.Response response = Jsoup.connect(url)
																				.method(Connection.Method.GET)
																				.execute();
			Document document = response.parse();
			String text = document.html();
//			String text = document.text();
			p.accept("크롤링한 텍스트 \n"+text);
			proxylist.add(text);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return proxylist; 
	}
	public int random(int x,int y) {
		BiFunction<Integer, Integer, Integer> s = (t,u)->(int)(Math.random()*(u-t))+t;
		return s.apply(x,y);
	}
	
}
