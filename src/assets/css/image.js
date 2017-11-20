$(document).ready(function() {
    
       var imageHeight, wrapperHeight, overlap, container = $('.image-wrap');  
    
       function centerImage() {
           imageHeight = container.find('img').height();
           wrapperHeight = container.height();
           overlap = (wrapperHeight - imageHeight) / 2;
           container.find('img').css('margin-top', overlap);
       }
        
       $(window).on("load resize", centerImage);
        
       var el = document.getElementById('wrapper');
       if (el.addEventListener) {  
           el.addEventListener("webkitTransitionEnd", centerImage, false); // Webkit event
           el.addEventListener("transitionend", centerImage, false); // FF event
           el.addEventListener("oTransitionEnd", centerImage, false); // Opera event
       }
    
   });
   <div className="carousel">
   
   <div className="carousel-inner">
       <input class="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden="" checked="checked"/>
       <div className="carousel-item">
      
       <div className="slide-1"></div>
       <hgroup>
           <h1>We are creative</h1>        
           <h3>Get start your next awesome project</h3>
       </hgroup>
       </div>
       <input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden=""/>
       <div className="carousel-item">

       <div className="slide-2"></div>
         
           
       </div>
       <input className="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden=""/>
       <div className="carousel-item">
  
       <div className="slide-3"></div>
       </div>
       <label for="carousel-3" class="carousel-control prev control-1">Welcome</label>
       <label for="carousel-2" class="carousel-control next control-1">Welcome</label>
       <label for="carousel-1" class="carousel-control prev control-2">Welcome</label>
       <label for="carousel-3" class="carousel-control next control-2">Welcome</label>
       <label for="carousel-2" class="carousel-control prev control-3">Welcome</label>
       <label for="carousel-1" class="carousel-control next control-3">Welcome</label>
       <ol className="carousel-indicators">
           <li>
               <label for="carousel-1" className="carousel-bullet">hi</label>
           </li>
           <li>
               <label for="carousel-2" className="carousel-bullet">hello</label>
           </li>
           <li>
               <label for="carousel-3" className="carousel-bullet">welcome</label>
           </li>
       </ol>
   </div>
   </div>
   .carousel {
    position: relative;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.64);
    margin-top: 0px;
    height: 70vh;
}

.carousel-inner {
    height: 70vh;
    position: relative;
    overflow: hidden;
    width: 100%;
}

/* .carousel-open:checked + .carousel-item {
    position: static;
    opacity: 100;
} */
.carousel .carousel-inner .item {
    height: 70vh;
}
/* .carousel-item {
    position: absolute;
    opacity: 0;
    -webkit-transition: opacity 0.6s ease-out;
    transition: opacity 0.6s ease-out;
}

.carousel-item img {
    display: block;
    height: auto;
    max-width: 100%;
   
} */

.carousel-control {
    background: rgba(0, 0, 0, 0.28);
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    display: none;
    font-size: 40px;
    height: 40px;
    line-height: 35px;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(0, 100%);
    cursor: pointer;
    -ms-transform: translate(0, 100%);
    transform: translate(0, 100%);
    text-align: center;
    width: 10px;
    z-index: 10;
}

.carousel-control.prev {
    left: 30%;
}

.carousel-control.next {
    right: 30%;
}

.carousel-control:hover {
    background: rgba(0, 0, 0, 0.8);
    color: #aaaaaa;
}

#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
    display: block;
}

.carousel-indicators {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 10%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
}

.carousel-indicators li {
    margin: 0 2px;
    opacity: .7;
    background-color: #524e4a28;
    border-color: #524e4a28;
    display: inline-block;
    text-align: center;
    align-content: center;
}

.carousel-indicators > li.active {
    width: 10px;
    height: 10px;
    opacity: 1;
}
.carousel-bullet {
    color: #fff;
    cursor: pointer;
    display: block;
    font-size: 70px;
    align-content: center;
}

.carousel-bullet:hover {
    color: #aaaaaa;
}

/* #carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,
#carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,
#carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet {
    color: #428bca;
    height: 70vh;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
} */
.carousel .slides .slide-1, 
.carousel .slides .slide-2,
.carousel .slides .slide-3 {
  height: 70vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.carousel .slides .slide-1 {
    background-image: url("../img/bayty_icon.png"); 
  }
.carousel .slides .slide-2 {
    background-image: url("http://fakeimg.pl/2000x800/F90/fff/?text=Carousel");
  }
.carousel .slides .slide-3 {
    background-image: url("../img/traditionalkitchen.jpg");
  }

#title {
    width: 100%;
    position: absolute;
    padding: 0px;
    margin: 0px auto;
    text-align: center;
    font-size: 27px;
    color: rgba(255, 255, 255, 1);
    font-family: 'Open Sans', sans-serif;
    z-index: 9999;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.33), -1px 0px 2px rgba(255, 255, 255, 0);
}
