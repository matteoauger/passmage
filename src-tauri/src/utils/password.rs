/// Calculates the entropy of the given password
/// The entropy is calculated as the length of the password multiplied by the log base 2 of the charset.
/// The entropy, expressed in bits, represents the strength of a password. The more the better.
/// # Arguments
/// * password - The password to calculate the entropy of
///
/// # Returns
/// The entropy of the password
pub fn calc_entropy(password: &str) -> f64 {
    let charset = calc_charset(password);
    let len = password.len() as f64;
    len * (charset).log2()
}

/// Calculates the number of possible characters in the charset of the given password.
/// The charset is calculated based on the presence of lowercase, uppercase, numbers and special characters.
///
/// # Arguments
/// * password - The password to calculate the charset of
///
/// # Returns
/// Password charset
fn calc_charset(password: &str) -> f64 {
    let mut charset = 0i32;

    let has_number = password.bytes().any(|byte| byte >= b'0' && byte <= b'9');
    let has_upper = password.bytes().any(|byte| byte >= b'A' && byte <= b'Z');
    let has_lower = password.bytes().any(|byte| byte >= b'a' && byte <= b'z');
    let has_special = password.bytes().any(|byte| {
        byte < b'0' || (byte > b'9' && byte < b'A') || (byte > b'Z' && byte < b'a') || byte > b'z'
    });

    if has_lower {
        charset += 26;
    }
    if has_upper {
        charset += 26;
    }
    if has_number {
        charset += 10;
    }
    if has_special {
        charset += 33;
    }

    charset as f64
}
