// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn encrypt(key: &str, contents: &str) -> String {
    todo!()
}

#[tauri::command]
pub fn decrypt(key: &str, contents: &str) -> String {
    todo!()
}

#[tauri::command]
pub fn hash_password(password: &str) -> String {
    todo!()
}