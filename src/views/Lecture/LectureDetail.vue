<template>
	<ContentWrapper id="LectureDetail">
		<div class="content-heading">
			<div><span v-if="data.category !== 1 ">[멤버]</span>{{categoryList[data.category]}} 상품 관리</div>
		</div>

		<h4 class="page-header">정보</h4>
		<form class="row">
			<div class="col-sm-6 boxwrap">
				<h3>대표이미지</h3>
				<div class="imgbox d-flex">
					<div style="display: none;">
						<input type="file" id="image" @change="onImageChange" accept="image/*">
					</div>
					<button type="button" class="btn btn-sm btn-dark ml-auto" @click="clickModifiedBtn">수정하기</button>
					<input type="hidden">
					<img :src="data.thumbnail" alt="강의대표이미지">
				</div>
			</div>
			<table class="table lectureAdmin col-sm-6">
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
						</div>
						</td>
					</tr>
					<tr>
						<th>기수(옵션)</th>
						<td class="lectureNumber">
							<div class="input-group">
								<input class="form-control" name="lectureNumber" type="text" placeholder="기수" v-model="data.period">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('period')" v-if="data.period !== originData.period">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>이름</th>
						<td class="lectureTitle">
							<div class="input-group">
								<input class="form-control" name="lectureTitle" type="text" placeholder="강의 이름" v-model="data.name">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('name')" v-if="data.name !== originData.name">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<!-- <tr>
						<th>수강정원</th>
						<td class="capacity">13명</td>
					</tr> -->
					<tr>
						<th>신청 인원</th>
						<td class="capacity">{{memberList.length}}명</td>
					</tr>
					<!-- <tr>
						<th>학습대상</th>
						<td class="target">
							<div class="input-group">
								<input class="form-control" name="target" type="text" placeholder="학습대상">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>수료생혜택</th>
						<td class="benefit">
							<div class="input-group">
							  <input class="form-control" name="수료생혜택" id="activityContent" type="text" placeholder="수료생혜택" />
							  <div class="input-group-append">
							    <button class="btn btn-success" type="button" id="button-addon2">
							    	<i class="fas fa-plus"></i>
							    </button>
							  </div>
							</div>
						  <div class="txt d-flex">
						  	<p>수료생혜택</p>
								<i class="fas fa-times ml-auto"></i>
						  </div>
						</td>
					</tr>
					<tr>
						<th>강의일정</th>
						<td class="lectureSchedule">
							<div class="input-group">
								<input class="form-control" name="lectureSchedule" type="text" placeholder="강의일정">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>강의장소</th>
						<td class="lecturePlace">
							<div class="input-group">
								<input class="form-control" name="lecturePlace" type="text" placeholder="강의장소">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>강의시간</th>
						<td class="lectureHour">
							<div class="input-group">
								<input class="form-control" name="lectureHour" type="text" placeholder="강의시간">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>신청기간</th>
						<td class="applicationPeriod">
							<div class="input-group">
								<input class="form-control" name="applicationPeriod" type="text" placeholder="신청기간">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>신청방법</th>
						<td class="applicationMethod">
							<div class="input-group">
								<input class="form-control" name="applicationMethod" type="text" placeholder="신청방법">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>신청문의</th>
						<td class="applicationRequest">
							<div class="input-group">
								<input class="form-control" name="applicationRequest" type="text" placeholder="신청문의">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr> -->
					<tr>
						<th>비용</th>
						<td class="lectureCost">
							<div class="input-group">
								<input class="form-control" name="lectureCost" type="number" placeholder="강의비용" v-model="data.price">
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
						<td class="lectureCost">
							<div class="input-group">
								<input class="form-control" name="lectureCost" type="number" placeholder="기본할인" v-model="data.discount">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('discount')" v-if="data.discount !== originData.discount">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>시작일</th>
						<td class="lectureSchedule">
							<div class="input-group">
								<input class="form-control" name="lectureSchedule" type="date" placeholder="강의일정" v-model="data.start_date">
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
						<td class="lectureSchedule">
							<div class="input-group">
								<input class="form-control" name="lectureSchedule" type="date" placeholder="강의일정" v-model="data.end_date">
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
						<td class="lectureSchedule">
							<div class="input-group">
								<input class="form-control" name="lectureSchedule" type="text" placeholder="강의일정" v-model="data.date">
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
						<td class="lectureHour">
							<div class="input-group">
								<input class="form-control" name="lectureHour" type="text" placeholder="강의시간" v-model="data.time">
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
						<td class="lecturePlace">
							<div class="input-group">
								<input class="form-control" name="lecturePlace" type="text" placeholder="강의장소" v-model="data.place">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2" @click="updateField('place')" v-if="data.place !== originData.place">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</form>

		<b-modal id="addMember" title="신청자 추가" @ok="addFakeUser">
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
		</b-modal>

		<div class="studentList">
			<h4 class="page-header d-flex">
				<span>신청자 목록</span>
				<div class="btn-box ml-auto">
					<button type="button" class="btn btn-info btn-sm mr-1" v-b-modal.addMember>
						<i class="fas fa-plus"></i>
						신청자 추가
					</button>
					<b-btn class="btn btn-dark mr-1" type="button" variant="primary" v-b-modal.smsModal>문자 전송</b-btn>
					<a style="margin-top : -8px" :href="`http://service.zipgobuild.com/admin/product/${lectureId}/members/excel`" type="button" class="btn btn-dark mr-1">
						<i class="fas fa-download"></i>
						신청자 목록 다운로드
					</a>
					<!-- <a style="margin-top : -8px" v-if="lectureId === '412ZLI'" :href="`${this.$root.$data.baseURL}/excel/event3/download`" type="button" class="btn btn-dark mr-1">
						<i class="fas fa-download"></i>
						세무설문다운로드
					</a> -->
					<!-- <button type="button" class="btn btn-info btn-sm mr-auto">
						<i class="fas fa-file-download"></i>
						파일다운
					</button> -->
					<!-- <button type="button" class="btn btn-info btn-sm">
						<i class="fas fa-mobile-alt"></i>
						문자전송
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
						<th>결제고유번호</th>
						<th>수강취소</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="member in memberList" style="cursor: pointer;" @click="rowClick(member.id)">
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



		<div class="row">
			<div class="col-sm-12">
				<h4 class="page-header">상세 화면 구성</h4>
				<div style="position: relative; height: 50px">
					<small>원하시는 순서대로 각 section을 이동해주세요</small>
					<button type="button" class="btn btn-dark btn-sm" style="position: absolute; right: 0; width : 120px" @click="sectionAdd"> <i class="fa fa-plus"></i> 섹션 추가</button>
					<a v-if="data.category == 1" :href='`${$store.getters.baseFrontURL}/lecture/${lectureId}`' target="_blank">
						<button type="button" class="btn btn-primary btn-sm" style="position: absolute; right: 130px;"> <i class="fa fa-plus"></i> 페이지 열기</button>
					</a>
					<a v-else :href='`${$store.getters.baseFrontURL}/lecture/${lectureId}`' target="_blank">
						<button type="button" class="btn btn-primary btn-sm" style="position: absolute; right: 130px;"> <i class="fa fa-plus"></i> 페이지 열기</button>
					</a>
				</div>
				<div class="sectionWrap">
					<draggable v-model="sectionList">
						<section class="card shadow-sm" v-for="section in sectionList">
							<div class="card-body">{{section.title}}</div>
							<div class="button-group">
								<a class="ml-auto"  :href="`/lecture/section/${lectureId}/${section.id}`">
									<button type="button" class="btn btn-sm btn-dark">수정하기</button>
								</a>
								<button type="button" class="btn btn-sm btn-dark" @click="removeSection(section.id)">삭제하기</button>
							</div>
						</section>
					</draggable>
				</div>
			</div>
		</div>

		<b-modal id="smsModal" title="수강생들에게 문자 전송" @ok="sendSms()">
			<fieldset>
				<div class="form-group row">
					<label class="col-sm-3 col-form-label">문자 내용</label>
					<div class="col-sm-9">
						<textarea class="form-control" v-model="sms" placeholder="문자 내용을 입력해주세요" rows="10"></textarea>
					</div>
				</div>
			</fieldset>
		</b-modal>
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
		this.lectureId = this.$route.params.lectureId;
		this.fakeUser.lectureId = this.lectureId;
		this.loadCategoryList().then(() => {
			this.loadDetail();
		})
		this.loadMembers();
		this.loadSectionList();
		this.loadTeacherList();
		this.loadCurriculmList();
	},
	watch :{
		'data.status'(){
			this.updateStatus();
		},
		'sectionList'(){
			this.sort();
		},
		data() {
			console.log(this.data)
			console.log(this.originData)
		}
	},
	data() {
		return {
			lectureId : '',
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
				lectureId : ''
			},
			sectionList : [],
			teacherList : [],
			curriculumList : [],
			curriculumData : {
				date : '',
				time : '',
				name : '',
				description : '',
				teacher_id : ''
			},
			categoryList : {}
		}
	},
	methods: {
		loadCategoryList(){
			return this.ajax.get('/product/category/list').then(res => {
				res = res.data;
				if(res.code === 0) {
					for(let idx in res.data.list) {
						this.categoryList[res.data.list[idx].id] = res.data.list[idx].name;
					}
				} else {
					console.log(res);
				}
			})
		},
		loadTeacherList() {
			this.ajax.get('/lecture/teacher/list').then(res => {
				res = res.data;

				if(res.code === 0) {
					this.teacherList = res.data.list
				}
			})
		},
		sectionAdd() {
			this.ajax.post(`/lecture/section/create`, {
				lecture_id : this.lectureId
			}).then(res => {
				res = res.data;

				location.href = `/lecture/section/${this.lectureId}/${res.data.insertId}`
			})
		},
		loadDetail(){
			this.ajax.get(`/lecture/${this.lectureId}`).then(res => {
				res = res.data;
				this.data = res.data;
				for(let key in this.data) {
					if(key === 'start_date' || key === 'end_date') {
						this.data[key] = this.formatDate(this.data[key])
					}
					this.originData[key] = this.data[key]
				}
			})
		},
		loadMembers() {
			this.ajax.get(`/lecture/${this.lectureId}/members`).then(res => {
				res = res.data;

				this.memberList = res.data.list;
			})
		},
		updateStatus(){
			this.ajax.post(`/lecture/${this.lectureId}/status`, {
				status : this.data.status
			}).then(res => {
				this.loadDetail()
			})
		},
		addFakeUser(){
			this.ajax.post(`/lecture/${this.lectureId}/member`, this.fakeUser).then(res => {
				location.reload();
			})
		},
		loadSectionList(){
			this.ajax.get(`/lecture/section/list?id=${this.lectureId}`).then(res => {
				res = res.data;
				this.sectionList = res.data.list;
			})
		},
		sort() {
			const arr = []
			for(let i = 0, len = this.sectionList.length; i < len; i++) {
				const item = this.sectionList[i];
				arr.push({
					id : item.id,
					order : i
				})
			}

			this.ajax.post('/lecture/section/sort', {
				arr : arr
			})
		},
		removeSection(id) {
			if(confirm("이 섹션을 삭제하시겠습니까?")) {
				if(confirm("되돌릴 수 없는 작업입니다. 정말로 삭제하시겠습니까?")) {
					this.ajax.post('/lecture/section/remove', {
						id : id
					}).then(res => {
						location.reload();
					})
				}
			}
		},
		updateField(key) {
			this.ajax.post(`/lecture/update/field/${this.lectureId}`, {
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
		loadCurriculmList() {
			this.ajax.get(`/lecture/curriculum/list?id=${this.lectureId}`).then(res => {
				res = res.data;

				if(res.code === 0) {
					this.curriculumList = res.data.list;
				}
			})
		},
		addCurriculm() {
			this.ajax.post(`/lecture/curriculum/add/${this.lectureId}`, this.curriculumData).then(res => {
				res = res.data;

				if(res.code === 0) {
					location.reload()
				}
			})
		},
		removeCurriculum(id) {
			if(confirm("정말로 삭제하시겠습니까? 되돌릴 수 없습니다.")) {
				this.ajax.post(`lecture/curriculum/remove/${id}`).then(res => {
					this.loadCurriculmList();
				})
			}
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

			this.ajax({
				method : 'post',
				url : `/lecture/update/image/${this.lectureId}`,
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
		clickModifiedBtn() {
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
					this.ajax.post('/payment/remove', {
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
	#LectureDetail form.row {padding-top:1%;}
	#LectureDetail .boxwrap {}
	#LectureDetail h3 {font-size:16px; font-weight:bold; color:#999; margin-bottom:2%;}
	#LectureDetail .boxwrap .imgbox button {width:80px; position:absolute; top:10px; right:10px; z-index:1;}
	#LectureDetail .imgbox {width:100%; height:520px; position:relative; overflow:hidden;}
	#LectureDetail .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}

	#LectureDetail table.col-sm-6 {margin-top:0;}
	#LectureDetail table {width:98%; margin:2% auto 0; background:#fff; border-left:1px solid #eee; border-right:1px solid #eee; border-bottom:1px solid #eee;}
	#LectureDetail th {width:150px; vertical-align: middle; font-weight:normal; color:#fff;}
	#LectureDetail .lectureAdmin th {background:#444;}
	#LectureDetail .benefit .txt {padding:2% 20px 0;}
	#LectureDetail .benefit .txt div {padding-top:1%;}

	#LectureDetail .btn-group-toggle .btn {opacity:0.2;}
	#LectureDetail .btn-group-toggle .btn:active {opacity:1;}
	#LectureDetail .btn-group-toggle .active {opacity:1;}

	.studentList {padding-top:50px;}
	.studentList .btnbox {margin-top:-0.4rem;}
	.studentList table th {border-right:1px solid #eee; background:#444;}
	/*.studentList table th:last-child {border-right:0;}*/
	.studentList table tr td {border-right:1px solid #eee;}
	/*.studentList table tr td:last-child {border-right:0;}*/
	/*#UserDetail .btn-primary {background:rgba(0,104,183,0.4); border:0;}
	#UserDetail .btn-primary:active {background:rgba(0,104,183,1);}*/

	#LectureDetail .page-header button {margin-top:-0.5rem;}
	#LectureDetail .tab button {position:relative; width:100%;}
	#LectureDetail button i.x-btn {position:absolute; top:50%; right:5%; transform:translate(-50%,-50%);}

	#LectureDetail table.vacation th {background:#f8f8f8; color:#333; border-right:1px solid #eee; font-weight:bold;}
	#LectureDetail table.vacation td {position:relative;}
	#LectureDetail table.vacation .instructor {position:absolute; top:50%; left:0.75rem; transform:translate(0,-50%);}
	#LectureDetail table .instructor span {margin-right:5px;}
	#LectureDetail table .instructor span.instructorCompany {font-weight:bold; color:#000;}
	#LectureDetail table td textarea {margin-top:5px;}

	#LectureDetail table.curriculumList th {text-align:center; border-right:1px solid #eee; background:#0068b7; color:#fff;}
	#LectureDetail table.curriculumList th:first-child {width:20%;}
	#LectureDetail table.curriculumList th:nth-child(2) {width:50%;}
	#LectureDetail table.curriculumList th:nth-child(3) {width:30%;}
	#LectureDetail table.curriculumList td {border-right:1px solid #eee; vertical-align:top;}
	#LectureDetail table.curriculumList td .imgbox {height:160px; position:relative; overflow:hidden;}
	#LectureDetail table.curriculumList td .imgbox img {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#LectureDetail table.curriculumList td h5 {font-size:16px; font-weight:bold;}
	#LectureDetail table.curriculumList td p {margin-bottom:0;}

	#LectureDetail table.curriculumList .row {padding:0 4%;}
	#LectureDetail table.curriculumList .row .col-sm-8 {padding:0;}
	.table-borderless {border:0 !important;}
	.table-borderless th {border:0 !important;}
	.table-borderless td {border:0 !important; padding:0 10px 0 0;}
	.table-borderless td.profileYear {font-weight:bold;}
</style>
