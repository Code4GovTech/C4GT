export const ONDCSchema = {
  type: 'object',
  required: ['context', 'message'],
  properties: {
    context: {
      type: 'object',
      required: [
        'domain',
        'country',
        'city',
        'action',
        'core_version',
        'bap_id',
        'bap_uri',
        'transaction_id',
        'message_id',
        'timestamp'
      ],
      properties: {
        domain: { type: 'string' },
        country: { type: 'string' },
        city: { type: 'string' },
        action: { type: 'string' },
        core_version: { type: 'string' },
        bap_id: { type: 'string' },
        bap_uri: { type: 'string' },
        transaction_id: { type: 'string' },
        message_id: { type: 'string' },
        timestamp: { type: 'string' }
      }
    },
    message: {
      type: 'object',
      required: ['intent'],
      properties: {
        intent: {
          type: 'object',
          required: ['item', 'provider'],
          properties: {
            item: {
              type: 'object',
              required: ['descriptor'],
              properties: {
                descriptor: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' }
                  }
                }
              }
            },
            provider: {
              type: 'object',
              required: ['id'],
              properties: {
                id: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }
}; 