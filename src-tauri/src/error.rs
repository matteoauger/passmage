#[derive(thiserror::Error, Debug)]
pub enum AppError {
    #[error("internal cryptography error : {0}")]
    Crypto(String),

    #[error("Key size is {0}, must be at least {} bytes long", 32)]
    PasswordByteLength(usize),

    #[error("incorrect password or corrupted vault")]
    Password(),
}
