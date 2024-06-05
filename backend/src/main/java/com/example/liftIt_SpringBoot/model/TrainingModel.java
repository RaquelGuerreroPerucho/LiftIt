package com.example.liftIt_SpringBoot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "training")
public class TrainingModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "hora")
    private Time hora;

    @Column(name = "fecha")
    private Date fecha;

    @Column(name = "duracion")
    private Time duracion;

    @Column(name = "estado")
    private Boolean estado;

    @Column(name = "intensidad")
    private String intensidad;

    @Column(name = "sensacion")
    private String sensacion;

    @Column(name = "calentamiento")
    private String calentamiento;

    @Column(name = "ejerPrincipales")
    private String ejerPrincipales;

    @Column(name = "ejerComplementarios")
    private String ejerComplementarios;

    @Column(name = "core")
    private String core;

    @Column(name = "enfriamineto")
    private String enfriamiento;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserModel user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "calendar_id")
    private CalendarModel calendar;


    @Transient
    private Long idUser;

    @Transient
    private Long idCalendar;

    @Override
    public String toString() {
        return "TrainingModel{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", hora=" + hora +
                ", fecha=" + fecha +
                ", duracion=" + duracion +
                ", estado=" + estado +
                ", intensidad='" + intensidad + '\'' +
                ", sensacion='" + sensacion + '\'' +
                ", calentamiento='" + calentamiento + '\'' +
                ", ejerPrincipales='" + ejerPrincipales + '\'' +
                ", ejerComplementarios='" + ejerComplementarios + '\'' +
                ", core='" + core + '\'' +
                ", enfriamiento='" + enfriamiento + '\'' +
                ", user=" + user +
                ", calendar=" + calendar +
                '}';
    }
}
