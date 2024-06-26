import { FaqAnswer } from '../../entities/faq-answer';

type FaqAnswer = {
  question: string;
  answer: string;
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
