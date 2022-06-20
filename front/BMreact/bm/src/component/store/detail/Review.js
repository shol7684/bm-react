import React, { useContext, useEffect } from 'react'
import style from './Review.module.css'
import { StoreDetailContext } from './../../../context';
import Score from '../../score/Score';

function Review() {

	const context = useContext(StoreDetailContext);
	const {storeDetail} = context;
	useEffect(() => {
		console.log("리뷰목록");
		console.log(storeDetail);

	})


	const ManagerComment = ({comment})=>{
		return (
			<div className={style.manager_comment}>
				<div>사장님</div>
				<div>{comment}</div>
			</div>
		)
	}



	const ReviewList = ()=>{
		const list = storeDetail.reviewList.map((value, index)=>{
			return (
				<li key={value.reviewId}>
					<h3>{value.nickname}</h3>
					<Score score={value.score}></Score>
					<span>{value.regDate.getFullYear()}</span>
					<div>
						<img src={value.reviewImg}></img>
					</div>
					
					<div>{value.review}</div>
					{value.managerComment && <ManagerComment comment={value.managerComment}/>}
				</li>
			)

		})
		return (
			<ul className={style.review_list}>
				{list}
			</ul>
		)
	}




	const ScoreGraph = ()=>{
		const list =[];

		for(let i=5;i>0;i--) {
			list.push(
				<div key={i}>
					<div className={style.score_num}>{i}점</div>
					<div className={style.graph_bg}>
						<div className={style.graph}></div>
					</div>
					<div className={style.score_count}>{storeDetail["score" + i]}</div>
				</div>
			);
		}



		return (
			<div className={style.graph_wrap}>
				{list}
			</div>
		)
	}

	return (
		<div>
			<div className={style.score_wrap}>
				<div>
					<div className={style.score_avg}>{storeDetail.scoreAvg} </div>
					<i className="far fas fa-star"></i>
					<i className="far fas fa-star"></i>
					<i className="far fas fa-star"></i>
					<i className="far fas fa-star"></i>
					<i className="far fas fa-star"></i>
				</div>

				<ScoreGraph></ScoreGraph>
				
			</div>

			<ReviewList></ReviewList>
			{/* <ul className={style.review_list}> */}

				{/* <c:forEach items="${store.reviewList }" var="reviewList">
            <li>
            	<div class="client">
            		
            		<div class="review_header">
            			<div>
			                <div class="nickname">${reviewList.nickname }</div>
			                <div>
			                	
			                	<c:forEach begin="0" end="4" var="i">
				                	<c:choose>
				           				<c:when test="${Math.round(reviewList.score) > i }">
					                   		<i class="far fas fa-star"></i>
					                   	</c:when>
					                   	<c:otherwise>
					                   		<i class="far fa-star"></i>
					                   	</c:otherwise>
			             			</c:choose>
			                	</c:forEach>
			                	
			                	<span><fm:formatDate value="${reviewList.regiDate }" pattern="yyyy-MM-dd" /> </span>
			                </div>
	                	</div>
	                	
	                	<c:if test="${adminPage}">
			                 <div>
			                
			                	<c:if test="${!empty reviewList.bossComment}">
			                		<button class="review_btn comment_modify">댓글 수정하기</button>
			                	</c:if>
			                	
			                	<c:if test="${empty reviewList.bossComment}">
			                		<button class="review_btn comment_write" >답장하기</button>
			                	</c:if> 
			                	<input type="hidden" value="${reviewList.orderNum }" class="order_num">
			                </div>
		                </c:if>
	                </div> 
	                
	                
		                
	                <div>
		                <c:if test="${!empty reviewList.reviewImg }">
		                	<div><img src="${reviewList.reviewImg }" alt="이미지" class="review_img"></div>
		                </c:if>
	                	<div>${reviewList.reviewContent } </div>
	                </div>
                </div>
                
                
                <div class="boss">
	                <c:if test="${!empty reviewList.bossComment }">	
		                <div class="boss_comment_box">
		                	<div class="nickname">사장님</div>
		                	<div class="boss_comment">${reviewList.bossComment }</div>
		                </div>
	                </c:if>
                </div>
                
                
                 <div class="boss input">
               	 	<div class="boss_comment_box">
        		 		<div class="nickname">사장님</div>
        				<div class="boss_comment">
	        				<textarea class="comment_area" spellcheck="false"></textarea>
        				</div>
        				
	        			<div>
	        				<button class="boss_comment_btn reply" >댓글 달기</button>
	        				<input type="hidden" value="${reviewList.orderNum }" class="order_num">
	        			</div>
        			</div>
       			</div>
            </li>
			</c:forEach> */}



			{/* </ul> */}
		</div>
	)
}

export default Review