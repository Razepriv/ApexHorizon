export const aiResponses = {
  greeting: [
    "Hello! I'm here to help you explore AI automation for your business.",
    "Welcome! Let me show you how AI can transform your operations.",
    "Hi there! Ready to discover the power of AI automation?"
  ],
  capabilities: [
    "I can help streamline your workflows, automate repetitive tasks, and optimize business processes.",
    "From data analysis to automated decision-making, I'm equipped to enhance your business efficiency.",
    "My capabilities include natural language processing, predictive analytics, and intelligent automation."
  ],
  benefits: [
    "Our AI solutions can reduce operational costs by up to 40% while improving accuracy by 90%.",
    "Implementing our AI automation typically results in 3-5x ROI within the first year.",
    "Businesses using our AI platform report 60% faster processing times and 80% fewer errors."
  ],
  features: [
    "Key features include real-time analytics, adaptive learning, and seamless integration with existing systems.",
    "Our platform offers predictive maintenance, intelligent document processing, and automated quality control.",
    "You'll benefit from advanced pattern recognition, automated reporting, and smart resource allocation."
  ]
};

export const getResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)];
  }
  
  if (lowerInput.includes('can') || lowerInput.includes('what') || lowerInput.includes('how')) {
    return aiResponses.capabilities[Math.floor(Math.random() * aiResponses.capabilities.length)];
  }
  
  if (lowerInput.includes('benefit') || lowerInput.includes('roi') || lowerInput.includes('value')) {
    return aiResponses.benefits[Math.floor(Math.random() * aiResponses.benefits.length)];
  }
  
  if (lowerInput.includes('feature') || lowerInput.includes('offer') || lowerInput.includes('provide')) {
    return aiResponses.features[Math.floor(Math.random() * aiResponses.features.length)];
  }
  
  return "I understand you're interested in AI automation. Could you please tell me more about your specific needs?";
};