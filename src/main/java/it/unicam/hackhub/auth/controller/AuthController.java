package it.unicam.hackhub.auth.controller;

import it.unicam.hackhub.model.User;
import it.unicam.hackhub.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

   
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterPayload payload) {

        User user = authService.register(
                payload.getId(),
                payload.getUsername(),
                payload.getName(),
                payload.getSurname(),
                payload.getEmail(),
                payload.getPassword()
        );

        return ResponseEntity.ok(
                "Registrazione completata: " + user.getUsername()
        );
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginPayload payload) {
        String token = authService.login(payload.getUsername(), payload.getPassword());
        return ResponseEntity.ok(Map.of("token", token));
    }

   
    public static class RegisterPayload {
        private String id;

        @NotBlank(message = "Lo username è obbligatorio")
        private String username;

        @NotBlank(message = "Il nome è obbligatorio")
        private String name;

        @NotBlank(message = "Il cognome è obbligatorio")
        private String surname;

        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Inserisci un indirizzo email valido")
        private String email;

        @NotBlank(message = "La password è obbligatoria")
        @Size(min = 8, message = "La password deve contenere almeno 8 caratteri")
        private String password;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSurname() { return surname; }
        public void setSurname(String surname) { this.surname = surname; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    
    public static class LoginPayload {
        @NotBlank(message = "Lo username è obbligatorio")
        private String username;

        @NotBlank(message = "La password è obbligatoria")
        private String password;


        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}