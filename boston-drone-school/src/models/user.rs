use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CourseProgress {
    pub course_id: i32,
    pub completed_modules: Vec<i32>,
    pub total_modules: i32,
}

impl CourseProgress {
    pub fn completion_ratio(&self) -> f32 {
        if self.total_modules == 0 {
            0.0
        } else {
            self.completed_modules.len() as f32 / self.total_modules as f32
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum UserRole {
    Student,
    Admin,
}

#[derive(Debug, Clone)]
pub struct StoredUser {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub password_hash: String,
    pub role: UserRole,
    pub progress: Vec<CourseProgress>,
}

impl StoredUser {
    pub fn as_profile(&self) -> UserProfile {
        UserProfile {
            id: self.id,
            name: self.name.clone(),
            email: self.email.clone(),
            role: self.role.clone(),
            progress: self.progress.clone(),
        }
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct UserProfile {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub role: UserRole,
    pub progress: Vec<CourseProgress>,
}

#[derive(Debug, Deserialize)]
pub struct NewUser {
    pub name: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateUser {
    pub name: Option<String>,
    pub password: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub user: UserProfile,
}

#[derive(Debug, Serialize)]
pub struct ProgressSummary {
    pub course_id: i32,
    pub completion: f32,
}
