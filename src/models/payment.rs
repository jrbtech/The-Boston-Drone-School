// src/models/payment.rs

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Payment {
    pub id: String,
    pub user_id: String,
    pub course_id: String,
    pub amount: f64,
    pub status: PaymentStatus,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum PaymentStatus {
    Pending,
    Completed,
    Failed,
}