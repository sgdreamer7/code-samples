package com.incode.crm.web

import com.incode.crm.dto.user.CreateUserDto
import com.incode.crm.model.User
import com.incode.crm.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import javax.validation.Valid

@RestController
@RequestMapping("/api/user")
class UserController @Autowired constructor(
    private val userRepo: UserRepository
) {
  @PostMapping("/")
  fun create(@Valid @RequestBody createUserDto: CreateUserDto): ResponseEntity<User> {
    val exist = userRepo.findOneByEmail(createUserDto.email)
    if (exist != null) throw ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exist.")
    return ResponseEntity.ok(
        userRepo.save(
            User(email = createUserDto.email, password = createUserDto.password, id = null)
        )
    )
  }
}