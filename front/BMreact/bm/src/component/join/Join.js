import { useEffect, useState, useContext, useRef, createRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Join.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';



const pass = {
	username : false,
	password : false,
	email : false,
	nickname : false,
	phone : false,
}

const data = {
	username : "",
	password : "",
	email : "",
	nickname : "",
	phone : "",
}

export function Join() {
	// const inputRef = useRef([]);
	const navigator = useNavigate();
	
	const inputRef = useRef({});

	useEffect(() => {
		inputRef.current.username.focus();
		// rr.current.rr.focus(); 
	}, [])

	const [notification, setNotification] = useState({
		username : "",
		email : "",
		nickname : "",
		phone : "",
	});

	const valid = {
		username : (value) =>{
			const regUsername =  /^[A-Za-z0-9]{4,15}$/;
			return regUsername.test(value);
		},
		password : (value) =>{
			// 비밀번호와 비밀번호 확인이 맞는지만 검사
			return (data.password === value);
		},
		email : (value) =>{
			const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
			return regEmail.test(value);
		},

		nickname : (value) =>{
			const regNickname = /^[가-힣|a-z|A-Z|0-9|]{4,10}$/;
			return regNickname.test(value);
		},

		phone : (value) =>{
			const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
			return regPhone.test(value);
		},
	}

	const message = {
		username : "사용 할 수 없는 아이디입니다",
		password : "비밀번호가 일치하지 않습니다",
		email : "이메일을 정확히 입력해 주세요",
		nickname : "닉네임은 한글, 영어, 숫자만 4 ~10자리로 입력 가능합니다",
		phone : "전화번호를 확인해 주세요",
		empty : "필수 정보입니다"
	}


	const showNotification = (name, value)=>{

		if(!value) {
			setNotification({
				...notification,
				[name] : message.empty
			})
			return;
		} 

		if(pass[name] === true) {
			setNotification({
				...notification,
				[name] : ""
			})
			

		} else {
			setNotification({
				...notification,
				[name] : message[name]
			})
		}

	}


	const inputCheck = async (e)=>{
		const {name, value} = e.target;

		if(name !== "password") {
			data[name] = value;
		}

		if(valid[name](value)) {
			pass[name] = true;
			
		} else {
			pass[name] = false;
		}

		showNotification(name, value);
 	}

	 

	const submit = async (e)=>{
		e.preventDefault(); 

		const datakey = Object.keys(data);
		datakey.forEach((v, i)=>{
			if(pass[v] !== true) {
				setNotification({
					...notification,
					[v] : message[v]
				})
				inputRef.current[v].focus();
				return;
			}

		})


		try {
			const result = await axios.post("/join", data);
			console.log(result);

			// 중복검사 메세지가 있다면
			if(result.data) {
				setNotification({
					...notification,
					[result.data] : "이미 사용중입니다"
				});
				inputRef.current[result.data].focus();

				return;
			}

			await Swal.fire({
				html: "회원가입이 완료되었습니다",
				allowOutsideClick: false,
				confirmButtonText: "확인" 
			})

			navigator("/login");
			
		} catch(e) {
			const status = e.response.status;
			if(status === 400) {
				const errorMsg = e.response.data; 
				const arr = Object.keys(data);
				const msg = {};

				arr.forEach((v,i)=>{
					if(!v) {
						msg[v] = "";
					} else {
						msg[v] = errorMsg[v];
					}
				})
				setNotification(msg);
			}
		}
	}


	return (
		<div className={style.join_page}>
			<Link to="/">
				<img src="/img/bamin2.png" alt="이미지" className={style.bm_img} />
			</Link>

			<form onSubmit={ submit }>
				<div className={style.input_wrap}>
					<input type="text" name="username"
						// ref={el => (inputRef.current[0] = el)} 
						// ref={el => (rr.current.rr = el)} 
						ref={el => (inputRef.current.username = el)} 
						className="input_base" maxLength="15"  placeholder="아이디를 입력해 주세요" 
						onBlur={inputCheck}/>
						{notification.username}
				</div>

				<div className={style.input_wrap}>
					<input type="password" 
						className="input_base"  maxLength="20"  
						autoComplete='' placeholder="비밀번호를 입력해 주세요" 
						onBlur={(e)=> data.password = e.target.value } />
				</div>

				<div className={style.input_wrap}>
					<input type="password" name="password"
						// ref={(el) => (inputRef.current[1] = el)}
						ref={el => (inputRef.current.password = el)}
						className="input_base" maxLength="20" 
						autoComplete='' placeholder="비밀번호를 한번더 입력해 주세요" 
						onBlur={inputCheck} />
						{notification.password}
				</div>

				<div className={style.input_wrap}>
					<input type="text" name="email"
						// ref={(el) => (inputRef.current[2] = el)}
						ref={(el) => (inputRef.current.email = el)}
						className="input_base" placeholder="이메일을 입력해 주세요" maxLength="50"
						onBlur={inputCheck} />
						{notification.email}
				</div>

				<div className={style.input_wrap}>
					<input type="text" name="nickname"
						// ref={(el) => (inputRef.current[3] = el)} 
						ref={(el) => (inputRef.current.nickname = el)}
						className="input_base" placeholder="사용하실 닉네임을 입력해 주세요" maxLength="20"   
						onBlur={inputCheck} />
						{notification.nickname}
				</div>

				<div className={style.input_wrap}>
					<input type="number" name="phone" 
						// ref={(el) => (inputRef.current[4] = el)} 
						ref={(el) => (inputRef.current.phone = el)}
						className="input_base" placeholder="'-' 없이 입력해 주세요" 
						onBlur={inputCheck} pattern="\d*" />
						{notification.phone} 
				</div>

				<input type="submit" value="회원가입" className={style.join_btn} />
			</form>
		</div>
	);
}
