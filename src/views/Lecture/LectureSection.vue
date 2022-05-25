<template>
	<ContentWrapper id="AddEvent">
		<div class="content-heading">
			<div>섹션 수정</div>
		</div>
		<div>
			<div class="form-group">
				<input class="form-control" type="text" name="title" placeholder="제목을 반드시 입력하세요" v-model="sectionData.title">
			</div>
		</div>
		<div v-if="sectionData.type === 'map'">
			<div class="form-group">
				<textarea class="form-control" name="mapSrc" v-model="mapSrc"></textarea>
				<button class="btn btn-primary btn-block btn-sm" @click="updateDetail">지도 적용</button>
			</div>
		</div>

		<div>
			<label>템플릿 로드</label>
			<div class="form-group">
				<select class="form-control" name="" v-model="selectedSection">
					<option value="none">없음</option>
					<option disabled>------ 입력 모드 및 기본형 ------</option>
					<option value="application">강의신청</option>
					<option value="curriculum">커리큘럼</option>
					<option value="map">지도</option>
					<option value="tour">여행상품</option>
					<option value="tour_refund">여행상품 환불정책</option>
					<option disabled>------ 사용했던 섹션 ------</option>
					<option v-for="item, idx in sectionList" :value="idx" v-if="item.lecture_id !== lectureId && item.type === 'normal'">{{item.title}}</option>
				</select>
			</div>
			<div v-if="sectionData.type === 'normal' || sectionData.type === 'map'">
				<Editor v-model="sectionData.html"></Editor>
			</div>
			<div v-if="sectionData.type === 'curriculum'" id="curriculumForm">
				<h4 class="page-header">
					<span>강의 커리큘럼</span>
				</h4>
				<form class="curriculumAdmin">
					<table class="table vacation">
						<thead>
							<tr>
								<th>일자</th>
								<th>시간</th>
								<th>강의 제목</th>
								<th>강사</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style="width : 20%">
									<input v-model="curriculumData.date" type="text" name="" class="form-control" placeholder="강의 일자">
								</td>
								<td style="width : 20%">
									<input v-model="curriculumData.time" type="text" name="" class="form-control" placeholder="강의 시간">
								</td>
								<td style="width : 40%">
									<input v-model="curriculumData.name" type="text" name="" class="form-control" placeholder="강의 제목">
								</td>
								<td style="width : 20%">
									<select v-model="curriculumData.teacher_id" class="form-control">
										<option v-for="teacher in teacherList" :value="teacher.id">{{teacher.name}}</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>강의 내용</th>
								<td colspan="2" style="height : 200px">
									<Editor height="200" v-model="curriculumData.description"></Editor>
								</td>
								<td>
									<button type="button" @click="addCurriculm()" class="btn btn-dark btn-block" style="height : 200px">커리큘럼 추가</button>
								</td>
							</tr>
						</tbody>
						
					</table>

					<table class="table curriculumList">
						<thead>
							<th style="width:10%;">일자</th>
							<th style="width:10%;">시간</th>
							<th style="width : 30%">강의내용</th>
							<th>강사</th>
						</thead>
					</table>
					<draggable v-model="curriculumList">
						<table class="table curriculumList" v-for="c in curriculumList">
							<tbody>
								<tr>
									<td style="text-align:center; width:10%;">{{c.date}}</td>
									<td style="text-align:center; width:10%;">{{c.time}}</td>
									<td style="width : 30%">
										<h5 class="title">{{c.name}}</h5>
										<p class="txt" v-html="c.description"></p>
									</td>
									<td style="position: relative;">
										<div class="instructor">
											<span class="instructorCompany">{{c.teacherCompany}}</span>
											<span class="instructorName">{{c.teacherName}}</span>
											<span class="instructorTitle">{{c.teacherTitle}}</span>
										</div>
										<div class="row">
											<div class="col-sm-8">
												<table class="table table-borderless">
													<tbody>
														<tr style="border : 0 !important">
															<td style="border : 0 !important"></td>
															<td style="border : 0 !important" class="profileText" v-html="c.teacherContent"></td>
														</tr>
													</tbody>
												</table>
											</div>
											<div class="imgbox col-sm-4">
												<img :src="c.teacherImage" alt="강사이미지">
											</div>
										</div>
										<i style="position: absolute; right : 10px; top : 10px" class="fas fa-times-circle" @click="removeCurriculum(c.id)"></i>
									</td>
								</tr>
							</tbody>
						</table>
					</draggable>
				</form>
			</div>
		</div>
		<div>
			<button @click="edit" class="btn btn-primary btn-block">수정</button>
		</div>
	</ContentWrapper>
</template>

<script>
import Editor from '@/components/Custom/Editor';
import draggable from 'vuedraggable';

export default {
	created() {
		this.lectureId = this.$route.params.lectureId;
		this.sectionId = this.$route.params.id;

		this.loadSection();
		this.loadSectionList();
		this.loadTeacherList();
		this.loadCurriculmList();
	},
	components : {
		Editor,
		draggable,
	},
	data() {
		return {
			lectureId : '',
			sectionId : '',
			sectionData : {
				title : '',
				html : ``,
				type : 'normal'
			},
			sectionList : [],
			sectionDetail : {},
			mapSrc : '',
			selectedSection : 'none',
			beforeSelectedSection : 'none',
			teacherList : [],
			curriculumList : [],
			curriculumData : {
				date : '',
				time : '',
				name : '',
				description : '',
				teacher_id : ''
			}
		}
	},
	watch : {
		selectedSection(){
			if(confirm("이전 섹션을 로드하시겠습니까? 변경사항 및 이전내용은 저장되지 않습니다.")) {
				this.beforeSelectedSection = this.selectedSection;
				if(this.selectedSection === 'map') {
					this.ajax.post(`/lecture/section/map/${this.sectionId}`).then(res => {
						res = res.data;
						if(res.code === 0) {
							location.reload();
						} else {
							alert("서비스 에러입니다.")
						}
					})
				} else if(this.selectedSection === 'application') {
					this.ajax.post(`/lecture/section/application/${this.sectionId}`).then(res => {
						res = res.data;
						if(res.code === 0) {
							location.reload();
						} else {
							alert("서비스 에러입니다.")
						}
					})
				} else if(this.selectedSection === 'curriculum') {
					this.ajax.post(`/lecture/section/curriculum/${this.sectionId}`).then(res => {
						res = res.data;
						if(res.code === 0) {
							location.reload();
						} else {
							alert("서비스 에러입니다.")
						}
					})
				}  else if(this.selectedSection === 'tour') {
					this.ajax.post(`/lecture/section/tour/${this.sectionId}`).then(res => {
						res = res.data;
						if(res.code === 0) {
							location.reload();
						} else {
							alert("서비스 에러입니다.")
						}
					})
				} else if(this.selectedSection === 'tour_refund') {
					this.ajax.post(`/lecture/section/tourrefund/${this.sectionId}`).then(res => {
						res = res.data;
						if(res.code === 0) {
							location.reload();
						} else {
							alert("서비스 에러입니다.")
						}
					})
				}  else {

				}

				this.sectionData.html = this.sectionList[this.selectedSection].html;
			} else {
				this.selectedSection = this.beforeSelectedSection;
			}
		},
		'curriculumList'(){
			this.curriculumSort();
		},
	},
	methods : {
		loadTeacherList() {
			this.ajax.get('/lecture/teacher/list').then(res => {
				res = res.data;

				if(res.code === 0) {
					this.teacherList = res.data.list
				}
			})
		},
		edit() {
			this.ajax.post(`/lecture/section/${this.sectionId}`, {
				title : this.sectionData.title,
				content : this.sectionData.html
			}).then(res => {
				res = res.data;

				if(res.code === 0) {
					location.reload();				
				} else {
					// alert("등록에 실패하였습니다.")
				}
			})
		},
		loadSectionList() {
			this.ajax.get(`/lecture/section/list/recent`).then(res => {
				res = res.data;

				this.sectionList = res.data.list
			})
		},
		loadSection() {
			this.ajax.get(`/lecture/section/${this.sectionId}`).then(res => {
				res = res.data;

				this.sectionData = res.data;

				if(this.sectionData.type === 'map') {
					this.ajax.get(`/lecture/section/detail?id=${this.sectionData.id}`).then(res => {
						res = res.data;

						this.sectionDetail = res.data;

						const el = document.getElementsByClassName('root_daum_roughmap root_daum_roughmap_landing')[0];
						el.innerHTML = '';

						el.id = `daumRoughmapContainer${this.sectionDetail.timestamp}`;
						new daum.roughmap.Lander({
							"timestamp" : this.sectionDetail.timestamp,
							"key" : this.sectionDetail.key,
							"mapWidth" : $('#LecturePlace').width(),
							"mapHeight" : "480"
						}).render();
					})
				}
			})
		},
		parseMapCode() {
			const timestampReg = /\"timestamp\" \: \"\d+\"/;
			const keyReg = /\"key\" \: \".+\"/;

			let timestampResult = timestampReg.exec(this.mapSrc);
			let keyResult = keyReg.exec(this.mapSrc);

			if(timestampResult !== null && keyResult !== null) {
				timestampResult = timestampResult[0];
				keyResult = keyResult[0];
				timestampResult = timestampResult.replace("timestamp", '').replace(/\"/g, '').replace(':', '').trim();
				keyResult = keyResult.replace("key", '').replace(/\"/g, '').replace(':', '').trim();

				return {
					id : this.sectionId,
					timestamp : timestampResult,
					key : keyResult
				}
			}
		},
		updateDetail() {
			const data = this.parseMapCode();

			this.ajax.post('/lecture/section/detail', data).then(res => {
				location.reload();
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
		curriculumSort() {
			const arr = []
			for(let i = 0, len = this.curriculumList.length; i < len; i++) {
				const item = this.curriculumList[i];
				arr.push({
					id : item.id,
					order : i
				})
			}

			this.ajax.post('/lecture/curriculum/sort', {
				arr : arr
			})
		},
	}
}
</script>

<style type="text/css">
	#curriculumForm table.vacation th {background:#f8f8f8; color:#333; border-right:1px solid #eee; font-weight:bold;}
	#curriculumForm table.vacation td {position:relative;}
	#curriculumForm table.vacation .instructor {position:absolute; top:50%; left:0.75rem; transform:translate(0,-50%);}
	#curriculumForm table .instructor span {margin-right:5px;}
	#curriculumForm table .instructor span.instructorCompany {font-weight:bold; color:#000;}
	#curriculumForm table td textarea {margin-top:5px;}

	#curriculumForm table.curriculumList th {text-align:center; border-right:1px solid #eee; background:#0068b7; color:#fff;}
	#curriculumForm table.curriculumList th:first-child {width:20%;}
	#curriculumForm table.curriculumList th:nth-child(2) {width:50%;}
	#curriculumForm table.curriculumList th:nth-child(3) {width:30%;}
	#curriculumForm table.curriculumList td {border-right:1px solid #eee; vertical-align:top;}
	#curriculumForm table.curriculumList td .imgbox {height:160px; position:relative; overflow:hidden;}
	#curriculumForm table.curriculumList td .imgbox img {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#curriculumForm table.curriculumList td h5 {font-size:16px; font-weight:bold;}
	#curriculumForm table.curriculumList td p {margin-bottom:0;}

	#curriculumForm table.curriculumList .row {padding:0 4%;}
	#curriculumForm table.curriculumList .row .col-sm-8 {padding:0;}
	.table-borderless {border:0 !important;}
	.table-borderless th {border:0 !important;}
	.table-borderless td {border:0 !important; padding:0 10px 0 0;}
	.table-borderless td.profileYear {font-weight:bold;}
</style>
<style>
.SubTitleBox {text-align:center; margin-bottom:60px;}
.SubTitleBox h2 {font-size:1.8rem;}
.SubTitleBox h5 {font-size:1.4rem; font-weight:300; padding-top:1.7%; color:#444;}
.SubTitleBox h5 span {color:#e96d09; font-weight:600; padding:0 6px;}
.SubTitleBox p {padding-top:0.5%;}

.notice {font-size:16px; text-align:right; padding-top:3px;}

#tripIntro {width:100%; background:url("http://www.zipgobuild.com/image/background.png"); background-position:center; background-size:cover; padding:50px 0 160px;}
#tripIntro #tripTitle {width:1200px; background:rgba(255,255,255,0.85); margin:0 auto; padding:10px 30px;}
#tripIntro #tripTitle h3 {font-size:36px; font-weight:600; color:#e96d09; padding:20px 0; /*border-bottom:3px solid #e96d09; */}
#tripIntro #tripTitle h3 a {text-decoration:none; border-bottom:3px solid #e96d09; padding-bottom:2px; cursor:default;}
#tripIntro #tripTitle table {font-size:16px; margin-top:10px;}
#tripIntro #tripTitle table th {vertical-align:top; text-align:left; width:100px;}
#tripIntro #tripTitle table td {padding:0 0 10px 0;}
#tripIntro #tripTitle div {text-align:center;}
#tripIntro #tripTitle div button.btn-tour {width:200px; height:56px; margin:20px auto 30px; font-size:17.6px; font-weight:400; color:#e96d09; transition:0.4s; background:rgba(0,0,0,0); border:1px solid #e96d09; cursor:pointer;}
#tripIntro #tripTitle div button.btn-tour:hover {color:#fff; font-weight:bold; background:#e96d09;}
#tripSchedule {width:1200px; margin:40px auto 0;}
#tripSchedule img {width:100%;}
#tripEdu {width:1200px; margin:120px auto 0;}
#tripEdu img {width:100%;}
#tripRefund {width:100%; margin:60px auto 0; padding:60px 0; background:#eee;}
#tripRefund table {width:1200px; margin:0 auto; border:1px solid #e5e5e5; text-align:center;}
#tripRefund table th {height:60px; background:#626262; color:#fff; border-right:1px solid #e5e5e5; font-weight:400; font-size:16px;}
#tripRefund table th:last-child {border-right:0;}
#tripRefund table td {padding:1em; border-right:1px solid #e5e5e5; border-bottom:1px solid #e5e5e5; background:#fff;}
#tripRefund table tr:last-child td {border-bottom:0;}
#tripRefund table tr td:last-child {border-right:0;}
#tripRefund p.notice {width:1200px; margin:0 auto; color:#b00000;}


@media(max-width:767px) {
	header {width:100%;}
	.SubTitleBox {margin:0; padding-bottom:5%;}
	.SubTitleBox h2 {font-size:16px;}
	.SubTitleBox h5 {font-size:16px;}
	.SubTitleBox p {width:90%; margin:0 auto; font-size:14px; padding-top:0.5%;}

	.notice {font-size:12px; text-align:left;}

	#tripIntro {width:100%; padding:20px 0 100px;}
	#tripIntro #tripTitle {width:calc(100% - 30px); padding:0; margin:20px 15px;}
	#tripIntro #tripTitle h3 {width:90%; margin:0 auto; font-size:2rem;}
	#tripIntro #tripTitle h3 a {text-decoration:none; border-bottom:3px solid #e96d09; padding-bottom:2px; cursor:default;}
	#tripIntro #tripTitle table {font-size:12px; margin-top:10px; padding:0 10px;}
	#tripIntro #tripTitle table th {width:80px; font-weight:500;}
	#tripIntro #tripTitle table td {padding:0 0 10px 0;}
	#tripIntro #tripTitle div {text-align:center;}
	#tripIntro #tripTitle div button.btn-tour {width:unset; height:unset; padding:0.7em 1.2em; font-size:12px; margin:15px 0 20px;}
	#tripIntro #tripTitle div button.btn-tour:hover {color:#fff; font-weight:bold; background:#e96d09;}

	#tripSchedule {width:calc(100% - 30px); margin:-40px 15px 6vh;}
	#tripEdu {width:calc(100% - 30px); margin:5vh auto 5vh;}
	#tripRefund {width:100%; margin:0 auto; padding:5vh 0;}
	#tripRefund table {width:calc(100% - 30px); margin:0 auto; font-size:12px;}
	#tripRefund table th {height:unset; padding:1em 0; background:#626262; color:#fff; border-right:1px solid #e5e5e5; font-weight:400; font-size:12px;}
	#tripRefund table th:last-child {border-right:0;}
	#tripRefund table td {padding:1em; border-right:1px solid #e5e5e5; border-bottom:1px solid #e5e5e5; background:#fff;}
	#tripRefund table tr:last-child td {border-bottom:0;}
	#tripRefund table tr td:last-child {border-right:0;}
	#tripRefund p.notice {width:calc(100% - 30px); margin:0 auto;}
}

@media(max-width:1200px) {
	#tripIntro {width:100%; padding:20px 0 120px;}
	#tripIntro #tripTitle h3 {width:calc(100% - 30px); margin:0 auto; font-size:2.5rem;}
	#tripIntro #tripTitle {width:calc(100% - 30px); padding:0; margin:20px 15px;}
	#tripIntro #tripTitle table {font-size:16px; margin-top:10px; padding:0 20px;}
	#tripIntro #tripTitle table th {width:100px; font-weight:500;}
	#tripIntro #tripTitle table td {padding:0 0 10px 0;}
	#tripIntro #tripTitle div button.btn-tour {width:unset; height:unset; padding:0.7em 1.2em; font-size:16px; margin:15px 0 20px;}

	#tripSchedule {width:calc(100% - 30px);}
	#tripEdu {width:calc(100% - 30px); margin:5vh auto 5vh;}
	#tripRefund {width:100%; margin:0 auto; padding:5vh 0; background:#eee;}
	#tripRefund table {width:calc(100% - 30px); margin:0 auto; font-size:16px;}
	#tripRefund p.notice {width:calc(100% - 30px); margin:0 auto;}
}
</style>