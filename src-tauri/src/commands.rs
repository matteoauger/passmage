use crate::utils::crypto::{hash, Encryption};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn encrypt(key: &str, contents: &str) -> Vec<u8> {
    let encryption = Encryption::new(key).unwrap();
    encryption.encrypt(&contents.to_string()).unwrap()
}

#[tauri::command]
pub fn decrypt(key: &str, contents: Vec<u8>) -> String {
    let encryption = Encryption::new(key).unwrap();
    encryption.decrypt(&contents).unwrap()
}

#[tauri::command]
pub fn hash_password(password: &str) -> String {
    hash(password)
}
