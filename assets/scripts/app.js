var DEMO = {};

DEMO.Modal = (function($) {

    var Modal = function($element) {
        this.$element = $element;

        this.$currentTrigger = null;

        this.init();
    }

    var proto = Modal.prototype;

    proto.init = function() {
        return this._createChildren()
                   ._setupHandlers()
                   .enable();
    }

    proto._createChildren = function() {
        this.$modalBody = this.$element.find('.js-modal-bd');

        this.$triggers = $('[data-modal="' + this.$modalBody.attr('id') + '"]');

        this.$closeBtn = this.$element.find('.js-modal-closeBtn');

        return this;
    }

    proto._setupHandlers = function() {
        this._onClickTrigger = this._onClickTrigger.bind(this);

        this._onClickCloseBtn = this._onClickCloseBtn.bind(this);

        this._onEscape = this._onEscape.bind(this);

        return this;
    }

    proto.enable = function() {
        this.$triggers.on('click', this._onClickTrigger);

        this.$element.on('keydown', this._onEscape);

        this.$closeBtn.on('click', this._onClickCloseBtn);
    }

    proto.show = function() {
        this.$element.addClass('isActive');
    }

    proto.hide = function() {
        this.$element.removeClass('isActive');
    }

    proto._onClickTrigger = function(event) {
        event.preventDefault();

        this.$currentTrigger = $(event.currentTarget);

        this.show();
    }

    proto._onClickCloseBtn = function(event) {
        event.preventDefault();

        this.hide();
    }

    proto._onEscape = function(event) {
        if (this.$element.hasClass('isActive') && event.keyCode == 27) {
            this.hide();
        }
    }

    return Modal;

} (jQuery));

DEMO.AccessibleModal = (function($) {

    var AccessibleModal = function($element) {
        DEMO.Modal.call(this, $element);
    }

    AccessibleModal.prototype = Object.create(DEMO.Modal.prototype);
    AccessibleModal.prototype.constructor = AccessibleModal;

    var proto = AccessibleModal.prototype;

    proto._createChildren = function() {
        this.$modalBody = this.$element.find('.js-modal-bd');

        this.$triggers = $('[data-modal="' + this.$modalBody.attr('id') + '"]');

        this.$closeBtn = this.$element.find('.js-modal-closeBtn');

        this.$firstSelectableItem = this.$element.find('.js-modal-bd-firstSelectableItem');

        return this;
    }

    proto._setupHandlers = function() {
        this._onClickTrigger = this._onClickTrigger.bind(this);

        this._onClickCloseBtn = this._onClickCloseBtn.bind(this);

        this._onEscape = this._onEscape.bind(this);

        this._onFocus = this._onFocus.bind(this);

        return this;
    }

    proto.enable = function() {
        this.$triggers.on('click', this._onClickTrigger);

        this.$element.on('keydown', this._onEscape);

        this.$closeBtn.on('click', this._onClickCloseBtn);

        document.addEventListener('focus', this._onFocus, true);
    }

    proto.show = function() {
        this.$element.addClass('isActive');
        this.$firstSelectableItem.focus();
    }

    proto.hide = function() {
        this.$element.removeClass('isActive');
        this.$currentTrigger.focus();
    }

    proto._onFocus = function(event) {
        var modalIsActive = this.$element.hasClass('isActive');
        var targetIsNotInsideModal = $.contains(this.$element.get(0), event.target);

        if (modalIsActive && !targetIsNotInsideModal) {
            this.$firstSelectableItem.focus();
        }
    }

    return AccessibleModal;

} (jQuery));

DEMO.ConfirmationMessage = {
    init: function() {
        this.$confirmationMessage = $('.js-confirmationMessage');

        this.confirmationMessage = this.$confirmationMessage.data('message');

        this.$confirmBtn = $('.js-confirmBtn');

        return this._setupHandlers()
                   .enable();
    },
    _setupHandlers: function() {
        this._onClickConfirmBtn = this._onClickConfirmBtn.bind(this);

        return this;
    },
    enable: function() {
        this.$confirmBtn.on('click', this._onClickConfirmBtn);
    },
    _onClickConfirmBtn: function() {
        this.$confirmationMessage.text(this.confirmationMessage);
        this.$confirmationMessage.focus();
    }
};

var modal = new DEMO.Modal($('.js-modal'));
var accessibleModal = new DEMO.AccessibleModal($('.js-accessibleModal'));

DEMO.ConfirmationMessage.init();
