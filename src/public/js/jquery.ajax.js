(function ($, document) {
    let ajax = {
        eventSuccess: 'ajax-post-success',
        eventFail: 'ajax-post-fail',
        opts: {
            'debug': true,
            'selector': '[data-ajax-url]',
        },
        init: function () {
            let me = this;

            me.debug('init');
            me.addEventListener();
            me.enableButtons();
        },
        addEventListener: function () {
            let me = this;
            me.debug('addEventListener');

            $(document).on('click', me.opts.selector, function (event) {
                let $link = $(this);
                let url = $link.attr('data-ajax-url');

                me.debug('clicked');
                me.debug($link);
                event.preventDefault();

                ajax.sendRequest(url, event);
            });
        },
        enableButtons: function () {
            let me = this;
            me.debug('enableButtons');

            $(me.opts.selector).prop('disabled', false);
            $(me.opts.selector).attr('disabled', '');
        },
        sendRequest: function (url, event) {
            let me = this;
            me.debug(['sendRequest', url, event]);

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
            }).done(function (response) {
                me.debug(['sendRequest - Success', response]);

                $(document).trigger(me.eventSuccess, {
                    'response': response,
                    'event': event
                });

            }).fail(function (response) {
                me.debug(['sendRequest - Fail', response]);

                $(document).trigger(me.eventFail, {
                    'response': response,
                    'event': event
                });
            });
        },
        debug: function (data) {
            let me = this;

            if (me.opts.debug) {
                console.debug('jquery.ajax.js', data);
            }
        },
    };

    ajax.init();
})(jQuery, document);
