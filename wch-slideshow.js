$(function(){
	
	//Model for a single slide
	//Contains the information about the slide:
	//byline, caption, img src
	var wchsSingleSlide = Backbone.Model.extend({
		defaults: {
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
		defaults: {
			current: null,
			next: null,
			prev: null,
			total: null,
		}
	});


	//Create slideshow wrapper. This view
	//will wrap most of the functionality of the slideshow as well
	//as fill in the handlbar markup correctly
	var wchsSlideshowContainer = Backbone.View.extend({
		
		//Wrapper id
		id:"wchs-picture-container",

		//Need to parse through the handlebar content
		initialize: function(options){
			//Initialize variables for use later in function
			this.wchs_width = options.w;
			this.wchs_height = options.h;
			this.wchs_slides = options.collection;
			//Wrap the template container object in jQuery, use later
			//on in parsing handlebar data
			this.wchs_template_container = $('#'+options.template_container);

			//Begin rendering slideshow container
			this.render();
		},

		template: function(context){
			var wchs_template = Handlebars.compile(this.wchs_template_container.html());

			//Figure out how to bind single slide backbone models to 
			//handlebar registerHelper functions. 
			var slides_html = ""
			Handlebars.registerHelper('each', function(context, options){
				_.each(context, function(single_slide){
					//Bind a view to each of the slides we're generating with handlebars
					//Return the html content of the view
					slides_html += new Handlebars.SafeString(new wchsSingleSlide({parent_view: this.$el, model:single_slide}).render());
				});
				return slides_html;
			});

			//var wchs_html = wchs_template({slides: this.wchs_slides.models});
			var wchs_html = wchs_template(
				{
					slideshow: {
						slides: this.wchs_slides.models
					}
				}
			);


			return wchs_html;
		},

		render: function(){
			//Need to begin by replacing {{sidebar}} with 
			//slideshow container div
			//Gonna find if this merges with a global object or doesn't like being places
			//in a function with limietd scoping, away from compilation (but next to templating!)
			var that = this;
			//Handlebars should handle the looping, so just pass
			//slide to the function

			var html = this.template(this.wchs_slides);
			(this.$el).height(this.wchs_height).width(this.wchs_width)
				.css('background-color', '#333').html(html)
				.insertAfter(this.wchs_template_container);
		}
	});

	//Single slide view. Handle stuff like hovering over an image.
	//Clicking on navigation might best be handled by the container,
	//as it should have acting control over the functionality of that
	//material. Images really don't have much functionality, merely acting
	//as placeholders for data.
	var wchsSingleSlide = Backbone.View.extend({

		model: wchsSingleSlide,

		className: 'wchs-single-slide',

		events: {
			"click": "slideSelected"
		},

		initialize: function(options){
			//Keep track of parent view, will 
			//be attaching to it in the render function
			this.parent_view = options.parent_view;
		},

		render: function(){
			var slide_html = "<div class='"+this.className+"'><img src='"+this.model.get("img")+"' /></div>";
			$(this.el).append(slide_html);
			return slide_html;
		},

		slideSelected: function(){
			alert("test");
		}	

	});

	//The object being passed will be processed by handlebars
	//When looping through on the each statement, new singleSlide models will
	//be generated for each slide
	var wchsSlides = new wchsSlideCollection([
			{img: "./imgs/temp_src_material/img_1.jpg", byline: "Connor J", caption: "Test caption"},
			{img: "./imgs/temp_src_material/img_2.jpg", byline: "Not Connor J", caption: "Not a test caption"},
			{img: "./imgs/temp_src_material/img_3.jpg", byline: "A Connor J", caption: "A test caption"}
		]
	);

	//Accept width, height, name of handlbar template script id,
	//collection of slides
	var wchSlideshow = new wchsSlideshowContainer({
		w: 600,
		h: 373,
		template_container: "wchs-template",
		collection: wchsSlides
	});
});