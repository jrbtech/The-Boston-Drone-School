use actix_web::web;

use crate::handlers::payment_handlers;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/payments")
            .route("", web::post().to(payment_handlers::process_payment))
            .route(
                "/{payment_id}/confirm",
                web::post().to(payment_handlers::confirm_payment),
            )
            .route(
                "/user/{user_id}",
                web::get().to(payment_handlers::list_payments),
            ),
    );
}
