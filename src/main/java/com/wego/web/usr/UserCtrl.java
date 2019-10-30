package com.wego.web.usr;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.wego.web.cmm.IConsumer;
import com.wego.web.cmm.IFunction;
import com.wego.web.cmm.IPredicate;
import com.wego.web.utl.Printer;
import lombok.extern.log4j.Log4j;
import java.util.Map;
@RestController
@RequestMapping("/users")
@Log4j
public class UserCtrl {
	 private static final Logger logger = LoggerFactory.getLogger(UserCtrl.class);
	  @Autowired User user;
	  @Autowired Printer printer;
	  @Autowired UserMapper userMapper;
	  @Autowired Map<String, Object> map;
	  
	  @GetMapping("/{uid}/exist")
	  public Map<?,?> existId(@PathVariable String uid){
		  logger.info("exist : "+uid);
		  IFunction<String, Integer> p = o -> userMapper.existId(uid);
		  map.clear();
		  map.put("msg",(p.apply(uid) == 0) ? "SUCCESS" :"FAIL");
	       return map;
	  }
	  
	    @PostMapping("/")    //
	    public  Map<?,?> join(@RequestBody User param) {   
	    	printer.accept("join들어옴"+param.toString());
	    	
	    	 IConsumer<User>  c = o ->userMapper.insertUser(param);
	        c.accept(param);
	        map.clear();
	        map.put("msg","SUCCESS");
	       
	        return map;
	    }
	    
	    @PostMapping("/{uid}")
	    public  User login(@PathVariable String uid,@RequestBody User param){
	    	IFunction<User, User> f =  t -> userMapper.selectUserByIdPw(param);
				
	    	return  f.apply(param);
	    }
	    
	    @GetMapping("/{uid}")
	    public User serchUserById(@RequestBody User param) {
	    	IFunction<User,User> f = t -> userMapper.selectUserByIdPw(param);
	    	return f.apply(param);
	    }
	    
	    @PutMapping("/{uid}")
	    public String updateUser(@RequestBody User param) {
	    	IConsumer<User> c = o -> userMapper.insertUser(param);
	    	c.accept(param);
	    	return "SUCCESS";
	    }
	    
	    @DeleteMapping("/{uid}")
	    public String removeUser(@RequestBody User param) {
	    	IConsumer<User> c =o -> userMapper.insertUser(param);
	    	c.accept(param);
	    	return "SUCCESS";
	    }

}
