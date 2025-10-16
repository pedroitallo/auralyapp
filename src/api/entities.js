const createEmptyEntity = (name) => ({
  list: async () => [],
  get: async () => null,
  create: async () => null,
  update: async () => null,
  delete: async () => null,
  me: async () => null,
});

export const Reading = createEmptyEntity('Reading');
export const JourneyEntry = createEmptyEntity('JourneyEntry');
export const NotificationLog = createEmptyEntity('NotificationLog');
export const Transaction = createEmptyEntity('Transaction');
export const Revelation = createEmptyEntity('Revelation');
export const CoinTransaction = createEmptyEntity('CoinTransaction');
export const PaymentRecord = createEmptyEntity('PaymentRecord');
export const Feedback = createEmptyEntity('Feedback');
export const TarotCard = createEmptyEntity('TarotCard');
export const DailyCardDraw = createEmptyEntity('DailyCardDraw');
export const Horoscope = createEmptyEntity('Horoscope');
export const ChatHistory = createEmptyEntity('ChatHistory');
export const HotmartEventLog = createEmptyEntity('HotmartEventLog');
export const ClickTracker = createEmptyEntity('ClickTracker');

export const User = {
  me: async () => null,
  login: async () => null,
  logout: async () => null,
  register: async () => null,
};
