$(function(){
	
	//Model for a single slide
	//Contains the information about the slide:
	//byline, caption, img src
	var wchsSingleSlide = Backbone.Model.extend({
		defaults: {
			id: null,
			img: null,
			byline: null,
			caption: null,	
		}
	});

	//Holds all the slides together. Contains information 
	//about the current slide, next slide, previous slide, total
	//amt of slides. Should notify the navigation view when
	//it has been updated
	var wchsSlideCollection = Backbone.Collection.extend({
		model: wchsSingleSlide,
	});


	//Create slideshow wrapper. This view
	//will wrap most of the functionality of the slideshow as well
	//as fill in the handlbar markup correctly
	var wchsSlideshowContainer = Backbone.View.extend({
		
		//Wrapper id
		id:"wchs-picture-container",
		wchs_index: 0,

		//Need to parse through the handlebar content
		initialize: function(options){
			//Initialize variables for use later in function
			this.wchs_width = options.w;
			this.wchs_height = options.h;
			this.wchs_slides = options.collection;
			this.total_width = 0;

			//Wrap the template container object in jQuery, use later
			//on in parsing handlebar data
			this.wchs_template_container = $('#'+options.template_container);
			//When collection changes, re-render the view to accurately display
			
			//this.on("change", this.render(), this.wchs_slides);
			//Begin rendering slideshow container
			this.render();
		},

		events: {
			"click": "rotateSlideForwardByOne"
		},

		template: function(context){
			var wchs_template = Handlebars.compile(this.wchs_template_container.html());

			//Figure out how to bind single slide backbone models to 
			//handlebar registerHelper funccollectiotions. 
			//Calling this in underscore references underscores this
			this.$el.empty();
			var container_this = this;
			Handlebars.registerHelper('each', function(context, options){
				_.each(context, function(single_slide, i){
					//Bind a view to each of the slides we're generating with handlebars
					//Return the html content of the view
					(container_this.$el).append(new wchsSingleSlide({model:single_slide, shift_by:container_this.wchs_index, parent_view:container_this}).render().el);
					container_this.total_width += container_this.wchs_width;
				});
			});

			var wchs_html = wchs_template(
				{
					slideshow: {
						slides: this.wchs_slides.models
					}
				}
			);

		},

		render: function(){
			//Render the entirety of the slideshow, take established width (ie: how many slides
			//are in the slideshow)
			//Run the template to generate single slides
			//given handlebar markup
			this.template(this.wchs_slides);
			//Need to render two navigation menus
			var leftNav = new wchsSlideNavView({id: "left-nav", next_prev:"PREV"}).render().el;
			var rightNav = new wchsSlideNavView({id: "right-nav", next_prev:"NEXT"}).render().el;
			$('#wchs-slideshow-wrapper').html((this.$el).height(this.wchs_height).width(this.total_width));
			$('#wchs-slideshow-wrapper').append(($(leftNav)))
			$('#wchs-slideshow-wrapper').append(($(rightNav)));
			//Need to explicity call delegateEvents or events won't rebind because appending
			//html to wrapper, not explicity inserting into already created container
			this.delegateEvents();

			//Clean up and remove handlebar markup
			this.wchs_template_container.remove();
		},

		rotateSlideForwardByOne: function(){
			if(this.wchs_index < this.wchs_slides.length-1){
				this.wchs_index++;
				this.render();
			}
		},

	});

	//Single slide view. Handle stuff like hovering over an image.
	//Clicking on navigation might best be handled by the container,
	//as it should have acting control over the functionality of that
	//material. Images really don't have much functionality, merely acting
	//as placeholders for data.
	var wchsSingleSlide = Backbone.View.extend({

		model: wchsSingleSlide,

		className: 'wchs-single-slide-standard',

		initialize: function(options){
			this.shift_by = options.shift_by;
			this.parent = options.parent_view;
		},

		/*events: {
			"click": "slideSelected"
		},*/

		render: function(){
			var slide_html = "<img src='"+this.model.get("img")+"' />";
			$(this.el).css('left', (this.shift_by*this.parent.wchs_width)*-1)
			$(this.el).append(slide_html);
			return this;
		},

		/*slideSelected: function(){
			alert("test");
		}*/	

	});

	var wchsSlideNavView = Backbone.View.extend({

		className: 'wchs-slide-nav',

		intialize: function(options){
			//Designate left or right arrow
			this.id = options.id;
			this.next_prev = options.next_prev;
		},

		events: {
			"mouseover": "showNavBar",
			"mouseout" : "hideNavBar"
		},

		render: function(){
			(this.$el).text(this.next_prev);
			return this;
		},

		showNavBar: function(){
			if(!$(this).hasClass('animated')){
				this.$el.dequeue().stop().animate({ opacity: .8 }, 400);
			}
		},

		hideNavBar: function(){
			this.$el.addClass('animated').animate({ opacity: 0 }, 400, function(){
				$(this).removeClass('animated').dequeue();
			});
		}

	});

	//The object being passed will be processed by handlebars
	//When looping through on the each statement, new singleSlide models will
	//be generated for each slide
	var wchsSlides = new wchsSlideCollection([
			{id: 1, img: "./imgs/temp_src_material/img_1.jpg", byline: "Connor J", caption: "Test caption"},
			{id: 2, img: "./imgs/temp_src_material/img_2.jpg", byline: "Not Connor J", caption: "Not a test caption"},
			{id: 3, img: "./imgs/temp_src_material/img_3.jpg", byline: "A Connor J", caption: "A test caption"}
		]
	);

	//Accept width, height, name of handlbar template script id,
	//collection of slides
	var wchSlideshow = new wchsSlideshowContainer({
		w: 600,
		h: 400,
		template_container: "wchs-template",
		collection: wchsSlides
	});

});