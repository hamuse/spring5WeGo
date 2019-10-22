package com.wego.web.user;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.wego.web.utl.Printer;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/users")
@Log4j
public class UserCtrl {
	 private static final Logger logger = LoggerFactory.getLogger(UserCtrl.class);
	  @Autowired Map<String, Object>map;
	  @Autowired User user;
	  @Autowired Printer printer;
	  
	    @PostMapping("/")    //
	    public  Map<?,?> join(@RequestBody User param) {   
	    	logger.info("aaaa");
	    	printer.accept("람다 프린트가 출력한 값"+ param.getUid()+","+param.getPwd());
	        HashMap<String, Object> map = new HashMap<>();
	        logger.info("AJAX가 보낸 아이디와 비번 {} ", param.getUid() + ", " + param.getPwd());
	        map.put("uid", param.getUid());
	        map.put("pwd", param.getPwd());
	        logger.info("map에 담긴 아이디와 비번 {} ", map.get("uid") + ", " + map.get("pwd"));
	        return map;
	    }
	    
	    @PostMapping("/login")
	    public  User login(@RequestBody User param){
	    	System.out.println("로그인 컨트롤러");
	    	logger.info("login 성공 서블user Controller");
	    user.setUid(param.getUid());
	    user.setPwd(param.getPwd());
	      logger.info("AJAX가 보낸 로그인 아이디와 비번{}",param.toString());
	      
	    	return param;
	    }

}
