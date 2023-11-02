package com.accitracker.springboot.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.accitracker.springboot.model.Accident;

@Repository
public interface AccidentRepository extends JpaRepository<Accident, Long> {
    
}
