
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';
import {
  Bed,
  Building2,
  ChevronRight,
  ClipboardList,
  DollarSign,
  FileText,
  Home,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Settings,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive?: boolean;
  children?: { label: string; to: string }[];
}

const NavItem = ({ icon: Icon, label, to, isActive, children }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (children) {
    return (
      <>
        <SidebarMenuItem>
          <Button 
            variant="ghost" 
            className={cn("w-full justify-between", isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center gap-2">
              <Icon size={18} />
              <span>{label}</span>
            </span>
            <ChevronRight size={16} className={cn("transition-transform", isOpen && "rotate-90")} />
          </Button>
        </SidebarMenuItem>
        
        {isOpen && children.map((child, index) => (
          <SidebarMenuItem key={index} className="pl-8">
            <SidebarMenuButton asChild>
              <Link to={child.to} className="text-sm">
                {child.label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </>
    );
  }
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
        <Link to={to} className="flex items-center gap-2">
          <Icon size={18} />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function SidebarNav() {
  return (
    <>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-hotel-500" />
          <span className="font-bold text-lg text-white">Vibrant Stay</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem icon={LayoutDashboard} label="Dashboard" to="/" isActive={true} />
              <NavItem icon={Bed} label="Rooms" to="/rooms" />
              <NavItem icon={Users} label="Guests" to="/guests" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Front Desk</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem icon={KeyRound} label="Check In" to="/checkin" />
              <NavItem icon={ClipboardList} label="Check Out" to="/checkout" />
              <NavItem icon={DollarSign} label="Payments" to="/payments" />
              <NavItem icon={FileText} label="Charges" to="/charges" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem 
                icon={Settings} 
                label="Setup" 
                to="/setup"
                children={[
                  { label: 'Hotel Details', to: '/setup/hotel-details' },
                  { label: 'Rooms & Floors', to: '/setup/rooms-floors' },
                  { label: 'Room Types', to: '/setup/room-types' },
                  { label: 'Employees', to: '/setup/employees' },
                  { label: 'Users', to: '/setup/users' },
                  { label: 'Permissions', to: '/setup/permissions' },
                  { label: 'Currencies', to: '/setup/currencies' },
                  { label: 'Services', to: '/setup/services' },
                ]}
              />
              <NavItem icon={Users} label="Employees" to="/employees" />
              <NavItem icon={Home} label="Housekeeping" to="/housekeeping" />
              <NavItem icon={Settings} label="Maintenance" to="/maintenance" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button variant="outline" size="sm" className="w-full">
          <LogOut size={16} className="mr-2" />
          Log Out
        </Button>
      </SidebarFooter>
    </>
  );
}
