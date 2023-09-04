jQuery(document).ready(function ($) {
  $(".add-new-block").on("click", function (e) {
    e.preventDefault();

    let lastBlockIndex =
      $(".wcf-item").last().data("block-index") >= 0
        ? $(".wcf-item").last().data("block-index")
        : -1;
    const wcfItemFields = $(".wcf-wrapper")
      .find(".wcf-item-fields")
      .map(function () {
        return $(this).data("id");
      })
      .get();

    let itemFieldMaxId = wcfItemFields.length ? Math.max(...wcfItemFields) : -1;

    const wcfItemFieldsId = ++itemFieldMaxId;

    const blockHtml = $(
      `
            <div class="wcf-item" data-block-index="${++lastBlockIndex}">
              <div class="wcf-item-overlay"></div>
              <div class="wcf-item-actions">
                <ul class="wcf-item-adds">
                  <li><button type="button" data-add-type="radio-button">Radio Button</button></li>
                  <li><button type="button" data-add-type="checkbox">Checkbox</button></li>
                </ul>
              </div>
              <div class="wcf-item-fields" data-id="${wcfItemFieldsId}">
                <input type="text" name="wcf-blocks[${lastBlockIndex}][${wcfItemFieldsId}][options][field_title]" class="wcf-item-fields-title" placeholder="Заголовок">
                <input type="hidden" name="wcf-blocks[${lastBlockIndex}][${wcfItemFieldsId}][options][bind_id]" class="wcf-item-fields-bind" value="no_bind_id">
                <input type="text" name="wcf-blocks[${lastBlockIndex}][${wcfItemFieldsId}][options][ident]" placeholder="Идентификатор" class="wcf-item-fields-ident" value="">
              </div>
              <button type="button" class="wcf-item-delete">
                Удалить блок
              </button>
            </div>
            `
    );

    $(".wcf-wrapper").append(blockHtml);
  });

  $(".wcf-wrapper").on("click", ".wcf-item-delete", function () {
    $(this).parent().remove();
  });

  $(".wcf-wrapper").on("click", ".wcf-item-adds button", function (e) {
    e.preventDefault();

    const addType = $(this).data("add-type");
    const wcfItem = $(this).closest(".wcf-item");

    const inputs = $(".wcf-wrapper")
      .find(".wcf-input-wrapper")
      .map(function () {
        return $(this).data("field-index");
      })
      .get();

    const fieldIndex = inputs.length ? Math.max(...inputs) : -1;

    const currentFieldIndex = fieldIndex + 1;

    const curretnWcfFieldsId = wcfItem
      .find(".wcf-item-fields:not(.shadow)")
      .data("id");

    const wcfItemBlockIndex = wcfItem.data("block-index");

    let input = $(`
            <div class="wcf-input-wrapper" data-field-index="${currentFieldIndex}">
              <div class="wcf-field">
              </div>
            </div>
          `);

    if (addType === "radio-button") {
      $(this)
        .closest(".wcf-item-adds")
        .find("[data-add-type=checkbox]")
        .parent()
        .hide();

      const blockIndex = currentFieldIndex;
      const bindId =
        wcfItem.find(".wcf-item-fields:not(.shadow)").data("bind-id") >= 0
          ? wcfItem.find(".wcf-item-fields:not(.shadow)").data("bind-id")
          : "";

      $(input)
        .find(".wcf-field")
        .append(
          `
                <div class="wcf-input-block">
                  <input type="radio" id="wcf-blocks[${currentFieldIndex}]"> 
                  <label for="wcf-blocks[${currentFieldIndex}]">Текст</label>
                </div>
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
              `
        );

      $(input).append(
        `
                <div class="wcf-item-additionals">
                  <ul>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="input">Ввод</button></li>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="textarea">Текстовое поле</button></li>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="count">Количество</button></li>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="radio">Radio</button></li>
                  </ul>
                </div>
                <div class="wcf-item-options">
                  <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][id]" value="${currentFieldIndex}">
                  <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][block_id]" value="${wcfItem.data(
          "block-index"
        )}">
                  <input type="hidden" id="wcf-item-multiple" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][block_multiple]" value="false">
                  <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][type]" value="radio">

                  <input type="text" class="text-option" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][title]" placeholder="Введите текст" value="Текст">
                  <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][qtip_title]" placeholder="Заголовок подсказки">
                  <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][qtip_description]" placeholder="Описание подсказки">
                  <input type="number" min="0" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][timeline]" placeholder="Количество дней">
                  <input type="number" min="0" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][price]" placeholder="Цена">
                  <input type="number" min="0" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][weight]" placeholder="Вес(кг.)">
                  <input type="text" min="0" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][form_type]" placeholder="Тип*">
                  <button type="button" class="wcf-item-bind">Связать</button>
                </div>
              `
      );
    }

    if (addType === "checkbox") {
      $(this)
        .closest(".wcf-item-adds")
        .find("[data-add-type=radio-button]")
        .parent()
        .hide();

      const blockIndex = currentFieldIndex;
      const bindId =
        wcfItem.find(".wcf-item-fields:not(.shadow)").data("bind-id") >= 0
          ? wcfItem.find(".wcf-item-fields:not(.shadow)").data("bind-id")
          : "";

      $(input)
        .find(".wcf-field")
        .append(
          ` 
                <div class="wcf-input-block">
                  <input type="checkbox" id="wcf-blocks[${currentFieldIndex}]"> 
                  <label for="wcf-blocks[${currentFieldIndex}]">Текст</label>
                </div>
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
              `
        );

      $(input).append(
        `
                <div class="wcf-item-additionals">
                  <ul>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="input">Ввод</button></li>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="textarea">Текстовое поле</button></li>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="count">Количество</button></li>
                    <li><button type="button" class="wcf-item-additionals-btn" data-additional-type="radio">Radio</button></li>
                  </ul>
                </div>
                <div class="wcf-item-options">
                  <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][id]" value="${currentFieldIndex}">
                  <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][block_id]" value="${wcfItem.data(
          "block-index"
        )}">
                  <input type="hidden" id="wcf-item-multiple" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][block_multiple]" value="false">
                  <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][type]" value="checkbox">

                  <input type="text" class="text-option" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][title]" placeholder="Введите текст" value="Текст">
                  <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][qtip_title]" placeholder="Заголовок подсказки">
                  <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][qtip_description]" placeholder="Описание подсказки">
                  <input type="number" min="0" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][timeline]" placeholder="Количество дней">
                  <input type="number" min="0" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][price]" placeholder="Цена">
                  <input type="number" min="0" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][weight]" placeholder="Вес(кг.)">
                  <input type="text" min="0" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][form_type]" placeholder="Тип*">
                </div>
              `
      );
    }

    wcfItem.find(".wcf-item-fields:not(.shadow)").append(input);
  });

  // Получение следующего индекса для блока
  function getNextFieldIndex() {
    const lastField = $(".wcf-wrapper").find(".wcf-input-wrapper").last();
    const lastIndex = lastField.data("field-index");
    return (lastIndex || 0) + 1;
  }

  function additionallyOptions() {}

  $(".wcf-wrapper").on("input", ".text-option", function (e) {
    $(this).closest(".wcf-input-wrapper").find("label").text($(this).val());
  });

  $(".wcf-wrapper").on("click", ".wcf-field-additionals", function () {
    const inputWrapper = $(this).closest(".wcf-input-wrapper");

    inputWrapper.find(".wcf-item-options").hide();
    inputWrapper.find(".wcf-item-additionals").toggle();
  });

  $(".wcf-wrapper").on("click", ".option-item-delete", function () {
    $(this).closest(".wcf-input-block.options").remove();
  });

  $(".wcf-wrapper").on("click", ".wcf-item-additionals-btn", function () {
    const options = $(this)
      .closest(".wcf-input-wrapper")
      .find(".wcf-input-block.options")
      .map(function () {
        return $(this).data("options-id");
      })
      .get();

    const optionsIndex = options.length ? Math.max(...options) : -1;

    const currentOptionId = optionsIndex + 1;

    const html = $(
      `<div class="wcf-input-block options" data-options-id="${currentOptionId}"></div>`
    );
    const fieldIndex = $(this)
      .closest(".wcf-input-wrapper")
      .data("field-index");

    const curretnWcfFieldsId = $(this).closest(".wcf-item-fields").data("id");
    const wcfItemBlockIndex = $(this).closest(".wcf-item").data("block-index");
    const currentFieldIndex = $(this)
      .closest(".wcf-input-wrapper")
      .data("field-index");

    if ($(this).data("additional-type") === "input") {
      html.append(`
              <div class="wcf-input-block-fields">
                <input type="text" placeholder="Текст">
                <button type="button" class="wcf-additional-options-open">Настройки</button>
              </div>
            `);
      html.append(`
            <div class="wcf-additional-options">
              <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][id]" value="${currentOptionId}">
              <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][type]" value="input">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][inner_text]" placeholder="Внутренний текст">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][after_text]" placeholder="Текст после">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][unit_price]" placeholder="Цена">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][unit_timeline]" placeholder="Сроки">
              <button type="button" class="option-item-delete">Удалить опцию</button>
            </div>
            `);
    }

    if ($(this).data("additional-type") === "textarea") {
      html.append(`
              <div class="wcf-input-block-fields">
                <textarea placeholder="Текст"></textarea>
                <button type="button" class="wcf-additional-options-open">Настройки</button>
              </div>
            `);
      html.append(`
            <div class="wcf-additional-options">
              <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][id]" value="${currentOptionId}">
              <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][type]" value="textarea">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][inner_text]" placeholder="Внутренний текст">
              <button type="button" class="option-item-delete">Удалить опцию</button>
            </div>
            `);
    }

    if ($(this).data("additional-type") === "count") {
      html.append(`
              <div class="wcf-input-block-fields">
                <input type="number" placeholder="Текст">
                <button type="button" class="wcf-additional-options-open">Настройки</button>
              </div>
            `);
      html.append(`
            <div class="wcf-additional-options">
              <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][id]" value="${currentOptionId}">
              <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][type]" value="count">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][inner_text]" placeholder="Внутренний текст">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][unit_price]" placeholder="Цена за единицу">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][unit_timeline]" placeholder="Сроки на единицу">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][unit_limit]" placeholder="Граница">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][unit_limit_max]" placeholder="Цена, если выше">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][unit_limit_min]" placeholder="Цена, если ниже">
              <button type="button" class="option-item-delete">Удалить опцию</button>
            </div>
            `);
    }

    if ($(this).data("additional-type") === "radio") {
      html.append(`
              <div class="wcf-input-block-fields radio" data-bind-id="${currentFieldIndex}-${currentOptionId}">
                <label for="radio-${currentOptionId}">
                  <input type="radio" id="radio-${currentOptionId}">
                  <span></span>
                </label>
                <button type="button" class="wcf-additional-options-open">Настройки</button>
              </div>
            `);
      html.append(`
            <div class="wcf-additional-options">
              <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][id]" value="${currentOptionId}">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][inner_text]" placeholder="Текст" class="option-inner-text">
              <input type="hidden" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][type]" value="radio">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][unit_price]" placeholder="Цена">
              <input type="text" name="wcf-blocks[${wcfItemBlockIndex}][${curretnWcfFieldsId}][fields][${currentFieldIndex}][options][${currentOptionId}][unit_timeline]" placeholder="Сроки">
              <button type="button" class="option-item-bind" data-bind-id="${currentFieldIndex}-${currentOptionId}">Связать</button>
              <button type="button" class="option-item-delete">Удалить опцию</button>
            </div>
            `);
    }

    $(this)
      .closest(".wcf-input-wrapper")
      .find(".wcf-input-block")
      .last()
      .after(html);
  });

  $(".wcf-wrapper").on("click", ".wcf-additional-options-open", function () {
    $(this)
      .closest(".wcf-input-block")
      .find(".wcf-additional-options")
      .toggle();
  });

  $(".wcf-wrapper").on("click", ".wcf-item-options-btn", function () {
    $(this).closest(".wcf-input-wrapper").find(".wcf-item-additionals").hide();
    $(this).closest(".wcf-input-wrapper").find(".wcf-item-options").toggle();
  });

  $(".wcf-wrapper").on("click", ".wcf-field-delete", function () {
    const wcfItem = $(this).closest(".wcf-item");
    const fieldIndex = $(this)
      .closest(".wcf-input-wrapper")
      .data("field-index");
    const bindedFields = $(`.wcf-item-fields[data-bind-id="${fieldIndex}"]`);
    const bindedWcfItem = bindedFields.closest(".wcf-item");

    const wcfItemFields = $(".wcf-wrapper")
      .find(".wcf-item-fields")
      .map(function () {
        return $(this).data("id");
      })
      .get();

    let itemFieldMaxId = wcfItemFields.length ? Math.max(...wcfItemFields) : -1;

    const wcfItemFieldsId = ++itemFieldMaxId;

    const wcfItemBlockId = $(this).closest(".wcf-item").data("block-id");

    bindedFields
      .closest(".wcf-item")
      .find(`.wcf-item-fields:not([data-bind-id="${fieldIndex}"])`)
      .last()
      .removeClass("shadow");
    bindedFields.remove();
    $(this).closest(".wcf-input-wrapper").remove();

    if (!bindedWcfItem.find(".wcf-item-fields").length) {
      bindedWcfItem.find(".wcf-item-actions").after(`
            <div class="wcf-item-fields" data-id="${wcfItemFieldsId}">
              <input type="text" name="wcf-blocks[${wcfItemBlockId}][${wcfItemFieldsId}][options][field_title]" class="wcf-item-fields-title" placeholder="Заголовок">
              <input type="text" name="wcf-blocks[${wcfItemBlockId}][${wcfItemFieldsId}][options][ident]" placeholder="Идентификатор" class="wcf-item-fields-ident" value="">
              <input type="hidden" name="wcf-blocks[${wcfItemBlockId}][${wcfItemFieldsId}][options][bind_id]" class="wcf-item-fields-bind" value="no_bind_id">
            </div>
            `);
    }

    if (!wcfItem.find(".wcf-input-wrapper").length) {
      $(".wcf-item-adds li").show();
    }
  });

  $(".wcf-wrapper").on("click", ".wcf-input-wrapper", function () {
    const fieldIndex = $(this).data("field-index");

    const bindedFields = $(`.wcf-item-fields[data-bind-id="${fieldIndex}"]`);

    bindedFields
      .closest(".wcf-item")
      .find(`.wcf-item-fields`)
      .addClass("shadow");
    bindedFields.removeClass("shadow");
  });

  $(".wcf-wrapper").on("change", ".option-inner-text", function () {
    $(this)
      .closest(".wcf-input-block.options")
      .find("input[type=radio] + span")
      .text($(this).val());
  });

  $(".wcf-wrapper").on("click", ".wcf-item-overlay", function () {
    const wcfItemFields = $(".wcf-wrapper")
      .find(".wcf-item-fields")
      .map(function () {
        return $(this).data("id");
      })
      .get();

    let itemFieldMaxId = wcfItemFields.length ? Math.max(...wcfItemFields) : -1;

    const wcfItemFieldsId = ++itemFieldMaxId;

    const wcfItemBlockId = $(this).closest(".wcf-item").data("block-index");

    $(this).parent().find(".wcf-item-fields:not([data-bind-id])").remove();

    if ($(this).hasClass("option-bind")) {
      const fieldAndOptionId = $("button.binded").data("bind-id");

      $(this)
        .parent()
        .find(`.wcf-item-fields[data-bind-id="${fieldAndOptionId}"]`)
        .remove();
      $(this).parent().find(".wcf-item-fields").addClass("shadow");
      $(this).parent().find(".wcf-item-actions").after(`
              <div class="wcf-item-fields multiple" data-id="${wcfItemFieldsId}" data-bind-id="${fieldAndOptionId}">
                <input type="text" name="wcf-blocks[${wcfItemBlockId}][${wcfItemFieldsId}][options][field_title]" class="wcf-item-fields-title" placeholder="Заголовок">
                <input type="hidden" name="wcf-blocks[${wcfItemBlockId}][${wcfItemFieldsId}][options][bind_id]" class="wcf-item-fields-bind" value="${fieldAndOptionId}">
                <input type="text" name="wcf-blocks[${wcfItemBlockId}][${wcfItemFieldsId}][options][ident]" placeholder="Идентификатор" class="wcf-item-fields-ident" value="">
              </div>
              `);
    } else {
      const bindingBlockId = $("button.binded")
        .closest(".wcf-input-wrapper")
        .data("field-index");

      $(this)
        .parent()
        .find(`.wcf-item-fields[data-bind-id="${bindingBlockId}"]`)
        .remove();
      $(this).parent().find(".wcf-item-fields").addClass("shadow");
      $(this).parent().find(".wcf-item-actions").after(`
              <div class="wcf-item-fields multiple" data-id="${wcfItemFieldsId}" data-bind-id="${bindingBlockId}">
                <input type="text" name="wcf-blocks[${wcfItemBlockId}][${wcfItemFieldsId}][options][field_title]" class="wcf-item-fields-title" placeholder="Заголовок">
                <input type="hidden" name="wcf-blocks[${wcfItemBlockId}][${wcfItemFieldsId}][options][bind_id]" class="wcf-item-fields-bind" value="${bindingBlockId}">
                <input type="text" name="wcf-blocks[${wcfItemBlockId}][${wcfItemFieldsId}][options][ident]" placeholder="Идентификатор" class="wcf-item-fields-ident" value="">
              </div>
              `);
    }
    $(".wcf-item .wcf-item-overlay").fadeOut();
    $("button.binded").removeClass("binded").text("Связать");
  });

  $(".wcf-wrapper").on("click", ".wcf-input-block-fields.radio", function () {
    const fieldIndex = $(this).data("bind-id");

    const bindedFields = $(`.wcf-item-fields[data-bind-id="${fieldIndex}"]`);

    bindedFields
      .closest(".wcf-item")
      .find(`.wcf-item-fields`)
      .addClass("shadow");
    bindedFields.removeClass("shadow");
  });

  $(".wcf-wrapper").on("click", ".wcf-item-bind", function () {
    const nextBlocks = $(this)
      .closest(".wcf-item")
      .nextAll()
      .find(".wcf-item-overlay");

    if (!nextBlocks.length) return;

    if (!$(this).hasClass("binded")) {
      $(this).addClass("binded").text("Отмена");
      nextBlocks.fadeIn();
    } else {
      $(this).removeClass("binded").text("Связать");
      nextBlocks.fadeOut();
    }
  });

  $(".wcf-wrapper").on("click", ".option-item-bind", function () {
    const nextBlocks = $(this)
      .closest(".wcf-item")
      .nextAll()
      .find(".wcf-item-overlay")
      .addClass("option-bind");

    if (!$(this).hasClass("binded")) {
      $(this).addClass("binded").text("Отмена");
      nextBlocks.fadeIn();
    } else {
      $(this).removeClass("binded").text("Связать");
      nextBlocks.fadeOut();
    }
  });

  $(window).on("click", function (e) {
    if (!$(e.target).closest(".wcf-item").length && $("button.binded").length) {
      $(".wcf-item .wcf-item-overlay").fadeOut();
      $("button.binded").removeClass("binded").text("Связать");
    }
  });
});
