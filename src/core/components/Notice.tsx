import { cn } from '@/core/utils/Cn';
import { CircleCheck, Clock3, TriangleAlert, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

const variants = {
  pending: { container: 'bg-pending-light', iconColor: 'text-pending', icon: Clock3 },
  danger: {
    container: 'bg-danger-light',
    iconColor: 'text-danger',
    icon: TriangleAlert,
  },
  success: { container: 'bg-success-light', iconColor: 'text-success', icon: CircleCheck },
};

type NoticeProps = {
  variant: keyof typeof variants;
  title: ReactNode;
  children?: ReactNode;
  icon?: LucideIcon;
  className?: string;
};

export function Notice({ variant, title, children, icon, className }: NoticeProps) {
  const styles = variants[variant];
  const Icon = icon ?? styles.icon;
  return (
    <article
      role={variant === 'danger' ? 'alert' : 'status'}
      data-variant={variant}
      className={cn(
        'rounded-[18px] border-0 px-[22px] py-[17px] text-[18px] leading-[1.65] text-black [overflow-wrap:anywhere] max-[760px]:rounded-[14px] max-[760px]:p-[13px] max-[760px]:text-[15px] print:break-inside-avoid',
        styles.container,
        className,
      )}
    >
      <div className="flex items-center gap-[13px] text-black max-[760px]:items-start max-[760px]:gap-[10px]">
        <Icon
          size={26}
          className={cn('shrink-0 max-[760px]:mt-[3px] max-[760px]:size-6', styles.iconColor)}
          aria-hidden="true"
        />
        <h2 className="min-w-0 text-[18px] leading-[1.65] font-normal max-[760px]:text-[15px]">
          {title}
        </h2>
      </div>
      {children && (
        <div className="mt-[14px] border-t border-[#aeb2bb] pt-[14px] text-ink">{children}</div>
      )}
    </article>
  );
}
