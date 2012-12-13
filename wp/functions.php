<?php 
  function add_search_scripts(){
    ?>
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
    <script type="text/javascript" src="./js/underscore-min.js"></script>
    <script type="text/javascript" src="./js/backbone.js"></script>
    <script type="text/javascript" src="./js/handlebars-1.0.rc.1.js"></script>
    <script type="text/javascript" src="./wch-slideshow.js"></script>
    <link rel="stylesheet" type="text/css" href="./wch-slideshow.css"></script>                
   
   <?php
   }
  
  add_action('wp_head', 'add_search_scripts');

