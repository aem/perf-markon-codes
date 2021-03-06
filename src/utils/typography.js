import Typography from 'typography';
import Theme from 'typography-theme-stow-lake';

Theme.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    blockquote: {
      fontStyle: 'italic',
      borderColor: 'rgba(114,211,225, 1)',
    },
  };
};

delete Theme.googleFonts;

const typography = new Typography(Theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
