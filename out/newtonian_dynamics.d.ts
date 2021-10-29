/* tslint:disable */
/* eslint-disable */
/**
*/
export class CelestialBody {
  free(): void;
/**
* @param {Position} position
* @param {Velocity} velocity
* @param {Time} time
* @param {number} dt_in_days
* @returns {CelestialBody}
*/
  static new(position: Position, velocity: Velocity, time: Time, dt_in_days: number): CelestialBody;
/**
*/
  tick_one_day(): void;
}
/**
*/
export class Position {
  free(): void;
/**
* @param {number} x
* @param {number} y
* @param {number} z
* @returns {Position}
*/
  static new(x: number, y: number, z: number): Position;
}
/**
*/
export class Time {
  free(): void;
/**
* @param {number} year
* @param {number} month
* @param {number} day
* @returns {Time}
*/
  static new(year: number, month: number, day: number): Time;
}
/**
*/
export class Velocity {
  free(): void;
/**
* @param {number} vx
* @param {number} vy
* @param {number} vz
* @returns {Velocity}
*/
  static new(vx: number, vy: number, vz: number): Velocity;
}
