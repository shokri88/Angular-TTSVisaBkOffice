!(function (i) {
    "use strict";
    function a() {}
    (a.prototype.init = function () {
        i(".select2").select2(), i(".select2-limiting").select2({ maximumSelectionLength: 2 });
        var e = {};
        i('[data-toggle="touchspin"]').each(function (a, n) {
            var t = i.extend({}, e, i(n).data());
            i(n).TouchSpin(t);
        }),
            i("input[name='demo3_21']").TouchSpin({ initval: 40, buttondown_class: "btn btn-primary", buttonup_class: "btn btn-primary" }),
            i("input[name='demo3_22']").TouchSpin({ initval: 40, buttondown_class: "btn btn-primary", buttonup_class: "btn btn-primary" }),
            i("input[name='demo_vertical']").TouchSpin({ verticalbuttons: !0 }),
            i("input#defaultconfig").maxlength({ warningClass: "badge bg-info", limitReachedClass: "badge bg-warning" }),
            i("input#thresholdconfig").maxlength({ threshold: 20, warningClass: "badge bg-info", limitReachedClass: "badge bg-warning" }),
            i("input#moreoptions").maxlength({ alwaysShow: !0, warningClass: "badge bg-success", limitReachedClass: "badge bg-danger" }),
            i("input#alloptions").maxlength({ alwaysShow: !0, warningClass: "badge bg-success", limitReachedClass: "badge bg-danger", separator: " out of ", preText: "You typed ", postText: " chars available.", validate: !0 }),
            i("textarea#textarea").maxlength({ alwaysShow: !0, warningClass: "badge bg-info", limitReachedClass: "badge bg-warning" }),
            i("input#placement").maxlength({ alwaysShow: !0, placement: "top-left", warningClass: "badge bg-info", limitReachedClass: "badge bg-warning" });
    }),
        (i.AdvancedForm = new a()),
        (i.AdvancedForm.Constructor = a);
})(window.jQuery),
    (function () {
        "use strict";
        window.jQuery.AdvancedForm.init();
    })();
