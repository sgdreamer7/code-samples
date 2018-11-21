package com.incode.crm.service

import com.incode.crm.dto.user.CreateUserDto
import com.incode.crm.model.User
import com.incode.crm.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
@Transactional
class UserServiceImpl : UserService {

  @Autowired
  lateinit var repository: UserRepository

  override fun create(userDto: CreateUserDto): User {
    return repository.save(User(id = null, email = userDto.email, password = userDto.password))
  }

  override fun findAll(): List<User> = this.repository.findAll()
  override fun findById(id: Int): User? = this.repository.findById(id).orElse(null)
  override fun findByEmail(email: String): User? = this.repository.findOneByEmail(email)

}