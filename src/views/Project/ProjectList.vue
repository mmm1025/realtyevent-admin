<template>
	<ContentWrapper id="ProjectList">
		<div class="content-heading">
			<div>건설지원센터 관리 > 목록/상세</div>
		</div>

		<div id="projectListAdmin">
			<h4 class="page-header d-flex">
				<span> 목록 관리</span>
				<b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.addProject>프로젝트 추가</b-btn>
			</h4>
			<!-- <h5 class="page-header d-flex">
				<span>프로젝트 목록</span>
			</h5> -->
			<draggable v-model="projectList" class="row">
				<div class="col-6 col-sm-3" v-for="project in projectList" style="margin-top : 20px" :key="project.id">
					<div class="card card-flat">
						<i class="fas fa-times-circle" @click="removeProject(project.id)"></i>
						<router-link :to="'/projectList/' + project.id">
							<div class="card-img"><img :src="project.url1" alt="프로젝트썸네일"></div>
							<div class="card-body">
								<h5 class="card-title">{{project.name}}</h5>
								<p class="card-text">시작일 : {{format(project.start_date)}}</p>
								<p class="card-text">종료일 : {{format(project.end_date)}}</p>
								<span class="badge badge-info" v-if="project.status === 'OPEN'">열림</span>
								<span class="badge badge-warning" v-if="project.status === 'WAIT'">대기</span>
								<span class="badge badge-inverse" v-if="project.status === 'EXIT'">종료</span>
								<span class="badge badge-success" v-if="project.status === 'ING'">진행중</span>
							</div>
						</router-link>
					</div>
				</div>
			</draggable>
		</div>

		<b-modal id="addProject" title="프로젝트 추가" @ok="addProject()">
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">프로젝트명</label>
						<div class="col-sm-9">
							<input class="form-control" type="text" placeholder="프로젝트 이름을 입력해주세요" v-model="addProjectData.name">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">시작 일자</label>
						<div class="col-sm-9">
							<input class="form-control" type="date" placeholder="ex : 2020-01-01" v-model="addProjectData.start_date">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">종료 일자</label>
						<div class="col-sm-9">
							<input class="form-control" type="date" placeholder="ex : 2020-01-31" v-model="addProjectData.end_date">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">대표이미지</label>
						<div class="col-sm-9">
							<input class="form-control" type="file" id="projectImage" accept="image/*">
						</div>
					</div>
				</fieldset>
		</b-modal>
	</ContentWrapper>
</template>

<style>
	#ProjectList a {text-decoration:none; color:#333;}
	.page-header button {margin-top:-0.5rem;}
	#addProject .col-sm-3 {margin-right:0; padding-right:0;}

	#ProjectList .row {margin-top:10px;}
	#ProjectList .card {position:relative;}
	#ProjectList i.fa-times-circle {position:absolute; top:-15px; right:-15px; z-index:1; font-size:26px; color:#656565; cursor:pointer;}
	#ProjectList .card .card-img {width:100%; height:280px; overflow:hidden; position:relative;}
	#ProjectList .card img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#ProjectList .card .card-title {font-size:18px; font-weight:bold;}
</style>

<script>
import Editor from '@/components/Custom/Editor';
import draggable from 'vuedraggable';

export default {
	created() {
		this.loadProjectList();
	},
	components : {
		Editor,
		draggable
	},
	watch : {
		projectList() {
			console.log("watch!!");
			this.sort()
		}
	},
	data() {
		return {
			projectList : [],
			addProjectData : {
				name : '',
				start_date : '',
				end_date : ''
			}
		}
	},
	methods : {
		loadProjectList(){
			console.log("load!!");
			this.ajax.get('/project/list').then(res => {
				res = res.data;
				this.projectList = res.data.list;
			})
			console.log(this.projectList);
		},
		format(date) {
			const d = new Date(date);
			return d.toFormatString(true)
		},
		addProject() {
			const input = document.getElementById('projectImage');

			const formData = new FormData();

			if(this.addProjectData.name === '') {
				return alert("이름을 입력해주세요")
			}

			if(this.addProjectData.start_date === '') {
				return alert("시작일을 입력해주세요.")
			}

			if(this.addProjectData.end_date === '') {
				return alert("종료일을 입력해주세요.")	
			}

			for(let key in this.addProjectData) {
				formData.append(key, this.addProjectData[key]);
			}

			if(input.files.length === 0) {
				return alert("이미지 파일을 선택해주세요.");
			}
			
			formData.append('image', input.files[0]);

			this.ajax({
				method : 'post',
				url : '/project/create',
				data : formData,
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					location.href = `/projectList/${res.data.id}`;
				} else {
					alert("프로젝트 추가에 실패하였습니다.")
				}
			})
		},
		removeProject(id) {
			if(confirm('이 프로젝트를 삭제하시겠습니까?')) {
				if(confirm('되돌릴 수 없으며 이 프로젝트와 관련된 모든 데이터가 삭제됩니다. 정말로 삭제하시겠습니까?')) {
					this.ajax.post('/project/remove', {
						id : id
					}).then(res => {
						location.reload();
					})
				}
			}
		},
		sort() {
			const arr = []
			for(let i = 0, len = this.projectList.length; i < len; i++) {
				const item = this.projectList[i];
				console.log(item.name);
				arr.push({
					id : item.id,
					order : i
				})
			}
			console.log(arr)
			this.ajax.post('/project/update/sort', {
				arr : arr
			})
		},
	}
}
</script>