PersonLinkView = Backbone.View.extend({

    tagName: "span",
    
    timeout: null,
    cardRendered: false,

    initialize: function(){
        this.model.bind('change', this.render, this);
    },
    
    showCard: function(){
        clearTimeout(this.timeout);
        if(!this.cardRendered){
            var person = new Person({id: this.model.id});
            var card = new SmallPersonCardView({model: person});
            this.$(".card").html(card.render());
            this.cardRendered = true;
        }
        this.timeout = setTimeout($.proxy(function(){
            $(".card").hide();
            this.$(".card").show();
            this.$(".card").css("position", "absolute")
                           .css("top", -this.$(".card").height())
                           .css("left", -this.$(".card").width()/2 + this.$("a#personLink").width()/2);
            this.$(".card").offset({left: Math.max(30, this.$(".card").offset().left)});
            this.$(".card").offset({left: Math.min($(window).width() - this.$(".card").width() - 32, this.$(".card").offset().left)});
        }, this), 250);
    },
    
    hideCard: function(){
        clearTimeout(this.timeout);
        this.timeout = setTimeout($.proxy(function(){
            this.$(".card").hide();
        }, this), 500);
    },
    
    render: function(){
        this.$el.empty();
        this.$el.css("position", "relative");
        if(this.model.get('url') != ""){
            this.$el.append("<a id='personLink'>" + this.model.get('text') + "</a>");
            this.$("a#personLink").attr("href", this.model.get('url'))
                       .attr("target", this.model.get('target'))
                       .attr("title", this.model.get('title'));
            this.$el.append("<div class='card' style='display:none;position:absolute;border:1px solid #AAAAAA;box-shadow: 0 0 3px #d8d8d8;height:39px;width:317px;background:#FFFFFF;' />");
            this.$(".card").mouseover($.proxy(function(){
                clearTimeout(this.timeout);
            }, this));
            this.$(".card").mouseout($.proxy(this.hideCard, this));
        }
        else{
            this.$el.html(this.model.get('text'));
        }
        this.$("a").mouseover($.proxy(this.showCard, this));
        this.$("a").mouseout($.proxy(this.hideCard, this));
        $(window).unload($.proxy(function(){
            // Make sure that cards hide when navigating away
            this.$(".card").hide();
        }, this));
        return this.$el;
    }

});
