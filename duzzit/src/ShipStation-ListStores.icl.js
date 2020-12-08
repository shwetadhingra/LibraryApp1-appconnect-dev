component "ShipStation - List Stores" {
    inputs ("Show Inactive Stores":text, 
            "Marketplace Id":text)
    outputs ("success":bool, 
            "error":text, 
            "count":number, 
            "status":text, 
            "object":list [
                "storeId":text, 
                "storeName":text, 
                "marketplaceId":text, 
                "marketplaceName":text, 
                "accountName":text, 
                "email":text, 
                "integrationUrl":text, 
                "active":text, 
                "companyName":text, 
                "phone":text, 
                "publicEmail":text, 
                "website":text, 
                "refreshDate":text, 
                "lastRefreshAttempt":text, 
                "createDate":text, 
                "modifyDate":text, 
                "autoRefresh":text ], 
            "urlparms":text, 
            "xml":text)
    {
        /* Step 1 Setup URL Parameters */
        if ($(Show Inactive Stores) NBLANK *blank* AND $(Marketplace Id) BLANK *blank*) {
            append "?showInactive=" to $(urlparms);
        }

        /* Step 2  Setup URL Parameters */
        if ($(Show Inactive Stores) NBLANK *blank* AND $(Marketplace Id) NBLANK *blank*) {
            append "?showInactive=&marketplaceId=" to $(urlparms);
        }

        /* Step 3 Setup URL Parameters */
        if ($(Show Inactive Stores) BLANK *blank* AND $(Marketplace Id) NBLANK *blank*) {
            append "?marketplaceId=" to $(urlparms);
        }

        /* Step 4 Call ShipStation API */
        {
            http get "https://ssapi.shipstation.com/stores" with {
                    "Headers": "Authorization: Basic ",
                    "Sample Response": `
                        [
                          {
                            "storeId": 22766,
                            "storeName": "ShipStation Manual Store",
                            "marketplaceId": 0,
                            "marketplaceName": "ShipStation",
                            "accountName": null,
                            "email": null,
                            "integrationUrl": null,
                            "active": true,
                            "companyName": "",
                            "phone": "",
                            "publicEmail": "testemail@email.com",
                            "website": "",
                            "refreshDate": "2014-12-03T11:46:11.283",
                            "lastRefreshAttempt": "2014-12-03T11:46:53.433",
                            "createDate": "2014-07-25T11:05:55.307",
                            "modifyDate": "2014-11-12T08:45:20.55",
                            "autoRefresh": false
                          },
                          {
                            "storeId": 25748,
                            "storeName": "Ashley's Test WooCommerce",
                            "marketplaceId": 36,
                            "marketplaceName": "WooCommerce",
                            "accountName": null,
                            "email": null,
                            "integrationUrl": "http://shipstation.wpengine.com/",
                            "active": true,
                            "companyName": "",
                            "phone": "",
                            "publicEmail": "",
                            "website": "",
                            "refreshDate": "2014-11-26T22:28:14.07",
                            "lastRefreshAttempt": "2014-11-26T14:28:14.07",
                            "createDate": "2014-11-10T08:53:48.077",
                            "modifyDate": "2014-12-03T14:53:50.557",
                            "autoRefresh": true
                          }
                        ]
                        `
                };
            set $(ssapi.shipstation.com:http-response) into $(xml) with {
                    "Transform": "xml"
                };
        }

        /* Step 5 */
        if ($(ssapi.shipstation.com:http-status) NE "200") {
            set false into $(success);
            set "Could not get store  : " into $(error);
        }

        /* Step 6 */
        loop for ${json:object} in ${json:array} {
            /* Step 6-1 */
            {
                list-insert $(object);
                set ${json:object.storeId} into $(storeId);
                set ${json:object.storeName} into $(storeName);
                set ${json:object.marketplaceId} into $(marketplaceId);
                set ${json:object.marketplaceName} into $(marketplaceName);
                set ${json:object.accountName} into $(accountName);
                set ${json:object.email} into $(email);
                set ${json:object.integrationUrl} into $(integrationUrl);
                set ${json:object.active} into $(active);
                set ${json:object.companyName} into $(companyName);
                set ${json:object.phone} into $(phone);
                set ${json:object.publicEmail} into $(publicEmail);
                set ${json:object.website} into $(website);
                set ${json:object.refreshDate} into $(refreshDate);
                set ${json:object.lastRefreshAttempt} into $(lastRefreshAttempt);
                set ${json:object.createDate} into $(createDate);
                set ${json:object.modifyDate} into $(modifyDate);
                set ${json:object.autoRefresh} into $(autoRefresh);
            }

        }

        /* Step 7 */
        {
            set $(object) into $(count);
        }

    }
}