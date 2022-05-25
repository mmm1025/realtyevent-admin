<template>
	<ContentWrapper id="PaymentList">
		<div class="content-heading">
			<div>결제 관리</div>
		</div>

		<div id="PaymentListAdmin">
			<h4 class="page-header" style="position: relative;">
				결제이력 관리
				<select class="form-control" style="width : 200px; right : 0; position: absolute; top : -10px" v-model="mode">
					<option value="all">전체</option>
					<option value="build">건축주대학</option>
					<option value="member">멤버</option>
				</select>
			</h4>
			<div class="list">
				<b-table sort-by.sync="datetime" sort-desc.sync="Descending" @row-clicked="rowClick" responsive :items="paymentList" :fields="fieldsSortable"></b-table>
			</div>
		</div>
	</ContentWrapper>
</template>

<style>
	#PaymentList .list {width:100%; background:#fff;}
	#PaymentList .title {background:#444; color:#fff; padding:15px; text-align:center;}
	#PaymentList .title:before {right:2em !important;}
	#PaymentList .title:after {right:1.35em !important;}
	#PaymentList .text {padding:15px; text-align:center; cursor:pointer;}
	.b-table {margin-bottom:0 !important;}
</style>

<script>
  export default {
  		created() {
  			this.loadPaymentList();
  		},
		data() {
			return {
				mode : 'all',
				fieldsSortable: {		 
					userName: {
						key : 'userName',
						label: '이름',
						
						tdClass : "text",
						thClass : "title"
					},
					lectureCategory: {
						key: 'lectureCategory',
						label: '플랫폼',
						
						tdClass : "text",
						thClass : "title"
					},
					lectureTitle: {
						key: 'lectureName',
						label: '강의명',
						
						tdClass : "text",
						thClass : "title"
					},
					applicantDate: {
						key : 'datetime',
						label: '수강신청일',
						
						tdClass : "text",
						thClass : "title",
						sortDirection : 'Descending'
					},
					paymentMethod: {
						key : 'payMethod',
						label: '결제방법',
						
						tdClass : "text",
						thClass : "title"
					},
					paymentNumber: {
						key : 'payId',
						label: '결제고유번호',
						
						tdClass : "text",
						thClass : "title"
					},
					state: {
						key: 'status',
						label : '진행상태',
						
						tdClass : "text",
						thClass : "title"
					}			
				},
				paymentList : []
			}
		},
		watch : {
			"mode"() {
				this.loadPaymentList(this.mode);
			}
		},
		methods : {
			rowClick(record, index) {
				console.log(record);
				this.$router.history.push(`/payment/${record.payId}`)
			},
			loadPaymentList(type = "all") {
				this.ajax.get('/payment/list').then(res => {
					res = res.data;


					if(type === "all") {
						this.paymentList = res.data.list;
					} else if (type === "build") {
						let newList = [];
						for(let i = 0, len = res.data.list.length; i < len; i++) {
							const item = res.data.list[i];
							if(item.lectureCategory === 1) {
								newList.push(item)
							} 
						}
						this.paymentList = newList
					} else  {
						let newList = [];
						for(let i = 0, len = res.data.list.length; i < len; i++) {
							const item = res.data.list[i];
							if(item.lectureCategory !== 1) {
								newList.push(item)
							} 
						}
						this.paymentList = newList
					}

					for(let i = 0, len = this.paymentList.length; i < len; i++) {
						const item = this.paymentList[i];
						item.lectureCategory = item.lectureCategory == 1 ? '건축' : '멤버';
						item.datetime = new Date(item.datetime).toFormatString()
						item.payMethod = {
							'Card' : "신용카드",
							'Vbank' : "가상계좌",
							'DirectBank' : "실시간 계좌이체",
							'Direct' : '직접입금',
							"Free" : "무료"
						}[item.payMethod]
						item.status = {
							'COMPLETE' : "결제완료",
							'REFUND_REQUEST' : "환불요청",
							'REFUND_COMPLETE' : "환불완료",
							'WAIT' : "입금 대기"
						}[item.status]
					}
				})
			}
		}
  }
</script>