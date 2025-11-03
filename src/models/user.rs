// src/models/user.rs

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub password: String,
    pub role: UserRole,
    pub progress: Vec<CourseProgress>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum UserRole {
    Student,
    Admin,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CourseProgress {
    pub course_id: i32,
    pub completed_modules: Vec<i32>,
    pub total_modules: i32,
}