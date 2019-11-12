	var masterslider = new MasterSlider();

			// slider controls
			masterslider.control('arrows'     ,{ autohide:true, overVideo:true  });
			// slider setup
			masterslider.setup("masterslider", {
				width           : 1280,
				height          : 600,
				minHeight       : 0,
				space           : 0,
				start           : 1,
				grabCursor      : true,
				swipe           : true,
				mouse           : true,
				keyboard        : true,
				layout          : "fullwidth",
				wheel           : false,
				autoplay        : true,
				instantStartLayers:false,
				loop            : true,
				shuffle         : false,
				preload         : 0,
				heightLimit     : true,
				autoHeight      : false,
				smoothHeight    : true,
				endPause        : false,
				overPause       : false,
				fillMode        : "fill",
				centerControls  : false,
				startOnAppear   : false,
				layersMode      : "center",
				autofillTarget  : "",
				hideLayers      : false,
				fullscreenMargin: 0,
				speed           : 20,
				dir             : "h",
				parallaxMode    : 'mouse',
				view            : "basic"
			});
