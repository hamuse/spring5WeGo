package com.wego.web.admin;


import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
public class Admin  {

	private String eid,pwd,aname,addr,tel,pos,dep,privilege;

}