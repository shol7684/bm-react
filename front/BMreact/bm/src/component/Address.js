import { useEffect, useState, useContext } from 'react';
import DaumPostCode from 'react-daum-postcode';
import { setLoaclAddress } from '../common';
import { MainContext } from '../context';

export function Address({popupClose}) {

	const wrap = {
		display: "block",
		position: "fixed",
		overflow: "hidden",
		width: "350px",
		height: "400px",
		transform: "translate(-50%, -50%)",
		left: "50%",
		top: "50%",
		zIndex: "3",
		border: "3px solid",

	};


	const closeButtn = {
		cursor: "pointer",
    position: "absolute",
    right: "0px",
    top: "0px",
    zIndex: 1,
	}


	const {setAddress1, setAddress2} = useContext(MainContext);
	
	const setAddress = (address1, address2)=>{
		
		setLoaclAddress(address1, address2);
		setAddress1(address1);
		setAddress2(address2);
	}

	useEffect(() => {
		console.log("주소 api");
	})


	const handlePostCode = (data) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
			}
			fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
		}
		setAddress(data.zonecode, data.address); 
		popupClose(); 
	}




	return (
		<div style={wrap}>
			<img src="//t1.daumcdn.net/postcode/resource/images/close.png" onClick={popupClose} style={closeButtn} id="btnCloseLayer"alt="닫기 버튼"></img>
			<DaumPostCode onComplete={handlePostCode}></DaumPostCode>
		</div>
	);
}
