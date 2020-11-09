<?php
/**
* @package CssModificationsForNeve
*/
/*
Plugin Name: Css Modifications For Neve
Description: Css and JS modifications for Neve.
Version: 1.0
Author: AspieSoft
Author URI: https://www.aspiesoft.com
License: GPLv2 or later
Text Domain: css-modifications-for-neve
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

if(!defined('ABSPATH')){
  http_response_code(404);
  die('404 Not Found');
}

if(!class_exists('CssModificationsForNeve')){

  class CssModificationsForNeve{
    
    function register(){
      add_action('wp_enqueue_scripts', array($this, 'enqueue'));
    }
    
    function enqueue(){
      wp_enqueue_style('CssModificationsForNeve', plugins_url('/assets/style.css', __FILE__), null, '1.0');
      wp_enqueue_script('CssModificationsForNeve', plugins_url('/assets/script.js', __FILE__), array('jquery'), '1.0', true);
    }

  }

  $cssModificationsForNeve = new CssModificationsForNeve();
  $cssModificationsForNeve->register();
}
