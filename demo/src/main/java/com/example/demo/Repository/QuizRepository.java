package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.QuizQuestion;

public interface QuizRepository extends JpaRepository<QuizQuestion, Long> {

    QuizQuestion findByCorrectAnswer(String correctAnswer);
    
}
