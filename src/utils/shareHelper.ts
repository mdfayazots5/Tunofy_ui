import { Share, Platform } from 'react-native';

export const shareStation = async (name: string, id: string) => {
  const url = `https://tunofy.app/station/${id}`;
  const message = Platform.OS === 'ios' 
    ? `Check out ${name} on Tunofy!` 
    : `Check out ${name} on Tunofy! Listen live at: ${url}`;

  try {
    const result = await Share.share({
      title: name,
      message: message,
      url: url,
    });
    return result;
  } catch (error) {
    console.error('Error sharing station:', error);
    return null;
  }
};
