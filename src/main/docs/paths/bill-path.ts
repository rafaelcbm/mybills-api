export const billPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Bills'],
    summary: 'API to create an user bill',
    description: 'This route must be accessible by **authenticated users**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addBillParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Success'
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
