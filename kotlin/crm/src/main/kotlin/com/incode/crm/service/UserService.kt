package com.incode.crm.service

import com.incode.crm.dto.user.CreateUserDto
import com.incode.crm.model.User
import java.util.*

interface UserService {
  fun create(userDto: CreateUserDto): User
  fun findAll(): List<User>
  fun findById(id: Int): User?
  fun findByEmail(email: String): User?
}