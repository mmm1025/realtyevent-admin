<template>
	<ContentWrapper id="ProjectDetail">
		<div class="content-heading">
			<div>건설지원센터 관리 > 목록/상세</div>
			<a href="/projectList"><button type="button" class="btn btn-primary btn-sm" style="position: absolute; right: 0px;"> 목록</button></a>
		</div>

		<!-- <div class="col-sm-12">
			<div class="col-sm-12">
				<h4 class="page-header">
					<a href="/projectList"><button type="button" class="btn btn-primary btn-sm" style="position: absolute; right: 0px;"> 목록</button></a>
				</h4>
			</div>
		</div>
			 -->
		<form class="row">
			<div class="col-sm-6 boxwrap">
				<h3>대표이미지 기본</h3>
				<div class="imgbox d-flex">
					<button type="button" class="btn btn-sm btn-dark ml-auto" @click="clickModifiedBtn('1')">수정하기</button>
					<input type="hidden">
					<img :src="imageForList.image1" alt="대표이미지(기본)">
				</div>
				<h3>대표이미지 2칸크기</h3>
				<div class="imgbox d-flex">
					<button type="button" class="btn btn-sm btn-dark ml-auto" @click="clickModifiedBtn('2')">수정하기</button>
					<input type="hidden">
					<img :src="imageForList.image2" alt="대표이미지(2칸)">
				</div>
				<h3>대표이미지 3칸크기</h3>
				<div class="imgbox d-flex">
					<button type="button" class="btn btn-sm btn-dark ml-auto" @click="clickModifiedBtn('3')">수정하기</button>
					<input type="hidden">
					<img :src="imageForList.image3" alt="대표이미지(3칸)">
				</div>
			</div>
			<table class="table projectAdmin col-sm-6">
				<tbody>
					<tr>
						<th>진행상태</th>
						<td>
							<div class="btn-group-toggle">
								<label class="btn btn-warning mr-1" :class="data.status === 'WAIT' ? 'active' : ''">
									<input id="option1" type="radio" name="options" value="WAIT" v-model="data.status"/> 모집예정
								</label>
								<label class="btn btn-info mr-1" :class="data.status === 'OPEN' ? 'active' : ''">
									<input id="option2" type="radio" name="options" value="OPEN" v-model="data.status"/> 모집중
								</label>
								<label class="btn btn-success mr-1" :class="data.status === 'ING' ? 'active' : ''">
									<input id="option3" type="radio" name="options" value="ING" v-model="data.status"/> 신청마감
								</label>
								<label class="btn btn-inverse" :class="data.status === 'EXIT' ? 'active' : ''">
									<input id="option4" type="radio" name="options" value="EXIT" v-model="data.status"/> 종료
								</label>
							</div>
						</td>
					</tr>
					<tr>
						<th>이름</th>
						<td class="projectTitle">
							<div class="input-group">
								<input class="form-control" name="projectTitle" type="text" placeholder="프로젝트 이름" v-model="data.name">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('name')" v-if="data.name !== originData.name">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>신청 인원</th>
						<td class="capacity">{{memberList.length}}명</td>
					</tr>
					<!-- <tr>
						<th>비용</th>
						<td class="projectCost">
							<div class="input-group">
								<input class="form-control" name="projectCost" type="number" placeholder="강의비용" v-model="data.price">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('price')" v-if="data.price !== originData.price">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>기본할인</th>
						<td class="projectCost">
							<div class="input-group">
								<input class="form-control" name="projectCost" type="number" placeholder="기본할인" v-model="data.discount">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('discount')" v-if="data.discount !== originData.discount">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr> -->
					<tr>
						<th>시작일</th>
						<td class="projectSchedule">
							<div class="input-group">
								<input class="form-control" name="projectSchedule" type="date" placeholder="강의일정" v-model="data.start_date">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('start_date')" v-if="data.start_date !== originData.start_date">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>종료일</th>
						<td class="projectSchedule">
							<div class="input-group">
								<input class="form-control" name="projectSchedule" type="date" placeholder="강의일정" v-model="data.end_date">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('end_date')" v-if="data.end_date !== originData.end_date">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>일정 (Text)</th>
						<td class="projectSchedule">
							<div class="input-group">
								<input class="form-control" name="projectSchedule" type="text" placeholder="강의일정" v-model="data.date">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('date')" v-if="data.date !== originData.date">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>시간 (Text)</th>
						<td class="projectHour">
							<div class="input-group">
								<input class="form-control" name="projectHour" type="text" placeholder="강의시간" v-model="data.time">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('time')" v-if="data.time !== originData.time">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>장소 (Text)</th>
						<td class="projectPlace">
							<div class="input-group">
								<input class="form-control" name="projectPlace" type="text" placeholder="강의장소" v-model="data.place">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('place')" v-if="data.place !== originData.place">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>추가요청사항<br/>템플릿</th>
						<td class="projectPlace">
							<div class="input-group">
								<textarea class="form-control" name="projectAddRequest" placeholder="추가요청사항" v-model="data.add_request" rows="6"></textarea>
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('add_request')" v-if="data.add_request !== originData.add_request">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>신청URL</th>
						<td class="projectPlace">
							<div class="input-group">
								<input class="form-control" name="projectPaymentUrl" type="text" placeholder="멤버연동URL" v-model="data.payment_url">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('payment_url')" v-if="data.payment_url !== originData.payment_url">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</form>

		<!-- <b-modal id="addMember" title="신청자 추가" @ok="addFakeUser">
			<form class="form-horizontal" method="get" action="/">
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">이름</label>
						<div class="col-sm-9">
							<input class="form-control" type="text" placeholder="" v-model="fakeUser.username">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">핸드폰</label>
						<div class="col-sm-9">
							<input class="form-control" type="text" placeholder="" v-model="fakeUser.phone">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">결제금액</label>
						<div class="col-sm-9">
							<input class="form-control" type="text" placeholder="" v-model="fakeUser.price">
						</div>
					</div>
				</fieldset>
			</form>
		</b-modal> -->

		<div class="row">
			
			<div style="display: none;">
				<input type="file" id="image" @change="onImageChange" accept="image/*">
				<input type="hidden" id="gubun" name="gubun" >
			</div>
			
			<!--pc 상세 이미지 업로드 -->
			<div class="col-sm-6">
				<h4 class="page-header">상세 화면 이미지 [PC]</h4>
				<div class="imgbox d-flex" style="position: relative; height:400px; overflow:hidden;">
					<img :src="imageForPc.url" alt="pc 상세이미지" style="display:block; width:100%;">
					<button type="button" class="btn btn-dark btn-sm" style="position: absolute; right: 0; width : 120px" @click="clickModifiedBtn('P')"> <i class="fa fa-plus"></i> 수정하기</button>
					<!-- <a :href='`${$store.getters.baseFrontURL}/project/${projectId}`' target="_blank">
						<button type="button" class="btn btn-primary btn-sm" style="position: absolute; right: 130px;"> <i class="fa fa-plus"></i> 페이지 열기</button>
					</a> -->
				</div>
			</div>

			<!--모바일 상세 이미지 업로드 -->
			<div class="col-sm-6">
				<h4 class="page-header">상세 화면 이미지 [MOBILE]</h4>
				<div  class="imgbox d-flex" style="position: relative; height:400px; overflow:hidden;">
					<img :src="imageForMobile.url" alt="mobile 상세이미지" style="display:block; width:100%;">
					<button type="button" class="btn btn-dark btn-sm" style="position: absolute; right: 0; width : 120px" @click="clickModifiedBtn('M')"> <i class="fa fa-plus"></i> 수정하기</button>
					<!-- <a :href='`${$store.getters.baseFrontURL}/project/${projectId}`' target="_blank">
						<button type="button" class="btn btn-primary btn-sm" style="position: absolute; right: 130px;"> <i class="fa fa-plus"></i> 페이지 열기</button>
					</a> -->
				</div>
			</div>
		</div>

		<div class="studentList">
			<h4 class="page-header d-flex">
				<span>신청자 목록</span>
				<div class="btn-box ml-auto">
					<!-- <button type="button" class="btn btn-info btn-sm mr-1" v-b-modal.addMember>
						<i class="fas fa-plus"></i>
						신청자 추가
					</button> -->
				</div>
			</h4>

			<table class="table">
				<thead>
					<tr>
						<th>이름</th>
						<th>아이디</th>
						<th>휴대폰번호</th>
						<th>신청일</th>
						<th>신청고유번호</th>
						<th>신청취소</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="member in memberList" style="cursor: pointer;" @click="rowClick(member.id)" :key="member.id">
						<td class="userName">{{member.userName}}</td>
						<td class="userId">{{member.userId}}</td>
						<td class="phoneNumber">{{member.userPhone}}</td>
						<td class="requestDate">{{new Date(member.paymentDatetime).toFormatString()}}</td>
						<td class="uniqueNumber">{{member.id}}</td>
						<td class="cancel">
							<button type="button" class="btn btn-dark btn-sm" @click="removePayment(member.id)">수강취소</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</ContentWrapper>
</template>

<script>
import datepicker from 'vuejs-datepicker';
import draggable from 'vuedraggable'
import Editor from '@/components/Custom/Editor';

export default {
	components: {
		datepicker,
		draggable,
		Editor
	},
	created() {
		this.projectId = this.$route.params.projectId;
		this.fakeUser.projectId = this.projectId;
		this.loadDetail();
		this.loadMembers();
		this.loadImages();
	},
	watch :{
	/* 	'data.status'(){
			this.updateStatus();
		}, */
		/* data() {
			console.log(this.data)
			console.log(this.originData)
		} */
	},
	data() {
		return {
			projectId : '',
			date : '',
			data: {
				name : ''
			},
			originData : {
				name : ''
			},
			memberList : [],
			fakeUser : {
				username : '',
				phone : '',
				price : '',
				projectId : ''
			},
			sectionList : [],
			teacherList : [],
			categoryList : {},
			imageForPc : {
				id:'',
				url:''
			},
			imageForMobile : {
				id:'',
				url:''
			},
			image1 : {},
			image2 : {},
			image3 : {},
			imageForList : {
				image1:'',iamge2:'',image3:''
			}
		}
	},
	methods: {
		loadDetail(){
			this.ajax.get(`/project/detail/${this.projectId}`).then(res => {
				res = res.data;
				this.data = res.data;
				console.log(this.data);
				for(let key in this.data) {
					if(key === 'start_date' || key === 'end_date') {
						this.data[key] = this.formatDate(this.data[key])
					}
					this.originData[key] = this.data[key]
				}
			})
		},
		loadMembers() {
			this.ajax.get(`/project/${this.projectId}/members`).then(res => {
				res = res.data;

				this.memberList = res.data.list;
			})
		},
		loadImages() {
			this.ajax.get(`/project/${this.projectId}/images`).then(res => {
				res = res.data;
				for (let i = 0, len = res.data.list.length; i < len; i++) {
					if(res.data.list[i].gubun === 'P'){
						this.imageForPc = res.data.list[i];
					}else if(res.data.list[i].gubun === 'M'){
						this.imageForMobile = res.data.list[i];
					}else{
						this.imageForList[`image${res.data.list[i].gubun}`] = res.data.list[i].url;
						/* if(res.data.list[i].gubun === '1'){
							this.image1 = res.data.list[i];
						}else if(res.data.list[i].gubun === '2'){
							this.image2 = res.data.list[i];
						}else{
							this.image3 = res.data.list[i];
						} */
					}
				}
			})
		},
		/* updateStatus(){
			this.ajax.post(`/project/${this.projectId}/status`, {
				status : this.data.status
			}).then(res => {
				this.loadDetail()
			})
		}, */
		addFakeUser(){
			this.ajax.post(`/project/${this.projectId}/member`, this.fakeUser).then(res => {
				location.reload();
			})
		},
		updateField(key) {
			this.ajax.post(`/project/update/field/${this.projectId}`, {
				key : key,
				value : this.data[key]
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					this.originData[key] = this.data[key];
					this.$forceUpdate()
				}
			})
		},
		onImageChange(e) {
			var files = e.target.files || e.dataTransfer.files;

			if (!files.length)
				return;

			this.imageUpload(e.target.files[0]);
		},
		imageUpload(file) {
			const formData = new FormData();
			
			formData.append('image', file);
			formData.append('gubun', $('#gubun').val());
			formData.append('project_id', `${this.projectId}`);

			this.ajax({
				method : 'post',
				url : `/project/update/image/${this.projectId}`,
				data : formData,
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					location.reload();
				} else {
					// alert("멤버 추가에 실패했습니다")
				}
			})
		},
		clickModifiedBtn(gubun) {
			$('#gubun').val(gubun);
			$('#image').trigger('click')
		},
		formatDate(value){
			const date = new Date(value);
			const y = date.getFullYear();
			let m = date.getMonth() + 1;
			let d = date.getDate();

			if(m < 10) 
				m = '0' + m;

			if(d < 10) 
				d = '0' + d;

			return `${y}-${m}-${d}`
		},
		removePayment(id){
			if(confirm("이 결제 기록을 삭제하시겠습니까?")) {
				if(confirm("되돌릴 수 없습니다. 삭제하시겠습니까?")) {
					this.ajax.post('/project/payment/remove', {
						id : id
					}).then(res => {
						res = res.data;
						
						if(res.code === 0) {
							alert("결제 사이트에서 환불을 진행해주십시오.");
							location.reload();
						}
					})
				}
			}
		},
		rowClick(id) {
			this.$router.history.push(`/payment/${id}`)
		},
	}
}
</script>

<style lang="scss">
	.card {
		padding-top : 1.5em;
		// height: 120px;
	}

	.button-group {
		position: absolute;
		right : 10px;
		top : 10px;
		button.btn {
			margin-left : 10px;
		}
	}

	.card-body {
		text-align: center;
		font-size : 24pt;
		font-weight: bold;
	}
</style>

<style>
	div.vdp-datepicker input {
		border : 0;
	}
	#ProjectDetail form.row {padding-top:1%;}
	#ProjectDetail h3 {font-size:16px; font-weight:bold; color:#999; margin-bottom:2%;}
	#ProjectDetail .boxwrap .imgbox button {width:80px; position:absolute; top:10px; right:10px; z-index:1;}
	/* #ProjectDetail .imgbox {width:100%; height:520px; position:relative; overflow:hidden;} */
	#ProjectDetail .imgbox {width:100%; height:180px; position:relative; overflow:hidden; margin-bottom:10px; border:1px solid;}
	/* #ProjectDetail .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;} */
	#ProjectDetail .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}

	#ProjectDetail table.col-sm-6 {margin-top:0;}
	#ProjectDetail table {width:98%; background:#fff; border-left:1px solid #eee; border-right:1px solid #eee; border-bottom:1px solid #eee;}
	#ProjectDetail th {width:150px; vertical-align: middle; font-weight:normal; color:#fff;}
	#ProjectDetail .projectAdmin th {background:#444;}
	#ProjectDetail .benefit .txt {padding:2% 20px 0;}
	#ProjectDetail .benefit .txt div {padding-top:1%;}

	#ProjectDetail .btn-group-toggle .btn {opacity:0.2;}
	#ProjectDetail .btn-group-toggle .btn:active {opacity:1;}
	#ProjectDetail .btn-group-toggle .active {opacity:1;}

	.studentList {padding-top:50px;}
	.studentList .btnbox {margin-top:-0.4rem;}
	.studentList table th {border-right:1px solid #eee; background:#444;}
	/*.studentList table th:last-child {border-right:0;}*/
	.studentList table tr td {border-right:1px solid #eee;}
	/*.studentList table tr td:last-child {border-right:0;}*/
	/*#UserDetail .btn-primary {background:rgba(0,104,183,0.4); border:0;}
	#UserDetail .btn-primary:active {background:rgba(0,104,183,1);}*/

	#ProjectDetail .page-header button {margin-top:-0.5rem;}
	#ProjectDetail .tab button {position:relative; width:100%;}
	#ProjectDetail button i.x-btn {position:absolute; top:50%; right:5%; transform:translate(-50%,-50%);}

	#ProjectDetail table.vacation th {background:#f8f8f8; color:#333; border-right:1px solid #eee; font-weight:bold;}
	#ProjectDetail table.vacation td {position:relative;}
	#ProjectDetail table.vacation .instructor {position:absolute; top:50%; left:0.75rem; transform:translate(0,-50%);}
	#ProjectDetail table .instructor span {margin-right:5px;}
	#ProjectDetail table .instructor span.instructorCompany {font-weight:bold; color:#000;}
	#ProjectDetail table td textarea {margin-top:5px;}

	#ProjectDetail table.curriculumList .row {padding:0 4%;}
	#ProjectDetail table.curriculumList .row .col-sm-8 {padding:0;}
	.table-borderless {border:0 !important;}
	.table-borderless th {border:0 !important;}
	.table-borderless td {border:0 !important; padding:0 10px 0 0;}
	.table-borderless td.profileYear {font-weight:bold;}
</style>