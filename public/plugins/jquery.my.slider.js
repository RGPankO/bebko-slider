(function($) {

    var defaultOptions = {
        slideTime: 1000,
        autoRun: true,
        aspect: 1.77 // 16:9
    }

    $.fn.bebkoSlider = function(sliderOptions) {

        // if there's no element - cancel
        if (this.length === 0) {
            return this;
        }

        // if we have more than one elements - we need to call the slider separately on each one
        if (this.length > 1) {
            this.each(function() {
                $(this).bebkoSlider(sliderOptions);
            });
            return this;
        }

        var $slider = $(this);

        // if the slider is already initialised - cancel;
        if($slider.data('bebkoSlider')){
            return;
        }

        var createArrows = function(){
            var $leftArrow = $('<span class="leftArrow"></span>');
            var $leftArrowIcon = $('<i class="fa fa-angle-left"></i>');
            $leftArrowIcon.appendTo($leftArrow);
            $leftArrow.appendTo($slider);
            var $rightArrow = $('<span class="rightArrow"></span>');
            var $rightArrowIcon = $('<i class="fa fa-angle-right"></i>');
            $rightArrowIcon.appendTo($rightArrow);
            $rightArrow.appendTo($slider);
            return([$leftArrow, $rightArrow]);
        }

        var createSliderTicker = function(sliderSwapImage, options){
            return setInterval(sliderSwapImage, options.slideTime)
        }

        var init = function(){

            var options = Object.assign({},defaultOptions, sliderOptions)
            var sliderHeight = $slider.width()/options.aspect;
            $slider.css('height',sliderHeight+'px');

            var imageList = [];

            $slider.find('img').map(function(index, item){
                imageList.push($(item).attr('src'));
                $(item).remove();
            });

            var $sliderImage = $('<img class="sliderImage">');
            $sliderImage.attr('src', imageList[0]);
            $sliderImage.appendTo($slider);
            var activeSliderImage = 0;
            var sliderSwapImage = function(direction){
                if(!direction){
                    if(activeSliderImage < imageList.length - 1){
                        activeSliderImage = activeSliderImage + 1;
                    } else {
                        activeSliderImage = 0;
                    }
                } else {
                    if(activeSliderImage > 0){
                        activeSliderImage = activeSliderImage - 1;
                    } else {
                        activeSliderImage = imageList.length - 1;
                    }
                }
                $slider.addClass('transition');
                setTimeout(function(){
                    $slider.removeClass('transition');
                }, 300);
                $sliderImage.attr('src', imageList[activeSliderImage]);
            }
            var sliderTicker;
            if(options.autoRun){
                sliderTicker = createSliderTicker(sliderSwapImage, options);
            }

            var sliderAarrows = createArrows();

            var $leftArrow = $(sliderAarrows[0]);
            var $rightArrow = $(sliderAarrows[1]);

            var arrowInterval;

            $leftArrow.click(function(){
                clearTimeout(arrowInterval);
                clearInterval(sliderTicker);
                sliderSwapImage('reverse');
                if(options.autoRun){
                    arrowInterval = setTimeout(function(){
                        sliderTicker = createSliderTicker(sliderSwapImage, options)
                    }, 3000);
                }
            });

            console.log(options);

            $rightArrow.click(function(){
                clearTimeout(arrowInterval);
                clearInterval(sliderTicker);
                sliderSwapImage();
                console.log(options.autoRun);
                if(options.autoRun === true){
                    arrowInterval = setTimeout(function(){
                        sliderTicker = createSliderTicker(sliderSwapImage, options)
                    }, 3000);
                }
            });

            $slider.data('bebkoSlider', true);
        }
        init();
    }
})(jQuery)
