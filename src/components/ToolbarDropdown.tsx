import React from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface ToolbarDropdownProps {
  icon: React.ReactNode;
  label: string;
  items: {
    icon?: React.ReactNode;
    label: string;
    onClick: () => void;
    isActive?: boolean;
    shortcut?: string;
  }[];
  activeLabel?: string;
}

export const ToolbarDropdown: React.FC<ToolbarDropdownProps> = ({
  icon,
  label,
  items,
  activeLabel,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2"
          title={label}
        >
          {icon}
          {activeLabel && (
            <span className="text-xs font-semibold">{activeLabel}</span>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-background z-50">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className={`cursor-pointer ${
              item.isActive ? 'bg-accent' : ''
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.shortcut && (
                <span className="text-xs text-muted-foreground ml-2">
                  {item.shortcut}
                </span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
