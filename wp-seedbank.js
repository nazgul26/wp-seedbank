WP_SEEDBANK = {};
WP_SEEDBANK.UI = {};

// User Interface functions.
WP_SEEDBANK.UI.attachDatepicker = function () {
    var x = jQuery('.datepicker');
    if (x.length) {
        x.each(function () {
            jQuery(this).datepicker();
        });
    }
};

WP_SEEDBANK.UI.setupExchangePostVisibilityButton = function (state) {
    var showHideButton = document.createElement('button');
    showHideButton.setAttribute("class", "button" );
    showHideButton.innerHTML = state + ' Deleted Seed Exchanges';
    
    jQuery(showHideButton).click(function (e) {
        e.preventDefault();
        WP_SEEDBANK.UI.toggleDeletedExchangePostVisibility(state);
        if (state == "Hide") {
            WP_SEEDBANK.UI.setupExchangePostVisibilityButton('Show');
        } else {
            WP_SEEDBANK.UI.setupExchangePostVisibilityButton('Hide');
        }
        jQuery(this).remove();
    });
    
    var x = document.getElementById('post-query-submit');
    if (x && x.parentNode) {
        x.parentNode.appendChild(showHideButton);
    }
};

WP_SEEDBANK.UI.toggleDeletedExchangePostVisibility = function (state) {
    jQuery('.taxonomy-seedbank_exchange_status').each(function() {
        if (state == "Hide") {
            if(jQuery(this).text() != "Active") {
                jQuery(this).parent().hide();
            }
        } else {
            if(jQuery(this).text() == "Deleted") {
                jQuery(this).parent().show();
            }
        }
    });
}

WP_SEEDBANK.UI.toggleBatchExchangeDataSource = function () {
    jQuery('#seedbank-batch-exchange-file-upload').hide();
    jQuery('#seedbank-batch-exchange-data-source').change(function (e) {
        var x = e.target.querySelectorAll('option');
        for (var i = 0; i < x.length; i++) {
            if (x[i].selected) {
                switch (x[i].value) {
                    case 'another website':
                        jQuery('#seedbank-batch-exchange-file-upload').hide();
                        jQuery('#seedbank-batch-exchange-web-fetch').show();
                    break;
                    case 'my computer':
                        jQuery('#seedbank-batch-exchange-file-upload').show();
                        jQuery('#seedbank-batch-exchange-web-fetch').hide();
                    break;
                }
            }
        }
    });
}

WP_SEEDBANK.UI.prefillScientificName = function () {
    var el = (jQuery('.taxonomy-seedbank_scientific_name #parent').length)
        ? jQuery('.taxonomy-seedbank_scientific_name #parent')
        : jQuery('#newseedbank_scientific_name_parent');
    el.change(function () {
        var x = jQuery(this);
        var n = x.children('option:selected').text().trim();
        var t;
        if (jQuery('#newseedbank_scientific_name').length) {
            var t = jQuery('#newseedbank_scientific_name');
        } else if (jQuery('#tag-name').length) {
            var t = jQuery('#tag-name');
        } else if (jQuery('#name').length) {
            var t = jQuery('#name');
        }
        // If not "None" or does not begin with what's being selected
        if (x.val().trim() !== '-1' && t.val().trim().indexOf(n) !== 0) {
            t.val(n + ' ' + t.val());
        }
    });
};

WP_SEEDBANK.init = function () {
    // TODO: Run these only on the appropriate page.
    WP_SEEDBANK.UI.attachDatepicker();
    WP_SEEDBANK.UI.toggleBatchExchangeDataSource();
    // TODO: Filter these out of the result set from the PHP at some point, eh?
    WP_SEEDBANK.UI.toggleDeletedExchangePostVisibility('Hide');
    WP_SEEDBANK.UI.setupExchangePostVisibilityButton('Show');
    WP_SEEDBANK.UI.prefillScientificName();
};

window.addEventListener('DOMContentLoaded', WP_SEEDBANK.init);
