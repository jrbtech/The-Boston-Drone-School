// This file defines routes for payment processing, including course purchases and payment confirmations.

use actix_web::{web, HttpResponse, Responder};
use crate::handlers::payment_handlers::{process_payment, confirm_payment};

pub fn config_payment_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/payments")
            .route("/process", web::post().to(process_payment))
            .route("/confirm/{payment_id}", web::get().to(confirm_payment)),
    );
}