# Boston Drone School E-Learning Platform

Welcome to the Boston Drone School e-learning platform! This project is a comprehensive web service built using Rust, designed to facilitate online learning for drone enthusiasts. Below you will find an overview of the project's structure, features, and setup instructions.

## Features

- **User Management**: Registration, login, and profile management for students and administrators.
- **Course Structure**: Create, manage, and access various drone-related courses.
- **Payment Integration**: Secure payment processing for course enrollments using Stripe.
- **Student Dashboard**: A personalized dashboard for students to track their progress and receive recommendations.
- **Content Delivery**: Efficient delivery of course materials and resources.
- **Administrative Features**: Tools for administrators to manage users, courses, and view analytics.

## Project Structure

```
src/
├── main.rs                # Entry point of the application
├── config.rs              # Configuration settings
├── routes                 # Route definitions
│   ├── mod.rs
│   ├── user_routes.rs
│   ├── course_routes.rs
│   ├── payment_routes.rs
│   ├── dashboard_routes.rs
│   └── admin_routes.rs
├── handlers               # Request handlers
│   ├── mod.rs
│   ├── user_handlers.rs
│   ├── course_handlers.rs
│   ├── payment_handlers.rs
│   ├── dashboard_handlers.rs
│   └── admin_handlers.rs
├── models                 # Data models
│   ├── mod.rs
│   ├── user.rs
│   ├── course.rs
│   ├── payment.rs
│   └── admin.rs
├── services               # Business logic
│   ├── mod.rs
│   ├── auth_service.rs
│   ├── payment_service.rs
│   ├── course_service.rs
│   └── admin_service.rs
├── utils                  # Utility functions
│   ├── mod.rs
│   ├── error.rs
│   └── validation.rs
└── db                     # Database interactions
    ├── mod.rs
    └── connection.rs

Cargo.toml                 # Rust project configuration
Cargo.lock                 # Dependency lock file
Dockerfile                 # Docker image instructions
render.yaml                # Deployment configuration for Render
.env.example               # Sample environment configuration
README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd The-Boston-Drone-School
   ```

2. **Install Dependencies**: Ensure you have Rust and Cargo installed, then run:
   ```bash
   cargo build
   ```

3. **Configure Environment Variables**: Copy `.env.example` to `.env` and update the values for your environment.

4. **Run the Application**:
   ```bash
   cargo run
   ```

5. **Access the Application**: Open your browser and navigate to `http://localhost:8000` to access the platform.

## Deployment

This application can be deployed on Render. Refer to `render.yaml` for configuration details. Ensure the service root directory is set to the repository root so that Render can locate `Cargo.toml`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for using the Boston Drone School e-learning platform! We hope you enjoy your learning experience.