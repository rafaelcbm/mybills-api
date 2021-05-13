export const categoryTreeSchema = {
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
    },
    children: {
      type: 'array',
      items: {
        $ref: '#/schemas/category'
      }
    }
  },
  required: ['id', 'name', 'root', 'ancestors', 'children']
}
