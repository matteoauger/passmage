use aes::{cipher::*, Aes256};
use base64::prelude::*;
use core::str;
use generic_array::GenericArray;
use sha2::{Digest, Sha256};

use crate::prelude::*;

const KEY_SIZE: usize = 32;
const BLOCK_SIZE: usize = 16;

/// Provides AES256 encryption and decryption using a 32byte+ key.
pub struct Encryption {
    /// Encryption key (symmetric).
    key: Vec<u8>,
}

impl Encryption {
    /// Creates a new `Encryption` instance with the provided key.
    ///
    /// The key must be at least `KEY_SIZE` (32 bytes) long to conform to the AES-256 standard.
    /// If the key is shorter than `KEY_SIZE`, this function will return an error.
    ///
    /// # Arguments
    ///
    /// * `key` - A string slice representing the encryption key.
    ///
    /// # Returns
    ///
    /// Returns an `Ok(Encryption)` if the key is valid, otherwise returns an `Err(AppError)`.
    ///
    /// # Errors
    ///
    /// Returns `AppError::PasswordByteLength` if the key is shorter than `KEY_SIZE`.
    pub fn new(key: &str) -> Result<Self, AppError> {
        if key.len() < KEY_SIZE {
            return Err(AppError::PasswordByteLength(key.len()));
        }

        // Limit the key size to fit AES256.
        let bytes = key.as_bytes()[..KEY_SIZE].to_vec();
        Ok(Encryption { key: bytes })
    }

    /// Encrypts the provided data using AES-256 and encodes the result as a bytearray.
    ///
    /// The data is first padded using the PKCS#7 scheme to ensure it fits into 128-bit (16-byte) blocks.
    /// Each block is encrypted and then concatenated together before being Base64-encoded.
    ///
    /// # Arguments
    ///
    /// * `data` - A string reference reprensenting the data to encrypt.
    ///
    /// # Returns
    ///
    /// Returns an `Ok(Vec<u8>)` containing the encrypted data as bytearray , or an `Err(AppError)` if encryption fails.
    ///
    /// # Errors
    ///
    /// Returns `AppError::Crypto` if the encryption process encounters an issue.
    pub fn encrypt(&self, data: &String) -> Result<Vec<u8>, AppError> {
        // For this function to work, we must pad the data in order to split it into different blocks.
        let data_bytes = pad(data.as_bytes());
        let cipher =
            Aes256::new_from_slice(&self.key).map_err(|err| AppError::Crypto(err.to_string()))?;

        // Now we split the data into 128bit (16 bytes) blocks.
        // This encrypts each block and append them alltogether.
        let mut encrypted_blocks = Vec::new();
        for chunk in data_bytes.chunks(BLOCK_SIZE) {
            let mut block = GenericArray::clone_from_slice(chunk);
            cipher.encrypt_block(&mut block);
            encrypted_blocks.extend(block);
        }

        Ok(encrypted_blocks)
    }

    /// Decrypts the provided encrypted data bytes using AES-256 and returns the original plaintext.
    ///
    /// The encrypted data is decrypted in 128-bit (16-byte) blocks, then unpadded using the PKCS#7 scheme to restore the original content.
    ///
    /// # Arguments
    /// * `data` - A reference to the encrypted data byte array.
    ///
    /// # Returns
    /// Returns an `Ok(String)` containing the decrypted text, or an `Err(AppError)` if decryption fails.
    ///
    /// # Errors
    /// Returns `AppError::Password` if the data cannot be decrypted.
    /// Returns `AppError::Crypto` for other cryptography issues.

    pub fn decrypt(&self, data: &[u8]) -> Result<String, AppError> {
        let cipher =
            Aes256::new_from_slice(&self.key).map_err(|err| AppError::Crypto(err.to_string()))?;

        // Same as encoding, we decode the data by 128bit (16byte) blocks.
        let mut decrypted_blocks = Vec::new();
        for chunk in data.chunks(BLOCK_SIZE) {
            let mut block = GenericArray::clone_from_slice(chunk);
            cipher.decrypt_block(&mut block);
            decrypted_blocks.extend(block);
        }

        // As the data has been padded upon encryption, we must revert the process here in order to
        // get the data in its normal format.
        let unpadded_data = unpad(&decrypted_blocks)?;

        let decrypted_str = String::from_utf8(unpadded_data).map_err(|_| AppError::Password())?;

        Ok(decrypted_str)
    }
}

/// Hashes the given password using 32 byte SHA-256.
///
/// # Arguments
/// * `password` - The password to hash.
///
/// # Returns
/// Returns a string containing the base64 encoded hash of the given password.
pub fn hash(password: &str) -> String {
    let result: [u8; 32] = Sha256::digest(password).into();
    BASE64_STANDARD.encode(result)
}

/// PKCS#7 padding function.
/// This function adds remaining bytes to the given data so it fits the fixed block size required by AES256.
/// For instance, if the given data has 5 bytes, the function will add 16-5 = 11 padding bytes to the data.
///
/// # Arguments
/// * `data` - The data to pad
///
/// # Returns
/// Returns a copy of the data with padding so it fits the block size required by AES256.
fn pad(data: &[u8]) -> Vec<u8> {
    let mut padded_data = data.to_vec();
    // Getting the number of bytes to pad.
    let padding_len = BLOCK_SIZE - (data.len() % BLOCK_SIZE);

    // Padding the data by adding bytes equal to the padding length to the end.
    padded_data.extend(vec![padding_len as u8; padding_len]);
    padded_data
}

/// Reverts PKCS#7 padding.
/// This function removes padded bytes done by PKCS#7 padding function.
/// It will remove the last bytes that are equal to the padding length.
///
/// # Arguments
/// * `data` - data to unpad
///
/// # Returns
/// Returns an `Ok(Vec<u8>)` containing the data without its padding bytes, or an `Err(AppError)` if unpadding fails.
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
