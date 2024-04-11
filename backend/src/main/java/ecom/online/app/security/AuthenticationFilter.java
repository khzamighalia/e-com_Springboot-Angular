package ecom.online.app.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import ecom.online.app.SpringApplicationContext;
import ecom.online.app.requests.UserLoginRequest;
import ecom.online.app.services.UserService;
import ecom.online.app.shared.dto.UserDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


	public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
		

		private final AuthenticationManager authenticationManager;

		public AuthenticationFilter(AuthenticationManager authenticationManager) {
			this.authenticationManager = authenticationManager;
		}

		@Override
		public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
				throws AuthenticationException {
			try {

				UserLoginRequest creds = new ObjectMapper().readValue(req.getInputStream(), UserLoginRequest.class);

				return authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPassword(), new ArrayList<>()));

			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		
		
	@Override
    protected void successfulAuthentication(HttpServletRequest req,
                                         HttpServletResponse res,
                                         FilterChain chain,
                                         Authentication auth) throws IOException, ServletException {

    String userName = ((User) auth.getPrincipal()).getUsername(); 

    UserService userService = (UserService) SpringApplicationContext.getBean("userServiceImpl");
    
    UserDto userDto = userService.getUser(userName);
    
    
    // Generate JWT token
    String token = Jwts.builder()
            .setSubject(userName)
            .claim("id", userDto.getId())
			.claim("UserId", userDto.getUserId())
            .claim("name", userDto.getFirstName() + " " + userDto.getLastName())
            .claim("role", userDto.getRole()) // Include user's role
            .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
            .signWith(SignatureAlgorithm.HS512, SecurityConstants.TOKEN_SECRET)
            .compact();
    

    // Set response headers
    res.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
    res.addHeader("user_id", userDto.getUserId());

    // Write JSON response to the response body
	// res.getWriter().write("{\"token\": \"" + token + "\", \"UserId\": \"" + userDto.getUserId() + "\", \\\"id\\\": \\\"\" + userDto.getId() + \"\\\", \"role\": \"" + userDto.getRole() + "\"}");
	res.getWriter().write("{\"token\": \"" + token + "\", \"UserId\": \"" + userDto.getUserId() + "\", \"id\": \"" + userDto.getId() + "\", \"role\": \"" + userDto.getRole() + "\"}");


}

	}