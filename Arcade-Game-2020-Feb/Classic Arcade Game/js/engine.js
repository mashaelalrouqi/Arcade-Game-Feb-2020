/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 */

var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

        canvas.width = 505;
        canvas.height = 606;
        doc.body.appendChild(canvas);

    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();
        lastTime = now;
        win.requestAnimationFrame(main);
    }
    function init() {
        reset();

        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        player.checkCollisions();
    }
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {

        myMusic.play();

        var rowImages = [
                'road.png',   // Top row is water
                'river1.png',   // Row 1 of 3 of road
                'river1.png',   // Row 2 of 3 of road
                'river1.png',   // Row 3 of 3 of stone
                'grass-block.png',   // Row 1 of 2 of grass
                'grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            
            enemy.render();
        });

        player.render();
    }

    function reset() {
    }

    Resources.load([
        'road.png',
        'river1.png',
        'grass-block.png',
        'tree.png', // link: https://www.cleanpng.com/png-trunk-tree-stump-clip-art-trunk-cliparts-191970/preview.html
        'stone1.png',
        'monkey.png', // link: https://www.freeiconspng.com/img/26160
        'tortoise.png',// link: https://www.freeiconspng.com/search.html?q=Tortoise&tip=png 
        'duck.png' // link: https://www.freeiconspng.com/img/20129
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);
