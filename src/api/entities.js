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

import { supabase } from '@/lib/supabase';

export const User = {
  me: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .maybeSingle();

    return data;
  },

  login: async (email, password) => {
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (!existingUser) {
      throw new Error('Email not registered');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data.user;
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  register: async ({ email, password, name, zodiacSign, gender, relationshipStatus }) => {
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{
        email,
        name,
        zodiac_sign: zodiacSign,
        gender,
        relationship_status: relationshipStatus,
      }])
      .select()
      .single();

    if (userError) throw userError;

    return userData;
  },

  checkEmailExists: async (email) => {
    const { data } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    return !!data;
  },
};
