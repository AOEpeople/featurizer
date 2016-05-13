var featurizer = require('./../src/featurizer');

describe('Featurizer', () => {
    var $,
        $context,
        spy,
        spy2;

    beforeEach(function(done) {
        spy  = jasmine.createSpy('featureFunction');
        spy2 = jasmine.createSpy('featureFunction2');

        require('./helper/jQuery')(function(jQuery) {
            $ = jQuery;
            $context = $('<div><span id="elementOne" data-featurizer=\'{"someProperty": "yay"}\'></span>' +
                         '<span id="elementTwo" data-product-additional=\'{"someProperty": "yay", "someMore": "nay"}\'></span></div>');
            done();
        });
    });

    it('should log if no features passed in', () => {
        var logSpy = spyOn(console, 'log');

        featurizer($);

        expect(logSpy).toHaveBeenCalledWith('No features passed. Nothing todo. Bye.');
    });

    it('should error if no jQuery element passed in', () => {
        var errorSpy = spyOn(console, 'error');

        featurizer(undefined, [() => {}]);

        expect(errorSpy).toHaveBeenCalledWith('First param needs to be a jQuery element. Bye.');
    });

    it('should call the feature functions as often as elements are there', () => {
        featurizer($context, [spy, spy2]);

        expect(spy.callCount).toEqual(2);
        expect(spy2.callCount).toEqual(2);
    });

    it('should only call a feature with required fields if the required fields are present', () => {
        spy.requiredFields = ['someProperty'];
        spy2.requiredFields = ['someOtherProperty'];

        featurizer($context, [spy, spy2]);

        expect(spy.callCount).toEqual(2);
        expect(spy2.callCount).toEqual(0);
    });

    it('should pass the domNode to the feature', () => {
        featurizer($context, [spy]);

        expect($(spy.calls[0].args[0]).attr('id')).toEqual('elementOne');
        expect($(spy.calls[1].args[0]).attr('id')).toEqual('elementTwo');
    });

    it('should pass the additional data json to the feature', () => {
        featurizer($context, [spy]);

        expect(spy.calls[0].args[1].someProperty).toBeTruthy();
        expect(spy.calls[0].args[1].someMore).toBeFalsy();

        expect(spy.calls[1].args[1].someProperty).toBeTruthy();
        expect(spy.calls[1].args[1].someMore).toBeTruthy();
    });
});

