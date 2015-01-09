'use strict';


module.exports = function (model, template, timeout) {

    var alive = true;

    function schedule () {
        setTimeout(function () {
            if (alive) {
                template.update(model);
                schedule();
            }
        }, timeout);
    }

    return {

        kill: function () {
            alive = false;
        },

        watch: function () {
            alive = true;
            schedule();
        }

    };
};
