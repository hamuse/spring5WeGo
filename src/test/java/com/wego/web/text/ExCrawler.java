package com.wego.web.text;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import javax.print.DocFlavor.URL;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class ExCrawler {
	//cleaarfix
	public static void main(String[] args) {
		try{
			Document rawData = Jsoup.connect("https://www.goodchoice.kr/product/search/1/102").timeout(10*1000).get();
			Elements cleaarfix = rawData.select("div[class=price] p");
			Elements txt = rawData.select("section[class=_2YIQKY]");
			List<String> cleaarfix2 = new ArrayList<>();
			List<String> txt2 = new ArrayList<>();
			for(Element e : cleaarfix ) {
				cleaarfix2.add(e.text());
			}
			for(Element e : txt ) {
				txt2.add(e.text());
			}
			System.out.println(txt2);
			System.out.println("_______________________");
			System.out.println(cleaarfix2);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
}
