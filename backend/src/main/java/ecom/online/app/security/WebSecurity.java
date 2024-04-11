// package ecom.online.app.security;

// import org.springframework.http.HttpMethod; 
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// import ecom.online.app.services.UserService;


// 	@EnableWebSecurity
// 	public class WebSecurity extends WebSecurityConfigurerAdapter {
		
// 		  private final UserService userDetailsService;
// 		  private final BCryptPasswordEncoder bCryptPasswordEncoder;
		  
// 		  public WebSecurity(UserService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
// 		        this.userDetailsService = userDetailsService;
// 		        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
// 		    }

// 		@Override
// 		protected void configure(HttpSecurity http) throws Exception {
			

// 			http
// 			    .cors().and()
// 			    .csrf().disable()
// 				.authorizeRequests()
// 				.antMatchers(HttpMethod.POST, SecurityConstants.SIGN_UP_URL)
// 				.permitAll()
// 				.anyRequest().authenticated()
// 				.and()
// 				.addFilter(getAuthenticationFilter())
// 				.addFilter(new AuthorizationFilter(authenticationManager()))
// 				.sessionManagement()
// 			    .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
// 		}
		
		
// 		// Personnaliser l'url de l'authentification
// 		protected AuthenticationFilter getAuthenticationFilter() throws Exception {
// 		    final AuthenticationFilter filter = new AuthenticationFilter(authenticationManager());
// 		    filter.setFilterProcessesUrl("/users/login");
// 		    return filter;
// 		}
		
		
// 		@Override
// 		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
// 		    auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
// 		}
// }
package ecom.online.app.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod; 
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import ecom.online.app.services.UserService;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    
    private final UserService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    
    public WebSecurity(UserService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

        
        @Override
        // 
        // protected void configure(HttpSecurity http) throws Exception {
        //     http
        //         .cors().and()
        //         .csrf().disable()
        //         .authorizeRequests()
        //         .antMatchers(HttpMethod.POST, "/users/register").permitAll() // Allow registration for all
        //         .antMatchers(HttpMethod.GET, "/products").permitAll() // Allow GET requests to products for all
        //         .antMatchers(HttpMethod.POST, "/products").hasRole("ADMIN") // Allow POST requests to products only for users with ADMIN authority
        //         .antMatchers(SecurityConstants.SIGN_UP_URL).permitAll() // Allow signup URL for all
        //         .anyRequest().authenticated()
        //         .and()
        //         .addFilter(getAuthenticationFilter())
        //         .addFilter(new AuthorizationFilter(authenticationManager()))
        //         .sessionManagement()
        //             .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // }
        protected void configure(HttpSecurity http) throws Exception {
            http
                .cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/users/register").permitAll() // Allow registration for all
                .antMatchers(HttpMethod.GET, "/products").permitAll() // Allow GET requests to products for all
                .antMatchers(HttpMethod.GET, "/products/*").permitAll() // Allow GET requests to products for all
                .antMatchers(HttpMethod.POST, "/products").permitAll() // Allow POST requests to products for all
                .antMatchers(HttpMethod.PUT, "/products/*").permitAll() // Allow POST requests to products for all
                .antMatchers(HttpMethod.DELETE, "/products/*").permitAll() // Allow DELETE requests to products for all
                .antMatchers(SecurityConstants.SIGN_UP_URL).permitAll() // Allow signup URL for all
                // .anyRequest().authenticated() 
            .and()
                .addFilter(getAuthenticationFilter())
                .addFilter(new AuthorizationFilter(authenticationManager()))
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        }
        
        
    
    // Customize the authentication filter URL
    protected AuthenticationFilter getAuthenticationFilter() throws Exception {
        final AuthenticationFilter filter = new AuthenticationFilter(authenticationManager());
        filter.setFilterProcessesUrl("/users/login");
        return filter;
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    // CORS configuration
    // @Bean
    // public CorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();
    //     configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    //     configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", configuration);
    //     return source;
    // }
// 	@Bean
// public CorsFilter corsFilter() {
//     CorsConfiguration corsConfiguration = new CorsConfiguration();
//     corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
//     corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
//     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     source.registerCorsConfiguration("/**", corsConfiguration);
//     return new CorsFilter(source);
// }
@Bean
public CorsFilter corsFilter() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    corsConfiguration.addAllowedHeader("*"); // Allow all headers
    corsConfiguration.setAllowCredentials(true); // Allow credentials
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);
    return new CorsFilter(source);
}
}
