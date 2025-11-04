FROM rust:1.83 as builder

WORKDIR /usr/src/boston-drone-school

COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() { println!(\"Hello, world!\"); }" > src/main.rs
RUN cargo build --release
RUN rm -rf src && rm -rf target/release/deps/boston_drone_school*

COPY . .

RUN cargo build --release

FROM debian:buster-slim

WORKDIR /usr/local/bin

COPY --from=builder /usr/src/boston-drone-school/target/release/boston_drone_school .

CMD ["boston_drone_school"]