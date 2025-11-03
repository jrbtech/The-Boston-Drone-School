use regex::Regex;

pub fn validate_email(email: &str) -> Result<(), String> {
    let email_regex = Regex::new(r"^[\w\.-]+@[\w\.-]+\.\w+$").unwrap();
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
