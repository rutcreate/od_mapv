<?php

/**
 * Settings form.
 */
function od_mapv_settings_form() {
  $form['od_mapv_display_fs'] = array(
    '#type' => 'fieldset',
    '#title' => t('Display options'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['od_mapv_display_fs']['od_mapv_display_filter'] = array(
    '#type' => 'checkbox',
    '#title' => t('Filter'),
    '#default_value' => variable_get('od_mapv_display_filter', OD_MAPV_DEFAULT_DISPLAY_FILTER),
  );
  $form['od_mapv_display_fs']['od_mapv_display_content'] = array(
    '#type' => 'checkbox',
    '#title' => t('Content'),
    '#default_value' => variable_get('od_mapv_display_content', OD_MAPV_DEFAULT_DISPLAY_CONTENT),
  );
  $form['od_mapv_display_fs']['od_mapv_display_width'] = array(
    '#type' => 'textfield',
    '#title' => t('Width'),
    '#default_value' => variable_get('od_mapv_display_width', OD_MAPV_DEFAULT_DISPLAY_WIDTH),
  );
  $form['od_mapv_display_fs']['od_mapv_display_height'] = array(
    '#type' => 'textfield',
    '#title' => t('Height'),
    '#default_value' => variable_get('od_mapv_display_height', OD_MAPV_DEFAULT_DISPLAY_HEIGHT),
  );
  $form['od_mapv_display_fs']['od_mapv_display_title'] = array(
    '#type' => 'textfield',
    '#title' => t('Head title'),
    '#default_value' => variable_get('od_mapv_display_title', 'od_mapv'),
  );
  $form['od_mapv_text'] = array(
    '#type' => 'fieldset',
    '#title' => t('Text'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['od_mapv_text']['od_mapv_text_tooltip'] = array(
    '#type' => 'textfield',
    '#title' => t('Tooltip'),
    '#description' => t('This text will be the suffix of tooltip text.'),
    '#default_value' => variable_get('od_mapv_text_tooltip', ''),
  );
  $form['od_mapv_text']['od_mapv_text_result'] = array(
    '#type' => 'textfield',
    '#title' => t('Result'),
    '#description' => t('!search is a text search. !number is number of items found.'),
    '#default_value' => variable_get('od_mapv_text_result', t('Result in !search found !number'))
  );
  $form['od_mapv_src'] = array(
    '#type' => 'fieldset',
    '#title' => t('Source'),
    '#collapsible' => TRUE,
  );
  $form['od_mapv_src']['od_mapv_file_path'] = array(
    '#type' => 'textfield',
    '#title' => t('DB csv filepath'),
    '#default_value' => variable_get('od_mapv_file_path', OD_MAPV_DEFAULT_FILE_PATH),
  );
  $form['od_mapv_src']['od_mapv_map_file_path'] = array(
    '#type' => 'textfield',
    '#title' => t('Map SVG filepath'),
    '#default_value' => variable_get('od_mapv_map_file_path', OD_MAPV_DEFAULT_MAP_FILE_PATH),
  );
  $form['od_mapv_src']['od_mapv_swf_file_path'] = array(
    '#type' => 'textfield',
    '#title' => t('Map SWF filepath'),
    '#default_value' => variable_get('od_mapv_swf_file_path', OD_MAPV_DEFAULT_SWF_FILE_PATH),
  );
  $form['od_mapv_src']['od_mapv_type'] = array(
    '#type' => 'select',
    '#title' => t('From content type'),
    '#options' => array('' => '- None -') + node_get_types('names'),
    '#default_value' => variable_get('od_mapv_type', NULL),
  );
  $form['od_mapv_link_path'] = array(
    '#type' => 'textfield',
    '#title' => t('Link path to map'),
    '#default_value' => variable_get('od_mapv_link_path', 'od_mapv'),
  );
  $form = system_settings_form($form);
  $form['#submit'][] = 'od_mapv_settings_form_submit';
  return $form;
}

/**
 * Settings form submit.
 */
function od_mapv_settings_form_submit($form, $form_state) {
  if (variable_get('od_mapv_link_path', 'od_mapv') != $form_state['values']['od_mapv_link_path'] || 
      variable_get('od_mapv_display_title', 'od_mapv') != $form_state['values']['od_mapv_display_title']) {
    cache_clear_all();
  }
}
