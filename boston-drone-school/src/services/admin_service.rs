use crate::models::admin::AnalyticsSnapshot;
use crate::models::course::{Course, NewCourse, UpdateCourse};
use crate::models::payment::PaymentStatus;
use crate::services::course_service;
use crate::state::AppState;
use crate::utils::AppError;

pub async fn fetch_all_courses(state: &AppState) -> Vec<Course> {
    course_service::list_courses(state).await
}

pub async fn add_course(state: &AppState, payload: NewCourse) -> Course {
    course_service::create_course(state, payload).await
}

pub async fn update_course(
    state: &AppState,
    course_id: i32,
    payload: UpdateCourse,
) -> Result<Course, AppError> {
    course_service::update_course(state, course_id, payload).await
}

pub async fn remove_course(state: &AppState, course_id: i32) -> Result<(), AppError> {
    let mut courses = state.courses.write().await;
    courses
        .remove(&course_id)
        .ok_or_else(|| AppError::NotFound("Course not found".into()))?;
    Ok(())
}

pub async fn get_analytics(state: &AppState) -> AnalyticsSnapshot {
    let users = state.users.read().await;
    let courses = state.courses.read().await;
    let payments = state.payments.read().await;

    AnalyticsSnapshot {
        total_users: users.len(),
        total_courses: courses.len(),
        active_payments: payments
            .iter()
            .filter(|payment| payment.status == PaymentStatus::Pending)
            .count(),
    }
}
