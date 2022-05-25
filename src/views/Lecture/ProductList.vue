<template>
	<ContentWrapper id="LectureList">
		<div class="content-heading">
			<div>[멤버] {{categoryList[category]}} 상품 관리</div>
		</div>

		<div id="lectureListAdmin">
			<h4 class="page-header d-flex">
				<span>상품목록 관리</span>
				<b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.addLecture>상품 추가</b-btn>
			</h4>
			<h5 class="page-header d-flex">
				<span>상품 목록</span>
			</h5>
			<draggable v-model="lectureList" class="row">
				<div class="col-6 col-sm-3" v-for="lecture in lectureList" style="margin-top : 20px">
					<div class="card card-flat">
						<i class="fas fa-times-circle" @click="removeLecture(lecture.id)"></i>
						<router-link :to="'/lectureList/' + lecture.id">
							<div class="card-img"><img :src="lecture.thumbnail" alt="강의썸네일"></div>
							<div class="card-body">
								<h5 class="card-title"><!-- [{{lecture.period}}기]  -->{{lecture.name}}</h5>
								<p class="card-text">강의시작일 : {{format(lecture.start_date)}}</p>
								<p class="card-text">강의종료일 : {{format(lecture.end_date)}}</p>
								<span class="badge badge-info" v-if="lecture.status === 'OPEN'">열림</span>
								<span class="badge badge-warning" v-if="lecture.status === 'WAIT'">대기</span>
								<span class="badge badge-inverse" v-if="lecture.status === 'EXIT'">종료</span>
								<span class="badge badge-success" v-if="lecture.status === 'ING'">진행중</span>
							</div>
						</router-link>
					</div>
				</div>
			</draggable>
		</div>

		<b-modal id="addLecture" title="건축주대학 강의추가" @ok="addLecture()">
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">강의명</label>
						<div class="col-sm-9">
							<input class="form-control" type="text" placeholder="강의 이름을 입력해주세요" v-model="addLectureData.name">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">강의 시작 일자</label>
						<div class="col-sm-9">
							<input class="form-control" type="date" placeholder="ex : 2019-07-12" v-model="addLectureData.start_date">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">강의 종료 일자</label>
						<div class="col-sm-9">
							<input class="form-control" type="date" placeholder="ex : 2019-07-30" v-model="addLectureData.end_date">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">강의대표이미지</label>
						<div class="col-sm-9">
							<input class="form-control" type="file" id="lectureImage" accept="image/*">
						</div>
					</div>
				</fieldset>
		</b-modal>
	</ContentWrapper>
</template>

<style>
	#LectureList a {text-decoration:none; color:#333;}
	.page-header button {margin-top:-0.5rem;}
	#addLecture .col-sm-3 {margin-right:0; padding-right:0;}

	#LectureList .row {margin-top:10px;}
	#LectureList .card {position:relative;}
	#LectureList i.fa-times-circle {position:absolute; top:-15px; right:-15px; z-index:1; font-size:26px; color:#656565; cursor:pointer;}
	#LectureList .card .card-img {width:100%; height:280px; overflow:hidden; position:relative;}
	#LectureList .card img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#LectureList .card .card-title {font-size:18px; font-weight:bold;}
</style>

<script>
import Editor from '@/components/Custom/Editor';
import draggable from 'vuedraggable';

export default {
	created() {
		this.category = this.$route.params.category;
		this.loadCategoryList();
		this.loadLectureList();
		this.loadIntro();
	},
	components : {
		Editor,
		draggable
	},
	watch : {
		'lectureIntro.period'(){
			this.updateIntro('period', this.lectureIntro.period);
		},
		'lectureIntro.description'(){
			this.updateIntro('description', this.lectureIntro.description);
		},
		lectureList() {
			this.sort()
		}
	},
	data() {
		return {
			lectureIntro : {
				period : '',
				description : ''
			},
			introEditorToolbar : [
			],
			lectureList : [],
			addLectureData : {
				name : '',
				start_date : '',
				end_date : ''
			},
			categoryList : {}
		}
	},
	methods : {
		loadCategoryList(){
			this.ajax.get('/product/category/list').then(res => {
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
		loadIntro() {
			this.ajax.get('/lecture/intro/params').then(res => {
				res = res.data;

				if(res.code === 0) {
					this.lectureIntro = res.data;
				}
			})
		},
		updateIntro(key, value) {
			this.ajax.post(`/lecture/intro/${key}/update`, {value : value}).then(res => {

			})
		},
		loadLectureList(){
			this.ajax.get('/product/list?category=' + this.category).then(res => {
				res = res.data;

				this.lectureList = res.data.list;
				console.log(this.lectureList)
			})
		},
		format(date) {
			const d = new Date(date);
			return d.toFormatString(true)
		},
		addLecture() {
			const input = document.getElementById('lectureImage');

			const formData = new FormData();

			if(this.addLectureData.name === '') {
				return alert("이름을 입력해주세요")
			}

			if(this.addLectureData.start_date === '') {
				return alert("강의 시작일을 입력해주세요.")
			}

			if(this.addLectureData.end_date === '') {
				return alert("강의 종료일을 입력해주세요.")	
			}

			for(let key in this.addLectureData) {
				formData.append(key, this.addLectureData[key]);
			}

			if(input.files.length === 0) {
				return alert("이미지 파일을 선택해주세요.");
			}
			
			formData.append('image', input.files[0]);
			formData.append('category', this.category);

			this.ajax({
				method : 'post',
				url : '/product/create',
				data : formData,
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					location.href = `/lectureList/${res.data.id}`;
				} else {
					alert("강의 추가에 실패하였습니다.")
				}
			})
		},
		removeLecture(id) {
			if(confirm('이 강의를 삭제하시겠습니까?')) {
				if(confirm('되돌릴 수 없으며 이 강의와 관련된 모든 데이터가 삭제됩니다. 정말로 삭제하시겠습니까?')) {
					this.ajax.post('/lecture/remove', {
						id : id
					}).then(res => {
						location.reload();
					})
				}
			}
		},
		sort() {
			const arr = []
			for(let i = 0, len = this.lectureList.length; i < len; i++) {
				const item = this.lectureList[i];
				arr.push({
					id : item.id,
					order : i
				})
			}

			this.ajax.post('/lecture/update/sort', {
				arr : arr
			})
		},
	}
}
</script>