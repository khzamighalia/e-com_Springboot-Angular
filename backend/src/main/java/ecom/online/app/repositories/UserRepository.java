package ecom.online.app.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import ecom.online.app.entities.UserEntity;


@Repository
public interface UserRepository extends PagingAndSortingRepository<UserEntity,Long> {
  UserEntity findByEmail(String email);
  UserEntity findByUserId(String userId);

  
}