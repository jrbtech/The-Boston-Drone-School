use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Course {
    pub id: i32,
    pub title: String,
    pub description: String,
    pub modules: Vec<CourseModule>,
    pub resources: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CourseModule {
    pub id: i32,
    pub title: String,
    pub content: String,
}

#[derive(Debug, Deserialize)]
pub struct NewCourse {
    pub title: String,
    pub description: String,
    #[serde(default)]
    pub modules: Vec<NewCourseModule>,
    #[serde(default)]
    pub resources: Vec<String>,
}

#[derive(Debug, Deserialize)]
pub struct NewCourseModule {
    pub title: String,
    pub content: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateCourse {
    pub title: Option<String>,
    pub description: Option<String>,
    pub resources: Option<Vec<String>>,
}
