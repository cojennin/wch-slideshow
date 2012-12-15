<?php 

define('SUBDOMAIN_GWH', true); 
require('/var/www/main/wp-blog-header.php');
require('./wp/functions.php');
require('/var/www/main/wp-content/themes/hatchet-main/header.php');
?>
    <div id="wch-slideshow-container" class="clearfix"> 
        <div id="wch-header">
            <h1>A test of handlebar slideshow</h1>
            <h3>A collection of photos to help show an example of a slideshow using handlebar.js</h3>
        </div>
        <div id="wchs-picture-wrapper" class="left">
            <div id="wchs-picture-container">
                <div id="wchs-picture">
                    <img src="./imgs/temp_src_material/img_1.jpg" class="shadow relative-img" />
                </div>
                <div id="left-nav" class="transparent"> </div>
                <img id="left-nav-img" class="not-transparent" src="./imgs/left-arrow-ss-light.png" />
                <div id="right-nav" class="transparent"> </div>
                <img id="right-nav-img" class="not-transparent" src="./imgs/right-arrow-ss-light.png" />
            </div>
            <ul id="wchs-navigator">
                <li id="wchs-nav-prev"><a href="#">Prev</a></li>
                <li><a class="wchs-active" href="#">1</a></li>
                <li><a class="wchs-nav-num" href="#">2</a></li>
                <li><a class="wchs-nav-num" href="#">3</a></li>
                <li><a class="wchs-nav-num" href="#">4</a></li>
                <li><a class="wchs-nav-num" href="#">5</a></li>
                <li><a class="wchs-nav-num" href="#">6</a></li>
                <li><a class="wchs-nav-num" href="#">7</a></li>
                <li><a class="wchs-nav-num" href="#">8</a></li>
                <li><a class="wchs-nav-num" href="#">9</a></li>
                <li><a class="wchs-nav-num" href="#">10</a></li>
                <li><a class="wchs-nav-num" href="#">11</a></li>
                <li><a class="wchs-nav-num" href="#">12</a></li>
                <li id="wchs-nav-next"><a href="#">Next</a></li>
            </ul>
        </div>
        <div id="wchs-caption-container" class="left">
            <div id="image-info">
                <h4>Connor Jennings | Web Director</h4>
                <p class="caption">This is a test caption for this image. What is this photo about? Not sure yet, content will go here.</p>
            </div>
            <div id="recent-slideshows">
                <h3 class="small-light">Recent slideshows</h3>
                <ul id="recent" class="slideshows">
                    <li>Have you seen this cat?</li>
                    <li>He is one cool cat.</li>
                    <li>Last related slideshow test</li>
                </ul>
            </div>
        </div>
    </div>
<?php
require('/var/www/main/wp-content/themes/hatchet/footer-global.php');

?>