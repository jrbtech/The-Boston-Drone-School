// This file contains validation functions for user input and data integrity checks.

pub fn validate_email(email: &str) -> Result<(), String> {
    let email_regex = regex::Regex::new(r"^[\w\.-]+@[\w\.-]+\.\w+$").unwrap();
    if email_regex.is_match(email) {
        Ok(())
    } else {
        Err("Invalid email format".to_string())
    }
}

pub fn validate_password(password: &str) -> Result<(), String> {
    if password.len() >= 8 {
        Ok(())
    } else {
        Err("Password must be at least 8 characters long".to_string())
    }
}

pub fn validate_course_title(title: &str) -> Result<(), String> {
    if title.is_empty() {
        Err("Course title cannot be empty".to_string())
    } else {
        Ok(())
    }
}

pub fn validate_course_description(description: &str) -> Result<(), String> {
    if description.len() <= 500 {
        Ok(())
    } else {
        Err("Course description cannot exceed 500 characters".to_string())
    }
}