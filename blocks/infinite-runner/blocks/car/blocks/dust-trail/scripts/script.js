const console = require('Diagnostics');

const Animation = require('Animation');
const Patches = require('Patches');
const Scene = require('Scene');

(async function() {

    let active, progress1, progress2, progress3, progress4, progress5, progress6, progress7, progress8;
    let cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8;

    [
        active,
        progress1,
        progress2,
        progress3,
        progress4,
        progress5,
        progress6,
        progress7,
        progress8,
        cube1,
        cube2,
        cube3,
        cube4,
        cube5,
        cube6,
        cube7,
        cube8
    ] = await Promise.all([
        Patches.outputs.getBoolean('ACTIVE'),
        Patches.outputs.getScalar('PROGRESS_01'),
        Patches.outputs.getScalar('PROGRESS_02'),
        Patches.outputs.getScalar('PROGRESS_03'),
        Patches.outputs.getScalar('PROGRESS_04'),
        Patches.outputs.getScalar('PROGRESS_05'),
        Patches.outputs.getScalar('PROGRESS_06'),
        Patches.outputs.getScalar('PROGRESS_07'),
        Patches.outputs.getScalar('PROGRESS_08'),
        Scene.root.findFirst('Cube1'),
        Scene.root.findFirst('Cube2'),
        Scene.root.findFirst('Cube3'),
        Scene.root.findFirst('Cube4'),
        Scene.root.findFirst('Cube5'),
        Scene.root.findFirst('Cube6'),
        Scene.root.findFirst('Cube7'),
        Scene.root.findFirst('Cube8')
    ]);

    progress1.lt(0.1).monitor().subscribe((val) => { toggleDust(cube1, val) });
    progress2.lt(0.1).monitor().subscribe((val) => { toggleDust(cube2, val) });
    progress3.lt(0.1).monitor().subscribe((val) => { toggleDust(cube3, val) });
    progress4.lt(0.1).monitor().subscribe((val) => { toggleDust(cube4, val) });
    progress5.lt(0.1).monitor().subscribe((val) => { toggleDust(cube5, val) });
    progress6.lt(0.1).monitor().subscribe((val) => { toggleDust(cube6, val) });
    progress7.lt(0.1).monitor().subscribe((val) => { toggleDust(cube7, val) });
    progress8.lt(0.1).monitor().subscribe((val) => { toggleDust(cube8, val) });

    function toggleDust(cube, val) {

        if (val.newValue) {
            cube.hidden = !active.pinLastValue();
        }
    }

})();