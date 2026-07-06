package com.example.demo.Service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.QuizQuestion;
import com.example.demo.Repository.QuizRepository;

@Service
public class QuizService {

    @Autowired
    private QuizRepository repo;

    public List<QuizQuestion> getAllQuestions() {
        return repo.findAll();
    }

    public QuizQuestion saveQuestion(QuizQuestion q) {
        return repo.save(q);
    }

    public void deleteQuestion(Long id) {
        repo.deleteById(id);
    }

    public QuizQuestion getQuestionByCorrectAnswer(String correctAnswer) {
        return repo.findByCorrectAnswer(correctAnswer);
    }

    public Map<String, Object> checkAnswer(String selectedAnswer, Long questionId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'checkAnswer'");
    }
}

