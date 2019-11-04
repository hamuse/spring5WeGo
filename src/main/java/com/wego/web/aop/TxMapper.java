package com.wego.web.aop;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface TxMapper {

	public   List<?> readUrl(Map<?,?> paramMap);
}
