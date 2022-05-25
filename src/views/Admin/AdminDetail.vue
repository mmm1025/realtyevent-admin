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
						<td class="userName">홍길동</td>
					</tr>
					<tr>
						<th>아이디</th>
						<td class="userId">abc1234</td>
					</tr>
					<tr>
						<th>휴대폰번호</th>
						<td class="phoneNumber">010-4567-8970</td>
					</tr>
					<tr>
						<th>거주지역</th>
						<td class="occupiedArea">서울특별시 서초구</td>
					</tr>
					<tr>
						<th>가입일</th>
						<td class="joinDate">2019/10</td>
					</tr>
					<tr>
						<th>추가메모</th>
						<td class="memo">
							<textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
						</td>
					</tr>
				</tbody>
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
					<tr>
						<td class="lectureCategory">땅집고건축</td>
						<td class="lectureNumber">7기</td>
						<td class="lectureName">수익형 주택 클래스</td>
						<td class="requestDate">2019-04-02:11:05</td>
					</tr>
				</tbody>
			</table>
		</div>
	</ContentWrapper>
</template>

<script>
export default {
	created() {

	},
	components: {

	},
	data() {
		return {
			data: {

			}
		}
	},
	methods: {

	}
}
</script>

<style scoped>
	#UserDetail {}
	#UserDetail table {width:98%; margin:2% auto 0; background:#fff; border-left:1px solid #eee; border-right:1px solid #eee; border-bottom:1px solid #eee;}
	#UserDetail th {width:150px; background:#444; vertical-align: middle; font-weight:normal; color:#fff;}
	#UserDetail .btn {opacity:0.5;}
	#UserDetail .btn:active {opacity:1;}

	.lectureHistory table th {border-right:1px solid #eee;}
	.lectureHistory table th:last-child {border-right:0;}
	.lectureHistory table tr td {border-right:1px solid #eee;}
	.lectureHistory table tr td:last-child {border-right:0;}
	/*#UserDetail .btn-primary {background:rgba(0,104,183,0.4); border:0;}
	#UserDetail .btn-primary:active {background:rgba(0,104,183,1);}*/
</style>