export const categorySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
  required: ['id', 'name', 'root', 'ancestors']
}
