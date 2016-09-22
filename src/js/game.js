/**
 * Created by scadinot on 07/06/16.
 */

function Game() {
    /**
     *
     * @type {Menu}
     */
    this.menu = null;

    /**
     *
     * @type {Earth}
     */
    this.earth = null;

    this.init();
}

Game.prototype = {
    init: function() {
        this.earth = new Earth();
        this.earth.init();
        this.menu = new Menu(this);
        this.menu.init();
    },

    getEarth: function() {
        return this.earth;
    }
};