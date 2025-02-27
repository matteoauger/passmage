mod commands;
mod error;
mod prelude;
mod utils;

use crate::commands::*;
pub use crate::prelude::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            encrypt,
            decrypt,
            hash_password,
            entropy,
            gen_passphrase,
            gen_password
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
