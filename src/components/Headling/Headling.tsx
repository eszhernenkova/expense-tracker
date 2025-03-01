
import { HeadlingProps } from './Headling.props';

import styles from './Headling.module.scss'



function Headling ({ children, ...props }: HeadlingProps) {
	return (
		<h1 className={styles.title} {...props} >{children}</h1>
	);
};

export default Headling;