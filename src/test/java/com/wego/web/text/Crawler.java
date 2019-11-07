package com.wego.web.text;

import java.io.IOException;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class Crawler {
    public static void main(String[] args) {
    	String url = "http://www.pensionnara.co.kr/inc_blog/nblog.php?mini_no=13227";
    	try {
			Connection.Response response = Jsoup.connect(url)
																				.method(Connection.Method.GET)
																				.execute();
			Document document = response.parse();
//			String text = document.html();
			String text = document.text();
			System.out.println(text);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
    	
    	
    }
}
