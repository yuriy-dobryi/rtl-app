import ArrowLeft from './arrow-left';
import CheckMark from './check-mark';
import Share from './Share';

export { ArrowLeft, CheckMark, Share };

const icons = {
  arrowLeft: ArrowLeft,
  checkmark: CheckMark,
  share: Share,
} as const;

export default icons;

export type IconName = keyof typeof icons;
