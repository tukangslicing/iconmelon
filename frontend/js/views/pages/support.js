// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('views/pages/support', ['views/pages/PageView'], function(PageView) {
    var Support, _ref;

    Support = (function(_super) {
      __extends(Support, _super);

      function Support() {
        _ref = Support.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Support.prototype.template = '#support-page-template';

      Support.prototype.className = 'support-p';

      Support.prototype.render = function() {
        Support.__super__.render.apply(this, arguments);
        this.$el.addClass('animated fadeInDown');
        this.$monthly = this.$('.js-monthly');
        this.$budget = this.$('.js-budget');
        this.$timeLeft = this.$('.js-time-left');
        this.setCounters();
        return this;
      };

      Support.prototype.setCounters = function() {
        var _this = this;

        return $.ajax({
          type: 'get',
          url: '/budget-counters',
          success: function(data) {
            var timeLeft;

            _this.$budget.text(data.budget);
            _this.$monthly.text(data.monthly);
            timeLeft = ~~data.budget / ~~data.monthly;
            return _this.$timeLeft.text(~~(timeLeft < 0 ? 0 : timeLeft));
          },
          error: function(e) {
            return console.error(e);
          }
        });
      };

      return Support;

    })(PageView);
    return Support;
  });

}).call(this);
