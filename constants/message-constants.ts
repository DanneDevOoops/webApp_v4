import { FlashMessageType, MessageType } from 'types/animation-types';

export const messageTypes: Record<MessageType, FlashMessageType> = {
    info: {
        duration: 5000,
        type: 'info',
        description: 'Informerande meddelande',
        message: '',
    },
    warning: {
        duration: 2500,
        type: 'warning',
        description: 'Varnande meddelande',
        message: '',
    },
    danger: {
        duration: 3500,
        type: 'danger',
        description: 'Farligt meddelande',
        message: '',
    },
    success: {
        duration: 2500,
        type: 'success',
        description: 'Lyckat meddelande',
        message: '',
    },
    default: {
        duration: 3500,
        type: 'default',
        description: 'Meddelande',
        message: 'Standard meddelande...? 🤔',
    },
};
