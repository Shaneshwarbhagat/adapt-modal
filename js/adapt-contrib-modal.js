define([
    "core/js/adapt",
    "core/js/views/componentView",
    "core/js/models/componentModel"
],function(Adapt, ComponentView, ComponentModel) {

    var modal = ComponentView.extend({
        
        events: {
            'click .nxt': 'btnClick',
            'click .close': 'closepopup',
            'click': 'windowEvent',
        },

        btnClick: function(event){
            if(event) event.preventDefault();

                console.log("button clicked");
                //window.alert( this.itemsLength);

                var modal = document.getElementById("myModal");
                modal.style.display = "block";

        },
        
        closepopup: function(event){
            if(event) event.preventDefault();
            console.log("closePopup entered");
            
            var modal = document.getElementById("myModal");
            modal.style.display = "none";  
        },

        windowEvent: function(event){
            if(event) event.preventDefault();
            console.log("window activated");
            var modal = document.getElementById("myModal");
            if (event.target == modal) {
                modal.style.display = "none";
            }  
        },

        preRender: function() {            
            this.$el.addClass("no-state");
            // Checks to see if the modal should be reset on revisit
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.setReadyStatus();
            this.$('.component-inner').on('inview', _.bind(this.inview, this));
        },

        // Used to check if the modal should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-inner').off('inview');
                    this.setCompletionStatus();
                }

            }
        }

    });

    Adapt.register('modal', modal);

    return modal;

});
