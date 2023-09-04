<?php


if ( ! defined( 'ABSPATH' ) ) {
	die;
}


if(!class_exists('WCF_Metaboxes')) {
  class WCF_Metaboxes {
    public static $instance;

    public static function instance(){
      if(is_null(self::$instance)) {
        self::$instance = new self();
      }

      return self::$instance;
    }

    public function __construct() {
      add_action('add_meta_boxes', [$this, 'wcf_add_metabox']);
      add_action('wp_footer', [$this, 'wcf_load_js']);
      add_action('save_post', [$this, 'wcf_save_images']);
    } 

    // Register custom taxonomy for gallery categories
    public function wcf_add_metabox() {
      add_meta_box(
        'wcf_metabox',
        'Форма калькулятора',
        [$this, 'wcf_render_metabox'],
        'calculate-form',
        'normal',
        'default'
      );
    }

    // Render metabox content
    public function wcf_render_metabox($post) {
      wp_nonce_field('wcf_nonce', 'wcf_nonce');
      
      require dirname(__FILE__) . '/meta-template/wcf-metabox-template.php';
    }

    public function wcf_load_js() {
       ?>
        <script src="<?php echo dirname(__FILE__) . '/meta-template/wg-metaboxes-scripts.js'; ?>"></script>
      <?php
    }

    public function wcf_save_images($post_id) {
      if (!isset($_POST['wcf_nonce']) || !wp_verify_nonce($_POST['wcf_nonce'], 'wcf_nonce')) {
        return;
      }

      if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
      }

      if (!current_user_can('edit_post', $post_id)) {
        return;
      }

      if(isset($_POST['wcf-blocks'])) {
        update_post_meta($post_id, 'wcf_blocks', $_POST['wcf-blocks']);
      } else {
        delete_post_meta($post_id, 'wcf_blocks');
      }

    }

  }

  WCF_Metaboxes::instance();
}