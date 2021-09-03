// https://getbootstrap.com/docs/5.1/components/modal/#via-javascript

(function ($, document) {
    let modalPlugin = {
        opts: {
            'debug': false,
            'toggleSelector': '[data-toggle=modal]',
        },
        modalOptions: {
            backdrop: true, // Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click.
            keyboard: true, // Closes the modal when escape key is pressed
            focus: true, // Puts the focus on the modal when initialized.
        },
        init: function () {
            let me = this;
            me.debug('init');

            me.registerEvents();
        },
        registerEvents: function () {
            let me = this;
            me.debug('registerEvents');

            $(document).on('click', me.opts.toggleSelector, function (event) {
                event.preventDefault();

                me.onToggleSelectorClick(event);
            });
        },
        onToggleSelectorClick: function (event) {
            let me = this,
                target = $(event.currentTarget),
                url = target.attr('data-toggle-url');

            me.debug(['onToggleSelectorClick', event, target, url]);

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'html'
            }).done(function (response) {
                me.createModalByResponse(response).show();
            }).fail(function (response) {
                $(document).trigger('ajax-modal-fail', response);
            });
        },
        createModalByResponse: function (response) {
            $('body').append($(response));

            let me = this,
                modal = new bootstrap.Modal(document.getElementById('modal'), me.modalOptions)

            me.debug(['createModalByResponse', response, modal]);
            me.addEventsToModal(modal);

            return modal;
        },
        addEventsToModal: function (modal) {
            let me = this,
                $modal = $(modal._element);

            me.debug(['addEventsToModal', modal]);

            $modal.on('hidden.bs.modal', function (event) {
                $modal.remove();
            });

            $modal.find('form').submit(function (event) {
                me.onModalFormSubmit(event);
            });
        },
        onModalFormSubmit: function (event) {
            let me = this,
                $form = $(event.target);

            me.debug(['onModalFormSubmit', event, $form]);

            event.preventDefault();

            $.ajax({
                url: $form.attr('action'),
                method: 'POST',
                dataType: 'json',
                data: $form.serialize()
            }).done(function (response) {
                $form.trigger("reset");
                $(document).trigger('ajax-form-submitted-success', {
                    'response': response,
                    'event': event
                });
            }).fail(function (response) {
                $(document).trigger('ajax-form-submitted-fail', {
                    'response': response,
                    'event': event
                });
            });
        },
        debug: function (data) {
            let me = this;

            if (me.opts.debug) {
                console.log('modalPlugin', data);
            }
        },
    };

    modalPlugin.init();
})(jQuery, document);
