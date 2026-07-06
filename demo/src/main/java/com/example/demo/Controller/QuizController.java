package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.QuizQuestion;
import com.example.demo.Repository.QuizRepository;
import com.example.demo.Service.QuizService;



@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService service;
    
    @Autowired
    private QuizRepository questionRepository;

    @GetMapping
    public List<QuizQuestion> getQuiz() {
        return service.getAllQuestions();
    }

    @PostMapping
    public QuizQuestion addQuestion(@RequestBody QuizQuestion q) {
        return service.saveQuestion(q);
    }

    @DeleteMapping("/{id}")
    public String deleteQuestion(@PathVariable Long id) {
        service.deleteQuestion(id);
        return "Question deleted successfully.";
    }

     @PostMapping("/submitedAnswer")
    public Map<String, Object> submitQuiz(@RequestBody List<Map<String, String>> userAnswers) {
        int score = 0;
        List<Map<String, Object>> resultDetails = new ArrayList<>();

        for (Map<String, String> ans : userAnswers) {
            Long qId = Long.parseLong(ans.get("id").toString());
            String selectedOpt = ans.get("selected");

            QuizQuestion q = questionRepository.findById(qId).orElse(null);
            
            if (q != null) {
                boolean isCorrect = q.getCorrectAnswer().equalsIgnoreCase(selectedOpt);
                if (isCorrect) score++;

                Map<String, Object> detail = new HashMap<>();
                detail.put("questionId", q.getId());
                detail.put("questionText", q.getQuestion());
                detail.put("yourAnswer", selectedOpt);
                detail.put("correctAnswer", q.getCorrectAnswer()); // હવે જવાબ બતાવી શકીએ
                detail.put("isCorrect", isCorrect);
                resultDetails.add(detail);
            }
        }

        Map<String, Object> finalResult = new HashMap<>();
        finalResult.put("score", score);
        finalResult.put("total", userAnswers.size());
        finalResult.put("details", resultDetails);

        return finalResult;
    }
}