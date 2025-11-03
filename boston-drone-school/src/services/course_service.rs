// src/services/course_service.rs

use crate::models::course::{Course, CourseModule};
use crate::db::connection::get_db_connection;
use diesel::prelude::*;
use std::error::Error;

pub fn add_course(course: Course) -> Result<Course, Box<dyn Error>> {
    let conn = get_db_connection()?;
    diesel::insert_into(courses::table)
        .values(&course)
        .execute(&conn)?;
    Ok(course)
}

pub fn edit_course(course_id: i32, updated_course: Course) -> Result<Course, Box<dyn Error>> {
    let conn = get_db_connection()?;
    diesel::update(courses::table.find(course_id))
        .set(&updated_course)
        .execute(&conn)?;
    Ok(updated_course)
}

pub fn get_course(course_id: i32) -> Result<Course, Box<dyn Error>> {
    let conn = get_db_connection()?;
    let course = courses::table.find(course_id).first::<Course>(&conn)?;
    Ok(course)
}

pub fn list_courses() -> Result<Vec<Course>, Box<dyn Error>> {
    let conn = get_db_connection()?;
    let courses = courses::table.load::<Course>(&conn)?;
    Ok(courses)
}

pub fn add_module(course_id: i32, module: CourseModule) -> Result<CourseModule, Box<dyn Error>> {
    let conn = get_db_connection()?;
    diesel::insert_into(course_modules::table)
        .values(&module)
        .execute(&conn)?;
    Ok(module)
}

pub fn get_modules(course_id: i32) -> Result<Vec<CourseModule>, Box<dyn Error>> {
    let conn = get_db_connection()?;
    let modules = course_modules::table.filter(course_id.eq(course_id)).load::<CourseModule>(&conn)?;
    Ok(modules)
}