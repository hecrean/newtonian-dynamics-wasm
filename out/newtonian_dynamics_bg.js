import * as wasm from './newtonian_dynamics_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
*/
export class CelestialBody {

    static __wrap(ptr) {
        const obj = Object.create(CelestialBody.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_celestialbody_free(ptr);
    }
    /**
    * @param {Position} position
    * @param {Velocity} velocity
    * @param {Time} time
    * @param {number} dt_in_days
    * @returns {CelestialBody}
    */
    static new(position, velocity, time, dt_in_days) {
        _assertClass(position, Position);
        var ptr0 = position.ptr;
        position.ptr = 0;
        _assertClass(velocity, Velocity);
        var ptr1 = velocity.ptr;
        velocity.ptr = 0;
        _assertClass(time, Time);
        var ptr2 = time.ptr;
        time.ptr = 0;
        var ret = wasm.celestialbody_new(ptr0, ptr1, ptr2, dt_in_days);
        return CelestialBody.__wrap(ret);
    }
    /**
    */
    tick_one_day() {
        wasm.celestialbody_tick_one_day(this.ptr);
    }
}
/**
*/
export class Position {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_position_free(ptr);
    }
}
/**
*/
export class Time {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_time_free(ptr);
    }
}
/**
*/
export class Velocity {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_velocity_free(ptr);
    }
}

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

