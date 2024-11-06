use rand::{self, Rng};

pub trait RandomGenerator {
    fn gen_range(&self, range: std::ops::Range<usize>) -> usize;
}

pub struct DefaultRandomGenerator {}
impl RandomGenerator for DefaultRandomGenerator {
    fn gen_range(&self, range: std::ops::Range<usize>) -> usize {
        let mut rng = rand::thread_rng();
        rng.gen_range(range)
    }
}
