package com.wego.web.usr;


import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
@Lazy
public class User {
	private String uid,pwd,uname,birth,gender,tel,pettype;
	
	
}
