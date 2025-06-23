'use client';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Bot, Star, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidebarSeparator from './sidebar-separator';
import DashboardUserButton from './dashboard-user-button';
import { Fragment } from 'react';

const data = {
  version: '0.0.1',
  navMain: [
    {
      title: 'Main',
      items: [
        { icon: Video, label: 'Meetings', href: '/meetings' },
        {
          icon: Bot,
          label: 'Agents',
          href: '/agents',
        },
      ],
    },
    {
      title: 'Settings',
      items: [{ icon: Star, label: 'Upgrade', href: '/upgrade' }],
    },
  ],
};

const DashboardSidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <Image
                  src='logo.svg'
                  alt='Meet・AI Logo'
                  width={32}
                  height={32}
                  className='size-12 invert-[90%]'
                  priority
                />
                <span className='truncate font-semibold text-lg'>Meet・AI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((section) => (
          <Fragment key={section.title}>
            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuButton
                      key={item.label}
                      asChild
                      className={cn(
                        'h-10',
                        'hover:bg-linear-to-r/oklch',
                        'border border-transparent hover:border-[#5D6B68]/10',
                        'from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                        {
                          'bg-linear-to-r/oklch border-[#5D6B68]/10': isActive(
                            item.href
                          ),
                        }
                      )}
                      isActive={isActive(item.href)}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </Fragment>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <DashboardUserButton />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
