import { forwardRef } from 'react';
import styles from './Input.module.scss';
import { InputProps } from './Input.props';

import cn from 'classnames'; //библиотека для упрощения выражений с тернарными операторами


const Input = forwardRef<HTMLInputElement, InputProps>( function Input({ className, isValid = true,  ...props } , ref) {
	return (
		<input { ...props } ref={ref  } className={cn(className, styles.input, {
			[styles.invalid] : !isValid
		})}  />
	);
});

export default Input;