var $;

module.exports = ($element, featureFunctionsArray) => {
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

    $element.find('[data-product-additional], [data-featurizer]').each((i, item) => {
        var $item = $(item);
        var additionalDataJSON = $item.data('product-additional') || $item.data('featurizer');

        featureFunctionsArray.forEach(feature => {
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
    return ($element &&
            $element.constructor &&
            $element.constructor.fn &&
            $element.constructor.fn.jquery &&
            $element.length > 0) ? true : false;
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
