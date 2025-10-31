import { cn } from '@/lib/utils';
import { CheckIcon, XIcon } from '../icons/icons';
import { Typography } from '@/components/atoms/typography/typography';

interface ListItemProps {
  title: string;
  isChecked: boolean;
  error?: boolean;
}

export const ListItem = ({ title, isChecked, error }: ListItemProps) => {
  return (
    <li
      className={cn(
        'text-grey-200 flex items-center gap-1 transition-colors duration-200 ease-in-out',
        isChecked && 'text-grey-100',
        error && 'text-red-200'
      )}
    >
      {isChecked ? (
        <CheckIcon className="min-h-[18px] min-w-[18px]" />
      ) : (
        <XIcon className="min-h-[18px] min-w-[18px]" />
      )}
      <Typography variant="captionMedium">{title}</Typography>
    </li>
  );
};
