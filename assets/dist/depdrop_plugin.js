function depDrop(selector, depends, url) {
    this.depField = document.getElementById(selector);
    this.depends = depends;
    this.url = url;

    var $this = this;

    this.init = function () {
        this.initEvents();

        console.log('Ready!');
    };

    this.initEvents = function () {
        $.each(this.depends, function (index, selector) {
            var dependInput = document.getElementById(selector);
            if (dependInput !== null) {
                dependInput.addEventListener('change', function (event) {
                    $this.getOptions(event.target);
                });
            }
        });

        this.getOptions();
    };

    this.getOptions = function (el) {
        if (this.checkReady()) {
            $.ajax({
                url: $this.url,
                type: 'post',
                data: this.populateData(),
                success: function (response) {
                    console.log('loaded!');

                    $($this.depField)
                        .find('option')
                        .remove();

                    $.each(response.output, function (index, value) {
                        $($this.depField)
                            .find('option')
                            .end()
                            .append('<option value="' + value.id + '">' + value.name + '</option>')
                            .val('whatever')
                    });

                    if (response.selected) {
                        // $($this.depField).val(response.selected).trigger('change');
                        $this.depField.value = response.selected;
                        $this.depField.dispatchEvent(new Event('change'));
                    }
                }
            });
        }
    };

    this.populateData = function () {
        var data = {},
            all_params = {};

        $.each(this.depends, function (index, value) {
            var el = document.getElementById(value);

            if (el !== null) {
                all_params[el.id] = el.value;
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
    }
}
