import 'jquery-validation';

const ValidatorHelper = {
    isEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/.test(email);
    },
    init(element, rules, message = {}) {
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || ValidatorHelper.isEmail(value);
        }, 'Email is invalid format');

        jQuery.validator.addMethod('passwordCapitalCharacters', function (value, element) {
            const strongRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
            return this.optional(element) || strongRegex.test(value);
        }, 'Password is invalid format');
        $(element).validate({
            ignore: '.ignore',
            focusInvalid: true,
            rules,
            messages: message,
            // Errors
            errorPlacement(error, element) {
                const $parent = $(element).parents('.form-group');
                // Do not duplicate errors
                if ($parent.find('.jquery-validation-error').length > 0) {
                    return;
                }

                $parent.append(
                    error.addClass('jquery-validation-error small form-text invalid-feedback')
                );
            },
            highlight(element) {
                const $el = $(element);
                const $parent = $el.parents('.form-group');
                $el.addClass('is-invalid');
                // Select2 and Tagsinput
                if ($el.hasClass('select2-hidden-accessible') || $el.attr('data-role') === 'tagsinput') {
                    $el.parent().addClass('is-invalid');
                }
            },
            unhighlight(element) {
                $(element).parents('.form-group').find('.is-invalid').removeClass('is-invalid');
            }
        });
    }
};

export default ValidatorHelper;
