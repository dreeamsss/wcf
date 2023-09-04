<?php


if ( ! defined( 'ABSPATH' ) ) {
	die;
}


if(!class_exists('WCF_Shortcode')) {
  class WCF_Shortcode {
    public static $instance;

    public static function instance(){
      if(is_null(self::$instance)) {
        self::$instance = new self();
      }

      return self::$instance;
    }

    public function __construct() {
      add_shortcode('wcf_shortcode', [$this, 'generate_wcf_shortcode']);

      add_action('add_meta_boxes', [$this, 'wcf_add_shortcode_meta_box']);
    } 

    public function generate_wcf_shortcode($atts) {
      $post_id = $atts['id'];
       
      require dirname(__FILE__) . '/shortcode-template/wcf-shortcode-generate-template.php';
    } 

    public function wcf_add_shortcode_meta_box() {
      add_meta_box(
        'wcf_shortcode_box',
        'Сгенерированный шорткод',
        [$this, 'wcf_shortcode_meta_box'],
        'calculate-form', 
        'side',
        'default'
      );
    }

    public function wcf_shortcode_meta_box($post) {
      $shortcode = '[wcf_shortcode id="'.$post->ID.'"]';

      echo '<input type="text" value="'.esc_attr($shortcode).'" readonly>';
    }
  }

  WCF_Shortcode::instance();
}