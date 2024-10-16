package com.example.cetrificationpoject.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtService {
    private static  String SECRET_KEY = "";
    public JwtService() throws NoSuchAlgorithmException {
        KeyGenerator key= KeyGenerator.getInstance("HmacSHA256");
        SecretKey sk= key.generateKey();
        SECRET_KEY= Base64.getEncoder().encodeToString(sk.getEncoded());

    }
    public String generateToken(String username)  {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+60*60*60))
                .signWith(getKey())
                .compact();


    }
    private Key getKey() {
        byte[] KeyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(KeyBytes);
    }

    public String extractUsername(String jwt)   {
        return Jwts.parser()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();
    }
public Date getExpirationToken(String jwt){
        return Jwts.parser()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getExpiration();
    }
    public boolean isTokenExpired(String token) {
        return getExpirationToken(token).before(new Date());
    }

    public boolean validateToken(String jwt, UserDetails userDetails) {
      String usernameToken=extractUsername(jwt);
        return (usernameToken.equals(userDetails.getUsername()) && !isTokenExpired(jwt));
    }
}
