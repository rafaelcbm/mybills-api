export const walletParamPath = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Wallets'],
    summary: 'API to delete an user wallet',
    description: 'This route must be accessible by **authenticated users**',
    parameters: [{
      in: 'path',
      name: 'walletId',
      description: 'Wallet ID to be deleted',
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
  },
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Wallets'],
    summary: 'API to update an user wallet',
    description: 'This route must be accessible by **authenticated users**',
    parameters: [{
      in: 'path',
      name: 'walletId',
      description: 'Wallet ID to be update',
      required: true,
      schema: {
        type: 'string'
      }
    }],
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
