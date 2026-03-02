import { BackButton } from './BackButton';
import NewMobileBottomNav from './NewMobileBottomNav';
import NewSidebar from './NewSidebar';

interface NewPageLayoutProps {
  children: React.ReactNode;
  activePath?: string;
}

const NewPageLayout = ({ children, activePath }: NewPageLayoutProps) => {
  // 默认使用 new-home，如果没有传入 activePath
  const resolvedActivePath = activePath || '/new-home';
  
  return (
    <div className='w-full min-h-screen'>
      {/* 移动端头部 - 简化版本，只显示 Logo */}
      <header className='md:hidden fixed top-0 left-0 right-0 z-[999] w-full bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm dark:bg-gray-900/70 dark:border-gray-700/50'>
        <div className='h-12 flex items-center justify-center'>
          <span className='text-xl font-bold text-green-600 tracking-tight'>
            MoonTV
          </span>
        </div>
      </header>

      {/* 主要布局容器 */}
      <div className='flex md:grid md:grid-cols-[auto_1fr] w-full min-h-screen md:min-h-auto'>
        {/* 侧边栏 - 桌面端显示，移动端隐藏 */}
        <div className='hidden md:block'>
          <NewSidebar activePath={resolvedActivePath} />
        </div>

        {/* 主内容区域 */}
        <div className='relative min-w-0 flex-1 transition-all duration-300'>
          {/* 桌面端左上角返回按钮 */}
          {['/play', '/live'].includes(resolvedActivePath) && (
            <div className='absolute top-3 left-1 z-20 hidden md:flex'>
              <BackButton />
            </div>
          )}

          {/* 主内容 */}
          <main
            className='flex-1 md:min-h-0 mb-16 md:mb-0 md:mt-0 mt-12'
            style={{
              paddingBottom: 'calc(3.5rem + env(safe-area-inset-bottom))',
            }}
          >
            {children}
          </main>
        </div>
      </div>

      {/* 移动端底部导航 */}
      <div className='md:hidden'>
        <NewMobileBottomNav activePath={resolvedActivePath} />
      </div>
    </div>
  );
};

export default NewPageLayout;
