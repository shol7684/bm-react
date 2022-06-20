import React from 'react'


function Score(props) {
  const score = Number(props.score);
  const roundScore = Math.round(score);

  const arr = [];

  for(let i=0;i<5;i++) {
    if(i <= roundScore) {
      arr.push(<i className="fas fa-star" key={i}></i>)
    } else {
      arr.push(<i className="far fa-star" key={i}></i>)
    }
  }

  return (
    <span>
      {arr}
    </span>
  )
}

export default Score