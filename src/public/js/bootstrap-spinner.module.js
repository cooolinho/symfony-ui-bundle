const bootstrapSpinner = {
    spinner: null,
    backdrop: null,
    opts: {
        target: 'body',
        containerClass: 'position-fixed top-50 start-50',
        backdropClass: 'bootstrap-spinner-backdrop fade show',
        showBackdrop: true,
    },
    /**
     * @param type grow|border
     * @returns {null|jQuery|HTMLElement|*}
     */
    createSpinner: function (type = 'grow') {
        let me = this,
            $offcanvasBackdrop = me.createBackdropContainer(),
            $spinnerContainer = me.createSpinnerContainer();

        me.spinner = $('<div>', {
            'class': 'text-danger ' + 'spinner-' + type,
            'role': 'status',
            'html': '<span class="visually-hidden">Loading...</span>'
        });

        $spinnerContainer.append(me.spinner)

        if (me.opts.showBackdrop) {
            $offcanvasBackdrop.append($spinnerContainer).appendTo(me.opts.target);
        } else {
            $spinnerContainer.appendTo(me.opts.target)
        }

        return me.spinner;
    },
    createSpinnerContainer: function () {
        let me = this;

        me.spinnerContainer = $('<div>', {
            'class': me.opts.containerClass,
        });

        return me.spinnerContainer;
    },
    createBackdropContainer: function () {
        let me = this;

        me.backdrop = $('<div>', {
            'class': me.opts.backdropClass,
        });

        return me.backdrop;
    },
    destroy: function() {
        let me = this;

        if (me.opts.showBackdrop) {
            me.backdrop.fadeOut('slow').remove();
        } else {
            me.spinnerContainer.fadeOut('slow').remove();
        }
    },
};

$(function() {
    $(document).bind("ajaxSend", function(event, response, url){
        bootstrapSpinner.createSpinner();
    }).bind("ajaxComplete", function(event, response, url){
        bootstrapSpinner.destroy();
    });
});