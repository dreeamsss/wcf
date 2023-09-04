<?php
$wcf_blocks = get_post_meta($post_id, 'wcf_blocks', true);

$count_blocks = 0;
?>
<div class="wcf-calc">
  <?php
    foreach($wcf_blocks as $block_id => $block) { 
      $count_blocks++;
      ?>
      <div class="wcf-block"  data-aos="fade-up" data-aos-delay="300" data-aos-duration="700">
        <?php 
          foreach($block as $block_field_id => $block_data) { 
            $block_first = array_key_first($block);
            $is_shadow = true;

          if($block_data['options']['bind_id'] === 'no_bind_id' || $block_field_id === $block_first) {
            $is_shadow = false;
          } ?>

          <?php if($block_id !== 0 && $block_field_id === $block_first) { ?>
            <div class="wcf-block-shadow">
              <div class="wcf-block-shadow-content">
                <div class="wcf-block-shadow-number"><?php echo ++$block_id; ?></div>
                <div class="wcf-block-shadow-title"><?php echo $block_data['options']['field_title']; ?></div>
              </div>
            </div>
          <?php } ?>
          <div class="wcf-fields-wrapper <?php echo $is_shadow ? 'shadow' : ''; ?>" 
              <?php if($block_data['options']['bind_id']) { ?>data-bind-id="<?php echo $block_data['options']['bind_id']; ?>"<?php } ?> 
              <?php if($block_data['options']['bind_id']) { ?>data-ident="<?php echo $block_data['options']['ident']; ?>"><?php } ?>
            <p class="wcf-block-title">
              <?php echo $block_data['options']['field_title']; ?>
            </p>
            <div class="wcf-fields">
              <?php foreach($block_data['fields'] as $field) { ?>
                <div class="wcf-input-wrapper">
                  <div class="wcf-input-content">
                    <input type="<?php echo $field['type']; ?>" id="wcf-field-<?php echo $field['id']; ?>" name="wcf-block-<?php echo $block_id; ?>"
                          <?php if($field['id']) { ?>data-field-id="<?php echo $field['id']; ?>"<?php } ?>
                          <?php if($field['timeline']) { ?>data-timeline="<?php echo $field['timeline']; ?>"<?php } ?>
                          <?php if($field['price']) { ?>data-price="<?php echo $field['price']; ?>"<?php } ?> 
                          <?php if($field['title']) { ?>data-title="<?php echo $block_data['options']['field_title']; ?>"<?php } ?> 
                          <?php if($field['weight']){ ?>data-weight="<?php echo $field['weight']; ?>"<?php } ?>
                        >
                    <label class="wcf-icon <?php echo $field['type']; ?>" for="wcf-field-<?php echo $field['id']; ?>"></label>
                    <label class="wcf-input-text" for="wcf-field-<?php echo $field['id']; ?>"><?php echo esc_html($field['title']); ?></label>
                  </div>
                  <?php if($field['options']) { ?>
                    <div class="wcf-item-options">
                      <?php foreach($field['options'] as $option_id => $option) { ?>
                        <?php if($option['type'] === 'input') { ?>
                          <div class="wcf-option-field input">
                            <input type="text" placeholder="<?php echo $option['inner_text']; ?>" 
                                  <?php if($field['unit_price']) { ?>data-unit-price="<?php echo $option['unit_price']; ?>"<?php } ?>
                                  <?php if($field['unit_timeline']) { ?>data-unit-timeline="<?php echo $option['unit_timeline']; ?>"<?php } ?> 
                                  <?php if($field['form_type']) { ?>data-form-type="<?php echo $field['form_type']; ?>"<?php } ?>
                                  <?php if($field['weight']){ ?>data-weight="<?php echo $field['weight']; ?>"<?php } ?>
                                  maxlength="4"
                                >
                            <span class="units"><?php echo $option['after_text']; ?></span>
                          </div>
                        <?php } ?>
                        <?php if($option['type'] === 'textarea') { ?>
                          <div class="wcf-option-field textarea">
                            <textarea placeholder="<?php echo $option['inner_text']; ?>"></textarea>
                            <span class="units"><?php echo $option['after_text']; ?></span>
                          </div>
                        <?php } ?>
                        <?php if($option['type'] === 'count') { ?>
                          <div class="wcf-option-field count">
                            <input type="text" placeholder="<?php echo $option['inner_text']; ?>" value="1" maxlength="2" 
                                    <?php if($option['unit_price']) { ?>data-unit-price="<?php echo $option['unit_price']; ?>"<?php } ?> 
                                    <?php if($option['unit_timeline']) { ?>data-unit-timeline="<?php echo $option['unit_timeline']; ?>"<?php } ?>
                                    <?php if($option['unit_limit']) { ?>data-unit-limit="<?php echo $option['unit_limit']; ?>"<?php } ?>
                                    <?php if($option['unit_limit_max']) { ?>data-unit-limit-max="<?php echo $option['unit_limit_max']; ?>"<?php } ?>
                                    <?php if($option['unit_limit_min']) { ?>data-unit-limit-min="<?php echo $option['unit_limit_min']; ?>"<?php } ?>
                                    >
                            <span class="units"><?php echo $option['after_text']; ?></span>
                          </div>
                        <?php } ?>
                        <?php if($option['type'] === 'radio') { ?>
                          <div class="wcf-option-field radio">
                            <input type="radio" id="radio-<?php echo $field['id'] + $option_id; ?>" name="radio-<?php echo $field['id']; ?>"
                                    <?php if($option['unit_price']) { ?>data-unit-price="<?php echo $option['unit_price']; ?>"<?php } ?>
                                    <?php if($option['unit_timeline']) { ?>data-unit-timeline="<?php echo $option['unit_timeline']; ?>"><?php } ?>
                            <label class="units" for="radio-<?php echo $field['id'] + $option_id; ?>" data-bind-id="<?php echo $field['id'] . '-' . $option['id']; ?>"><?php echo $option['inner_text']; ?></label>
                          </div>
                        <?php } ?>
            
                      <?php } ?>
                    </div>
                  <?php } ?>
                  <?php if($field['qtip_title'] && $field['qtip_description']) { ?>
                    <div class="wcf-item-tooltip">
                      <div class="wcf-item-tooltip-wrapper">
                        <div class="wcf-item-tooltip-title"><?php echo $field['qtip_title']; ?></div>
                        <div class="wcf-item-tooltip-description"><?php echo $field['qtip_description']; ?></div>
                      </div>
                    </div>
                  <?php } ?>
                </div>
              <?php } ?>
            </div>
          </div>
        <?php } ?>
      </div>
  <?php } ?>
  <div class="wcf-block"  data-aos="fade-up" data-aos-duration="700" data-aos-delay="300">
    <div class="wcf-block-shadow">
      <div class="wcf-block-shadow-content">
        <div class="wcf-block-shadow-number"><?php echo ++$count_blocks; ?></div>
        <div class="wcf-block-shadow-title">Сроки</div>
      </div>
    </div>
    <div class="wcf-fields-wrapper">
      <div class="wcf-block-title">
        Сроки
      </div>
      <div id="datepicker" class="datepicker">
      </div>
    </div>
  </div>
  <div class="wcf-block total"  data-aos="fade-up" data-aos-duration="700" data-aos-delay="300">
    <div class="wcf-block-shadow">
      <div class="wcf-block-shadow-content">
        <div class="wcf-block-shadow-number"><?php echo ++$count_blocks; ?></div>
        <div class="wcf-block-shadow-title">Стоимость Вашего заказа</div>
      </div>
    </div>
    <div class="wcf-fields-wrapper">
      <div class="wcf-block-title">
        Сроки
      </div>
      <div class="amount-nav">
        <p class="amount">Количество: </p>

        <span class="minus">-</span>
        <input type="text" class="count" value="1">
        <span class="plus">+</span>
      </div>
      <div class="price">
        <div class="price-next">
          <span class="resultCalc">
            0
          </span>
          руб
        </div>
        <div class="price-calculated">
          Расчёт
        </div>
      </div>
      <div class="weight-wrapper">
        Вес: <span class="weight">1</span>кг
      </div>
      <div class="attention">
        Обратите внимание, что размеры указаны в (мм)
      </div>
      <button class="total-submit" data-path="calc-form">
        Сделать заказ
      </button>
      <input type="reset" class="wcf-calc-reset" value="Сбросить текущий расчет">
    </div>
  </div>
</div>

<!-- Modal Start-->
<div class="modal">
  <div class="modal__container" data-target="calc-form">
    <div class="modal__content">
    <button class="modal__close"></button>
      <?php echo do_shortcode('[contact-form-7 id="881cb6c" title="Контактная форма 1"]'); ?>
    </div>
  </div>
</div>
<!-- Modal End-->