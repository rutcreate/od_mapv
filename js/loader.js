var DataLoader = function(selector) {
  this.base_path = Drupal.settings.basePath;
  this.svg = null;
  this.map_data = null;
  this.full_data = null;
  this.region = jQuery('select#od_mapv_region');
  this.map = jQuery('#od_mapv_map');
  this.tooltip = jQuery('#od_mapv_map-tooltip');
  this.province = jQuery('select#od_mapv_province');
  this.search = jQuery('input#od_mapv_search');
  this.button = jQuery('input#od_mapv_submit');
  this.result = jQuery('#od_mapv_result');
  this.loading = jQuery('#od_mapv_loading');
  this.footer = jQuery('#footer');
  this.pager = jQuery('#od_mapv_pager');
  this.body = jQuery('body');
  this.current_page = 1;
  this.pagesize = 10;
  this.placeholder = 'Search';
  var req_data_path = "od_mapv/data";
  var url_last = window.location.href.split("/").pop();
  if (isFinite(url_last)) {
    req_data_path = req_data_path + "/"+  url_last;
  }
  this.init = function() {
    // Result.
    jQuery.getJSON(Drupal.settings.basePath + req_data_path, {'type': 'regions'}, function(result) {
      
      // Add region.
      for (var region in result) {
        jQuery('<option value="'+ region + '">'+ region + '</option>').appendTo(self.region);
      }
      
      // onChange region select.
      self.region.change(function() {
        // Remove all items except all.
        self.province.children(':not(.all)').remove();
        // If select all.
        if (this.value == '') {
          // Hide provinces select.
          self.province.hide();
          self.province.siblings('label.label_province').hide();
        }
        // If select some region.
        else if (result[this.value] != null) {
          // Populate province from region.
          /* Rutz multi-line comment.[
          for (var province in result[this.value]) {
            jQuery('<option value="'+ province + '">'+ province + '</option>').appendTo(self.province);
          }
          self.province.show();
          self.province.siblings('label.label_province').show();*/
        }
      });
      
      // onClick search button.
      self.button.click(function(e) {
        self.filter(1, self.region.val(), self.province.val(), self.search.val());
      });
      
      // Init result.
      self.filter(1, self.region.val(), self.province.val(), self.search.val());
      
      // Placeholder search textbox.
      var is_typed = false;
      self.search.css({'color': '#999'});
      self.search.focus(function() {
        if (this.value == self.placeholder) {
          this.value = '';
        }
        this.style.color = '#000';
      }).blur(function() {
        if (this.value == '') {
          this.style.color = '#999';
          this.value = self.placeholder;
        }
      });
      self.search.val(self.placeholder);
      
    });
    
    // Map data.
    jQuery.getJSON(Drupal.settings.basePath + req_data_path, { type: 'map' }, function(result) {
      self.map_data = result;
      
      // Draw map.
      jQuery('#od_mapv_map').svg({onLoad: self.drawMap});
    });
    
    
    
  };
  
  this.drawMap = function(svg) {
    // Load map.
    // svg.load(Drupal.settings.od_mapv.path + '/res/map.svg?r='+Math.random(), function() {
    svg.load(Drupal.settings.od_mapv.map_path + '?r='+Math.random(), function() {
      jQuery('#od_mapv_map svg path').each(function(i, obj) {
        var $obj = jQuery(obj);
        if (obj.id) {
          // Split data to region and province.
          var tmp = obj.id.split('_');
          var region = tmp[0];
          var province = tmp[1];
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
          // Filter region and province when click.
          $obj.click(function(e) {
            
            self.body.removeClass('north south northeast central unknown').addClass(rclass);
            // Set select filter.
            self.region.val(region);
            self.region.trigger('change');
            // Rutz. comment the line below.
            //self.province.val(province);
            // Clear search value.
            self.search.val('');
            // Submit filter
            self.button.trigger('click');
            //self.filter(1, region, province, '');
            
          })
          // MouseEnter event.
          .mouseenter(function(e) {
            self.tooltip.removeClass('north south northeast central unknown').addClass(rclass);
            $obj.css({'opacity': 1.0, 'cursor': 'pointer'});
            self.setTooltip(region, province);
          })
          // MouseLeave event.
          .mouseleave(function(e) {
            if (obj.id.indexOf('path') == -1) {
              $obj.css({'opacity': 0.5, 'cursor': 'auto'});
            }
            self.tooltip.hide();
          });
        }
        if (obj.id.indexOf('path') == -1) {
          $obj.css('opacity', 0.5);
        }
      });
    });
  };
  
  this.filter = function(page, region, province, text) {
    
    if (text == this.placeholder) text = '';
    
    var params = {
      'type': 'result',
      'region': region,
      'province': province,
      'text': text,
      'pagesize': this.pagesize,
      'page': page
    };
    
    // Display loading.
    this.loading.show();
    
    // Begin filter.
    jQuery.getJSON(Drupal.settings.basePath + req_data_path, params, function(result) {
      // Replace HTML.
      self.result.parent().hide();
      self.result.html(result.result);
      self.pager.html(result.pager);
      self.result.parent().fadeIn();
      
      // Add event to more button.
      /*jQuery('.temple-more', self.result).click(function(e) {
        var detail = jQuery(this).parent().parent().siblings('.more-detail');
        var display = detail.css('display');
        if (display == "none" || display == '' ) {
          jQuery(this).removeClass('arrow-right').addClass('arrow-down');
          jQuery(detail).slideDown(500);
        } 
        else {
          jQuery(this).removeClass('arrow-down').addClass('arrow-right');
          jQuery(detail).slideUp(500);
        }
      });*/
      jQuery('.result-item', self.result).click(function(e) {
        var detail = jQuery(this).children('.more-detail');
        var display = detail.css('display');
        if (display == "none" || display == '' ) {
          detail
            .siblings('.item-rows')
            .children('.column-3')
            .children('.temple-more')
            .removeClass('arrow-right')
            .addClass('arrow-down');
          jQuery(detail).slideDown(500);
        } 
        else {
          detail
            .siblings('.item-rows')
            .children('.column-3')
            .children('.temple-more')
            .removeClass('arrow-down')
            .addClass('arrow-right');
          jQuery(detail).slideUp(500);
        }
      });
      
      // Add event to pager.
      self.pager.find('a').click(function(e) {
        var paths = jQuery(this).attr('href').split('/');
        self.filter(paths[paths.length-1], region, province, text);
        jQuery(this).parent().siblings('.loading').show();
        e.preventDefault();
      });
      
      // Hide loading.
      self.loading.hide();
    });
  };
  
  this.setTooltip = function(region, province) {
    var number = 0;
    if (this.map_data[region][province] != undefined) {
      number = this.map_data[region][province]['count'];
    }
    else if (this.map_data[region] != undefined) {
      for (i in this.map_data[region]) {
        number = number + parseInt(this.map_data[region][i]['count']);
      }
    }
    if (typeof(Drupal.settings.od_mapv.tooltip) != 'undefined') {
      number = number + ' ' + Drupal.settings.od_mapv.tooltip;
    }
    this.tooltip
      // Rutz. change province to region.
      .children('.province').html(region).end()
      .children('.count').html(number).end()
      .show();
  };
  
  this.setMap = function() {
    
  };
  
  this.debug = function(msg) {
    this.footer.append('<span>'+msg+'</span>');
  }
  
  var self = this;
};
