#[derive(thiserror::Error, Debug)]
pub enum AppError {
    #[error("failed to encrypt or decrypt the vault")]
    Crypto(String),
}
