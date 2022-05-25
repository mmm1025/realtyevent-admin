<template>
	<ContentWrapper id="partners">
		<div class="content-heading">
			<div>건축 TV 관리</div>
		</div>
		
		<div class="container-fluid">
			<div class="rows">
				<div id="main-contents" class="col-sm-12">
					<div>
						<h4 class="page-header d-flex">
							<span>메인 노출 컨텐츠</span> 
							<!-- <b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.addCategory>카테고리 추가 </b-btn> -->
						</h4>
						<draggable v-model="mainVideoList" class="row">
							<div class="col-sm-4" v-for="list in mainVideoList">
								<div class="boxwrap">
									<i class="fas fa-times-circle" @click="unsetMain(list.id)"></i>
									<div class="imgbox">
										<img :src="getThumb(list.url)" alt="비디오 
										썸네일" style="width : 100%">
									</div>
									<div class="txtbox">
										<div class="btnwrap d-flex">
										</div>
										<h6 class="title">{{list.title}}</h6>
									</div>
								</div>
							</div>
						</draggable>
					</div>
					<div class="row">
						<div class="col-sm-12">
							<h4 class="page-header d-flex">
								<span>동영상 관리</span> 
								<!-- <b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.addCategory>카테고리 추가 </b-btn> -->
							</h4>
						</div>
						<div class="col-sm-3">
							<h4 class="page-header d-flex" style="margin: 0; border-bottom: 0px">
								<span style="font-size : 12pt">카테고리 관리</span> 
								<b-btn style="margin-top : -10px" class="btn btn-dark btn-sm ml-auto" type="button" variant="primary" v-b-modal.addCategory>카테고리 추가</b-btn>
							</h4>
							<div>
								<div>
									<button :class="activeCategory === 'all' ? 'active' : ''" style="font-size  : 13pt; text-align: left;" class="btn btn-block btn-default btn-lg" @click="changeActiveCategory('all')">
										전체 
									</button>
									<button :class="activeCategory == item.id ? 'active' : ''" v-for="item in categoryList" style="font-size  : 13pt; text-align: left; position: relative;" class="btn btn-block btn-default btn-lg" @click="changeActiveCategory(item.id)">
										{{item.name}} <i style="position: absolute;right : 10px" class="fa fa-times x-btn" @click="removeCategory(item.id)"></i>
									</button>
								</div>
							</div>

							<!-- 카테고리 추가 -->
							<b-modal id="addCategory" title="카테고리 추가" @ok="addCategory">
								<form class="form-horizontal" method="get" action="/">
									<fieldset>
										<div class="form-group row">
											<label class="col-md-3 col-form-label">카테고리명</label>
											<div class="col-md-9">
												<input class="form-control" type="text" v-model="addCategoryName"/>
											</div>
										</div>
									</fieldset>
								</form>
							</b-modal>			
						</div>
						<div class="col-sm-9" style="border-left : 1px solid #ddd">
							<h4 class="page-header d-flex" style="margin: 0; border-bottom: 0px">
								<span style="font-size : 12pt">동영상 관리&nbsp;&nbsp;<small>정렬은 최신순입니다. (마지막 등록한 동영상이 첫번째로 보임)</small></span> 
								<b-btn style="margin-top : -10px" class="btn btn-dark btn-sm ml-auto" type="button" variant="primary" v-b-modal.addVideo>동영상 추가</b-btn>
							</h4>

							<div class="row">
								<div class="col-sm-4" v-for="list in videoList">
									<div class="boxwrap">
										<button v-if="list.is_main === 'N'" class="btn btn-main btn-success btn-sm" @click="setMain(list.id)">메인으로</button>
										<button v-else class="btn btn-main btn-warning btn-sm" @click="unsetMain(list.id)">해제</button>
										<i class="fas fa-times-circle" @click="removeVideo(list.id)"></i>
										<div class="imgbox">
											<img :src="getThumb(list.url)" alt="비디오 
											썸네일" style="width : 100%">
										</div>
										<div class="txtbox">
											<div class="btnwrap d-flex">
											</div>
											<h6 class="title">{{list.title}}</h6>
										</div>
									</div>
								</div>
							</div>

							<!-- 카테고리 추가 -->
							<b-modal id="addVideo" title="동영상 추가" @ok="addVideo">
								<form class="form-horizontal" method="get" action="/">
									<fieldset>
										<div class="form-group row">
											<label class="col-md-3 col-form-label">카테고리명</label>
											<div class="col-md-9">
												<select class="form-control" v-model="activeCategory">
													<option disabled="" value="all">---카테고리를 선택해주세요---</option>
													<option v-for="category in categoryList" :value="category.id">{{category.name}}</option>
												</select>
											</div>
										</div>
									</fieldset>
									<fieldset>
										<div class="form-group row">
											<label class="col-md-3 col-form-label">유튜브 URL</label>
											<div class="col-md-9">
												<input class="form-control" type="url" v-model="addVideoData.url"/>
											</div>
										</div>
									</fieldset>
									<fieldset>
										<div class="form-group row">
											<label class="col-md-3 col-form-label">제목</label>
											<div class="col-md-9">
												<input class="form-control" type="text" v-model="addVideoData.title"/>
											</div>
										</div>
									</fieldset>
									<fieldset>
										<div class="form-group row">
											<label class="col-md-3 col-form-label">이미지</label>
											<div class="col-md-9">
												<img :src="addVideoData.thumbnail" style="max-width: 300px" alt="유튜브 썸네일 이미지">
											</div>
										</div>
									</fieldset>
								</form>
							</b-modal>	
						</div>
					</div>
				</div>
				<div>
					
				</div>
			</div>
		</div>
	</ContentWrapper>
</template>

<script>
import draggable from 'vuedraggable';

export default {
	created() {
		this.loadCategory();
		this.loadVideoList();
		this.loadMainVideoList()
	},
	components : {
		draggable
	},
	data() {
		return {
			categoryList : [],
			addCategoryName : '',
			activeCategory : 'all',
			addVideoData : {
				title : '',
				url  :'',
				thumbnail : ''
			},
			page : 1,
			videoList : [],
			mainVideoList : []
		}
	},
	watch : {
		'addVideoData.url'() {
			this.ajax.get('/video/youtube/info?url=' + this.addVideoData.url).then(res => {
				res = res.data;
				if(res.code === 0) {
					const d = res.data;
					this.addVideoData.title = d.title;
					this.addVideoData.url = d.url;
					this.addVideoData.thumbnail = d.thumbnail;
				}
			})
		},
		page() {
			this.loadVideoList();
		},
		activeCategory() {
			this.loadVideoList();
		},
		mainVideoList() {
			this.mainSort();
		}
	},
	methods : {
		loadMainVideoList() {
			this.ajax.get('/video/main/list').then(res => {
				res = res.data;
				if(res.code === 0) {
					this.mainVideoList = res.data.list;
				}
			})
		},
		setMain(id) {
			if(this.mainVideoList.length >= 3) {
				return alert("메인에 추가되는 비디오는 3개까지만 가능합니다.");
			}
			this.ajax.post('/video/main/set', {id : id}).then(res => {
				res = res.data;

				this.loadMainVideoList();
				this.loadVideoList();
			})
		},
		unsetMain(id) {
			this.ajax.post('/video/main/unset', {id : id}).then(res => {
				res = res.data;

				this.loadMainVideoList();
				this.loadVideoList();
			})
		},
		mainSort () {
			const arr = []
			for(let i = 0, len = this.mainVideoList.length; i < len; i++) {
				const item = this.mainVideoList[i];
				arr.push({
					id : item.id,
					order : i
				})
			}

			this.ajax.post('/video/main/sort', {
				arr : arr
			})
		},
		loadVideoList() {
			this.ajax.get(`/video/list?category=${this.activeCategory}&page=${this.page}`).then(res => {
				res = res.data;
				// console.log(res)
				if(res.code === 0) {
					this.videoList = res.data.list
				}
			})
		},
		loadCategory() {
			this.ajax.get('/video/category/list').then(res => {
				res = res.data;

				this.categoryList = res.data.list;
			})
		},
		addCategory() {
			this.ajax.post('/video/category/add', {
				name : this.addCategoryName
			}).then(res => {
				location.reload();
			})
		},
		removeCategory(id) {
			if(confirm("카테고리를 삭제하시겠습니까?\n포함된 모든 동영상이 함께 삭제되며 되돌릴 수 없습니다.")
				) {
				if(confirm("카테고리를 정말 삭제하시겠습니까? 되돌릴 수 없습니다.")) {
					this.ajax.post('/video/category/remove', {id : id}).then(res => {
						location.reload();
					})
				}
			}
		},
		changeActiveCategory(id) {
			this.page = 1;
			this.activeCategory = id;
		},
		addVideo() {
			if(this.activeCategory === 'all') {
				return alert("카테고리를 선택해주세요.");
			}

			if(this.addVideoData.url === '') {
				return alert("유투브 주소를 입력해주세요.");
			}

			if(this.addVideoData.title === '') {
				return alert("제목을 입력해 주세요.");	
			}

			if(this.addVideoData.thumbnail === '') {
				return alert("유효한 유튜브 주소를 입력해주세요.");	
			}

			const data = {
				category_id : this.activeCategory,
				title : this.addVideoData.title,
				url : this.addVideoData.url
			}
			this.ajax.post('/video/add', data).then(res => {
				location.reload()
			})
		},
		getYoutubeId(url) {
			// https://www.youtube.com/watch?v=OxWqRo34UYI 형태
			if(url.search('youtube.com') >= 0) {
				var id = url.split('v=')[1];
				return id;
			} else if (url.search ('youtu.be') >= 0) { // https://youtu.be/AdM93EpYLtA?t=28 형태
				var id = url.split('.be/')[1].replace(/\?t=\d+/, '');
				return id;
			} else {
				return null;
			}
		},
		getThumb(url) {
			return `https://img.youtube.com/vi/${this.getYoutubeId(url)}/hqdefault.jpg`
		},
		removeVideo(id) {
			if(confirm('이 동영상을 정말로 삭제하시겠습니까?')) {
				this.ajax.post('/video/remove', {id : id}).then(res => {
					res = res.data;

					this.loadMainVideoList();
					this.loadVideoList();
				})	
			}
		}

	}
}
</script>

<style type="text/css">
.btn.active {
	font-weight: bold;
}
.boxwrap {border:1px solid #dedede; margin-bottom:5%; position:relative; background:#fff;}
.btn-sm {border-radius:3px; font-size:0.8rem; margin-right:5px;}
.imgbox {width:100%; height:200px; border:1px solid #dedede; overflow:hidden;}
.imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
.txtbox {width:100%; position:absolute; bottom:0; padding:4%; background:rgba(255,255,255,0.7); z-index:10;}
.btnwrap p {margin-right:5px; font-weight:bold; color:#007bff !important;}
.title {font-size:18px; font-weight:bold; color:#000; padding-top:3%;}
.boxwrap i.fa-times-circle {position:absolute; top:-15px; right:-15px; z-index:1; font-size:26px; color:#656565; cursor:pointer;}
.btn-main {position:absolute; top:5px; left:5px; z-index:1; padding : 2px;}
</style>