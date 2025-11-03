use std::collections::HashMap;
use std::sync::atomic::{AtomicI32, Ordering};
use std::sync::Arc;

use tokio::sync::RwLock;
use uuid::Uuid;

use crate::models::course::{Course, CourseModule, NewCourseModule};
use crate::models::payment::Payment;
use crate::models::user::StoredUser;

#[derive(Clone)]
pub struct AppState {
    pub jwt_secret: Arc<String>,
    pub users: Arc<RwLock<HashMap<Uuid, StoredUser>>>,
    pub courses: Arc<RwLock<HashMap<i32, Course>>>,
    pub payments: Arc<RwLock<Vec<Payment>>>,
    course_sequence: Arc<AtomicI32>,
    module_sequence: Arc<AtomicI32>,
}

impl AppState {
    pub fn new(jwt_secret: String) -> Self {
        let mut courses = HashMap::new();
        let mut module_counter = 1;

        let intro_modules = vec![
            CourseModule {
                id: module_counter,
                title: "Safety Basics".to_string(),
                content: "Learn the foundational safety procedures before flying".to_string(),
            },
            CourseModule {
                id: module_counter + 1,
                title: "First Flight".to_string(),
                content: "Step-by-step guide to your first supervised flight".to_string(),
            },
        ];
        module_counter += intro_modules.len() as i32;

        courses.insert(
            1,
            Course {
                id: 1,
                title: "Beginner Drone Operations".to_string(),
                description: "Get started with hands-on drone piloting".to_string(),
                modules: intro_modules,
                resources: vec![
                    "https://example.com/drone-checklist.pdf".to_string(),
                    "https://example.com/flight-log.xlsx".to_string(),
                ],
            },
        );

        Self {
            jwt_secret: Arc::new(jwt_secret),
            users: Arc::new(RwLock::new(HashMap::new())),
            courses: Arc::new(RwLock::new(courses)),
            payments: Arc::new(RwLock::new(Vec::new())),
            course_sequence: Arc::new(AtomicI32::new(2)),
            module_sequence: Arc::new(AtomicI32::new(module_counter)),
        }
    }

    pub fn next_course_id(&self) -> i32 {
        self.course_sequence.fetch_add(1, Ordering::SeqCst)
    }

    pub fn next_module_id(&self) -> i32 {
        self.module_sequence.fetch_add(1, Ordering::SeqCst)
    }

    pub fn rotate_modules(&self, modules: Vec<NewCourseModule>) -> Vec<CourseModule> {
        modules
            .into_iter()
            .map(|module| CourseModule {
                id: self.next_module_id(),
                title: module.title,
                content: module.content,
            })
            .collect()
    }
}
