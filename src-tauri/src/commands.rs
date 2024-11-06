use crate::utils::{
    crypto::{hash, Encryption},
    password::{calc_entropy, PasswordGenerator},
    random::DefaultRandomGenerator,
};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn encrypt(key: &str, contents: &str) -> Result<Vec<u8>, String> {
    let encryption = Encryption::new(key).map_err(|e| e.to_string())?;
    encryption
        .encrypt(&contents.to_string())
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn decrypt(key: &str, contents: Vec<u8>) -> Result<String, String> {
    let encryption = Encryption::new(key).map_err(|e| e.to_string())?;
    encryption.decrypt(&contents).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn hash_password(password: &str) -> String {
    hash(password)
}

#[tauri::command]
pub fn entropy(password: &str) -> f64 {
    calc_entropy(password)
}

#[tauri::command]
pub fn gen_password(length: usize, capitals: bool, numbers: bool, specials: bool) -> String {
    let rng = DefaultRandomGenerator {};
    PasswordGenerator::with(&rng).generate_password(length, capitals, numbers, specials)
}

#[tauri::command]
pub fn gen_passphrase(length: usize, separator: &str) -> String {
    let rng = DefaultRandomGenerator {};
    PasswordGenerator::with(&rng).generate_passphrase(length, separator)
}
