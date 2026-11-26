package it.unicam.hackhub.controller;

import it.unicam.hackhub.model.Team;
import it.unicam.hackhub.model.User;
import it.unicam.hackhub.repository.UserRepository;
import it.unicam.hackhub.service.TeamService;
import it.unicam.hackhub.service.HackathonService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.util.NoSuchElementException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teams")
public class TeamController {
    
    private final TeamService teamService;
    private final HackathonService hackathonService;
    private final UserRepository userRepository;

    public TeamController(TeamService teamService, HackathonService hackathonService, UserRepository userRepository) {
        this.teamService = teamService;
        this.hackathonService = hackathonService;
        this.userRepository = userRepository;
    }


    @PostMapping
    public ResponseEntity<?> creaTeam(
            @RequestBody TeamCreationRequest request,
            @AuthenticationPrincipal String userId) {
        try {
            User creatore = userRepository.findById(userId)
                    .orElseThrow(() -> new NoSuchElementException("Utente non trovato"));

            Team nuovoTeam = teamService.createTeam(
                    request.getId(),
                    request.getName(),
                    creatore
            );

            return ResponseEntity.ok(nuovoTeam);

        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    
    @DeleteMapping("/{teamId}/hackathons/{hackathonId}")
    public ResponseEntity<String> abbandonaHackathon(
            @PathVariable String teamId,
            @PathVariable String hackathonId,
            @RequestParam String leaderId) {
        try {
            Team team = teamService.getById(teamId);

            if (team.getLeader() == null || !team.getLeader().getUser().getId().equals(leaderId)) {
                return ResponseEntity.badRequest().body("ISCRIZIONE [ERRORE]: Solo il leader puÃ² disiscrivere il team!");
            }

            hackathonService.removeTeamFromHackathon(hackathonId, team.getId());
            return ResponseEntity.ok("SYSTEM: Team rimosso dall'hackathon");
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("ISCRIZIONE [ERRORE]: " + e.getMessage());
        }
    }


    public static class TeamCreationRequest {
        private String id;
        private String name;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
}