use uuid::Uuid;

use crate::models::course::{Course, CourseModule, NewCourse, UpdateCourse};
use crate::models::user::ProgressSummary;
use crate::state::AppState;
use crate::utils::AppError;

pub async fn list_courses(state: &AppState) -> Vec<Course> {
    state.courses.read().await.values().cloned().collect()
}

pub async fn get_course(state: &AppState, course_id: i32) -> Option<Course> {
    state.courses.read().await.get(&course_id).cloned()
}

pub async fn create_course(state: &AppState, payload: NewCourse) -> Course {
    let new_id = state.next_course_id();
    let modules: Vec<CourseModule> = if payload.modules.is_empty() {
        Vec::new()
    } else {
        state.rotate_modules(payload.modules)
    };

    let course = Course {
        id: new_id,
        title: payload.title,
        description: payload.description,
        modules,
        resources: payload.resources,
    };

    state.courses.write().await.insert(new_id, course.clone());

    course
}

pub async fn update_course(
    state: &AppState,
    course_id: i32,
    payload: UpdateCourse,
) -> Result<Course, AppError> {
    let mut courses = state.courses.write().await;
    let course = courses
        .get_mut(&course_id)
        .ok_or_else(|| AppError::NotFound("Course not found".into()))?;

    if let Some(title) = payload.title {
        if title.trim().is_empty() {
            return Err(AppError::BadRequest("Course title cannot be empty".into()));
        }
        course.title = title;
    }

    if let Some(description) = payload.description {
        course.description = description;
    }

    if let Some(resources) = payload.resources {
        course.resources = resources;
    }

    Ok(course.clone())
}

pub async fn track_user_progress(
    state: &AppState,
    user_id: Uuid,
) -> Result<Vec<ProgressSummary>, AppError> {
    let users = state.users.read().await;
    let stored = users
        .get(&user_id)
        .ok_or_else(|| AppError::NotFound("User not found".into()))?;

    let summary = stored
        .progress
        .iter()
        .map(|progress| ProgressSummary {
            course_id: progress.course_id,
            completion: progress.completion_ratio(),
        })
        .collect();

    Ok(summary)
}

pub async fn get_recommendations(state: &AppState, user_id: Uuid) -> Result<Vec<Course>, AppError> {
    let users = state.users.read().await;
    let stored = users
        .get(&user_id)
        .ok_or_else(|| AppError::NotFound("User not found".into()))?;

    let courses = state.courses.read().await;
    let mut items: Vec<Course> = courses.values().cloned().collect();

    items.sort_by(|a, b| a.title.cmp(&b.title));

    let enrolled: Vec<i32> = stored.progress.iter().map(|p| p.course_id).collect();

    let recommendations: Vec<Course> = items
        .into_iter()
        .filter(|course| !enrolled.contains(&course.id))
        .take(3)
        .collect();

    Ok(recommendations)
}
