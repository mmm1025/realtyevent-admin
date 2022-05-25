<template>
	<ContentWrapper id="ProjectDetail">
		<div class="content-heading">
			<div>건설지원센터 관리 > 목록/상세</div>
			<a href="/projectList"><button type="button" class="btn btn-primary btn-sm" style="position: absolute; right: 0px;"> 목록</button></a>
		</div>

		<div class="">
			<h4 class="page-header d-flex">
				<span>상세정보</span>
			</h4>
		</div>
		<form class="row">
			<div style="display: none;">
				<input type="file" id="image" @change="onImageChange" accept="image/*">
				<input type="hidden" id="gubun" />
			</div>
			<div class="col-sm-6 boxwrap">
				<h3>목록이미지 기본</h3>
				<div class="imgbox d-flex">
					<button type="button" class="btn btn-sm btn-dark ml-auto" @click="clickModifiedBtn('1')">수정하기</button>
					<input type="hidden">
					<img :src="imageForList.image1" alt="대표이미지(기본)">
				</div>
				<h3>목록이미지 2칸크기</h3>
				<div class="imgbox d-flex">
					<button type="button" class="btn btn-sm btn-dark ml-auto" @click="clickModifiedBtn('2')">수정하기</button>
					<input type="hidden">
					<img :src="imageForList.image2" alt="대표이미지(2칸)">
				</div>
				<h3>목록이미지 3칸크기</h3>
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
		<br/>
		<div id="sectionList">
			<h4 class="page-header d-flex">
				<span>SECTION관리</span>
				<div class="btn-box ml-auto"></div>
			</h4>
			<div class="row">
				<div class="col-sm-9">
					<h6 class="text-center">원하시는 순서대로 각 SECTION을 이동해주세요</h6>
					<div class="sectionWrap">
						<section id="section" class="card shadow-sm">
							<div class="card-body">슬라이드 <span style="color:red;">(고정)</span></div>
							<a class="ml-auto"  :href="`/projectList/${projectId}/section/slider`">
								<button type="button" class="btn btn-sm btn-dark">수정하기</button>
							</a>
						</section>
						<draggable v-model="sectionMoveList">
							<section id="section" class="card shadow-sm" v-for="section in sectionMoveList">
								<div class="card-body">{{section.title}}</div>
								<a class="ml-auto"  :href="`/projectList/${projectId}/section/${section.id}`">
									<button type="button" class="btn btn-sm btn-dark">수정하기</button>
								</a>
							</section>
						</draggable>
					</div>
				</div>
				<div class="col-sm-3">
					<h4 class="page-header">SECTION DISPLAY</h4>
					<div class="boxwrap">
						<div class="row" v-for="section in sectionList">
							<div class="col-8">
								<p class="name">{{section.title}}</p>
							</div>
							<div class="col-4">
								<label class="switch">
									<input type="checkbox" checked="checked" v-model="section.hidden" @click="toggleHidden(section.id, section.hidden)"/>
									<span></span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="studentList">
			<h4 class="page-header d-flex">
				<span>신청자 목록</span>
				<div class="btn-box ml-auto"></div>
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
					<tr v-for="member in memberList" style="cursor: pointer;" :key="member.id">
						<td class="userName" @click="rowClick(member.id)">{{member.name}}</td>
						<td class="userId" @click="rowClick(member.id)">{{member.userId}}</td>
						<td class="phoneNumber" @click="rowClick(member.id)">{{member.userPhone}}</td>
						<td class="requestDate" @click="rowClick(member.id)">{{new Date(member.datetime).toFormatString()}}</td>
						<td class="uniqueNumber" @click="rowClick(member.id)">{{member.id}}</td>
						<td class="cancel">
							<button type="button" class="btn btn-dark btn-sm" @click="removeMember(member.id)">신청취소</button>
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
		this.loadDetail();
		this.loadMembers();
		this.loadImages();
		this.loadSectionList();
	},
	watch :{
	 	'data.status'(){
			this.updateStatus();
		},
		'sectionList'(){
			this.sectionSort();
		},
	},
	data() {
		return {
			projectId : '',
			status : '',
			date : '',
			data: {
				name : ''
			},
			originData : {
				name : ''
			},
			memberList : [],
			sectionList : [],
			sectionMoveList : [],
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
				for(let key in this.data) {
					if(key === 'start_date' || key === 'end_date') {
						this.data[key] = this.formatDate(this.data[key])
					}
					this.originData[key] = this.data[key]
				}
			})
		},
		loadSectionList(){
			this.ajax.get('/project/section/list', {
				params : {
					projectId : this.projectId
				}
			}).then(res => {
				res = res.data;
				// display는 전체 section전부 작업가능하므로 결과값과 동일
				// section은 슬라이드를 고정하므로 나머지만 필터링한 리스트 사용
				var temp = res.data.list;
				for (let i = 0, len = temp.length; i < len; i++) {
					temp[i].hidden = temp[i].hidden_yn === 'N' ? true :false;
					if(temp[i].id !== 'slider'){
						this.sectionMoveList.push(temp[i]);
					}
					this.sectionList.push(temp[i]);
				}
			});
		},
		loadMembers(){
			this.ajax.get('/project/members', {
				params : {
					projectId : this.projectId
				}
			}).then(res => {
				res = res.data;
				this.memberList = res.data.list;
			});
		},
		loadImages() {
			this.ajax.get(`/project/images/${this.projectId}`).then(res => {
				res = res.data;
				for (let i = 0, len = res.data.list.length; i < len; i++) {
					this.imageForList[`image${res.data.list[i].gubun}`] = res.data.list[i].url;
				}
			})
		},
		updateStatus(){
			this.ajax.post(`/project/detail/${this.projectId}/status`, {
				key : 'status',
				value : this.data.status
			}).then(res => {
				this.loadDetail()
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
		rowClick(id) {
			this.$router.history.push(`/projectList/${this.projectId}/member/${id}`)
		},
		sectionSort() {
			const arr = [];
			for(let i = 0, len = this.sectionList.length; i < len; i++) {
				const item = this.sectionList[i];
				arr.push({
					id : item.id,
					order : i
				})
			}
			this.ajax.post('/project/section/sort', {
				projectId : this.projectId,
				arr : arr
			})
		},
		toggleHidden(id, hidden){
			this.ajax.post('/project/section/toggleHidden', {
				projectId : this.projectId,
				id : id,
				hiddenYn : hidden === false ? 'N' : 'Y'
			})
		},
		removeMember(id){
			if(confirm("신청건을 삭제하시겠습니까?")) {
				this.ajax.post('/project/member/remove',{
					id : id
				}).then(res => {
					res = res.data;
					if(res.code === 0) {
						location.reload();
					}
				})
			}
		}
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

	#sectionList .page-header {margin-top:0.5rem;}
	#sectionList .sectionWrap {width:80%; margin:0 auto; padding:30px; background:#fff;}
	#sectionList h6 {padding:1rem 0;}
	#sectionList section {width:100%; height:120px; background:#f8f8f8;}
	#sectionList .card {border:0; position:relative; border:1px solid #dedede; border-radius:5px; text-align:center;}
	#sectionList .card-body {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:24px; font-weight:bold;}
	#sectionList .card button {width:80px; margin:10px 10px 0 0;}

	#sectionList .boxwrap {background:#fff; padding:20px;}
	#sectionList .boxwrap .row {margin:0; padding:0.8rem 0; border-bottom:1px dashed #eee;}
	#sectionList .boxwrap .row:last-child {border-bottom:0;}
	#sectionList .boxwrap p {margin:0;}
	#sectionList .boxwrap .col-4 {position:relative;}
	#sectionList .boxwrap .col-4 label {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}
</style>
