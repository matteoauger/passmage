use crate::utils::crypto::{hash, Encryption};

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
