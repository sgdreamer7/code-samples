package com.incode.crm.model

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int?,

    @Column(unique = true)
    @get: NotBlank
    val email: String,

    @JsonIgnore
    val password: String

)