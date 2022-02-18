export const billParamPath = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Bills'],
    summary: 'API to delete an user bill',
    description: 'This route must be accessible by **authenticated users**',
    parameters: [{
      in: 'path',
      name: 'billId',
      description: 'Bill ID to be deleted',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        description: 'Success, no content returned'
      },
      400: {
        $ref: '#/components/badRequest'
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
