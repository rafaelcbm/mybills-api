export const billsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/bill'
  }
}
