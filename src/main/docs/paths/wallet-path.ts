export const walletPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Wallets'],
    summary: 'API to list the user wallets',
    description: 'This route must be accessible by **authenticated users**',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/wallets'
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
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Wallets'],
    summary: 'API to create a user wallet',
    description: 'This route must be accessible by **authenticated users**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addWalletParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Success, no content returned'
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
