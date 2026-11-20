package it.unicam.hackhub;

import it.unicam.hackhub.model.*;
import it.unicam.hackhub.repository.*;
import it.unicam.hackhub.service.*;
import it.unicam.hackhub.state.InValutazioneState;
import it.unicam.hackhub.state.ConclusoState;
import it.unicam.hackhub.state.InCorsoState;
import it.unicam.hackhub.state.InIscrizioneState;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import it.unicam.hackhub.config.SecurityConfig;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
@Import(SecurityConfig.class)
public class HackhubApplication {

    public static void main(String[] args) {
        SpringApplication.run(HackhubApplication.class, args);
    }


    @Bean
    CommandLineRunner initDatabase(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            if (userRepository.count() == 0) {

                String hashedPassword = passwordEncoder.encode("password123");

                List<User> mockUsers = List.of(
                        new User("user-1", "Mario", "Rossi", "mario.rossi", "mario.rossi@unicam.it", hashedPassword, "IT01X99999999"),
                        new User("user-2", "Giulia", "Bianchi", "giulia_b", "giulia.bianchi@unicam.it", hashedPassword, "IT02X88888888"),
                        new User("user-3", "Luca", "Verdi", "lucaverdi", "luca.verdi@unicam.it", hashedPassword, ""),
                        new User("user-4", "Elena", "Neri", "elena_n", "elena.neri@unicam.it", hashedPassword, "IT04X77777777"),
                        new User("user-5", "Alessandro", "Gialli", "alex_gialli", "alessandro.gialli@unicam.it", hashedPassword, ""),
                        new User("user-6", "Francesca", "Romano", "fra_romano", "francesca.romano@unicam.it", hashedPassword, "IT06X66666666"),
                        new User("user-7", "Davide", "Conti", "d.conti", "davide.conti@unicam.it", hashedPassword, ""),
                        new User("user-8", "Sara", "Costa", "saracosta", "sara.costa@unicam.it", hashedPassword, "IT08X55555555"),
                        new User("user-9", "Matteo", "Moretti", "matteo_m", "matteo.moretti@unicam.it", hashedPassword, ""),
                        new User("user-10", "Chiara", "Ferrari", "chiara_f", "chiara.ferrari@unicam.it", hashedPassword, "IT10X44444444"),
                        new User("user-11", "francesco", "Ferrari", "fra", "francescoferrari@unicam.it", hashedPassword, "IT10X4452525444444"),
                        new User("user-12", "giovanni", "Ferrari", "giova", "giovanniferrari@unicam.it", hashedPassword, "IT10X445252444444"),
                        new User("user-13", "maria", "Ferrari", "mar", "mariaferrari@unicam.it", hashedPassword, "IT10X444444525244"),
                        new User("user-14", "laura", "Ferrari", "c", "lauraferrari@unicam.it", hashedPassword, "IT10X4444254254444"),
                        new User("user-15", "giuseppe", "Ferrari", "giuse", "giuseppeferrari@unicam.it", hashedPassword, "IT10X4444415144")
                );

                userRepository.saveAll(mockUsers);
                System.out.println(">>> 15 utenti mock inseriti con successo!");
            }
        };
    }


    @Bean
    CommandLineRunner initHackathons(HackathonRepository hackathonRepository) {
        return args -> {
            if (hackathonRepository.count() == 0) {
                // 1. Hackathon in stato InIscrizioneState (Default)
                Hackathon hack1 = new BuilderHackathon()
                        .setId("hack-1")
                        .setName("AI Code Hackathon")
                        .setSpecifications("Sviluppo di soluzioni basate su Intelligenza Artificiale.")
                        .build();

                // 2. Hackathon in stato InCorsoState
                Hackathon hack2 = new BuilderHackathon()
                        .setId("hack-2")
                        .setName("Green Tech Challenge")
                        .setSpecifications("Progetti per la sostenibilità ambientale.")
                        .build();
                hack2.setState(new InCorsoState());

                // 3. Hackathon in stato InValutazioneState
                Hackathon hack3 = new BuilderHackathon()
                        .setId("hack-3")
                        .setName("FinTech Revolution")
                        .setSpecifications("Innovazione nel settore finanziario e bancario.")
                        .build();
                hack3.setState(new InValutazioneState());

                // 4. Hackathon in stato ConclusoState
                Hackathon hack4 = new BuilderHackathon()
                        .setId("hack-4")
                        .setName("Cybersecurity Defense")
                        .setSpecifications("Soluzioni avanzate di sicurezza informatica.")
                        .build();
                hack4.setState(new ConclusoState());

                hackathonRepository.saveAll(List.of(hack1, hack2, hack3, hack4));
                System.out.println(">>> 4 hackathon mock inseriti con successo (ciascuno in uno stato differente)!");
            }
        };

    }
}
