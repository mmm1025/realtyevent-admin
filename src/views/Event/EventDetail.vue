<template>
	<ContentWrapper id="RequestDetail">
		<div class="content-heading">
			<div>청년주택 개발지원</div>
		</div>

		<form>
			<table class="table">
				<tbody>
					<tr>
						<th>신청날짜</th>
						<td class="requestDate">{{new Date(consulting.datetime).toFormatString()}}</td>
					</tr>
					<tr>
						<th>이름</th>
						<td class="applicant">{{consulting.name}}</td>
					</tr>
					<tr>
						<th>휴대폰번호</th>
						<td class="phoneNumber">{{consulting.phone}}</td>
					</tr>
					<tr>
						<th>사업예정지주소</th>
						<td class="address">{{consulting.address}}</td>
					</tr>
					<tr>
						<th>부지면적</th>
						<td class="extent">{{consulting.area}}</td>
					</tr>
					<tr>
						<th>신청자주소</th>
						<td class="buildType">{{consulting.buildingType}}</td>
					</tr>
					<tr>
						<th>추가요청사항</th>
						<td class="extra">{{consulting.etc}}</td>
					</tr>
				</tbody>
			</table>
		</form>
	</ContentWrapper>
</template>

<script>
	export default {
		created() {
			this.id = this.$route.params.eventId;
			this.loadEvent();
			
		},
		components: {

		},
		data() {
			return {
				id : '',
				buildingType : {},
				buildingMethod : {},
				cost : {},
				consulting : {},
				modifedConsulting : {
					status : '',
					note : ''
				}
			}
		},
		methods: {
			loadEvent(){
				this.ajax.get(`/event/${this.id}`)
				.then(res => {
					res = res.data;

					if(res.code === 0) {
						console.log(res.data)
						this.consulting = this.objClone(res.data);
					} else {

					}
				})
			},
			objClone(obj) {
				const result = {}

				for(let key in obj) {
					result[key] = obj[key];
				}

				return result;
			}
		}
	}
</script>

<style scoped>
	#RequestDetail {}
	#RequestDetail table {width:98%; margin:2% auto 0; background:#fff; border-left:1px solid #eee; border-right:1px solid #eee; border-bottom:1px solid #eee;}
	#RequestDetail th {width:150px; background:#444; vertical-align: middle; font-weight:normal; color:#fff;}
	#RequestDetail .btn-group-toggle .btn {opacity:0.5;}
	#RequestDetail .btn-group-toggle .btn:active {opacity:1;}
	#RequestDetail .btn-group-toggle .active {opacity:1;}

	#RequestDetail .form-group {margin-bottom:0;}
	#RequestDetail .textarea button {width:100%; border-top-left-radius:0; border-top-right-radius:0;}
	/*#RequestDetail .btn-primary {background:rgba(0,104,183,0.4); border:0;}
	#RequestDetail .btn-primary:active {background:rgba(0,104,183,1);}*/
</style>