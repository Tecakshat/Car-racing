const Patches = require('Patches');
const Reactive = require('Reactive');
const Time = require('Time');

(async function() {

    let start, stop, collected, speed, intervalTimer;
    let distance = 0;
    let fuelLeft = 1;
    let fuelTimer = 1;
    let fuelTankDuration = 20 * 1000;
    let fuelToAdd = 0.25; // percent
    let complete = false;

    [
        start,
        stop,
        collected,
        speed
    ] = await Promise.all([
        Patches.outputs.getPulse('START'),
        Patches.outputs.getPulse('STOP'),
        Patches.outputs.getPulse('COLLECTED'),
        Patches.outputs.getScalar('SPEED')
    ]);

    Patches.inputs.setScalar('FUEL_USED', 0);

    updateDistance()

    start.subscribe(async () => {

        if (complete === true) {
            return;
        }

        intervalTimer = Time.setInterval(tick, 250);

        // reset timer
        fuelTimer = Reactive.max(0, Reactive.sub(fuelTankDuration, Time.ms.sub(Time.ms.pin())));

        updateFuelLeft();
    });

    stop.subscribe(async () => {

        complete = true;

        Time.clearInterval(intervalTimer);
    });

    collected.subscribe(async () => {

        if (complete === true) {
            return;
        }

        let prevTime = fuelTimer.pinLastValue();

        fuelTimer = Reactive.max(0, Reactive.sub(fuelTankDuration, Time.ms.sub(Time.ms.pin())));
        fuelTimer = fuelTimer.sub(fuelTankDuration - prevTime);
        fuelTimer = fuelTimer.add(fuelTankDuration * fuelToAdd);

        updateFuelLeft();
    });


    function tick() {

        distance += Math.floor(speed.pinLastValue() * 10);

        updateDistance();
    }

    function updateFuelLeft() {

        fuelLeft = Reactive.clamp(Reactive.div(fuelTimer, fuelTankDuration), 0, 1);

        Patches.inputs.setScalar('FUEL_USED', Reactive.sub(1, fuelLeft));
    }

    function updateDistance() {

        let distanceText = `${distance}m`;
        
        Patches.inputs.setScalar('DISTANCE', distance);
        Patches.inputs.setString('DISTANCE_TXT', distanceText);
    }

})();