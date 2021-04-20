export const addCategoryParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    root: {
      type: 'string'
    },
    ancestors: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['name']
}
