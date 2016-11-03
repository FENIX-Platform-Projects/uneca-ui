/*global define*/
define({
  "core": {
    "multiple": false,
    "data": [
      {
        "id": "demographic",
        "state": {
          "opened": true
        },
        "children": [
          {
            "id": "population"
          },
          {
            "id": "health"
          }
        ]
      },
      {
        "id": "economics",
        "state": {
          "opened": true
        },
        "children": [
          {
            "id": "balance_of_payments"
          },
          {
            "id": "gdp"
          },

          {
            "id": "monetary_statistics"
          },
          {
            "id": "public_finance"
          },
          {
            "id": "inflation"
          },
          {
            "id": "tourism"
          },
          {
            "id": "poverty"
          }
        ]
      }
    ]
  },
  "state" : {
    "ttl" : 1
  },
  "plugins": [
    "wholerow"
  ]
});