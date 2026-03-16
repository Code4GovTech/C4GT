import { Request, Response, NextFunction } from 'express';
import { validate } from 'jsonschema';
import { ONDCSchema } from '../schemas/ondc';

export interface ONDCRequest {
  context: {
    domain: string;
    country: string;
    city: string;
    action: string;
    core_version: string;
    bap_id: string;
    bap_uri: string;
    transaction_id: string;
    message_id: string;
    timestamp: string;
  };
  message: any;
}

export const validateONDCRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = validate(req.body, ONDCSchema);
    
    if (!validationResult.valid) {
      return res.status(400).json({
        error: 'Invalid ONDC request',
        details: validationResult.errors
      });
    }

    // Additional validation for specific actions
    const { action } = req.body.context;
    switch (action) {
      case 'search':
        validateSearchRequest(req.body.message);
        break;
      case 'select':
        validateSelectRequest(req.body.message);
        break;
      case 'init':
        validateInitRequest(req.body.message);
        break;
      case 'confirm':
        validateConfirmRequest(req.body.message);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported action' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error validating ONDC request' });
  }
};

const validateSearchRequest = (message: any) => {
  // Validate search request specific fields
  if (!message.intent) {
    throw new Error('Missing intent in search request');
  }
};

const validateSelectRequest = (message: any) => {
  // Validate select request specific fields
  if (!message.order) {
    throw new Error('Missing order in select request');
  }
};

const validateInitRequest = (message: any) => {
  // Validate init request specific fields
  if (!message.order) {
    throw new Error('Missing order in init request');
  }
};

const validateConfirmRequest = (message: any) => {
  // Validate confirm request specific fields
  if (!message.order) {
    throw new Error('Missing order in confirm request');
  }
};

export const transformToONDCResponse = (data: any, context: ONDCRequest['context']) => {
  return {
    context: {
      ...context,
      bpp_id: process.env.BPP_ID,
      bpp_uri: process.env.BPP_URI,
    },
    message: data
  };
}; 