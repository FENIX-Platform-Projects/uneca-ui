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
          /*{
            "id": "education"
          },*/
          {
            "id": "health"
          }/*,
          {
            "id": "labour"
          }*/
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
            "id": "infrastructure"
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