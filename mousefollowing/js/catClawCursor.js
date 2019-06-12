/*!
 * Fairy Dust Cursor.js
 * - 90's cursors collection
 */

(function fairyDustCursor() {

    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = {x: width / 2, y: width / 2};
    var particles = [];

    function init() {
        bindEvents();
        loop();

    }

    // Bind events that are needed
    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);

        window.addEventListener('resize', onWindowResize);

    }

    function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            for (var i = 0; i < e.touches.length; i++) {
                addParticle(e.touches[i].clientX, e.touches[i].clientY);
            }
        }
    }

    function onMouseMove(e) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;

        addParticle(cursor.x, cursor.y);
    }

    function addParticle(x, y) {
        var particle = new Particle();
        particle.init(x, y);
        particles.push(particle);
    }

    function updateParticles() {

        // Updated
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        // Remove dead particles
        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].lifeSpan < 0) {
                particles[i].die();
                particles.splice(i, 1);
            }
        }

    }

    function loop() {
        requestAnimationFrame(loop);
        updateParticles();
    }

    /**
     * Particles
     */

    function Particle() {

        this.character = "";
        this.lifeSpan = 160; //ms
        this.initialStyles = {
            "position": "absolute",
            "display": "block",
            "pointerEvents": "none",
            "z-index": "10000000",
            "will-change": "transform",
            "width": "22px",
            "height": "16px",
            "top": "38px",
            "background-size": "contain",
            "background-image": "url(images/catClaw.png)"
        };

        // Init, and set properties
        this.init = function (x, y) {

            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };

            this.position = {x: x - 10, y: y - 20};

            this.element = document.createElement('span');
            this.element.innerHTML = this.character;
            applyProperties(this.element, this.initialStyles);
            this.update();

            document.body.appendChild(this.element);
        };

        this.update = function () {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;

            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 160) + ")";
        }

        this.die = function () {
            this.element.parentNode.removeChild(this.element);
        }

    }

    /**
     * Utils
     */

    // Applies css `properties` to an element.
    function applyProperties(target, properties) {
        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    /*改变鼠标图案*/
    function changeCursor () {
        document.body.style.cursor = 'url(images/catClawCursor.png),default';
    }
    changeCursor ();

    init();


})();