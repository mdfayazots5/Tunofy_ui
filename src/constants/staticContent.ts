import { LegalDocument } from '../types/edgeStates';

export const ABOUT_CONTENT = {
  version: '1.0.0',
  tagline: 'Your world, your music, your Tunofy.',
  mission: 'Tunofy is dedicated to bringing you the best radio stations from around the globe. Our mission is to connect people through the universal language of music, providing a seamless and high-quality listening experience for everyone, everywhere.',
  team: 'Built with ❤️ by the Tunofy Team',
  socialLinks: [
    { id: 'twitter', label: 'Twitter', url: 'https://twitter.com/tunofy' },
    { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/tunofy' },
    { id: 'facebook', label: 'Facebook', url: 'https://facebook.com/tunofy' },
  ],
};

export const CONTACT_CONTENT = {
  email: 'support@tunofy.app',
  phone: '+1 (555) 123-4567',
  responseTime: 'We typically respond within 24-48 hours.',
  office: '123 Music Lane, San Francisco, CA 94103',
};

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: 'April 2, 2026',
  sections: [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, update your profile, or contact us for support. This may include your name, email address, and preferences.',
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you about updates, and to personalize your experience.',
    },
    {
      title: '3. Information Sharing',
      content: 'We do not share your personal information with third parties except as described in this policy or with your consent.',
    },
    {
      title: '4. Data Security',
      content: 'We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.',
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDocument = {
  title: 'Terms & Conditions',
  lastUpdated: 'April 2, 2026',
  sections: [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using Tunofy, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.',
    },
    {
      title: '2. Use of Service',
      content: 'You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account.',
    },
    {
      title: '3. Intellectual Property',
      content: 'The service and its original content, features, and functionality are and will remain the exclusive property of Tunofy and its licensors.',
    },
    {
      title: '4. Termination',
      content: 'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, for any reason whatsoever.',
    },
  ],
};
