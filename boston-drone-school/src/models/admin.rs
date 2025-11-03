use serde::Serialize;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize)]
pub struct AdminSummary {
    pub id: Uuid,
    pub name: String,
    pub email: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct AnalyticsSnapshot {
    pub total_users: usize,
    pub total_courses: usize,
    pub active_payments: usize,
}
