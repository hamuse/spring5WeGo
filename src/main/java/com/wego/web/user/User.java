package com.wego.web.user;


import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
public class User {
	private String uid,pwd,uname,birth,gender,tel,pettype;
	
	
}
