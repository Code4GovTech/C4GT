import axios from 'axios';
import { config } from '../config';

interface OrderDetails {
  moduleId: string;
  userId: string;
  price: {
    amount: number;
    currency: string;
  };
  providerId: string;
}

export class ONDCProtocol {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = config.ondc.baseUrl;
    this.apiKey = config.ondc.apiKey;
  }

  async createOrder(orderDetails: OrderDetails) {
    try {
      const response = await axios.post(`${this.baseUrl}/orders`, {
        context: {
          domain: 'training',
          action: 'create',
          timestamp: new Date().toISOString(),
          message_id: this.generateMessageId(),
          version: '1.0.0'
        },
        message: {
          order: {
            id: this.generateOrderId(),
            state: 'CREATED',
            provider: {
              id: orderDetails.providerId
            },
            items: [{
              id: orderDetails.moduleId,
              price: orderDetails.price
            }],
            billing: {
              name: 'Training Module Purchase',
              address: {
                country: 'IND'
              }
            },
            fulfillment: {
              type: 'DIGITAL',
              tracking: false
            }
          }
        }
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    }
  }

  async confirmOrder(orderId: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/orders/${orderId}/confirm`, {
        context: {
          domain: 'training',
          action: 'confirm',
          timestamp: new Date().toISOString(),
          message_id: this.generateMessageId(),
          version: '1.0.0'
        }
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error in confirmOrder:', error);
      throw error;
    }
  }

  async cancelOrder(orderId: string, reason: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/orders/${orderId}/cancel`, {
        context: {
          domain: 'training',
          action: 'cancel',
          timestamp: new Date().toISOString(),
          message_id: this.generateMessageId(),
          version: '1.0.0'
        },
        message: {
          order_id: orderId,
          cancellation_reason_id: reason
        }
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error in cancelOrder:', error);
      throw error;
    }
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
} 