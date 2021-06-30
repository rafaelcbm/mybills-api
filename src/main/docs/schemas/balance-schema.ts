export const balanceSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    yearMonth: {
      type: 'string'
    },
    balance: {
      type: 'number'
    }
  },
  required: ['id','yearMonth','balance']
}
