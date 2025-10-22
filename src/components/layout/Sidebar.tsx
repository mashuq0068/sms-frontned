/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileText,
  DollarSign,
  Calendar,
  UserCog,
  Settings,
  ChevronLeft,
  GraduationCap,
  ChevronDown,
  BarChart3,
  Wallet,
  FileBarChart,
  School,
  UserX,
  Briefcase,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import clientConfig from '@/config/client.json';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

interface NavItem {
  icon: any;
  label: string;
  path?: string;
  children?: { icon: any; label: string; path: string }[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: School, label: 'Classes', path: '/classes' },
  { icon: ClipboardCheck, label: 'Attendance', path: '/attendance' },
  { icon: FileText, label: 'Exams', path: '/exams' },
  { 
    icon: DollarSign, 
    label: 'Finance', 
    children: [
      { icon: DollarSign, label: 'Fees', path: '/fees' },
      { icon: Wallet, label: 'Payroll', path: '/payroll' },
      { icon: FileBarChart, label: 'Finance', path: '/finance' },
    ]
  },
  { 
    icon: Briefcase, 
    label: 'HR', 
    children: [
      { icon: Users, label: 'Employee', path: '/employee' },
      { icon: UserX, label: 'Leave', path: '/leave' },
    ]
  },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Calendar, label: 'Timetable', path: '/timetable' },
  { icon: UserX, label: 'Student Leave', path: '/student-leave' },
  { icon: UserCog, label: 'Users', path: '/users' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileToggle }: SidebarProps) => {
  const [openGroups, setOpenGroups] = useState<string[]>(['Finance', 'HR']);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => 
      prev.includes(label) 
        ? prev.filter(g => g !== label)
        : [...prev, label]
    );
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-sidebar-primary" />
            <span className="font-medium text-lg text-sidebar-foreground">
              {clientConfig.schoolName}
            </span>
          </div>
        )}
        {collapsed && <GraduationCap className="w-6 h-6 text-sidebar-primary mx-auto" />}
        <button
          onClick={onToggle}
          className={cn(
            'p-1.5 rounded-lg hover:bg-sidebar-accent transition-smooth',
            collapsed && 'hidden'
          )}
        >
          <ChevronLeft className="w-5 h-5 text-sidebar-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          if (item.children) {
            const isOpen = openGroups.includes(item.label);
            return (
              <div key={item.label}>
                <button
                  onClick={() => !collapsed && toggleGroup(item.label)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth',
                    'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    collapsed && 'justify-center'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown 
                        className={cn(
                          'w-4 h-4 transition-transform',
                          isOpen && 'rotate-180'
                        )} 
                      />
                    </>
                  )}
                </button>
                {!collapsed && isOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth',
                            'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm',
                            isActive && 'bg-sidebar-primary/30 text-sidebar-foreground font-medium'
                          )
                        }
                      >
                        <child.icon className="w-4 h-4 flex-shrink-0" />
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path!}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth',
                  'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  isActive && 'bg-sidebar-primary/30 text-sidebar-foreground font-medium',
                  collapsed && 'justify-center'
                )
              }
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen overflow-y-auto transition-all duration-300 bg-sidebar border-r border-sidebar-border',
          'hidden md:block scrollbar-thin',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={onMobileToggle}>
        <SheetContent side="left" className="p-0 w-64 bg-sidebar border-sidebar-border">
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-sidebar-primary" />
              <span className="font-medium text-lg text-sidebar-foreground">
                {clientConfig.schoolName}
              </span>
            </div>
            <button
              onClick={onMobileToggle}
              className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-smooth"
            >
              <X className="w-5 h-5 text-sidebar-foreground" />
            </button>
          </div>
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              if (item.children) {
                const isOpen = openGroups.includes(item.label);
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleGroup(item.label)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown 
                        className={cn(
                          'w-4 h-4 transition-transform',
                          isOpen && 'rotate-180'
                        )} 
                      />
                    </button>
                    {isOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            onClick={onMobileToggle}
                            className={({ isActive }) =>
                              cn(
                                'flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth',
                                'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm',
                                isActive && 'bg-sidebar-primary/30 text-sidebar-foreground  font-medium'
                              )
                            }
                          >
                            <child.icon className="w-4 h-4 flex-shrink-0" />
                            <span>{child.label}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path!}
                  onClick={onMobileToggle}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth',
                      'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      isActive && 'bg-sidebar-primary/30 text-sidebar-foreground  font-medium'
                    )
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
