<template>
	<ContentWrapper id="InstructorList">
		<div class="content-heading">
			<div>건축주대학 관리</div>
		</div>

		<div id="lectureListAdmin">
			<h4 class="page-header d-flex">
				<span>강사목록 관리</span>
				<b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.addInstructor>강사 추가</b-btn>
			</h4>
			<draggable  class="row" v-model="teacherList">
				<div class="col-3" v-for="teacher in teacherList">
					<div class="card card-flat">
						<i class="fas fa-times-circle" @click="deleteTeacher(teacher.id)"></i>
						<div class="row no-gutters">							
							<div class="card-img col-sm-4"><img :src="teacher.image" alt="강의 이미지"></div>
							<div class="card-body col-sm-8">
								<router-link :to="'/instructor/' + teacher.id">
									<h4 class="card-title">{{teacher.name}}</h4>
								</router-link>
								<div class="card-text">
									<h5 class="instructorCompany">{{teacher.company}} {{teacher.title}}</h5>
									<div>
										<small>노출 여부</small>
										<label class="switch">
											<input type="checkbox" v-model="teacher.is_show" @click="updateTeacherShow(teacher.id, teacher.is_show)"/>
											<span></span>
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</draggable>

			<!--START 파트너스 카테고리 modal-->
				<b-modal id="addInstructor" title="강사 추가" @ok="addTeacher()">
					<form class="form-horizontal" method="get" action="/">
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">강사 소속</label>
								<div class="col-md-9">
									<input class="form-control" type="text" v-model="teacherData.company">
								</div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">강사 이름</label>
								<div class="col-md-9">
									<input class="form-control" type="text" v-model="teacherData.name">
								</div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">강사 직함</label>
								<div class="col-md-9">
									<input class="form-control" type="text" v-model="teacherData.title">
								</div>
							</div>
						</fieldset>
					</form>
				</b-modal>
			</div>
			<!--END 파트너스 카테고리 modal-->
		</div>

		</div>
	</ContentWrapper>
</template>

<style>
	#InstructorList a {text-decoration:none; color:#333;}
	#InstructorList .page-header button {margin-top:-0.5rem;}

	#InstructorList .row {}
	#lectureListAdmin>.row {margin-top:10px;}


	#InstructorList .col-3 {margin-bottom:15px;}
	#InstructorList .card {position:relative;}
	#InstructorList i.fa-times-circle {position:absolute; top:-15px; right:-15px; z-index:1; font-size:26px; color:#656565; cursor:pointer;}
	#InstructorList .card .card-img {width:100%; height:120px; overflow:hidden; position:relative;}
	#InstructorList .card img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#InstructorList .card .card-title {font-size:18px; font-weight:bold;}
	#InstructorList .card .card-body {padding:20px;}
	#InstructorList .instructorCompany {font-weight:bold;}
	#InstructorList table {font-size:13px;}
	#InstructorList table td.profileYear {padding-right:5px; font-weight:bold;}
</style>

<script>
	import draggable from 'vuedraggable';
	export default {
		created(){
			this.loadTeacherList();
		},
		components : {
			draggable
		},
		data() {
			return {
				instructorList : [],
				teacherList : [],
				teacherData : {
					company : '',
					name : '',
					title : ''
				}
			}
		},
		watch : {
			teacherList() {
				this.sort();
			}
		},
		methods : {
			loadTeacherList() {
				this.ajax.get('/lecture/teacher/list').then(res => {
					res = res.data;

					if(res.code === 0) {
						this.teacherList = res.data.list
						for(let i = 0, len = this.teacherList.length; i < len; i++) {
							this.teacherList[i].is_show = this.teacherList[i].is_show === 'Y' ? true : false;
						}
					}
				})
			},
			addTeacher() {
				this.ajax.post('/lecture/teacher/add', this.teacherData).then(res => {
					res = res.data;

					if(res.code === 0) {
						this.loadTeacherList();
					} else {

					}
				})
			},
			deleteTeacher(id){
				if(confirm("이 강사를 삭제하시겠습니까? 영구삭제됩니다.")) {
					this.ajax.post('/lecture/teacher/delete', {id : id}).then(res => {
						res = res.data;

						if(res.code === 0) {
							this.loadTeacherList();
						} else {

						}
					})	
				}
			},sort() {
				const arr = []
				for(let i = 0, len = this.teacherList.length; i < len; i++) {
					const item = this.teacherList[i];
					arr.push({
						id : item.id,
						order : i
					})
				}
				console.log(arr)

				this.ajax.post('/lecture/teacher/update/sort', {
					arr : arr
				})
			},
			updateTeacherShow(teacherId, teacherShow) {
				const data = {
					id : teacherId,
					field : 'is_show',
					value : teacherShow ? 'N' : 'Y'
				}
				this.ajax.post('/lecture/teacher/update', data).then(res => {
					res = res.data;
					if(res.code === 0) {
						this.loadTeacherData();
					}
				})
			}
		}
	}
</script>