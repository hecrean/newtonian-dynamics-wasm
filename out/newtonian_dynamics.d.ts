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
}
/**
*/
export class Time {
  free(): void;
}
/**
*/
export class Velocity {
  free(): void;
}
