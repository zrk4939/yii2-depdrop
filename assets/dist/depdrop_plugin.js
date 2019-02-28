function depDrop(selector, depends, url) {
    this.depField = document.getElementById(selector);
    this.depends = depends;
    this.url = url;

    var $this = this;

    var $event = new Event('change');

    this.init = function () {
        this.depField.setAttribute('disabled', true);

        this.initEvents();

        // console.log('Ready!');
    };

    this.initEvents = function () {
        for (i = 0; i < this.depends.length; i++) {
            $('#' + this.depends[i]).on('change', function (event) {
                $this.getOptions(event.target);
            });
        }

        this.getOptions();
    };

    this.getOptions = function (el) {
        if (this.beforeSend() && this.checkReady()) {
            $.ajax({
                url: $this.url,
                type: 'post',
                data: this.populateData(),
                success: function (response) {
                    // console.log('loaded!');

                    $this.removeOldOptions();

                    $.each(response.output, function (index, value) {
                        $($this.depField)
                            .find('option')
                            .end()
                            .append('<option value="' + value.id + '">' + value.name + '</option>')
                            .val(response.selected)
                            .prop('disabled', false)
                    });

                    if (response.selected) {
                        $($this.depField).val(response.selected).trigger('change');
                    }
                }
            });
        }
    };

    this.beforeSend = function () {
        var cleanOut = false;

        $.each(this.depends, function (index, selector) {
            var el = document.getElementById(selector);

            if (el === null || el.value === "") {
                cleanOut = true;
            }
        });

        if (cleanOut && this.depField && !this.depField.getAttribute('disabled')) {
            $($this.depField).val(response.selected).prop('disabled').trigger('change');

            console.log('cleared!');
        }

        return !cleanOut;
    };

    this.removeOldOptions = function () {
        $($this.depField).find('option').filter(function () {
            return $(this).attr('value') !== '';
        }).remove();
    };

    this.populateData = function () {
        var data = {},
            all_params = {};

        $.each(this.depends, function (index, value) {
            var el = document.getElementById(value);

            if (el !== null) {
                all_params[el.id] = el.value;

                if (el.name.match(/\[\w+\]/i)) {
                    var attr = el.name.replace(/^.*?\[(.*?)\]$/i, '$1'),
                        modelName = el.name.replace(/^(.*?)\[.*?\]$/i, '$1');

                    if (typeof data[modelName] === 'undefined') {
                        data[modelName] = {};
                    }

                    data[modelName][attr] = el.value;
                }
            }
        });

        data['depdrop_all_params'] = all_params;

        return data;
    };

    this.checkReady = function () {
        var ready = true;

        $.each(this.depends, function (index, selector) {
            var el = document.getElementById(selector);

            if (el === null || el.value === "") {
                ready = false;
            }
        });

        return ready;
    };
}
