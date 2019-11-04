package com.wego.web.admin;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.wego.web.cmm.IConsumer;
import com.wego.web.cmm.IFunction;
import com.wego.web.cmm.IPredicate;
import com.wego.web.utl.Printer;
import lombok.extern.log4j.Log4j;
import java.util.Map;

@RestController
@RequestMapping("/admins")
@Log4j
public class AdminCtrl {
	private static final Logger logger = LoggerFactory.getLogger(AdminCtrl.class);
	@Autowired Admin admin;
	@Autowired Printer printer;
	@Autowired AdminMapper adminMapper;
//	@Autowired Map<String, Object> map;
	
	@PostMapping("/")
	public void joinAdminEid (@RequestBody Admin param) {
		
	}
	
	@PostMapping("/{eid}/access")
	public Map<?,?>  access(@PathVariable String eid,@RequestBody Admin param) {//로그인
		HashMap<String,Object> map = new HashMap<>();
		logger.info("admin ctrl access 들어옴:" +param.toString());
		IFunction<Admin, Admin> f = t -> adminMapper.selectAdminbyidpw(param);
		String yes = (f.apply(param) !=null) ? "SUCCESS" : "FAIL";
		map.clear();
		map.put("msg",  yes);
		return map;
	}
	
	@GetMapping("/{eid}")
	public Admin serchAdminByid(@PathVariable String eid,@RequestBody Admin param) {
	return param;	
	}
	
	@PutMapping("/{eid}")
	public void updateAdmin(@PathVariable String eid,@RequestBody Admin param) {
		
	}
	
	@DeleteMapping("/{eid}")
	public void deleteAdmin(@PathVariable String eid,@RequestBody Admin param) {
		
	}
	

}
