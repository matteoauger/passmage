use rand::Rng;

/// Calculates the entropy of the given password
/// The entropy is calculated as the length of the password multiplied by the log base 2 of the charset.
/// The entropy, expressed in bits, represents the strength of a password. The more the better.
/// # Arguments
/// * password - The password to calculate the entropy of
///
/// # Returns
/// The entropy of the password
pub fn calc_entropy(password: &str) -> f64 {
    let range = calc_charset(password);
    let len = password.len() as f64;
    len * range.log2()
}

/// Generates a password with the given length & charset preferences.
/// The password is generated by picking random characters from the charset.
///
/// # Arguments
/// * length - The length of the password to generate
/// * use_capitals - Whether to include uppercase letters in the password
/// * use_numbers - Whether to include numbers in the password
/// * use_special - Whether to include special characters in the password
///
/// # Returns
/// The password
pub fn generate_password(
    length: usize,
    use_capitals: bool,
    use_numbers: bool,
    use_special: bool,
) -> String {
    let mut charset = b"abcdefghijklmnopqrstuvwxyz".to_vec();

    if use_capitals {
        charset.extend_from_slice(b"ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if use_numbers {
        charset.extend_from_slice(b"0123456789");
    }

    if use_special {
        charset.extend_from_slice(b"!@#$%^&*()-_=+");
    }

    let mut rng = rand::thread_rng();

    // Iterating through the charset and picking the desired number of random characters.
    let password: String = (0..length)
        .map(|_| {
            let rand_idx = rng.gen_range(0..charset.len());
            charset[rand_idx] as char
        })
        .collect();

    password
}

/// Generates a passphrase with the given length and separator.
/// The passphrase is generated by picking random words from a wordlist.
///
/// # Arguments
/// * length - The length of the passphrase to generate
/// * separator - The separator to use between words
///
/// # Returns
/// The passphrase
pub fn generate_passphrase(length: usize, separator: &str) -> String {
    let mut rng = rand::thread_rng();
    let wordlist = include_str!("../../resources/wordlist.txt");
    let words: Vec<&str> = wordlist.lines().collect();

    // Picking random words and joining them into a single string with the given separator.
    let password = (0..length)
        .map(|_| {
            let rand_idx = rng.gen_range(0..words.len());
            words[rand_idx]
        })
        .collect::<Vec<&str>>()
        .join(separator);

    password
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

#[cfg(test)]
mod test {
    use super::*;

    // TODO mock random functions (using mockall ?)

    #[test]
    fn test_calc_entropy() {
        let password = "password1!";
        let entropy = calc_entropy(password);

        // R = 69 (charset/ 26 lowercase+ 10 numbers + 33 special characters)
        // L = 10 (password length)
        // entropy = L x log2(R) = 10 x log2(69) = ~61.08
        assert_eq!(entropy as u32, 61);
    }

    #[test]
    fn test_generate_password() {
        let password = generate_password(32, true, true, true);
        assert_eq!(password.len(), 32);
        assert!(password.bytes().any(|byte| byte >= b'A' && byte <= b'Z'));
        assert!(password.bytes().any(|byte| byte >= b'0' && byte <= b'9'));
        assert!(password.bytes().any(|byte| {
            byte < b'0'
                || (byte > b'9' && byte < b'A')
                || (byte > b'Z' && byte < b'a')
                || byte > b'z'
        }));
    }

    #[test]
    fn test_generate_passphrase() {
        let passphrase = generate_passphrase(5, "-");
        assert_eq!(passphrase.matches("-").count(), 4);
    }

    #[test]
    fn test_calc_charset() {
        let password = "password1!";
        let charset = calc_charset(password);
        assert_eq!(charset as u32, 69);
    }
}
