+function ($) {
  'use strict';

  var CheckboxLimiter = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, CheckboxLimiter.DEFAULTS, options)
    this.$items    = this.options.items || this.$element.find('input[type=checkbox]')
    this.init()
  }

  CheckboxLimiter.DEFAULTS = {
    limitcheckbox: 5
  }

  CheckboxLimiter.prototype.init = function() {
    this.updateItems()
    this.bind()
  }

  CheckboxLimiter.prototype.updateItems = function() {
    var $items = this.$items;
    console.log($items)
    $items.not(':checked')
      .attr('disabled', $items.filter(':checked').length >= this.options.limitcheckbox)
  }

  CheckboxLimiter.prototype.bind = function() {
    var that = this
    this.unbind() // prevents adding event twice
    this.$items
    .bind('click.checkboxlimiter', function () {
      that.updateItems()
    })
  }

  CheckboxLimiter.prototype.unbind = function() {
    this.$items.unbind('click.checkboxlimiter')
  };

  // Plugin definition

  $.fn.checkboxlimiter = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('checkboxlimiter')
      var options = $.extend({}, CheckboxLimiter.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : false // gives access to methods

      if (!data) $this.data('checkboxlimiter', (data = new CheckboxLimiter(this, options)))
      if (action) data[action]()
    })
  }

  $.fn.checkboxlimiter.Constructor = CheckboxLimiter


  // Data API

  $(window).load(function () {
    $('.checkboxlimiter').each(function () {
      var $cl = $(this)
      $cl.checkboxlimiter($cl.data())
    })
  })

}(jQuery);
