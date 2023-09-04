jQuery(document).ready(function ($) {
  AOS.init();

  $(".wcf-item-tooltip").each(function () {
    $(this).qtip({
      content: {
        preserve: true,
        title: $(this).find(".wcf-item-tooltip-title").text(),
        text: $(this).find(".wcf-item-tooltip-description").text(),
      },
      show: {
        delay: 100,
        effect: function () {
          $(this).slideDown(200);
        },
      },
      position: {
        viewport: $(window), // Ограничить подсказку видимой областью окна
        adjust: {
          x: 3,
          y: 2,
        },
      },
      hide: {
        event: "mouseout",
        fixed: true,
      },
    });
  });
});

jQuery(document).ready(function ($) {
  $(".wcf-item-options .wcf-option-field.radio .units").on(
    "click",
    function () {
      const bindId = $(this).data("bind-id");

      $(`.wcf-fields-wrapper[data-bind-id=${bindId}]`)
        .removeClass("shadow")
        .siblings()
        .addClass("shadow");
    }
  );

  $(".wcf-input-wrapper .wcf-input-content input").on("change", function (e) {
    const bindId = $(this).data("field-id");

    toggleBlocksOverlay($(this), "close");
    clearOptionsOtherInputs($(this));

    $(`.wcf-fields-wrapper[data-bind-id="${bindId}"]`)
      .removeClass("shadow")
      .siblings(".wcf-fields-wrapper")
      .addClass("shadow");

    const itemOptions = $(this)
      .closest(".wcf-input-content")
      .next(".wcf-item-options");

    if (itemOptions.length) {
      itemOptions.fadeIn();

      toggleBlocksOverlay($(this), "close");
      isFilledAndToHideOptions(itemOptions);
    } else {
      toggleBlocksOverlay($(this), "open");
    }
  });

  function isFilledAndToHideOptions(options) {
    const allFields = options.find("input, textarea");

    allFields.on("input", function () {
      if (optionInputsIsFilled($(this))) {
        toggleBlocksOverlay($(this), "open");
      } else {
        toggleBlocksOverlay($(this), "close");
      }
    });
  }

  function clearOptionsOtherInputs(elem) {
    const optionsBlocks = $(elem)
      .closest(".wcf-fields")
      .find(".wcf-item-options");

    if (optionsBlocks.length) {
      const inputs = optionsBlocks.find("input, textarea");

      inputs.each(function () {
        if ($(this).attr("type") === "radio") {
          $(this).prop("checked", false);
        } else {
          $(this).val("");
        }
      });

      optionsBlocks.each(function () {
        if ($(this).is(":visible")) {
          $(this).fadeOut();
        }
      });
    }
  }

  function optionInputsIsFilled(elem) {
    let allFilled = true;
    $(elem)
      .closest(".wcf-item-options")
      .find("input[type=text]")
      .each(function () {
        if ($(this).val() === "") {
          allFilled = false;
          return false;
        }
      });

    return allFilled;
  }

  function toggleBlocksOverlay(elem, state) {
    if (state === "open") {
      $(elem)
        .closest(".wcf-block")
        .next()
        .find(".wcf-block-shadow")
        .addClass("disable");

      const content = $(elem)
        .closest(".wcf-block")
        .next()
        .find(".wcf-input-content input[type=checkbox]");

      if (content.length) {
        toggleBlocksOverlay($(elem).closest(".wcf-block").next(), "open");
      }
    }

    if (state === "close") {
      const shadows = $(elem)
        .closest(".wcf-block")
        .nextAll()
        .find(".wcf-block-shadow");

      shadows.removeClass("disable");
      clearFields(shadows);
    }
  }

  function clearFields(shadows) {
    shadows.each(function () {
      $(this)
        .nextAll(".wcf-fields-wrapper")
        .find(".wcf-input-wrapper input")
        .each(function () {
          $(this).prop("checked", false);

          clearOptionsOtherInputs($(this));
        });
    });
  }
});

jQuery(document).ready(function ($) {
  let nextWorkingDate = null;

  $("#datepicker").datepicker({
    dateFormat: "dd/mm/yy", // Формат даты
    minDate: 0, // Запрет выбора дат до текущей даты
    inline: true, // Отображение календаря как встроенного
    beforeShowDay: function (date) {
      // Если текущая дата больше или равна ближайшей доступной дате
      if (date >= nextWorkingDate) {
        return [true, ""]; // Делаем дни начиная с ближайшей доступной даты активными
      }

      // Иначе делаем дни неактивными
      return [false, ""];
    },
    onSelect() {
      $(".wcf-block.total .wcf-block-shadow").addClass("disable");
    },
  });

  function getNextWorkingDate(daysToAdd) {
    const currentDate = new Date();
    while (daysToAdd > 0) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        daysToAdd--;
      }
    }
    return currentDate;
  }

  $(".wcf-calc").on("change", function (e) {
    let timeline = 0;
    if ($(e.target).closest(".wcf-input-wrapper").length) {
      $(".wcf-calc")
        .find("input[type=radio], input[type=checkbox]")
        .each(function () {
          if ($(this).is(":checked")) {
            const value = $(this).data("timeline");
            if (Number.isInteger(value)) {
              timeline = Math.max(timeline, $(this).data("timeline"));
            }
          }
        });

      $(".wcf-calc .wcf-item-options:visible")
        .find("input")
        .each(function () {
          if ($(this).closest(".wcf-option-field.radio").length) {
            if ($(this).is(":checked")) {
              const value = $(this).data("unit-timeline");
              if (Number.isInteger(value)) {
                timeline = Math.max(timeline, value);
              }
            }
          }

          if (
            $(this).closest(".wcf-option-field.input").length ||
            $(this).closest(".wcf-option-field.count").length
          ) {
            const value = $(this).val();
            if (Number.isInteger(value)) {
              timeline = Math.max(
                timeline,
                value * $(this).data("unit-timeline")
              );
            }
          }
        });

      nextWorkingDate = getNextWorkingDate(timeline); // Получаем ближайшую доступную дату с учетом выходных
      $("#datepicker").datepicker("refresh");
    }
  });
});

jQuery(document).ready(function ($) {
  $(".wcf-block.total .amount-nav .minus").on("click", () =>
    changeTotalCount(-1)
  );
  $(".wcf-block.total .amount-nav .plus").on("click", () =>
    changeTotalCount(+1)
  );

  function changeTotalCount(diff) {
    const inputCount = $(".wcf-block.total .amount-nav .count");
    const res = (parseInt(inputCount.val()) || 1) + diff;

    if (res > 0) {
      inputCount.val(res);

      const price = parseInt(sessionStorage.getItem("price") || 0);
      if (price) {
        const totalPrice = Math.round((price * res) / 10) * 10;

        if (totalPrice >= 1000) {
          $(".wcf-block.total .resultCalc").text(totalPrice);
        } else {
          $(".wcf-block.total .resultCalc").text(1000);
        }
      }
    }
  }
});

jQuery(document).ready(function ($) {
  $(".wcf-calc").on("change", function () {
    let weight = 0;

    $(".wcf-calc input[data-weight]").each(function () {
      weight += parseInt($(this).data("weight"));
    });

    if (weight >= 1) {
      $(".weight-wrapper .weight").text(weight);
    } else {
      $(".weight-wrapper .weight").text(1);
    }
  });
});

jQuery(document).ready(function ($) {
  sessionStorage.setItem("price", 0);

  function setPriceFromSizes(result) {
    const thicknessPrice = $(
      ".wcf-fields-wrapper:not(.shadow)[data-ident=thickness] input:checked"
    ).data("price");

    if (result >= 0.5) {
      let price = parseInt(sessionStorage.getItem("price"));
      const totalPrice = roundToNearestMultiple(thicknessPrice * result);
      price += totalPrice;

      sessionStorage.setItem("price", price);
    } else {
      sessionStorage.setItem("price", 450);
    }
  }

  function roundToNearestMultiple(number) {
    return Math.ceil(number / 50) * 50;
  }

  function insertPrice(price) {
    if (price >= 1000) {
      $(".wcf-block.total .resultCalc").text(price);
    } else {
      $(".wcf-block.total .resultCalc").text(1000);
    }
  }

  $(".wcf-calc").on("change", function () {
    sessionStorage.setItem("price", 0);
    calculateAll();
  });

  function calculateAll() {
    const sizesOptions = $(
      ".wcf-fields-wrapper:not(.shadow)[data-ident=sizes] input:checked"
    )
      .closest(".wcf-input-wrapper")
      .find(".wcf-item-options input");

    sizesOptions.each(function () {
      const formType = $(this).data("form-type");

      if (formType === "rectangle" || formType === "figure") {
        let area = $(this)
          .closest(".wcf-item-options")
          .find("input")
          .toArray() // Преобразуем jQuery-коллекцию в массив
          .reduce(function (total, currentInput) {
            const inputValue = parseInt($(currentInput).val(), 10);
            if (!isNaN(inputValue)) {
              return total * inputValue;
            }
            return 0;
          }, 1);

        area = area / (1000 * 1000); // переводим миллиметры в квадртаные метры

        setPriceFromSizes(area);
      }

      if (formType === "circle") {
        const input = $(this).closest(".wcf-item-options").find("input");
        const diameter = parseInt(input.val());

        let area = Math.PI * (diameter / 2) ** 2;
        area = area / (1000 * 1000);

        setPriceFromSizes(area);
      }
    });

    const calcServices = $(".wcf-fields-wrapper:not(.shadow)[data-ident=sizes]")
      .closest(".wcf-block")
      .nextAll()
      .find(".wcf-input-wrapper");

    let result = 0;
    calcServices.each(function () {
      if ($(this).find(".wcf-input-content input").is(":checked")) {
        const inputPrice = parseInt(
          $(this).find(".wcf-input-content input").data("price")
        );

        if (!isNaN(inputPrice)) {
          result += inputPrice;
        }

        const count = $(this).find(".wcf-option-field.count");

        if (count.length) {
          const countInput = count.find("input");
          const countInputVal = parseInt(countInput.val()) || 1;

          if (countInputVal >= countInput.data("unit-limit")) {
            const countInputMin = parseInt(countInput.data("unit-limit-min"));
            const countInputMax = parseInt(countInput.data("unit-limit-max"));

            if (!isNaN(countInputMin)) {
              result += countInputMin;
              countInputVal--;
            }

            if (!isNaN(countInputMax)) {
              result += countInputMax * countInputVal;
            }
          }
        }
      }
    });

    const price = parseInt(sessionStorage.getItem("price"));
    const totalPrice = roundToNearestMultiple(result) + price;
    sessionStorage.setItem("price", totalPrice);

    insertPrice(totalPrice);
  }
});

jQuery(document).ready(function ($) {
  $(".wcf-calc-reset").on("click", function () {
    $(".wcf-calc .wcf-input-content input").each(function () {
      $(this).prop("checked", false);
    });

    $(".wcf-calc .wcf-item-options:visible").hide();

    $(".wcf-calc .wcf-block-shadow").removeClass("disable");

    sessionStorage.setItem("price", 0);
  });

  new Modal();

  $(".wcf-calc .total-submit").on("click", function () {
    let material = [];

    $(".wcf-calc .wcf-input-content input:checked").each(function () {
      if (
        $(this).closest(".wcf-input-wrapper").find("[data-form-type=rectangle]")
          .length ||
        $(this).closest(".wcf-input-wrapper").find("[data-form-type=figure]")
          .length
      ) {
        material.push(
          `${$(this).data("title")}: ${$(this)
            .closest(".wcf-input-content")
            .find(".wcf-input-text")
            .text()}, Размеры: ${$(this)
            .closest(".wcf-input-wrapper")
            .find(".wcf-item-options input")
            .eq(0)
            .val()}x${$(this)
            .closest(".wcf-input-wrapper")
            .find(".wcf-item-options input")
            .eq(1)
            .val()} мм`
        );
      } else if (
        $(this).closest(".wcf-input-wrapper").find("[data-form-type=circle]")
          .length
      ) {
        material.push(
          `${$(this).data("title")}: ${$(this)
            .closest(".wcf-input-content")
            .find(".wcf-input-text")
            .text()}, Диаметр: ${$(this)
            .closest("wcf-input-wrapper")
            .find(".wcf-item-options input")
            .text()}`
        );
      } else {
        material.push(
          `${$(this).data("title")}: ${$(this)
            .closest(".wcf-input-content")
            .find(".wcf-input-text")
            .text()}`
        );
      }
    });

    const materialCount = "Количество: " + $(".wcf-block.total .count").val();
    let materialPrice;
    const price = sessionStorage.getItem("price");

    if (materialPrice >= 1000) {
      materialPrice = "Итоговая цена: " + price;
    } else {
      materialPrice = "Итоговая цена: " + 1000;
    }

    const timeline = `Дата: ${$(
      ".ui-state-default.ui-state-active"
    ).text()} ${$(".ui-datepicker-month").text()}`;
    material.push(timeline);

    material.push(materialCount);
    material.push(materialPrice);

    material.forEach((item, idx) => {
      const contactField = $(`.form-addinitional[name^='material_${idx}']`);

      contactField.val(item);
    });
  });
});
