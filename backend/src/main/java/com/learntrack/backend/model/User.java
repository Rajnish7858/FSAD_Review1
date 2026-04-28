package com.learntrack.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false) private String username;
    @Column(nullable = false) private String password;
    @Column(nullable = false) private String name;
    private String email;
    private String phone;
    private String dob;
    private String major;
    @Enumerated(EnumType.STRING) private Role role;

    public enum Role { teacher, student }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }
    public String getMajor() { return major; }
    public void setMajor(String major) { this.major = major; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
