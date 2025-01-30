import Share from './Share';

const icons = {
  share: Share,
} as const;

export default icons;

export type IconName = keyof typeof icons;
