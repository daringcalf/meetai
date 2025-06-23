import * as siIcons from 'simple-icons/icons';
import { SimpleIcon } from 'simple-icons';
import { FC } from 'react';

type BrandIconProps = {
  name: keyof typeof siIcons;
  fill?: string; // hex without #
  className?: string;
};

const BrandIcon: FC<BrandIconProps> = ({ name, fill, className }) => {
  const icon = siIcons[name] as SimpleIcon;

  if (!icon || typeof icon !== 'object' || !('path' in icon)) {
    return null;
  }

  return (
    <svg
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      fill={`#${fill || icon.hex}`}
      className={className}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
};

export default BrandIcon;
