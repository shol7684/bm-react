import { useEffect, useState, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import style from './Login.module.css';
import axios from 'axios';
import { MainContext } from './../../context';
import Swal from 'sweetalert2';

export function Login() {

  const {user, setUser} = useContext(MainContext);
  const navigate = useNavigate();

  const rememberMe = useRef(false);

  const {state} = useLocation();
 
	const submit = async (e)=>{
		e.preventDefault();

    try {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      let form = new FormData();
      form.append("username", e.target[0].value);
      form.append("password", e.target[1].value);
      form.append("remember", rememberMe.current.checked);

      const result = await axios.post("/login", form, headers);
      
      setUser(result.data);

      // 로그인 하기 이전 페이지로 이동
      if(state === null) {
        navigate("/myPage");
      } else {
        navigate(state.redirect, {
          replace: true
        });
      }

    } catch(e) {
      console.log(e);
      Swal.fire({
        html: "아이디와 비밀번호를 확인해 주세요"
      })
    }
	}


  return (
    <div className={style.login_page}>
      <Link to="/">
        <img src="/img/bamin2.png" alt="이미지" className={style.bm_img} />
      </Link>

      <form onSubmit={submit}>
        <div className={style.input_wrap}>
          <input type="text" className="input_base" name="username" required placeholder="아이디을 입력해 주세요" maxLength="30" />
        </div>
        
        <div className={style.input_wrap}>
          <input type="password" className="input_base" name="password" autoComplete='' required placeholder="비밀번호를 입력해 주세요" maxLength="30" />
        </div>

        <input type="submit" value="로그인" className={style.login_btn} />

        <section>
          <label htmlFor="remember_me">
            <span>로그인 유지하기</span>
            <input type="checkbox" id="remember_me" name="remember-me" ref={rememberMe} />
            <i className="fas fa-check-square"></i> 
          </label>

          <div className={style.id_search}>
            <Link to="/find/id">아이디</Link>
            <Link to="/find/password">비밀번호 찾기</Link>
          </div>
        </section>
      </form>

      <div className={style.oauth_login}>
        <div>
          <Link to="/oauth2/authorization/kakao"></Link>
        </div>

        <div>
          <Link to="/oauth2/authorization/naver"></Link>
        </div>

        <div>
          <Link to="/oauth2/authorization/google"></Link>
        </div>
      </div>

      <div className={style.join}><Link to="/join" >회원 가입하러 가기</Link></div>
    </div>
  );
}
