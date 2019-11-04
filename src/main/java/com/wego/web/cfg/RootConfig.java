package com.wego.web.cfg;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@MapperScan(basePackages = {"com.wego.web"})
@ComponentScan(basePackages = {"com.wego.web"})
//@EnableAspectJAutoProxy
//@EnableTransactionManagement
public class RootConfig {
		@Bean
		public DataSource dataSource() {
			HikariConfig hikariConfig = new HikariConfig();
			hikariConfig.setDriverClassName("com.mysql.jdbc.Driver");
			hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3306/wego?serverTimezone=UTC");
			hikariConfig.setUsername("wego");
			hikariConfig.setPassword("wego");
			
			HikariDataSource dataSource =new HikariDataSource(hikariConfig);
			
			return dataSource;
		}
		@Bean
		public DataSourceTransactionManager txManager() {
			return new DataSourceTransactionManager(dataSource());
		}
	
	
}
