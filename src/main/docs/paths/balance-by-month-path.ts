export const balanceByMonthPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Balances'],
    summary: 'API to get the a user month balance.',
    description: 'This route must be accessible by **authenticated users**',
    parameters: [{
      in: 'path',
      name: 'yearMonth',
      description: 'Month of the year of the bills, in the format YYYY-MM.',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/balance'
            }
          }
        }
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
