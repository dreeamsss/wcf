<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @since             1.0.0
 * @package           Wiro_Calculate_Form
 *
 * @wordpress-plugin
 * Plugin Name:       Wiro Calculate Form
 * Plugin URI:        #
 * Description:       Wiro Calculate Form
 * Version:           1.0.0
 * Author:            Deni Okarin
 * Author URI:        #
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wiro-calculate-form
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'WCF_VERSION', '1.0.0' );


if(!function_exists('wcf_init')) {
	add_action( 'plugins_loaded', 'wcf_init', 11 );
	
	function wcf_init() {
		require_once plugin_dir_path(__FILE__) . 'includes/class-wcf-post-type.php';
		require_once plugin_dir_path(__FILE__) . 'includes/class-wcf-metabox.php';
		require_once plugin_dir_path(__FILE__) . 'includes/class-wcf-shortcode-generate.php';
	}
}


add_action('admin_enqueue_scripts', 'wcf_load_admin_scripts');

function wcf_load_admin_scripts() {
	// Styles
	wp_enqueue_style( 'wcf-admin-main', plugins_url( 'admin/css/main.css', __FILE__ ), array(), WCF_VERSION);

	// Scripts
	wp_enqueue_script( 'wcf-admin-main', plugins_url( 'admin/js/main.js', __FILE__ ), array(), WCF_VERSION, true );
}

add_action('wp_enqueue_scripts', 'wcf_load_scripts');

function wcf_load_scripts() {
	// Styles
	wp_enqueue_style( 'jquery-datepicker', plugins_url( 'public/css/vendor/jquery-ui.min.css', __FILE__ ), array(), WG_VERSION);
	wp_enqueue_style( 'aos', plugins_url( 'public/css/vendor/aos.css', __FILE__ ), array(), WG_VERSION);
	wp_enqueue_style( 'qtip', plugins_url( 'public/css/vendor/jquery.qtip.min.css', __FILE__ ), array(), WG_VERSION);
	wp_enqueue_style( 'wcf-modal', plugins_url( 'public/css/vendor/modal.css', __FILE__ ), array(), WG_VERSION);
	
	wp_enqueue_style( 'wcf-main', plugins_url( 'public/css/main.css', __FILE__ ), array(), WG_VERSION);

	// Scripts
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'jquery-datepicker', plugins_url( 'public/js/vendor/jquery-ui.min.js', __FILE__ ), array("jquery"), WCF_VERSION, true );
	wp_enqueue_script( 'jquery-datepicker-ru', plugins_url( 'public/js/vendor/jquery-datepicker-ru.js', __FILE__ ), array("jquery"), WCF_VERSION, true );
	wp_enqueue_script( 'aos', plugins_url( 'public/js/vendor/aos.js', __FILE__ ), array(), WCF_VERSION, true );
	wp_enqueue_script( 'qtip', plugins_url( 'public/js/vendor/jquery.qtip.min.js', __FILE__ ), array('jquery'), WCF_VERSION, true );
	wp_enqueue_script( 'wcf-modal', plugins_url( 'public/js/vendor/Modal.js', __FILE__ ), array('jquery'), WCF_VERSION, true );
	
	wp_enqueue_script( 'wcf-main', plugins_url( 'public/js/main.js', __FILE__ ), array('qtip'), WCF_VERSION, true );

}

