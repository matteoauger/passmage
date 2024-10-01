use crate::utils::crypto::{Encryption, hash};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn encrypt(key: &str, contents: &str) -> String {
    let encryption = Encryption::new(key).unwrap();
    encryption.encrypt(&contents.to_string()).unwrap()
}

#[tauri::command]
pub fn decrypt(key: &str, contents: &str) -> String {
    let encryption = Encryption::new(key).unwrap();
    encryption.decrypt(&contents.to_string()).unwrap()
}

#[tauri::command]
pub fn hash_password(password: &str) -> String {
    hash(password)
}
