<?php
add_action('wpcf7_before_send_mail', 'custom_cf7_before_send_mail');

function custom_cf7_before_send_mail($contact_form) {
    $submission = WPCF7_Submission::get_instance();

    if ($submission) {
        $posted_data = $submission->get_properties();

        // Измените значение скрытого поля
        $new_value = 'новое_значение';
        $posted_data['additional_data'] = $new_value;

        // Установите измененные данные в объект Submission
        $submission->set_properties($posted_data);
    }
}