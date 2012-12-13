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
                <div class="wchs-picture">
                    <img src="./imgs/temp_src_material/img_1.jpg" class="shadow relative-img" />
                    <div id="left-nav" class="transparent"> </div>
                    <img id="left-nav-img" class="not-transparent" src="./imgs/left-arrow-ss.png" />
                </div>
            </div>
            <ul id="wchs-navigator">
                <li><a href="#">Prev</a></li>
                <li class="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">Next</a></li>
            </ul>
        </div>
        <div id="wchs-caption-container" class="left">

        </div>
    </div>
<?php
require('/var/www/main/wp-content/themes/hatchet/footer-global.php');

?>