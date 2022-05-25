<template>
	<ContentWrapper id="PaymentDetail">
		<div class="content-heading">
			<div>
				건축주대학 관리
				<button @click="removeMember(id)" style="position : absolute; right : 20px; top : 15px" class="btn btn-danger ml-auto"> <i class="fa fa-trash"></i> </button>
			</div>
		</div>

		<form>
			<table class="table">
				<tbody>
					<tr>
						<th>이름</th>
						<td class="userName">
							<router-link :to="`/users/${member.userId}`">
								{{member.name}}
							</router-link>
						</td>
					</tr>
					<tr>
						<th>휴대폰번호</th>
						<td class="phoneNumber">{{member.phone}}</td>
					</tr>
					<tr>
						<th>신청일</th>
						<td class="applicantDate">{{member.createTime}}</td>
					</tr>
					<tr>
						<th>건축 예정지 주소</th>
						<td class="paymentMethod">{{member.address}}</td>
					</tr>
					<tr>
						<th>건축예정일</th>
						<td class="paymentMethod">{{member.dueDate}}</td>
					</tr>
					<tr>
						<th>예산</th>
						<td class="paymentMethod">{{member.cost}}</td>
					</tr>
					<tr>
						<th>추가사항</th>
						<td class="paymentMethod">{{member.etc}}</td>
					</tr>
				</tbody>
			</table>
		</form>
	</ContentWrapper>
</template>

<script>
	export default {
		created() {
			this.id = this.$route.params.id;
			this.projectId = this.$route.params.projectId;
			this.loadMemberInfo();
		},
		data() {
			return {
				id : '',
				projectId : '',
				member : {}
			}
		},
		methods: {
			loadMemberInfo(){
				this.ajax.get(`/project/member?id=${this.id}`).then(res => {
					res = res.data;
					console.log(res);
					this.member = res.data;
				})
			},
			removeMember(id){
				if(confirm("신청건을 삭제하시겠습니까?")) {
					this.ajax.post('/project/member/remove',{
						id : id
					}).then(res => {
						res = res.data;
						if(res.code === 0) {
							this.$router.replace(["/projectList",this.projectId].join("/"));
						}
					})
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
