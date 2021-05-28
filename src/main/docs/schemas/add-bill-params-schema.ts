export const addBillParamsSchema = {
  type: 'object',
  properties: {
    walletId: {
      type: 'string'
    },
    categoryId: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    date: {
      type: 'date'
    },
    value: {
      type: 'number'
    },
    isDebt: {
      type: 'boolean'
    },
    isPaid: {
      type: 'boolean'
    },
    note: {
      type: 'string'
    },
    periodicity: {
      type: 'object',
      properties: {
        type: {
          type: 'number'
        },
        interval: {
          type: 'number'
        },
        part: {
          type: 'number'
        },
        endPart: {
          type: 'number'
        }
      }
    }
  },
  required: ['walletId','categoryId','description','date','value','isDebt', 'isPaid']
}
