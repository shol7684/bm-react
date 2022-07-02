import { useEffect, useState, useContext } from 'react';
import style from './Main.module.css';
import { FindAddress } from './FindAddress';
import Category from './Category';
import { UserContext } from './../../context';



export function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("메인 페이지");
    setLoading(false);
    window.scrollTo(0,0);
  }, []);

  return (
    <main className={style.main}>
      <FindAddress></FindAddress>

      <section className={style.category_wrap}>
        {loading === true && "로딩"}
        {loading === false && <Category></Category>}
      </section>
    </main>
  );
}
