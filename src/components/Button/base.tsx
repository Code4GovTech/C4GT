import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { OnClick } from '../../types';


// eslint-disable-next-line tailwindcss/no-custom-classname
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground border-none',
        outline: 'border bg-transparent font-medium text-primary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        basic: 'border-none'
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10'
      },
      rounded: {
        default: 'rounded-2xl',
        sm: 'rounded-lg',
        lg: 'rounded-2xl',
        side: 'rounded-3xl'
      },
      colorVariant: {
        default:
          'border-primary-600 bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:cursor-not-allowed disabled:bg-gray-200',
        success: 'border-success bg-success text-white hover:bg-success/90',
        danger:
          'border-danger bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 disabled:cursor-not-allowed disabled:bg-danger-200',
        secondary:
          'border-secondary bg-black-500 text-white hover:bg-black-400 active:bg-black-600 disabled:cursor-not-allowed disabled:bg-black-300'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
      colorVariant: 'default'
    },
    compoundVariants: [
      {
        variant: 'outline',
        class: 'bg-transparent'
      },
      {
        variant: 'basic',
        class:
          'h-fit bg-transparent p-0 text-black hover:bg-transparent active:bg-transparent'
      },
      {
        variant: 'ghost',
        class: 'bg-transparent'
      },
      {
        colorVariant: 'default',
        variant: 'outline',
        class:
          'border-primary-600 text-primary-600 hover:border-gray-200 hover:bg-gray-100 active:border-primary-700 active:bg-white active:text-primary-700 disabled:cursor-not-allowed disabled:border-primary-200 disabled:bg-primary-200'
      },
      {
        colorVariant: 'success',
        variant: 'outline',
        class: 'text-success hover:text-white'
      },
      {
        colorVariant: 'danger',
        variant: 'outline',
        class:
          'border-danger-600 text-danger-600 hover:border-danger-800 hover:bg-danger-100 hover:text-danger-800 active:border-danger-600 active:bg-white active:text-danger-600 disabled:cursor-not-allowed disabled:border-danger-200 disabled:text-danger-200'
      },
      {
        colorVariant: 'secondary',
        variant: 'outline',
        class:
          'border-black-400 text-black-600 hover:border-black-300 hover:bg-black-100 active:border-black-600 active:bg-white disabled:cursor-not-allowed disabled:border-black-300 disabled:text-gray-300'
      },
      //---------------------------------------------
      {
        colorVariant: 'default',
        variant: 'ghost',
        class:
          'text-primary-600 hover:bg-gray-200 active:bg-white active:text-primary-700 disabled:cursor-not-allowed disabled:bg-primary-200'
      },
      {
        colorVariant: 'success',
        variant: 'ghost',
        class: 'text-success hover:text-white'
      },
      {
        colorVariant: 'danger',
        variant: 'ghost',
        class:
          'border-danger-600 text-danger-600 hover:border-danger-800 hover:bg-danger-100 hover:text-danger-800 active:border-danger-600 active:bg-white active:text-danger-600 disabled:cursor-not-allowed disabled:border-danger-200 disabled:text-danger-200'
      },
      {
        colorVariant: 'secondary',
        variant: 'ghost',
        class:
          'border-black-400 text-black-600 hover:border-black-300 hover:bg-black-100 active:border-black-600 active:bg-white disabled:cursor-not-allowed disabled:border-black-300 disabled:text-gray-300'
      }
    ]
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // icon1?: React.ReactNode;
  // icon2?: React.ReactNode;
  // iconPosition?: 'before' | 'after';
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  onClick?: OnClick;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      colorVariant,
      beforeIcon,
      onClick,
      afterIcon,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ colorVariant, variant, size, rounded, className })
        )}
        ref={ref}
        onClick={onClick}
        type="button"
        {...props}
      >
        {beforeIcon && <span className="mr-2">{beforeIcon}</span>}
        {children}
        {afterIcon && <span className="ml-2">{afterIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
