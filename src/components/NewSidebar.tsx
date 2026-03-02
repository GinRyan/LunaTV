/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Cat, Clover, Film, Home, Menu, Radio, Star, Tv } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
});

export const useSidebar = () => useContext(SidebarContext);

// Logo 组件
const Logo = () => {
  return (
    <Link
      href='/new-home'
      className='flex items-center justify-center h-16 select-none hover:opacity-80 transition-opacity duration-200'
    >
      <span className='text-2xl font-bold text-green-600 tracking-tight'>
        MoonTV
      </span>
    </Link>
  );
};

interface NewSidebarProps {
  onToggle?: (collapsed: boolean) => void;
  activePath?: string;
}

// 在浏览器环境下通过全局变量缓存折叠状态
declare global {
  interface Window {
    __sidebarCollapsed?: boolean;
  }
}

const NewSidebar = ({ onToggle, activePath = '/new-home' }: NewSidebarProps) => {
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.__sidebarCollapsed === 'boolean'
    ) {
      return window.__sidebarCollapsed;
    }
    return false;
  });

  useLayoutEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) {
      const val = JSON.parse(saved);
      setIsCollapsed(val);
      window.__sidebarCollapsed = val;
    }
  }, []);

  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      if (isCollapsed) {
        document.documentElement.dataset.sidebarCollapsed = 'true';
      } else {
        delete document.documentElement.dataset.sidebarCollapsed;
      }
    }
  }, [isCollapsed]);

  const [active, setActive] = useState(activePath);

  useEffect(() => {
    if (activePath) {
      setActive(activePath);
    } else {
      setActive(pathname);
    }
  }, [activePath, pathname]);

  const handleToggle = useCallback(() => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
    if (typeof window !== 'undefined') {
      window.__sidebarCollapsed = newState;
    }
    onToggle?.(newState);
  }, [isCollapsed, onToggle]);

  const contextValue = {
    isCollapsed,
  };

  const [menuItems, setMenuItems] = useState([
    {
      icon: Home,
      label: '首页',
      href: '/new-home',
    },
    {
      icon: Film,
      label: '电影',
      href: '/douban?type=movie',
    },
    {
      icon: Tv,
      label: '剧集',
      href: '/douban?type=tv',
    },
    {
      icon: Cat,
      label: '动漫',
      href: '/douban?type=anime',
    },
    {
      icon: Clover,
      label: '综艺',
      href: '/douban?type=show',
    },
  ]);

  useEffect(() => {
    const runtimeConfig = (window as any).RUNTIME_CONFIG;
    if (runtimeConfig?.ENABLE_WEB_LIVE) {
      setMenuItems((prevItems) => {
        if (prevItems.some((item) => item.href === '/live')) return prevItems;
        return [
          ...prevItems,
          {
            icon: Radio,
            label: '直播',
            href: '/live',
          },
        ];
      });
    }
    if (runtimeConfig?.CUSTOM_CATEGORIES?.length > 0) {
      setMenuItems((prevItems) => {
        if (prevItems.some((item) => item.href === '/douban?type=custom')) return prevItems;
        return [
          ...prevItems,
          {
            icon: Star,
            label: '自定义',
            href: '/douban?type=custom',
          },
        ];
      });
    }
  }, []);

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className='hidden md:flex'>
        <aside
          data-sidebar
          className={`fixed top-0 left-0 h-screen bg-white/40 backdrop-blur-xl transition-all duration-300 border-r border-gray-200/50 z-10 shadow-lg dark:bg-gray-900/70 dark:border-gray-700/50 ${isCollapsed ? 'w-36' : 'w-36'
            }`}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className='flex h-full flex-col items-center py-4'>
            {/* 顶部 Logo 区域 */}
            <div className='relative h-16 w-full flex items-center justify-center mb-4'>
              <button
                onClick={handleToggle}
                className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 transition-colors duration-200 z-10 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700/50'
              >
                <Menu className='h-4 w-4' />
              </button>
              <Logo />
            </div>

            {/* 菜单项 - 大大的正方形按钮 */}
            <nav className='flex-1 overflow-y-auto w-full px-2'>
              <div className='space-y-6 flex flex-col items-center'>
                {menuItems.map((item) => {
                  const typeMatch = item.href.match(/type=([^&]+)/)?.[1];
                  const decodedActive = decodeURIComponent(active);
                  const decodedItemHref = decodeURIComponent(item.href);

                  const isActive =
                    decodedActive === decodedItemHref ||
                    (decodedActive.startsWith('/douban') &&
                      decodedActive.includes(`type=${typeMatch}`));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActive(item.href)}
                      data-active={isActive}
                      className='group flex flex-col items-center justify-center w-32 h-32 rounded-2xl transition-all duration-200 bg-gray-100/50 hover:bg-green-100/50 data-[active=true]:bg-green-500/20 dark:bg-gray-800/50 dark:hover:bg-green-900/30 dark:data-[active=true]:bg-green-500/10 border-2 border-transparent hover:border-green-300 data-[active=true]:border-green-500 dark:hover:border-green-700 dark:data-[active=true]:border-green-500'
                    >
                      <Icon className='h-20 w-20 text-gray-600 group-hover:text-green-600 data-[active=true]:text-green-600 dark:text-gray-400 dark:group-hover:text-green-400 dark:data-[active=true]:text-green-400' />
                      <span className='text-2xl mt-2 font-medium text-gray-700 group-hover:text-green-700 data-[active=true]:text-green-700 dark:text-gray-300 dark:group-hover:text-green-300 dark:data-[active=true]:text-green-300'>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </aside>
        <div className='transition-all duration-300 sidebar-offset w-36'></div>
      </div>
    </SidebarContext.Provider>
  );
};

export default NewSidebar;
