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
		appended_nav: false,
		total_width = 0,

		//Need to parse through the handlebar content
		initialize: function(options){
			//Initialize variables for use later in function
			this.wchs_width = options.w;
			this.wchs_height = options.h;
			this.wchs_slides = options.collection;

			//Wrap the template container object in jQuery, use later
			//on in parsing handlebar data
			this.wchs_template_container = $('#'+options.template_container);
			//When collection changes, re-render the view to accurately display
			
			//this.on("change", this.render(), this.wchs_slides);
			//Begin rendering slideshow container
			this.render();
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
			var container_this = this;

			var leftNav = new wchsSlideNavView({id: "left-nav", next_prev:"PREV", parent_view:this }).render().el;
			var rightNav = new wchsSlideNavView({id: "right-nav", next_prev:"NEXT", parent_view:this}).render().el;
			if(this.appended_nav == false){
				console.log("Test");
				$('#wchs-slideshow-wrapper').html((this.$el).height(this.wchs_height).width(this.total_width));
				this.appended_nav = true;
			}
			//This seems hacky. Should move the 
			//appendage of these elements into the respective views.
			//Would get disturbed less.
			$('#wchs-slideshow-wrapper').append($(leftNav))
			$('#wchs-slideshow-wrapper').append(($(rightNav)));
			this.appended_nav = true;
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

		rotateSlideBackwardByOne: function(){
			if(this.wchs_index != 0){
				this.wchs_index--;
				this.render();
			}
		}

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

		render: function(){
			var slide_html = '<img src="'+this.model.get("img")+'" style="height:'+this.parent.wchs_height+'" />';
			$(this.el).css('left', (this.shift_by*this.parent.wchs_width)*-1)
			$(this.el).append(slide_html);
			return this;
		},

	});

	var wchsSlideNavView = Backbone.View.extend({

		className: 'wchs-slide-nav',

		initialize: function(options){
			//Designate left or right arrow
			this.id = options.id;
			this.next_prev = options.next_prev;
			this.parent = options.parent_view;
		},

		events: {
			"mouseover": "showNavBar",
			"mouseout" : "hideNavBar",
			"click": "moveSlideOne"
		},

		render: function(){
			//console.log(this.next_prev);
			(this.$el).html('<div id="'+this.id+'-inside" class="wchs-inside-nav"></div><div id="'+this.next_prev.toLowerCase()+'-text" class="nav-font-color">'+this.next_prev+'</div>');
			return this;
		},

		showNavBar: function(){
			if(!$(this).hasClass('animated')){
				$('#'+this.id+'-inside').dequeue().stop().animate({ opacity: .8 }, 300);
				$('#'+this.next_prev.toLowerCase()+'-text').dequeue().stop().animate({ opacity: 1 }, 300);
			}
		},

		hideNavBar: function(){
			$('#'+this.next_prev.toLowerCase()+'-text').addClass('animated').animate({ opacity: 0 }, 250, function(){
				$(this).removeClass('animated').dequeue();
			});
			$('#'+this.id+'-inside').addClass('animated').animate({ opacity: 0 }, 250, function(){
				$('#'+this.id+'-inside').removeClass('animated').dequeue();
			});
		},

		moveSlideOne: function(){
			if(this.id == "right-nav"){
				this.parent.rotateSlideForwardByOne();
			}
			if(this.id == "left-nav"){
				this.parent.rotateSlideBackwardByOne();
			}
		}

	});

	//The object being passed will be processed by handlebars
	//When looping through on the each statement, new singleSlide models will
	//be generated for each slide
	var wchsSlides = new wchsSlideCollection([
			{id: 1, img: "./imgs/temp_src_material/img_1.jpg", byline: "Connor J", caption: "Test caption"},
			{id: 2, img: "./imgs/temp_src_material/img_2.jpg", byline: "Not Connor J", caption: "Not a test caption"},
			{id: 3, img: "./imgs/temp_src_material/img_3.jpg", byline: "A Connor J", caption: "A test caption"},
			{id: 4, img: "./imgs/temp_src_material/img_4.jpg", byline: "A Connor J", caption: "A test caption"}
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