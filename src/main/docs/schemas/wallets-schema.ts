export const walletsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/wallet'
  }
}
