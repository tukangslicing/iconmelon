// Generated by CoffeeScript 1.6.2
(function() {
  define('helpers', ['md5'], function(md5) {
    var Helpers;

    Helpers = (function() {
      function Helpers() {}

      Helpers.prototype.getRandom = function(min, max) {
        return Math.floor((Math.random() * ((max + 1) - min)) + min);
      };

      Helpers.prototype.listenLinks = function() {
        return $(document.body).on('click', 'a', function(e) {
          var $it;

          $it = $(this);
          if ($it.attr('target') === '_blank' || $it.attr('href').match(/mailto:/g) || $it.hasClass('js-no-follow')) {
            return;
          }
          e.preventDefault();
          return App.router.navigate($it.attr('href'), {
            trigger: true
          });
        });
      };

      Helpers.prototype.normalizeBoolean = function(val) {
        return (val === 'false') !== (Boolean(val));
      };

      Helpers.prototype.unescape = function(str) {
        return str != null ? str.replace(/\&lt;/g, '<').replace(/\&gt;/g, '>').replace(/\&quot;/g, '"') : void 0;
      };

      Helpers.prototype.generateHash = function() {
        return md5((new Date) + (new Date).getMilliseconds() + Math.random(9999999999999) + Math.random(9999999999999) + Math.random(9999999999999));
      };

      Helpers.prototype.refreshSvg = function() {
        return App.$svgWrap.html(App.$svgWrap.html());
      };

      Helpers.prototype.getFilterIcon = function(direction) {
        var _ref;

        if ((_ref = this.currIconIndex) == null) {
          this.currIconIndex = 0;
        }
        if (direction === '<') {
          this.currIconIndex--;
          this.currIconIndex < 0 && (this.currIconIndex = App.iconsSelected.length - 1);
        } else {
          this.currIconIndex++;
          this.currIconIndex >= App.iconsSelected.length && (this.currIconIndex = 0);
        }
        if (App.iconsSelected[this.currIconIndex]) {
          return App.iconsSelected[this.currIconIndex].split(':')[1];
        } else {
          return this.getStandartIcon(direction);
        }
      };

      Helpers.prototype.getStandartIcon = function(direction) {
        var iconsSource, _ref, _ref1;

        iconsSource = App.sectionsCollectionView.collection.at(0).get('icons');
        if ((_ref = this.currStandartIconIndex) == null) {
          this.currStandartIconIndex = 0;
        }
        if (direction === '<') {
          this.currStandartIconIndex--;
          this.currStandartIconIndex < 0 && (this.currStandartIconIndex = iconsSource.length - 1);
        } else {
          this.currStandartIconIndex++;
          this.currStandartIconIndex >= iconsSource.length && (this.currStandartIconIndex = 0);
        }
        return ((_ref1 = iconsSource[this.currStandartIconIndex]) != null ? _ref1.hash : void 0) || 'tick-icon';
      };

      Helpers.prototype.upsetSvgShape = function(o) {
        var $shape, i, isLoaded;

        isLoaded = false;
        if (o.isReset) {
          App.$svgWrap.find("#" + o.hash).remove();
        }
        if (o.isCheck) {
          i = 0;
          while (i < App.loadedHashes.length) {
            if (String(App.loadedHashes[i]) === String(o.hash)) {
              isLoaded = true;
              i = App.loadedHashes.length;
            }
            i++;
          }
        }
        if (!isLoaded) {
          $shape = $('<g>').html(o.shape).attr('id', o.hash);
          $shape.find('*').each(function(i, child) {
            var $child;

            $child = $(child);
            if (!o.isMulticolor) {
              if ($child.attr('fill') !== 'none') {
                return $child.removeAttr('fill');
              }
            }
          });
          o.$shapes.append($shape);
          return App.loadedHashes.push(o.hash);
        }
      };

      Helpers.prototype.addToSvg = function($shapes) {
        App.$svgWrap.find('#svg-source').append($shapes.html());
        return this.refreshSvg();
      };

      Helpers.prototype.toggleArray = function(array, item, isSingle) {
        var indexOfItem, newArray;

        if (array == null) {
          return void 0;
        }
        newArray = array.slice(0);
        indexOfItem = _.indexOf(newArray, item);
        if (indexOfItem === -1) {
          newArray.push(item);
        } else {
          if (isSingle) {
            newArray.splice(indexOfItem, 1);
          } else {
            newArray = _.without(newArray, item);
          }
        }
        return newArray;
      };

      return Helpers;

    })();
    return new Helpers;
  });

}).call(this);
