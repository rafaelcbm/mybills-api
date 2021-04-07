export const addWalletParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    }
  },
  required: ['name']
}
