use rand::{self, Rng};

pub trait RandomGenerator {
    fn gen_range(&self, range: std::ops::Range<usize>) -> usize;
    fn shuffle(&self, vec: &mut Vec<u8>);
}

pub struct DefaultRandomGenerator {}
impl RandomGenerator for DefaultRandomGenerator {
    fn gen_range(&self, range: std::ops::Range<usize>) -> usize {
        let mut rng = rand::thread_rng();
        rng.gen_range(range)
    }

    fn shuffle(&self, vec: &mut Vec<u8>) {
        let len = vec.len();
        for i in 0..len {
            let rand_idx = self.gen_range(0..len);
            let j = rand_idx % (len - i) + i;
            vec.swap(i, j);
        }
    }
}
