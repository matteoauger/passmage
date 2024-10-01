use aes::{cipher::*, Aes256};
use base64::prelude::*;
use generic_array::GenericArray;
use core::str;
use sha2::{Digest, Sha256};

use crate::prelude::*;

const KEY_SIZE: usize = 32;
const BLOCK_SIZE: usize = 16;

pub struct Encryption {
    key: Vec<u8>,
}

impl Encryption {
    pub fn new(key: &str) -> Result<Self, AppError> {
        if key.len() < KEY_SIZE {
            return Err(AppError::Crypto(f!(
                "Key must be at least {KEY_SIZE} bytes long"
            )));
        }

        // Limit the key size to fit AES256.
        let bytes = key.as_bytes()[..KEY_SIZE].to_vec();
        Ok(Encryption { key: bytes })
    }

    pub fn encrypt(&self, data: &String) -> Result<String, AppError> {
        // For this function to work, we must pad the data in order to split it into different blocks.
        let data_bytes = pad(&data.as_bytes());
        let cipher = Aes256::new_from_slice(&self.key)
            .map_err(|_| AppError::Crypto("Failed to create an AES256 key".into()))?;

        // Now we split the data into 128bit (16 bytes) blocks.
        // This encrypts each block and append them alltogether.
        let mut encrypted_blocks = Vec::new();
        for chunk in data_bytes.chunks(BLOCK_SIZE) {
            let mut block = GenericArray::clone_from_slice(chunk);
            cipher.encrypt_block(&mut block);
            encrypted_blocks.extend(block);
        }

        let encrypted_str = BASE64_STANDARD.encode(&encrypted_blocks);
        Ok(encrypted_str)
    }

    pub fn decrypt(&self, data: &String) -> Result<String, AppError> {
        let encrypted_bytes = BASE64_STANDARD
            .decode(data)
            .map_err(|_| AppError::Crypto("Failed to decode data".into()))?;

        let cipher = Aes256::new_from_slice(&self.key)
            .map_err(|_| AppError::Crypto("Failed to create an AES256 key".into()))?;

        // Same as encoding, we decode the data by 128bit (16byte) blocks.
        let mut decrypted_blocks = Vec::new();
        for chunk in encrypted_bytes.chunks(BLOCK_SIZE) {
            let mut block = GenericArray::clone_from_slice(chunk);
            cipher.decrypt_block(&mut block);
            decrypted_blocks.extend(block);
        }

        // As the data has been padded upon encryption, we must revert the process here in order to
        // get the data in its normal format.
        let unpadded_data = unpad(&decrypted_blocks)?;

        let decrypted_str = String::from_utf8(unpadded_data).map_err(|_| {
            AppError::Crypto("Failed to convert decrypted data to UTF-8".into())
        })?;

        Ok(decrypted_str)
    }
}


pub fn hash(password: &str) -> String {
    let result: [u8; 32] = Sha256::digest(password).into();
    BASE64_STANDARD.encode(result)
}

/// PKCS#7 padding function.
fn pad(data: &[u8]) -> Vec<u8> {
    let mut padded_data = data.to_vec();
    // Getting the number of bytes to pad.
    let padding_len = BLOCK_SIZE - (data.len() % BLOCK_SIZE);

    // Padding the data by adding bytes equal to the padding length to the end.
    padded_data.extend(vec![padding_len as u8; padding_len]);
    padded_data
}

/// Reverts PKCS#7 padding..
fn unpad(data: &[u8]) -> Result<Vec<u8>, AppError> {
    let padding_len = *data.last().unwrap() as usize;

    if padding_len > BLOCK_SIZE || padding_len == 0 {
        return Err(AppError::Crypto("Invalid padding length".into()));
    }

    if data[data.len() - padding_len..]
        .iter()
        .all(|&x| x as usize == padding_len)
    {
        // Removing the padding bytes that are at the end of the data.
        Ok(data[..data.len() - padding_len].to_vec())
    } else {
        Err(AppError::Crypto("Invalid padding bytes".into()))
    }
}
