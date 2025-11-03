use uuid::Uuid;

use crate::models::payment::{NewPayment, Payment, PaymentStatus};
use crate::state::AppState;
use crate::utils::AppError;

pub async fn process_payment(state: &AppState, payload: NewPayment) -> Payment {
    let mut payments = state.payments.write().await;
    let payment = Payment {
        id: Uuid::new_v4(),
        user_id: payload.user_id,
        course_id: payload.course_id,
        amount: payload.amount,
        status: PaymentStatus::Pending,
    };

    payments.push(payment.clone());

    payment
}

pub async fn confirm_payment(state: &AppState, payment_id: Uuid) -> Result<Payment, AppError> {
    let mut payments = state.payments.write().await;
    let payment = payments
        .iter_mut()
        .find(|payment| payment.id == payment_id)
        .ok_or_else(|| AppError::NotFound("Payment not found".into()))?;

    payment.status = PaymentStatus::Completed;

    Ok(payment.clone())
}

pub async fn list_payments_for_user(state: &AppState, user_id: Uuid) -> Vec<Payment> {
    state
        .payments
        .read()
        .await
        .iter()
        .filter(|payment| payment.user_id == user_id)
        .cloned()
        .collect()
}
