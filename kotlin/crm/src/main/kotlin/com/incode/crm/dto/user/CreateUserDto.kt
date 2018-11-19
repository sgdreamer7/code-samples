package com.incode.crm.dto.user

import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank

data class CreateUserDto(

    @get:NotBlank(message = "Email is required")
    @get:Email(message = "Field should be a valid email")
    val email: String,

    @get:NotBlank(message = "Password is required")
    val password: String
)