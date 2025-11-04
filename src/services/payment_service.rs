#![cfg(feature = "payments")]

// src/services/payment_service.rs

use serde::{Deserialize, Serialize};
use stripe::Client;
use stripe::PaymentIntent;
use std::error::Error;

#[derive(Serialize, Deserialize)]
pub struct PaymentRequest {
    pub amount: u64,
    pub currency: String,
    pub payment_method: String,
}

pub struct PaymentService {
    client: Client,
}

impl PaymentService {
    pub fn new(api_key: &str) -> Self {
        let client = Client::new(api_key);
        PaymentService { client }
    }

    pub async fn create_payment_intent(&self, request: PaymentRequest) -> Result<PaymentIntent, Box<dyn Error>> {
        let payment_intent = PaymentIntent::create(
            &self.client,
            stripe::CreatePaymentIntent {
                amount: request.amount,
                currency: request.currency,
                payment_method: Some(request.payment_method),
                ..Default::default()
            },
        ).await?;

        Ok(payment_intent)
    }

    pub async fn confirm_payment(&self, payment_intent_id: &str) -> Result<PaymentIntent, Box<dyn Error>> {
        let payment_intent = PaymentIntent::confirm(
            &self.client,
            payment_intent_id,
            stripe::ConfirmPaymentIntent {
                ..Default::default()
            },
        ).await?;

        Ok(payment_intent)
    }
}