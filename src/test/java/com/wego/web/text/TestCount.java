package com.wego.web.text;

import java.util.Scanner;

public class TestCount {

	public static void main(String[] args) {
		Scanner scn = new Scanner(System.in);
		int totalCount = scn.nextInt();
	int count = 0;
	int endRow = 0;
		int pageSize = 5;
		int startRow = 0;
		int pageNum =0;
		if(totalCount % pageSize !=0 ) {
			pageNum =(totalCount /pageSize)+1;
		}else {
			pageNum =	totalCount / pageSize;
		}
	if(totalCount % pageSize !=0){
		endRow = (pageNum*pageSize)-1 ;
	}else {
		endRow = totalCount/pageSize + totalCount%pageSize;
	}
	
		
       System.out.println(endRow);
	}

}
