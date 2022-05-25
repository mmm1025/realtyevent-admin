<template>
	<ContentWrapper id="PaymentDetail">
		<div class="content-heading">
			<div>
				건축주대학 관리
				<button @click="deletePay()" style="position : absolute; right : 20px; top : 15px" class="btn btn-danger ml-auto"> <i class="fa fa-trash"></i> </button>
			</div>
		</div>

		<form>
			<table class="table">
				<tbody>
					<tr>
						<th>진행상태</th>
						<td class="userName">
							<span>{{payment.status}}</span>
							<!-- <button :disabled="payment.status !== '" type="button" class="btn btn-danger ml-auto">환불완료</button> -->
						</td>
					</tr>
					<tr>
						<th>이름</th>
						<td class="userName">
							<router-link :to="`/users/${payment.userId}`">
								{{payment.userName}}
							</router-link>
						</td>
					</tr>
					<tr>
						<th>휴대폰번호</th>
						<td class="phoneNumber">{{payment.userPhone}}</td>
					</tr>
					<tr>
						<th>강의명</th>
						<td class="lectureTitle">{{payment.lectureName}}</td>
					</tr>
					<tr>
						<th>수강신청일</th>
						<td class="applicantDate">{{payment.datetime}}</td>
					</tr>
					<tr>
						<th>결제방법</th>
						<td class="paymentMethod">{{payment.payMethod}}</td>
					</tr>
					<tr v-if="payment.payMethod === '가상계좌'">
						<th>무통장 입금 은행</th>
						<td class="paymentMethod">{{payment.bank_name}}</td>
					</tr>
					<tr v-if="payment.payMethod === '가상계좌'">
						<th>무통장 입금 계좌</th>
						<td class="paymentMethod">{{payment.bank_num}}</td>
					</tr>
					<tr>
						<th>결제금액</th>
						<td class="paymentMethod">{{payment.payment_price}} 원</td>
					</tr>
					<!-- <tr>
						<th>상담메모</th>
						<td class="memo">
							<div class="form-group textarea">
								<textarea rows="5" class="form-control" name="buildType" type="text" placeholder="상세설명">
								</textarea>
								<button class="btn btn-success" type="button" id="button-addon2">
									<i class="fas fa-check"></i>
								</button>
							</div> 
						</td>
					</tr> -->
				</tbody>
			</table>
		</form>
	</ContentWrapper>
</template>

<script>
	export default {
		created() {
			const id = this.$route.params.paymentId;
			this.id = this.$route.params.paymentId;
			this.loadPaymentDetail(id);
		},
		components: {

		},
		data() {
			return {
				id : '',
				data: {
					Payment : {

					},
					modifedPayment : {
						PaymentDescription : ''
					},
				},
				payment : {}
			}
		},
		methods: {
			loadPaymentDetail(id){
				this.ajax.get(`/payment?id=${id}`).then(res => {
					res = res.data;

					this.payment = res.data;

					this.payment.datetime = new Date(this.payment.datetime).toFormatString()
					this.payment.payMethod = {
						'Card' : "신용카드",
						'Vbank' : "가상계좌",
						'DirectBank' : "실시간 계좌이체",
						'Direct' : '직접입금',
						"Free" : "무료"
					}[this.payment.payMethod]
					this.payment.status = {
						'COMPLETE' : "결제완료",
						'REFUND_REQUEST' : "환불요청",
						'REFUND_COMPLETE' : "환불완료",
						'WAIT' : "입금 대기"
					}[this.payment.status]
				})
			},
			deletePay() {
				if(confirm("이 결제 기록을 삭제하시겠습니까?")) {
				if(confirm("되돌릴 수 없습니다. 삭제하시겠습니까?")) {
					this.ajax.post('/payment/remove', {
						id : this.$route.params.paymentId
					}).then(res => {
						res = res.data;
						
						if(res.code === 0) {
							alert("결제 사이트에서 환불을 진행해주십시오.");
							history.go(-1);
						}
					})
				}
			}
			}
		}
	}
</script>

<style scoped>
	#PaymentDetail {}
	#PaymentDetail .state {display:flex; position:relative;}
	#PaymentDetail .state span {position:absolute; top:50%; left:0.75rem; transform:translate(0,-50%);}
	#PaymentDetail table {width:98%; margin:2% auto 0; background:#fff; border-left:1px solid #eee; border-right:1px solid #eee; border-bottom:1px solid #eee;}
	#PaymentDetail th {width:150px; background:#444; vertical-align: middle; font-weight:normal; color:#fff;}
	#PaymentDetail .btn-group-toggle .btn {opacity:0.5;}
	#PaymentDetail .btn-group-toggle .btn:active {opacity:1;}
	#PaymentDetail .btn-group-toggle .active {opacity:1;}

	#PaymentDetail .form-group {margin-bottom:0;}
	#PaymentDetail .textarea button {width:100%; border-top-left-radius:0; border-top-right-radius:0;}
	/*#RequestDetail .btn-primary {background:rgba(0,104,183,0.4); border:0;}
	#RequestDetail .btn-primary:active {background:rgba(0,104,183,1);}*/
</style>