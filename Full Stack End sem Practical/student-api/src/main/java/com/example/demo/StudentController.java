package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentController {

    @GetMapping("/students")
    public List<Student> getStudents() {
        return Arrays.asList(
            new Student(1, "Alice Smith", "Computer Science"),
            new Student(2, "Bob Johnson", "Mathematics"),
            new Student(3, "Charlie Davis", "Physics")
        );
    }
}
