package com.example.group.controller;

import com.example.group.model.User;
import com.example.group.payload.JwtResponse;
import com.example.group.payload.SignUpRequest;
import com.example.group.exception.AppException;
import com.example.group.model.Role;
import com.example.group.model.RoleName;
import com.example.group.payload.ApiResponse;
import com.example.group.payload.LoginRequest;
import com.example.group.dao.RoleRepository;
import com.example.group.dao.UserRepository;
import com.example.group.security.JwtTokenProvider;
import com.example.group.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getRole(),
                roles));
       /* String jwts = "Bearer "+jwt;

        //return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));

       HttpHeaders h = new HttpHeaders();
       h.set("Authorization",jwts);

       return ResponseEntity.ok().headers(h).body("Login Successful!");*/
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        // Creating user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword(),
                signUpRequest.getRole());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER) // hard code, by default everyone is a user
                .orElseThrow(() -> new AppException("User Role not set."));
        user.setRoles(Collections.singleton(userRole)); //
        User result = userRepository.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri(); // why we create uri after the user is saved in the backend
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
