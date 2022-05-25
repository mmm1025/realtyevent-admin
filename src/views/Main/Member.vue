<template>
	<ContentWrapper id="Main">
		<div class="content-heading">
			<div>땅집고 멤버 카테고리 관리</div>
			<b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.addCategory>카테고리 추가</b-btn>
		</div>

		<div id="MainAdmin">
			<div class="row">
				<div class="col-sm-9">
					<h4 class="page-header">HEADER POSITION</h4>
					<h6 class="text-center">원하시는 순서대로 각 헤더를 이동해주세요</h6>
					<div class="sectionWrap">
						<draggable v-model="sectionList" class="row">
							<div class="col-sm" v-for="section in sectionList" v-if="section.is_show_header">
								{{section.name}}
							</div>
						</draggable>
					</div>
				</div>
				<div class="col-sm-3">
					<h4 class="page-header">HEADER DISPLAY</h4>
					<div class="boxwrap">
						<div class="row" v-if="section.id !== 1" v-for="section in sectionList">
							<div class="col-8">
								<p class="name">{{section.name}}</p>
							</div>
							<div class="col-4">
								<label class="switch">
									<input type="checkbox" v-model="section.is_show_header" @click="updateHeaderShow(section.id, section.is_show_header)"/>
									<span></span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-9">
					<h4 class="page-header">SECTION POSITION</h4>
					<h6 class="text-center">원하시는 순서대로 각 section을 이동해주세요. 상품 목록에서 상품을 추가/관리 할 수 있습니다.</h6>
					<div class="sectionWrap">
						<draggable v-model="sectionList">
							<section id="section" class="card shadow-sm" v-for="section in sectionList" v-if="section.is_show_main" >
								<div class="card-body">{{section.name}}</div>
								<button type="button" class="btn btn-sm btn-primary ml-auto" v-b-modal.modifyCategory @click="selectCategory(section.id)">이름변경</button>
								<router-link class="ml-auto" :to="'/productlist/' + section.id" >
									<button type="button" class="btn btn-sm btn-dark">상품 목록</button>
								</router-link>
								<button type="button" class="btn btn-sm btn-danger ml-auto" @click="removeCategory(section.id)">삭제</button>
							</section>
						</draggable>
					</div>
				</div>
				<div class="col-sm-3">
					<h4 class="page-header">SECTION DISPLAY</h4>
					<div class="boxwrap">
						<div class="row" v-if="section.id !== 1" v-for="section in sectionList">
							<div class="col-8">
								<p class="name">{{section.name}}</p>
							</div>
							<div class="col-4">
								<label class="switch">
									<input type="checkbox" v-model="section.is_show_main" @click="updateShow(section.id, section.is_show_main)"/>
									<span></span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="addCategory" title="상품 카테고리 추가" @ok="addCategory()">
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">이름</label>
						<div class="col-sm-9">
							<input class="form-control" type="text" placeholder="카테고리 이름을 입력해주세요" v-model="addCategoryData.name">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">카테고리 이미지</label>
						<div class="col-sm-9">
							<input class="form-control" type="file" id="categoryImage" accept="image/*">
						</div>
					</div>
				</fieldset>
		</b-modal>
		<b-modal id="modifyCategory" title="상품 카테고리 수정" @ok="updateCategory()">
			<fieldset>
				<div class="form-group row">
					<label class="col-sm-3 col-form-label">이름</label>
					<div class="col-sm-9">
						<input class="form-control" type="text" placeholder="카테고리 이름을 입력해주세요" v-model="selectedCategory.name">
					</div>
				</div>
			</fieldset>
			<fieldset>
				<div class="form-group row">
					<label class="col-sm-3 col-form-label">카테고리 이미지</label>
					<div class="col-sm-9">
						<input class="form-control" type="file" id="categoryUpdateImage" accept="image/*">
						<div>
							<img :src="selectedCategory.img" style="width: 100%">
						</div>
					</div>
				</div>
			</fieldset>
		</b-modal>
	</ContentWrapper>
</template>

<style>
	#MainAdmin .page-header {margin-top:0.5rem;}
	#MainAdmin .sectionWrap {width:80%; margin:0 auto; padding:30px; background:#fff;}
	#MainAdmin h6 {padding:1rem 0;}
	#MainAdmin section {width:100%; height:200px; background:#f8f8f8;}
	#MainAdmin .card {border:0; position:relative; border:1px solid #dedede; border-radius:5px; text-align:center;}
	#MainAdmin .card-body {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:24px; font-weight:bold;}
	#MainAdmin .card button {width:80px; margin:10px 10px 0 0;}

	#MainAdmin .boxwrap {background:#fff; padding:20px;}
	#MainAdmin .boxwrap .row {margin:0; padding:0.8rem 0; border-bottom:1px dashed #eee;}
	#MainAdmin .boxwrap .row:last-child {border-bottom:0;}
	#MainAdmin .boxwrap p {margin:0;}
	#MainAdmin .boxwrap .col-4 {position:relative;}
	#MainAdmin .boxwrap .col-4 label {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}
	
</style>

<script>
import draggable from 'vuedraggable'
export default {
  	components: {
		draggable
	},
	created() {
		this.getList();
	},
	watch : {
		'sectionList'(){
			this.updateOrder();
		},
		'headerList'(){
			this.updateHeaderOrder();
		}
	},
	data() {
		return {
			section : 0,
			sectionList : [],
			headerList : [],
			addCategoryData : {
				name : ''
			},
			selectedCategory : {
				id : '',
				name : '',
				img : ''
			}
		}
	},
	methods : {
		getList(){
			this.ajax.get('/product/category/list').then(res => {
				res = res.data;
				console.log(res.data.list)
				if(res.code === 0) {
					for(let idx in res.data.list) {
						res.data.list[idx].is_show_main = res.data.list[idx].is_show_main === 'Y' ? true : false;
						res.data.list[idx].is_show_header = res.data.list[idx].is_show_header === 'Y' ? true : false;
					}
					this.sectionList = res.data.list;
				} else {
					console.log(res);
				}
			})
		},
		updateOrder() {
			const list = [];
			for(let i = 0, len = this.sectionList.length; i < len; i++) {
				const data = this.sectionList[i];
				list.push({
					id : data.id,
					order : i
				})
			}

			this.ajax.post('/product/section/order', {list : list}).then(res => {

			})
		},
		updateShow(id, value) {
			this.ajax.post('/product/section/show', {id : id, value : (!value) ? 'Y' : 'N'})
		},
		updateHeaderShow(id, value) {
			this.ajax.post('/product/header/show', {id : id, value : (!value) ? 'Y' : 'N'})
		},
		updateCategory() {
			const input = document.getElementById('categoryUpdateImage');

			const formData = new FormData();

			if(this.selectedCategory.name === '') {
				return alert("이름을 입력해주세요")
			}

			if(input.files.length === 0) {
				// return alert("이미지 파일을 선택해주세요.");
			} else {
				formData.append('image', input.files[0]);
			}
				
			formData.append('id', this.selectedCategory.id);	
			formData.append('name', this.selectedCategory.name);

			this.ajax({
				method : 'post',
				url : '/product/category/update',
				data : formData,
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					location.reload();
				} else {
					alert("카테고리 추가에 실패하였습니다.")
				}
			})
		},
		addCategory() {
			const input = document.getElementById('categoryImage');

			const formData = new FormData();

			if(this.addCategoryData.name === '') {
				return alert("이름을 입력해주세요")
			}

			if(input.files.length === 0) {
				return alert("이미지 파일을 선택해주세요.");
			}
				
			formData.append('name', this.addCategoryData.name);
			formData.append('image', input.files[0]);

			this.ajax({
				method : 'post',
				url : '/product/category/add',
				data : formData,
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					location.reload();
				} else {
					alert("카테고리 추가에 실패하였습니다.")
				}
			})
		},
		removeCategory(id) {
			if(confirm("카테고리를 삭제하시겠습니까? 모든 상품이 함께 삭제됩니다.")) {
				if(confirm("정말로 삭제하시겠습니까? 되돌릴 수 없습니다.")) {
					this.ajax.post("/product/category/remove", {id : id}).then(res => {
						location.reload();
					})
				}
			}
		},
		selectCategory(id) {
			let item;
			for(let i = 0, len = this.sectionList.length; i < len; i++) {
				if(this.sectionList[i].id === id) {
					item = this.sectionList[i];
					break;
				}
			}
		 	this.selectedCategory = {
		 		id : item.id,
		 		name : item.name,
		 		img : item.image
		 	}
		}
	}
  }
</script>