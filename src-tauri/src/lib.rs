mod commands;
mod prelude;
mod error;
mod utils;

pub use crate::prelude::*;
use crate::commands::*;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![encrypt, decrypt, hash_password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
