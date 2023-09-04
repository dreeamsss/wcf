<?php
  $wcf_blocks = get_post_meta($post->ID, 'wcf_blocks', true); 
?>

<?php
if($wcf_blocks) { ?>
  <div class="wcf-wrapper">
    <?php 
      foreach($wcf_blocks as $block_id => $block){ ?>
      <div class="wcf-item" data-block-index="<?php echo $block_id; ?>">
        <div class="wcf-item-overlay"></div>
        <div class="wcf-item-actions">
          <ul class="wcf-item-adds">
            <li><button type="button" data-add-type="radio-button">Radio Button</button></li>
            <li><button type="button" data-add-type="checkbox">Checkbox</button></li>
          </ul>
        </div>
        <?php 
          foreach($block as $block_field_id => $block_data) { 
            $block_first = array_key_last($block);
            $is_last = $block_field_id === $block_first;
            ?>
            <div class="wcf-item-fields <?php echo $is_last ? "" : "shadow"; ?>" data-bind-id="<?php echo $block_data['options']['bind_id']; ?>" data-id="<?php echo $block_field_id; ?>">

            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][options][field_title]" class="wcf-item-fields-title" placeholder="Заголовок" value="<?php echo $block_data['options']['field_title']; ?>">
            <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][options][bind_id]" class="wcf-item-fields-bind" value="<?php echo $block_data['options']['bind_id'] === 'no_bind_id' ? 'no_bind_id' : $block_data['options']['bind_id']; ?>">
            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][options][ident]" placeholder="Идентификатор" class="wcf-item-fields-ident" value="<?php echo $block_data['options']['ident']; ?>">

            <?php foreach($block_data['fields'] as $field_id => $field) { ?>
              <div class="wcf-input-wrapper" data-field-index="<?php echo $field['id']; ?>"> 
                <div class="wcf-field">
                  <div class="wcf-input-block">
                    <?php
                      if($field['type'] === 'radio') { ?>
                          <input type="radio" id="wcf-block-<?php echo $field['block_id']; ?>">
                          <label for="<?php echo $field['block_id']; ?>"><?php echo $field['title']; ?></label>
                      <?php }
                      if($field['type'] === 'checkbox') { ?>
                          <input type="checkbox" id="wcf-block-<?php echo $field['block_id']; ?>">
                          <label for="<?php echo $field['block_id']; ?>"><?php echo $field['title']; ?></label>
                      <?php }
                    ?>
                  </div>
                  <?php 
                  if(isset($field['options'])) {
                    foreach($field['options'] as $option) { ?>
                      <div class="wcf-input-block options" data-options-id="<?php echo $option['id']; ?>">
                          <?php 
                          if($option['type'] === "input") { ?>
                            <div class="wcf-input-block-fields input">
                              <input type="text" placeholder="Текст">
                              <button type="button" class="wcf-additional-options-open">Настройки</button>
                            </div>
                          <?php } ?>
                          <?php 
                          if($option['type'] === "textarea") { ?>
                            <div class="wcf-input-block-fields textarea">
                              <textarea placeholder="Текст"></textarea>
                              <button type="button" class="wcf-additional-options-open">Настройки</button>
                            </div>
                          <?php } ?>
                          <?php 
                          if($option['type'] === "count") { ?>
                            <div class="wcf-input-block-fields number">
                              <input type="text" placeholder="Текст">
                              <button type="button" class="wcf-additional-options-open">Настройки</button>
                            </div>
                          <?php } ?>
                          <?php 
                          if($option['type'] === "radio") { ?>
                            <div class="wcf-input-block-fields radio"  data-bind-id="<?php echo $field_id . "-" . $option['id']; ?>">
                              <label for="radio-<?php echo $option['id']; ?>">
                                <input type="radio" id="radio-<?php echo $option['id']; ?>">
                                <span><?php echo $option['inner_text']; ?></span>
                              </label>
                              <button type="button" class="wcf-additional-options-open">Настройки</button>
                            </div>
                          <?php } ?>
                        <div class="wcf-additional-options">
                          <?php if($option['type'] === "input") { ?>
                            <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][id]" value="<?php echo $option['id']; ?>">
                            <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][type]" value="<?php echo $option['type']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][after_text]" placeholder="Текст после" value="<?php echo $option['after_text']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][inner_text]" placeholder="Внутренний текст" value="<?php echo $option['inner_text']; ?>" class="option-inner-text">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][unit_price]" placeholder="Цена" value="<?php echo $option['unit_price']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][unit_timeline]" placeholder="Сроки" value="<?php echo $option['unit_timeline']; ?>">
                            <button type="button" class="option-item-delete">Удалить опцию</button>
                          <?php } ?>
                          <?php if($option['type'] === "textarea") { ?>
                            <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][id]" value="<?php echo $option['id']; ?>">
                            <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][type]" value="<?php echo $option['type']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][inner_text]" placeholder="Внутренний текст" value="<?php echo $option['inner_text']; ?>" class="option-inner-text">
                            <button type="button" class="option-item-delete">Удалить опцию</button>
                          <?php } ?>
                          <?php if($option['type'] === "count") { ?>
                            <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][id]" value="<?php echo $option['id']; ?>">
                            <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][type]" value="<?php echo $option['type']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][inner_text]" placeholder="Внутренний текст" value="<?php echo $option['inner_text']; ?>" class="option-inner-text">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][unit_price]" placeholder="Цена" value="<?php echo $option['unit_price']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][unit_timeline]" placeholder="Сроки" value="<?php echo $option['unit_timeline']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][unit_limit]" placeholder="Граница" value="<?php echo $option['unit_limit']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][unit_limit_max]" placeholder="Цена, если выше" value="<?php echo $option['unit_limit_max']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][unit_limit_min]" placeholder="Цена, если ниже" value="<?php echo $option['unit_limit_min']; ?>">
                            <button type="button" class="option-item-delete">Удалить опцию</button>
                            
                          <?php } ?>
                          <?php if($option['type'] === "radio") { ?>
                            <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][id]" value="<?php echo $option['id']; ?>">
                            <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][type]" value="<?php echo $option['type']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][inner_text]" placeholder="Внутренний текст" value="<?php echo $option['inner_text']; ?>" class="option-inner-text">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][unit_price]" placeholder="Цена" value="<?php echo $option['unit_price']; ?>">
                            <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][options][<?php echo $option['id']; ?>][unit_timeline]" placeholder="Сроки" value="<?php echo $option['unit_timeline']; ?>">
                            <button type="button" class="option-item-bind" data-bind-id="<?php echo $field_id . "-" . $option['id']; ?>">Связать</button>
                            <button type="button" class="option-item-delete">Удалить опцию</button>
                          <?php } ?>
                        </div>
                      </div>
                    <?php
                    }
                  } ?>
                  <div class="wcf-field-actions">  
                    <button type="button" class="wcf-item-options-btn">
                      Настройки
                    </button>
                    <button type="button" class="wcf-field-delete">
                      Удалить поле
                    </button>
                    <button type="button" class="wcf-field-additionals">
                      Дополнительно
                    </button>
                  </div>
                </div>
                <div class="wcf-item-additionals">
                  <ul>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="input">Ввод</button></li>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="textarea">Текстовое поле</button></li>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="count">Количество</button></li>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="radio">Radio</button></li>
                  </ul>
                </div>
                <div class="wcf-item-options">
                  <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][id]" value="<?php echo $field['id']; ?>">
                  <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][block_id]" value="<?php echo $field['block_id']; ?>">
                  <input type="hidden" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][type]" value="<?php echo $field['type']; ?>">
                  <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][title]" value="<?php echo $field['title']; ?>" placeholder="Введите текст">
                  <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][qtip_title]" value="<?php echo $field['qtip_title']; ?>" placeholder="Заголовок подсказки">
                  <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][qtip_description]" value="<?php echo $field['qtip_description']; ?>" placeholder="Описание подсказки">
                  <input type="number" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][timeline]" value="<?php echo $field['timeline']; ?>" placeholder="Количество дней">
                  <input type="number" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][price]" value="<?php echo $field['price']; ?>" placeholder="Цена">
                  <input type="number" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][weight]" value="<?php echo $field['weight']; ?>" placeholder="Вес">
                  <input type="text" name="wcf-blocks[<?php echo $block_id; ?>][<?php echo $block_field_id; ?>][fields][<?php echo $field_id; ?>][form_type]" value="<?php echo $field['form_type']; ?>" placeholder="Тип*">
                  <button type="button" class="wcf-item-bind">Связать</button>
                </div>
              </div>
            <?php } ?>
          </div>
        <?php } ?>
        <button type="button" class="wcf-item-delete">Удалить блок</button>
      </div> 
        <?php
      }    
    ?>
  </div>
  <button type="button" class="add-new-block">
    Добавить блок
  </button>

<?php } ?>