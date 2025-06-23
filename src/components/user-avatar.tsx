import { createAvatar } from '@dicebear/core';
import { initials, thumbs } from '@dicebear/collection';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Loader2 } from 'lucide-react';

type AvatarStyle = 'initials' | 'thumbs';

interface UserAvatarProps {
  name?: string;
  style?: AvatarStyle;
  isPending?: boolean;
  image?: string | undefined | null;
}

const UserAvatar = ({
  name,
  style = 'initials',
  isPending,
  image,
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
      <Avatar className='rounded-lg'>
        <AvatarFallback>
          <Loader2 className='animate-spin' />
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className='rounded-lg'>
      <AvatarImage src={image || avatar.toDataUri()} alt='User Avatar' />
      <AvatarFallback>{name?.charAt(0).toUpperCase() || 'UR'}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
