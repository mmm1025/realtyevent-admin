<template>
	<ContentWrapper id="RequestDetail">
		<div class="content-heading">
			<div>견적상담 관리</div>
		</div>

		<form>
			<table class="table">
				<tbody>
					<tr>
						<th>진행상태</th>
						<td>
							<div class="btn-group-toggle">
								<label class="btn btn-primary mr-1" :class="consulting.status === 'WAIT' ? 'active' : ''">
									<input id="option1" type="radio" name="options" checked="" value="WAIT" v-model="modifedConsulting.status"> 접수</label>
								<label class="btn btn-danger mr-1" :class="consulting.status === 'ING' ? 'active' : ''">
									<input id="option2" type="radio" name="options" value="ING" v-model="modifedConsulting.status"> 처리중</label>
								<label class="btn btn-success" :class="consulting.status === 'COMPLETE' ? 'active' : ''">
									<input id="option3" type="radio" name="options" value="COMPLETE" v-model="modifedConsulting.status"> 완료</label>
							</div>
						</div>
						</td>
					</tr>
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
						<th>이메일</th>
						<td class="mail">{{consulting.email}}</td>
					</tr>
					<tr>
						<th>희망건축유형</th>
						<td class="buildType">{{buildingType[consulting.buildingType]}}</td>
					</tr>
					<tr>
						<th>희망건축방법</th>
						<td class="buildMethod">{{buildingMethod[consulting.buildingMethod]}}</td>
					</tr>
					<tr>
						<th>비용</th>
						<td class="cost">{{cost[consulting.cost]}}</td>
					</tr>
					<tr>
						<th>건축예정일</th>
						<td class="scheduledDate">{{consulting.dueDate}}</td>
					</tr>
					<tr>
						<th>건축예정지주소</th>
						<td class="address">{{consulting.address}}</td>
					</tr>
					<tr>
						<th>부지면적</th>
						<td class="extent">{{consulting.area}}m<sup>2</sup></td>
					</tr>
					<tr>
						<th>추가요청사항</th>
						<td class="extra">{{consulting.etc}}</td>
					</tr>
					<tr>
						<th>상담메모</th>
						<td class="memo">
							<div class="form-group textarea">
								<textarea rows="5" class="form-control" name="buildType" type="text" placeholder="상세설명" v-model="modifedConsulting.note">
									{{consulting.note}}
								</textarea>
								<button class="btn btn-success" type="button" id="button-addon2" @click="updateNote" v-if="modifedConsulting.note != consulting.note">
									<i class="fas fa-check"></i>
								</button>
							</div> 
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</ContentWrapper>
</template>

<script>
	export default {
		created() {
			this.id = this.$route.params.requestId;
			this.loadOption().then(() => {
				this.loadRequest();
			})
			
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
		watch : {
			'modifedConsulting.status'(){
				this.updateStatus();
			}
		},
		methods: {
			loadOption() {
				return new Promise((resolve, reject) => {
					this.ajax.get('/consulting/option')
					.then(res => {
						res = res.data;
						if(res.code === 0){
							for(let i = 0, len = res.data.buildingType.length; i < len; i++) {
								this.buildingType[res.data.buildingType[i]['code']] = res.data.buildingType[i]['name']
							}
							for(let i = 0, len = res.data.buildingMethod.length; i < len; i++) {
								this.buildingMethod[res.data.buildingMethod[i]['code']] = res.data.buildingMethod[i]['name']
							}
							for(let i = 0, len = res.data.cost.length; i < len; i++) {
								this.cost[res.data.cost[i]['code']] = res.data.cost[i]['name']
							}
							resolve();
						} else {
							reject();
						}
					})
				})
			},
			loadRequest(){
				this.ajax.get(`/consulting/${this.id}`)
				.then(res => {
					res = res.data;

					if(res.code === 0) {
						console.log(res.data)
						this.consulting = this.objClone(res.data);
						this.modifedConsulting = this.objClone(res.data);
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
			},
			updateStatus(status){
				this.ajax.post(`/consulting/${this.id}/status`, {
					status : this.modifedConsulting.status
				}).then(res => {
					res = res.data;

					if(res.code === 0){
						console.log(res.data);
						this.consulting.status = this.modifedConsulting.status;
					} else {
						alert("상태변경에 실패했습니다")
					}
				})
			},
			updateNote(note){
				this.ajax.post(`/consulting/${this.id}/note`, {
					note : this.modifedConsulting.note
				}).then(res => {
					res = res.data;

					if(res.code === 0){
						this.consulting.note = this.modifedConsulting.note;
					} else {
						alert("내용변경에 실패했습니다")
					}
				})
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