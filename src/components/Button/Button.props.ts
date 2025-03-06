import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { //ButtonProps наследуется от ButtonHTMLAttributes, а ButtonHTMLAttributes наследуется от HTMLButtonElement
    children: ReactNode;
    appearence?: 'big' | 'small';
}