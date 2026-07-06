package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.AttentionResult;

public interface AttentionRepository extends JpaRepository<AttentionResult, Long> {
    
}

