module.exports = {
    mapResults: function(results) {
        const resultMap = {};

        results.forEach(result => {
            resultMap[result._id] = result;
        });

        return resultMap;
    },

    mpPreferenceParser: function(data, orderId) {
        const preference = {};

        preference.items = data.products.map(item => ({
            title: item.name,
            quantity: item.qty,
            currency_id: 'ARS',
            unit_price: item.price
        }));

        preference.payer = {
            email: data.payer.email,
            first_name: data.payer.firstName,
            last_name: data.payer.lastName,
            identification: {
                type: 'DNI',
                number: data.payer.document.toString()
            },
            address: {
                zip_code: data.payer.address.zipCode.toString(),
                street_name: data.payer.address.streetName,
                street_number: parseInt(data.payer.address.streetNumber)
            },
            phone: {
                area_code: data.payer.phone.areaCode.toString(),
                number: parseInt(data.payer.phone.number)
            }
        };

        preference.external_reference = orderId;
        preference.notification_url = 'http://66.97.35.149:8000/api/mercadopago/notifications';
        preference.back_urls = {
            success: 'http://localhost:8080/',
            pending: 'http://localhost:8080/',
            failure: 'http://localhost:8080/'
        };

        return preference;
    }
};
