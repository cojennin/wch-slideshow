$(function(){
	
	/* Slideshow container view */

	var wchSlideshowContainer = Backbone.View.extend({
		
		id: 'wch-ss-container',
		//For the Hatchet, capture content so everything can be inserted into it
		//vis-a-vis the wch-ss-container element, which will act as our slideshow
		//container
		el: $('#content'),


		template: function(context){
			//We want to return a template
			var wchs_source = '<div id="wchs-slideshow">{{title}}</div>'
			var wchs_template = Handlebars.compile(wchs_source);
			var wchs_html = wchs_template(context);
			return wchs_html;
		},

		render: function(){

			var context = {title: "Test2"};

			var html = this.template(context);
			$(this.el).append(html);
		}
	});

	var genSlideshow = new wchSlideshowContainer();
	//genSlideshow.render();

});