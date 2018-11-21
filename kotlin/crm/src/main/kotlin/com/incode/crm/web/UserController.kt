package com.incode.crm.web

import com.incode.crm.dto.user.CreateUserDto
import com.incode.crm.model.User
import com.incode.crm.service.UserServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*
import javax.validation.Valid

@RestController
@RequestMapping("/api/user")
class UserController @Autowired constructor(
    private val userService: UserServiceImpl
) {

  @GetMapping
  fun fetchAll(): ResponseEntity<List<User>> = ResponseEntity.ok(userService.findAll())

  @GetMapping("/{id}")
  fun fetchById(@PathVariable(value = "id", required = true) id: Int): ResponseEntity<User> {
    val user = userService.findById(id) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User was not found.")
    return ResponseEntity.ok(user)
  }

  @PostMapping
  fun create(@Valid @RequestBody createUserDto: CreateUserDto): ResponseEntity<User> {
    if (userService.findByEmail(createUserDto.email) != null)
      throw ResponseStatusException(HttpStatus.CONFLICT, "User already exist.")
    return ResponseEntity.ok(userService.create(createUserDto))
  }
}