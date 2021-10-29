extern crate nyx_space as nyx;
use nyx::celestia::{Bodies, Cosm};
use nyx::dynamics::orbital::OrbitalDynamics;
use nyx::propagators::Propagator;
use nyx::time::{Epoch, TimeUnit};
use nyx::Orbit;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Position {
    x: f64,
    y: f64,
    z: f64,
}
#[wasm_bindgen]
impl Position {
    pub fn new(x: f64, y: f64, z: f64) -> Self {
        Self { x, y, z }
    }
}

#[wasm_bindgen]
pub struct Velocity {
    vx: f64,
    vy: f64,
    vz: f64,
}
#[wasm_bindgen]
impl Velocity {
    pub fn new(vx: f64, vy: f64, vz: f64) -> Self {
        Self { vx, vy, vz }
    }
}

#[wasm_bindgen]
pub struct Time {
    year: i32,
    month: u8,
    day: u8,
}
#[wasm_bindgen]
impl Time {
    pub fn new(year: i32, month: u8, day: u8) -> Self {
        Self { year, month, day }
    }
}

#[wasm_bindgen]
pub struct CelestialBody {
    position: Position,
    velocity: Velocity,
    time: Time,
    dt_in_days: i32,
}

#[wasm_bindgen]
impl CelestialBody {
    pub fn new(position: Position, velocity: Velocity, time: Time, dt_in_days: i32) -> Self {
        Self {
            position,
            velocity,
            time,
            dt_in_days,
        }
    }
    pub fn tick_one_day(&mut self) -> () {
        let cosm = Cosm::de438();
        let eme2k = cosm.frame("EME2000");
        let start_dt =
            Epoch::from_gregorian_utc_at_noon(self.time.year, self.time.month, self.time.day);

        let start_state = Orbit::cartesian(
            self.position.x,
            self.position.y,
            self.position.z,
            self.velocity.vx,
            self.velocity.vy,
            self.velocity.vz,
            start_dt,
            eme2k,
        );

        // Define which other masses we want.
        let pt_masses = vec![Bodies::Sun, Bodies::MarsBarycenter];

        // Let's initialize celestial dynamics with the extra point masses
        // in addition to the those of the Earth, which are included by default because the
        // initial state is defined around the Earth.
        let setup = Propagator::default(OrbitalDynamics::point_masses(&pt_masses, cosm));

        let mut prop = setup.with(start_state.with_stm());
        // The trajectory must always be generated on its own thread, no need to worry about it ;-)

        let (end_state, _): (Orbit, _) = prop
            .for_duration_with_traj(self.dt_in_days * TimeUnit::Day)
            .unwrap();

        self.position = Position {
            x: end_state.x,
            y: end_state.y,
            z: end_state.z,
        };
        self.velocity = Velocity {
            vx: end_state.vx,
            vy: end_state.vy,
            vz: end_state.vy,
        };
    }
}
