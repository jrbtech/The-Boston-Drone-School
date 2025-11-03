use actix_web::{web, HttpResponse, Responder};
use uuid::Uuid;

use crate::models::payment::NewPayment;
use crate::services::payment_service;
use crate::state::AppState;

pub async fn process_payment(
    state: web::Data<AppState>,
    payload: web::Json<NewPayment>,
) -> impl Responder {
    let payment = payment_service::process_payment(&state, payload.into_inner()).await;
    HttpResponse::Created().json(payment)
}

pub async fn confirm_payment(
    state: web::Data<AppState>,
    payment_id: web::Path<Uuid>,
) -> impl Responder {
    match payment_service::confirm_payment(&state, payment_id.into_inner()).await {
        Ok(payment) => HttpResponse::Ok().json(payment),
        Err(err) => match err {
            crate::utils::AppError::NotFound(message) => HttpResponse::NotFound().body(message),
            other => HttpResponse::InternalServerError().body(other.to_string()),
        },
    }
}

pub async fn list_payments(state: web::Data<AppState>, user_id: web::Path<Uuid>) -> impl Responder {
    let payments = payment_service::list_payments_for_user(&state, user_id.into_inner()).await;
    HttpResponse::Ok().json(payments)
}
