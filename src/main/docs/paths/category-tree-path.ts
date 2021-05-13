export const categoryTreePath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Categories'],
    summary: 'API to list the user categories as a tree',
    description: 'This route must be accessible by **authenticated users**',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/categories'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
