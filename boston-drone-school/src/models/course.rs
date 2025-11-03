// This file defines the Course model, including properties for course ID, title, description, modules, and associated resources.

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Course {
    pub id: i32,
    pub title: String,
    pub description: String,
    pub modules: Vec<Module>,
    pub resources: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Module {
    pub id: i32,
    pub title: String,
    pub content: String,
}