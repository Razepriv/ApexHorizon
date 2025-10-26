interface WebhookResponse {
  response: string;
  action?: string;
  metadata?: any;
}

export const sendToWebhook = async (
  message: string, 
  isVoice: boolean
): Promise<WebhookResponse> => {
  try {
    const response = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
      },
      body: JSON.stringify({
        message,
        isVoice,
        timestamp: new Date().toISOString(),
        source: 'apex-horizon-client'
      })
    });

    if (!response.ok) {
      throw new Error('Webhook request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
};