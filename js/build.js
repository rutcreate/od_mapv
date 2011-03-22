var loader;
jQuery(document).ready(function() {
  // Loader.
  loader = new DataLoader();
  loader.init();
  // IE pngFix.
  //jQuery(document).pngFix();
});

function flashShowTooltip(region, province) {
  var rclass = '';
  // Add class to body
  switch (region) {
    case 'ภาคเหนือ':
      rclass = 'north';
    break;
    case 'ภาคใต้':
      rclass = 'south';
    break;
    case 'ภาคอีสาน':
      rclass = 'northeast';
    break;
    case 'ภาคกลาง':
      rclass = 'central';
    break;
    default:
      rclass = 'unknown';
    break;
  }
  loader.tooltip.removeClass('north south northeast central unknown').addClass(rclass);
  loader.setTooltip(region, province);
}

function flashHideTooltip() {
  loader.tooltip.hide();
}

function flashSetFilter(region, province) {
  var rclass = '';
  // Add class to body
  switch (region) {
    case 'ภาคเหนือ':
      rclass = 'north';
    break;
    case 'ภาคใต้':
      rclass = 'south';
    break;
    case 'ภาคอีสาน':
      rclass = 'northeast';
    break;
    case 'ภาคกลาง':
      rclass = 'central';
    break;
    default:
      rclass = 'unknown';
    break;
  }
  loader.body.removeClass('north south northeast central unknown').addClass(rclass);
  // Set filter.
  loader.region.val(region);
  loader.region.trigger('change');
  loader.province.val(province);
  // Clear search value.
  loader.search.val('');
  // Submit filter
  loader.button.trigger('click');
}
