var $;

module.exports = function($element, featureFunctionsArray) {
    if (!featureFunctionsArray) {
        console.log('No features passed. Nothing todo. Bye.');
        return;
    }

    if (!isJqueryObjectAndContainsElements($element)) {
        console.error('First param needs to be a jQuery element. Bye.');
        return;
    }

    // get used jQuery from jQuery element
    $ = $element.constructor;

    $element.find('[data-product-additional]').each(function(i, item) {
        var $item = $(item);
        var additionalDataJSON = $item.data('product-additional');

        // TODO: Check if reverse() makes sense to get most important features to the top
        $(featureFunctionsArray).each(function(i, feature) {
            if (!feature.requiredFields) {
                feature($item, additionalDataJSON);
            }

            // TODO: Document that features CAN have requiredFields
            if (feature.requiredFields && allRequiredFieldsFilled(feature, additionalDataJSON)) {
                feature($item, additionalDataJSON);
            }
        });
    });
};

function isJqueryObjectAndContainsElements($element) {
    if ($element && $element.constructor && $element.constructor.fn && $element.constructor.fn.jquery) {
        if ($element.length > 0) {
            return true;
        }
    }
    return false;
}

function allRequiredFieldsFilled(feature, additionalDataJSON) {
    for (var i = 0; i < feature.requiredFields.length; i++) {
        var requiredField = feature.requiredFields[i];

        // don't call the feature if one of the fields is not filled
        if (!additionalDataJSON[requiredField] || additionalDataJSON[requiredField] === '') {
            return false;
        }
    }
    return true;
}
