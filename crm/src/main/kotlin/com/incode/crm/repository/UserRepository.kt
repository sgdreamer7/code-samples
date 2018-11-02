package com.incode.crm.repository

import com.incode.crm.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Int> {
  fun findOneByEmail(email: String): User?
}