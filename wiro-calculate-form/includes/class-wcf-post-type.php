
<?php

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

if(!class_exists('WCF_Post_Type')) {
  class WCF_Post_Type {
     public static $instance;

    public static function instance(){
      if(is_null(self::$instance)) {
        self::$instance = new self();
      }

      return self::$instance;
    }

    public function __construct() {
      add_action('init', [$this, 'wcf_register_post_type']);
      add_action('template_redirect', [$this, 'wcf_single_redirect']);
    } 

    public function wcf_register_post_type() {
      register_post_type('calculate-form',
        array(
          'labels' => array(
            'name' => __('Калькулятор'),
            'singular_name' => __('Калькулятор'),
            'add_new' => __('Добавить новый калькулятор'),
            'add_new_item' => __('Добавить новый калькулятор'),
            'edit_item' => __('Редактировать калькулятор'),
            'new_item' => __('Новый калькулятор'),
            'view_item' => __('Просмотреть калькулятор'),
            'search_items' => __('Искать калькуляторы'),
            'not_found' => __('Калькулятор не найдены'),
            'not_found_in_trash' => __('Калькуляторы в корзине не найдены'),
            'parent_item_colon' => __('Родительский калькулятор:'),
            'menu_name' => __('Калькулятор'),
          ),
          'public' => true,           // Позволяет отображать тип записи в админ-панели и на сайте
          'has_archive' => false,     // Отключает страницу архива для этого типа записи
          'supports' => array('title'), // Добавляет поддержку заголовка и миниатюры (featured image)
          'rewrite' => array('slug' => 'calculate-form-item'), // Перезапись URL
          'show_ui' => true,          // Показывать интерфейс редактирования в админ-панели
          'show_in_menu' => true,     // Показывать в меню админ-панели
          'show_in_nav_menus' => true, // Показывать в меню навигации (например, в меню сайта)
          'show_in_rest' => false,     // Показывать в новом блоке редактирования Gutenberg
        )
      );
    }

    public function wcf_single_redirect() {
      if (is_singular('gallery')) {
        wp_redirect(get_404_template());
        exit();
      }
    }
  }

  WCF_Post_Type::instance();
}