import { FaqAnswer } from '../../entities/faq-answer';

type FaqAnswer = {
  question: string;
  answer: string;
};

type PrivacyPolicyTopic = {
  topic: string;
  text: string;
};

export const purchaseAnswers: FaqAnswer[] = [
  {
    question: 'How do I purchase a set on Legocy?',
    answer:
      'To purchase a set, browse the available listings, and when you find a set you like, contact the seller through the provided contact information to arrange the purchase details.',
  },
  {
    question: 'Is Legocy responsible for the condition of the sets?',
    answer:
      'No, Legocy is not responsible for the condition of the sets. The buyer and seller must agree on the condition and any other aspects of the set before completing the purchase.',
  },
  {
    question: 'What should I do if I receive a set that is not as described?',
    answer:
      'You should contact the seller directly to resolve any issues. Legocy does not mediate disputes between buyers and sellers.',
  },
];

export const collectionsAnswers: FaqAnswer[] = [
  {
    question: 'Are the collection values legally binding?',
    answer:
      'No, the collections on Legocy do not have any legal value and cannot be used as official evaluations or conclusions.',
  },
  {
    question: 'How are the prices for sets determined?',
    answer:
      'Prices are given to sets based on our data and calculations, which take into account various factors such as market trends, demand, and availability.',
  },
  {
    question: 'What can collections be used for?',
    answer:
      'Collections can be used to determine the value of your sets, track price changes over time, and manage your inventory of sets. They can also help you make informed decisions about buying, selling, or trading sets based on market data.',
  },
];

export const privacyPolicyTopics: PrivacyPolicyTopic[] = [
  {
    topic: 'Information We Collect',
    text:
      'We collect various types of information to provide and improve our services:\n' +
      '\n' +
      'Personal Information: When you register on our platform, we may collect personal details such as your name, email address, and contact information.\n' +
      'Transaction Information: We collect details of transactions you carry out through our platform, including the sets you buy or sell.\n' +
      'Usage Data: We may collect information on how you access and use our website, including your IP address, browser type, and browsing history.\n' +
      'Cookies and Tracking Technologies: We use cookies and similar technologies to enhance your experience on our site and gather information about usage patterns.',
  },
  {
    topic: 'How We Use Your Information',
    text:
      'We use the information we collect for various purposes, including:\n\n' +
      '\n' +
      'Providing Services: To operate and maintain our marketplace and price tracking tools.\n' +
      'Personalization: To personalize your experience and provide content and features that match your interests.\n' +
      'Communication: To communicate with you about your account, transactions, and updates on our services.\n' +
      'Analytics: To analyze usage patterns and improve our services.\n' +
      'Security: To protect our platform and users from fraud and abuse.',
  },
  {
    topic: 'Sharing Your Information',
    text:
      'We do not sell, trade, or otherwise transfer your personal information to outside parties, except as described below:\n' +
      '\n' +
      'Service Providers: We may share your information with third-party service providers who assist us in operating our website and providing our services.\n' +
      'Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.\n' +
      'Business Transfers: In the event of a merger, acquisition, or sale of our assets, your information may be transferred to the new owners.',
  },
  {
    topic: 'Protecting Your Information',
    text:
      'We implement a variety of security measures to protect your personal information. These include:\n' +
      '\n' +
      'Encryption: Data is encrypted both in transit and at rest.\n' +
      'Access Controls: Access to your personal information is restricted to authorized personnel only.\n' +
      'Regular Security Audits: We conduct regular security audits to ensure our systems are secure.',
  },
  {
    topic: 'Your Rights',
    text:
      'You have certain rights regarding your personal information, including:\n' +
      '\n' +
      'Access: You can request access to the personal information we hold about you.\n' +
      'Correction: You can request correction of any inaccurate or incomplete information.\n' +
      'Deletion: You can request deletion of your personal information, subject to certain legal obligations.\n' +
      'Opt-Out: You can opt-out of receiving marketing communications from us at any time.',
  },
  {
    topic: 'Changes to This Privacy Policy',
    text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new Privacy Policy on our website and updating the effective date at the top of this document.',
  },
  {
    topic: 'Contact Us',
    text: 'If you have any questions about this Privacy Policy or our privacy practices, please contact us',
  },
];
