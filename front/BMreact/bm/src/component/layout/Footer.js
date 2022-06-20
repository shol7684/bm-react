import { useEffect, useState, useContext } from 'react';
import {style} from './Footer.module.css';

export function Footer() {
	useEffect(() => {
		console.log("Footer");
	})


	return (
		<footer>
			<div>
				<div>이름</div>
				<div>깃허브</div>
				<div>전화번호</div>
				<div>이메일</div>
			</div>
		</footer>

	);
}
