<template>
	<ContentWrapper id="UserDetail">
		<div class="content-heading">
			<div>유저 관리</div>
		</div>

		<h4 class="page-header">유저정보</h4>
		<form>
			<table class="table">
				<tbody>
					<tr>
						<th>이름</th>
						<td class="userName">{{userInfo.name}}</td>
					</tr>
					<tr>
						<th>아이디</th>
						<td class="userId">{{userInfo.login_id}}</td>
					</tr>
					<tr>
						<th>휴대폰번호</th>
						<td class="phoneNumber">{{userInfo.phone}}</td>
					</tr>
					<tr>
						<th>거주지역</th>
						<td class="occupiedArea">{{userInfo.address1}} {{userInfo.address2}}</td>
					</tr>
					<tr>
						<th>가입일</th>
						<td class="joinDate">{{new Date(userInfo.create_datetime).toFormatString()}}</td>
					</tr>
					<tr>
						<th>가입 경로</th>
						<td class="occupiedArea"><span v-if="userInfo.from === 'zipgobuild'">건축</span><span v-if="userInfo.from === 'member'">멤버</span></td>
					</tr>
					<tr>
						<th>마케팅 동의 여부</th>
						<td class="phoneNumber">{{userInfo.marketing}}</td>
					</tr>
				</tbody>
			</table>
			<table class="questionBox" v-if="userInfo.from === 'zipgobuild'">
				<thead>
					<th>건축주대학 설문조사</th>
				</thead>
				<tr>
					<td>
						<div class="form-group">
							<label for="question" class="col-form-label question">1. 건축을 계획 중이십니까?</label>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question1-1" name="question1" class="custom-control-input" value="1" v-model="userInfo.survey.q1">
							  <label class="custom-control-label" for="question1-1">계획이 전혀 없다</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question1-2" name="question1" class="custom-control-input" value="2" v-model="userInfo.survey.q1">
							  <label class="custom-control-label" for="question1-2">부동산은 있으나 특별한 계획이 없다</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question1-3" name="question1" class="custom-control-input" value="3" v-model="userInfo.survey.q1">
							  <label class="custom-control-label" for="question1-3">조만간 건축 예정인 부동산을 소유하고 있다</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question1-4" name="question1" class="custom-control-input" value="4" v-model="userInfo.survey.q1">
							  <label class="custom-control-label" for="question1-4">현재 건축을 진행중이다</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question1-5" name="question1" class="custom-control-input" value="5" v-model="userInfo.survey.q1">
							  <label class="custom-control-label" for="question1-5">관심은 많지만 해당사항이 없다</label>
							</div>
						</div>
						<div class="form-group">
							<label for="question" class="col-form-label question">2. 계획 중인 건축물의 용도는 무엇입니까?</label>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-1" name="question2" class="custom-control-input" value="1" v-model="userInfo.survey.q2">
							  <label class="custom-control-label" for="question2-1">계획중이지 않다</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-2" name="question2" class="custom-control-input" value="2" v-model="userInfo.survey.q2">
							  <label class="custom-control-label" for="question2-2">단독주택</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-3" name="question2" class="custom-control-input" value="3" v-model="userInfo.survey.q2">
							  <label class="custom-control-label" for="question2-3">상가주택</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-4" name="question2" class="custom-control-input" value="4" v-model="userInfo.survey.q2">
							  <label class="custom-control-label" for="question2-4">다세대, 다가구 등 임대주택</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-5" name="question2" class="custom-control-input" value="5" v-model="userInfo.survey.q2">
							  <label class="custom-control-label" for="question2-5">상가 등 근린생활시설</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="customRadio6" name="question2" class="custom-control-input" value="6" v-model="userInfo.survey.q2">
							  <label class="custom-control-label" for="customRadio6">리모델링</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-7" name="question2" class="custom-control-input" value="7" v-model="userInfo.survey.q2">
							  <label class="custom-control-label" for="question2-7">팬션, 모텔, 호텔 등 숙박시설</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-8" name="question2" class="custom-control-input" value="8" v-model="userInfo.survey.q2">
							  <label class="custom-control-label" for="question2-8">교육, 연구 공장 등 특수시설</label>
							</div>
						</div>
						<div class="form-group">
							<label for="question" class="col-form-label question">3. 건축예산(땅값 포함)은 얼마나 생각하고 있습니까?</label>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question3-1" name="question3" class="custom-control-input" value="1" v-model="userInfo.survey.q3">
							  <label class="custom-control-label" for="question3-1">5억원 미만</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question3-2" name="question3" class="custom-control-input" value="2" v-model="userInfo.survey.q3">
							  <label class="custom-control-label" for="question3-2">5억원 이상 10억원 미만</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question3-3" name="question3" class="custom-control-input" value="3" v-model="userInfo.survey.q3">
							  <label class="custom-control-label" for="question3-3">10억원 이상 20억원 미만</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question3-4" name="question3" class="custom-control-input" value="4" v-model="userInfo.survey.q3">
							  <label class="custom-control-label" for="question3-4">20억원 이상</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question3-5" name="question3" class="custom-control-input" value="5" v-model="userInfo.survey.q3">
							  <label class="custom-control-label" for="question3-5">구체적으로 생각해본 적 없다</label>
							</div>
						</div>
						<div class="form-group">
							<label for="question" class="col-form-label question">4. 계획 중인 건축 부지는 어느 지역에 해당합니까?</label>
							<input type="text" class="form-control" placeholder="시도 / 시군구, 미정 시 공란" v-model="userInfo.survey.q4">
						</div>
						<div class="form-group">
							<label for="question" class="col-form-label question">5. 조선일보 건축주대학을 통해 알고 싶은 정보는 무엇입니까?</label>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-1" name="question4" class="custom-control-input" value="1" v-model="userInfo.survey.q5">
							  <label class="custom-control-label" for="question4-1">부동산 정보</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-2" name="question4" class="custom-control-input" value="2" v-model="userInfo.survey.q5">
							  <label class="custom-control-label" for="question4-2">건축가 정보</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-3" name="question4" class="custom-control-input" value="3" v-model="userInfo.survey.q5">
							  <label class="custom-control-label" for="question4-3">시공사 정보</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-4" name="question4" class="custom-control-input" value="4" v-model="userInfo.survey.q5">
							  <label class="custom-control-label" for="question4-4">건축 재료나 비용과 같은 실질적인 정보</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-5" name="question4" class="custom-control-input" value="5" v-model="userInfo.survey.q5">
							  <label class="custom-control-label" for="question4-5">투자 수익과 같은 재무적인 정보</label>
							</div>
						</div>
						<div class="form-group">
							<label for="question" class="col-form-label question">6. 조선일보 건축주대학을 어떤 경로로 알게 되었습니까?</label>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question5-1" name="question5" class="custom-control-input" value="1" v-model="userInfo.survey.q6">
							  <label class="custom-control-label" for="question5-1">조선닷컴</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question5-2" name="question5" class="custom-control-input" value="2" v-model="userInfo.survey.q6">
							  <label class="custom-control-label" for="question5-2">포털사이트</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question5-3" name="question5" class="custom-control-input" value="3" v-model="userInfo.survey.q6">
							  <label class="custom-control-label" for="question5-3">지인 추천</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question5-4" name="question5" class="custom-control-input" value="4" v-model="userInfo.survey.q6">
							  <label class="custom-control-label" for="question5-4">페이스북 등 소셜미디어</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question5-5" name="question5" class="custom-control-input" value="5" v-model="userInfo.survey.q6">
							  <label class="custom-control-label" for="question5-5">제1기 또는 2기 <조선일보 건축주대학> 수강</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question5-6" name="question5" class="custom-control-input" value="6" v-model="userInfo.survey.q6">
							  <label class="custom-control-label" for="question5-6">조선일보 지면</label>
							</div>
						</div>
					</td>
				</tr>
			</table>
			<table class="questionBox" v-if="userInfo.from === 'member'">
				<thead>
					<th>땅집고멤버 설문조사</th>
				</thead>
				<tr>
					<td>
						<div class="form-group">
							<label for="question" class="col-form-label question">1. 구분</label>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question1-1" name="question1" class="custom-control-input" value="1" v-model="userInfo.memberSurvey.q1">
							  <label class="custom-control-label" for="question1-1">개인투자자</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question1-2" name="question1" class="custom-control-input" value="2" v-model="userInfo.memberSurvey.q1">
							  <label class="custom-control-label" for="question1-2">공인중개사</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question1-3" name="question1" class="custom-control-input" value="3" v-model="userInfo.memberSurvey.q1">
							  <label class="custom-control-label" for="question1-3">중개법인</label>
							</div>
						</div>
						<div class="form-group">
							<label for="question" class="col-form-label question">2. 연령대</label>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-1" name="question2" class="custom-control-input" value="1" v-model="userInfo.memberSurvey.q2">
							  <label class="custom-control-label" for="question2-1">20대</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-2" name="question2" class="custom-control-input" value="2" v-model="userInfo.memberSurvey.q2">
							  <label class="custom-control-label" for="question2-2">30대</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-3" name="question2" class="custom-control-input" value="3" v-model="userInfo.memberSurvey.q2">
							  <label class="custom-control-label" for="question2-3">40대</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-4" name="question2" class="custom-control-input" value="4" v-model="userInfo.memberSurvey.q2">
							  <label class="custom-control-label" for="question2-4">50대</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question2-5" name="question2" class="custom-control-input" value="5" v-model="userInfo.memberSurvey.q2">
							  <label class="custom-control-label" for="question2-5">60대 이상</label>
							</div>
						</div>
						<div class="form-group">
							<label for="question" class="col-form-label question">3. 관심있는 부동산의 종류 (복수선택)</label>
							<div class="custom-control custom-checkbox">
							  <input type="checkbox" id="question3-1" name="question3" class="custom-control-input" value="1" v-model="userInfo.memberSurvey.q3">
							  <label class="custom-control-label" for="question3-1">아파트</label>
							</div>
							<div class="custom-control custom-checkbox">
							  <input type="checkbox" id="question3-2" name="question3" class="custom-control-input" value="2" v-model="userInfo.memberSurvey.q3">
							  <label class="custom-control-label" for="question3-2">오피스텔ㆍ상가</label>
							</div>
							<div class="custom-control custom-checkbox">
							  <input type="checkbox" id="question3-3" name="question3" class="custom-control-input" value="3" v-model="userInfo.memberSurvey.q3">
							  <label class="custom-control-label" for="question3-3">재개발ㆍ재건축</label>
							</div>
							<div class="custom-control custom-checkbox">
							  <input type="checkbox" id="question3-4" name="question3" class="custom-control-input" value="4" v-model="userInfo.memberSurvey.q3">
							  <label class="custom-control-label" for="question3-4">빌딩</label>
							</div>
							<div class="custom-control custom-checkbox">
							  <input type="checkbox" id="question3-5" name="question3" class="custom-control-input" value="5" v-model="userInfo.memberSurvey.q3">
							  <label class="custom-control-label" for="question3-5">해외부동산</label>
							</div>
							<div class="custom-control custom-checkbox">
							  <input type="checkbox" id="question3-6" name="question3" class="custom-control-input" value="6" v-model="userInfo.memberSurvey.q3">
							  <label class="custom-control-label" for="question3-6">부동산 금융상품</label>
							</div>
						</div>
						<div class="form-group">
							<label for="question" class="col-form-label question">4. 투자예상금액</label>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-1" name="question4" class="custom-control-input" value="1" v-model="userInfo.memberSurvey.q4">
							  <label class="custom-control-label" for="question4-1">5억</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-2" name="question4" class="custom-control-input" value="2" v-model="userInfo.memberSurvey.q4">
							  <label class="custom-control-label" for="question4-2">10억</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-3" name="question4" class="custom-control-input" value="3" v-model="userInfo.memberSurvey.q4">
							  <label class="custom-control-label" for="question4-3">30억 이하</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-4" name="question4" class="custom-control-input" value="4" v-model="userInfo.memberSurvey.q4">
							  <label class="custom-control-label" for="question4-4">50억 이하</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question4-5" name="question4" class="custom-control-input" value="5" v-model="userInfo.memberSurvey.q4">
							  <label class="custom-control-label" for="question4-5">50억 이상</label>
							</div>
						</div>
						<div class="form-group">
							<label for="question" class="col-form-label question">5. 성별</label>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question5-1" name="question5" class="custom-control-input" value="1" v-model="userInfo.memberSurvey.q5">
							  <label class="custom-control-label" for="question5-1">남자</label>
							</div>
							<div class="custom-control custom-radio">
							  <input required type="radio" id="question5-2" name="question5" class="custom-control-input" value="2" v-model="userInfo.memberSurvey.q5">
							  <label class="custom-control-label" for="question5-2">여자</label>
							</div>
						</div>
					</div>
					</td>
				</tr>
			</table>
		</form>

		<div class="lectureHistory">
			<h4 class="page-header">수강이력</h4>
			<table class="table">
				<thead>
					<tr>
						<th>강의분류</th>
						<th>기수</th>
						<th>강의이름</th>
						<th>신청일</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="lecture in lectureList">
						<td class="lectureCategory">{{lecture.lectureCategory}}</td>
						<td class="lectureNumber">{{lecture.lecturePeriod}}</td>
						<td class="lectureName">{{lecture.lectureName}}</td>
						<td class="requestDate">2019-04-02:11:05</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="lectureHistory">
			<h4 class="page-header">쿠폰 보유/사용 현황</h4>
			<div class="row" style="margin : 0">
				<div class="col-lg-3">
					<select class="form-control" v-model="coupon.lecture_id">
						<option v-for="l in allLectureList" :value="l.id">{{l.period}} {{l.name}}</option>
					</select>
				</div>
				<div class="col-lg-3">
					<input type="text" name="" class="form-control" placeholder="쿠폰 이름" v-model="coupon.name">
				</div>
				<div class="col-lg-3">
					<input type="text" name="" class="form-control" placeholder="할인 금액" v-model="coupon.discount_price">
				</div>
				<div class="col-lg-3">
					<button @click="addCoupon" class="btn btn-primary btn-block">쿠폰 발급</button>
				</div>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>쿠폰 이름</th>
						<th>할인 금액</th>
						<th>사용 여부</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="coupon in couponList">
						<td class="lectureCategory">{{coupon.name}}</td>
						<td class="lectureNumber">{{coupon.discount_price}}</td>
						<td class="lectureName"><span v-if="coupon.used">사용</span><span v-if="!coupon.used">미사용</span></td>
						<!-- <td class="requestDate">2019-04-02:11:05</td> -->
					</tr>
				</tbody>
			</table>
		</div>
	</ContentWrapper>
</template>

<script>
export default {
	created() {
		this.userId = this.$route.params.userId;
		this.loadUserInfo();
		this.loadLectureList();
		this.loadCouponList();
		this.loadAllLectureList();
	},
	components: {

	},
	data() {
		return {
			userId : '',
			userInfo : {
				survey : [],
				memberSurvey : []
			},
			coupon : {
				user_id : this.$route.params.userId,
				lecture_id : '',
				name : '',
				discount_price : 0
			},
			lectureList : [],
			couponList : [],
			allLectureList : []
		}
	},
	methods: {
		loadAllLectureList() {
			this.ajax.get(`/lecture/fulllist`).then(res => {
				res = res.data;

				if(res.code === 0) {
					this.allLectureList = res.data.list.reverse();
					if(this.allLectureList.length > 0) {
						this.coupon.lecture_id = this.allLectureList[0].id
					}
				}
			})
		},
		loadUserInfo(){
			this.ajax.get(`/user/${this.userId}`)
			.then(res => {
				res = res.data;
				if(res.code === 0) {
					this.userInfo = res.data;
				} else {
					alert('user',res.msg);
				}
			})
		},
		loadLectureList(){
			this.ajax.get(`/user/${this.userId}/lectureList`)
			.then(res => {
				res = res.data;
				if(res.code === 0) {
					this.lectureList = res.data;
				} else {
					alert('lecture',res.msg);
				}
			})
		},
		loadCouponList(){
			this.ajax.get(`/user/${this.userId}/coupon/list`)
			.then(res => {
				res = res.data;

				if(res.code === 0) {
					this.couponList = res.data;
				} else {
					alert('coupon',res.msg);
				}
			})
		},
		addCoupon(){
			this.ajax.post(`/user/${this.userId}/coupon/add`, this.coupon)
			.then(res => {
				res = res.data;

				if(res.code === 0) {
					this.loadCouponList();
				} else {
					alert(res.msg);
				}
			})
		}
	}
}
</script>

<style scoped>
	#UserDetail {}
	#UserDetail table {width:98%; margin:2% auto 0; background:#fff; border-left:1px solid #eee; border-right:1px solid #eee; border-bottom:1px solid #eee;}
	#UserDetail th {width:150px; background:#444; vertical-align: middle; font-weight:normal; color:#fff;}
	#UserDetail .btn-group-toggle .btn {opacity:0.5;}
	#UserDetail .btn-group-toggle .btn:active {opacity:1;}
	#UserDetail .btn-group-toggle .active {opacity:1;}

	#UserDetail .form-group {margin-bottom:0;}
	#UserDetail .textarea button {width:100%; border-top-left-radius:0; border-top-right-radius:0;}

	#UserDetail table.questionBox th {padding:1rem;}
	#UserDetail table.questionBox td {padding:1rem;}
	#UserDetail table.questionBox td label.question {font-weight:bold;}
	#UserDetail table.questionBox td>div {margin-bottom:10px;}

	.lectureHistory table th {border-right:1px solid #eee;}
	.lectureHistory table th:last-child {border-right:0;}
	.lectureHistory table tr td {border-right:1px solid #eee;}
	.lectureHistory table tr td:last-child {border-right:0;}
	/*#UserDetail .btn-primary {background:rgba(0,104,183,0.4); border:0;}
	#UserDetail .btn-primary:active {background:rgba(0,104,183,1);}*/
</style>
