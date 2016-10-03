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
            "id": "population",
            "state": {"disabled": true}
          },
          {
            "id": "education"
          },
          {
            "id": "health"
          },
          {
            "id": "labour"
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
            "id": "expenditure_gdp"
          },
          {
            "id": "monetary_statistics"
          },
          {
            "id": "financial_flows",
            "state": {"disabled": true}
          },
          {
            "id": "public_finance"
          },
          {
            "id": "debt"
          },
          {
            "id": "inflation"
          },
          {
            "id": "energy"
          },
          {
            "id": "tourism",
            "state": {"disabled": true}
          },
          {
            "id": "infrastructure",
            "state": {"disabled": true}
          },

          {
            "id": "poverty"
          },
          {
            "id": "production",
            "state": {"disabled": true},
            "children": [
              {
                "id": "agriculture_production",
                "state": {"disabled": true}
              },
              {
                "id": "mining_production",
                "state": {"disabled": true}
              }
            ]
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