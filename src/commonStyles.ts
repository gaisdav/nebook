const baseSize = 4;

export const size = {
  base: baseSize,
  base2X: baseSize * 2,
  base3X: baseSize * 3,
  base4X: baseSize * 4,
  base5X: baseSize * 5,
  base10X: baseSize * 10,
  base12X: baseSize * 12,
  base15X: baseSize * 15,
  base20X: baseSize * 20,
};

export const radius = {
  base: size.base2X,
};

export const theme = {
  light: {
    cardBg: '#ffffff',
    mainBg: '#f8f9fa',
    text: '#000000',
    shadow: {
      base: {
        shadowColor: '#404040',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    },
  },
  dark: {
    cardBg: '#1e1e1e',
    mainBg: '#121212',
    text: '#ffffff',
    shadow: {
      base: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    },
  },
};
