'user client';

import UserAvatar from '@/components/user-avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from '@/lib/auth-client';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DashboardUserButton = () => {
  const router = useRouter();

  const { data, isPending } = useSession();
  const [signOutPending, setSignOutPending] = useState(false);

  const { isMobile } = useSidebar();

  const handleLogout = async () => {
    setSignOutPending(true);

    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
        onError: (error) => {
          console.error('Sign out error:', error);
          setSignOutPending(false);
        },
      },
    });
  };

  const disabled = isPending || signOutPending;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' disabled={disabled}>
              <UserAvatar
                name={data?.user.name}
                image={data?.user.image}
                isPending={isPending}
              />

              <div className='grid flex-1 text-left text-sm leading-tight'>
                {isPending ? (
                  <>
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='mt-[0.5rem] h-3 w-32' />
                  </>
                ) : (
                  <>
                    <span className='truncate font-medium'>
                      {data?.user.name}
                    </span>
                    <span className='truncate text-xs'>{data?.user.email}</span>
                  </>
                )}
              </div>

              <ChevronsUpDown />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <UserAvatar
                  name={data?.user.name}
                  image={data?.user.image}
                  isPending={isPending}
                />
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>
                    {data?.user.name}
                  </span>
                  <span className='truncate text-xs'>{data?.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem disabled={disabled}>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem disabled={disabled}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>

              <DropdownMenuItem disabled={disabled}>
                <CreditCard />
                Billing
              </DropdownMenuItem>

              <DropdownMenuItem disabled={disabled}>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout} disabled={disabled}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default DashboardUserButton;
