import { createAvatar } from '@dicebear/core';
import { initials, thumbs } from '@dicebear/collection';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

type AvatarStyle = 'initials' | 'thumbs';

interface UserAvatarProps {
  name?: string;
  style?: AvatarStyle;
  isPending?: boolean;
  image?: string | undefined | null;
  className?: string;
}

const UserAvatar = ({
  name,
  style = 'initials',
  isPending,
  image,
  className,
}: UserAvatarProps) => {
  let avatar;

  if (style === 'thumbs') {
    avatar = createAvatar(thumbs, {
      seed: name,
    });
  } else {
    avatar = createAvatar(initials, {
      seed: name,
      fontSize: 48,
      fontWeight: 500,
    });
  }

  if (isPending) {
    return (
      <Avatar className={cn('rounded-lg', className)}>
        <Skeleton className='size-12' />
      </Avatar>
    );
  }

  return (
    <Avatar className={cn('rounded-lg', className)}>
      <AvatarImage
        src={image || avatar.toDataUri()}
        alt='User Avatar'
        // https://stackoverflow.com/questions/56242788/http-403-on-images-loaded-from-googleusercontent-com
        referrerPolicy='no-referrer'
      />
      <AvatarFallback className={cn('rounded-lg', className)}>
        {name?.charAt(0).toUpperCase() || 'UR'}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
