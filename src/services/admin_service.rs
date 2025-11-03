// src/services/admin_service.rs

use crate::models::user::User;
use crate::db::connection::get_db_connection;
use diesel::prelude::*;
use std::result::Result;

pub struct AdminService;

impl AdminService {
    pub fn manage_users() -> Result<Vec<User>, diesel::result::Error> {
        let conn = get_db_connection()?;
        use crate::schema::users::dsl::*;

        let user_list = users.load::<User>(&conn)?;
        Ok(user_list)
    }

    pub fn view_analytics() -> Result<String, diesel::result::Error> {
        // Placeholder for analytics logic
        Ok("Analytics data".to_string())
    }

    pub fn delete_user(user_id: i32) -> Result<usize, diesel::result::Error> {
        let conn = get_db_connection()?;
        use crate::schema::users::dsl::*;

        let deleted_count = diesel::delete(users.filter(id.eq(user_id))).execute(&conn)?;
        Ok(deleted_count)
    }
}