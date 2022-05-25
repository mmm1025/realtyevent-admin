<template>
	<ContentWrapper id="partners">
		<div class="content-heading">
			<div>파트너스 관리</div>
		</div>
		<div class="container-fluid">
			<div id="partnersCategoryAdmin">
				<!-- START row-->
				<h4 class="page-header d-flex">
					<span>파트너스 카테고리 관리</span> 
					<b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.addCategory>카테고리 추가</b-btn>
				</h4>
				<div class="row">
					<div class="col-sm-3">
						<button id="btn-category-all" type="button" class="btn btn-primary btn-block btn-category" @click="loadPartnersList('all', $event)">
							전체 파트너스 <span class="badge badge-light">{{allCount}}</span>
						</button>
					</div>
					<div class="col-sm-3" v-for="category in categoryList">
						<button type="button" class="btn btn-primary btn-block btn-category" @click="loadPartnersList(category.categoryId, $event)">
							{{category.categoryName}} <span class="badge badge-light">{{category.categoryCount}}</span>
							<i class="fa fa-times x-btn" @click="deleteCategory(category.categoryId)"></i>
						</button>
					</div>
				</div>
				<!-- END row-->

				<!--START 파트너스 카테고리 modal-->
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
			<!--END 파트너스 카테고리 modal-->

			<div id="partnersListAdmin">
				<h4 class="page-header d-flex">
					<span>파트너스 목록 관리</span> 
					<b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.myModal>파트너스 추가</b-btn>
				</h4>
				<div id="partners">
					<div class="row">
						<div class="col-6 col-md-3" v-for="partners in partnersList">
							<div class="boxwrap">
								<i class="fas fa-times-circle" @click="isDelPartners(partners.partnersId)"></i>
								<router-link :to="'/partners/edit/' + partners.partnersId">
									<div class="imgbox"><img :src="partners.partnersThumbnail" alt="파트너스이미지"></div>
									<div class="txtbox">
										<div class="partnerLogo"><img :src="partners.partnersLogoImage" alt="파트너스로고이미지"></div>
										<div class="partnerName">
											<h6>{{partners.partnersName}}</h6>
											<p>{{partners.partnersCeoName}}</p>
										</div>
									</div>
								</router-link>
							</div>
						</div>
					</div>
				</div>

				<!-- Modals -->
				<b-modal id="myModal" title="땅집고건축 파트너스 추가" @ok="addPartners">
					<form class="form-horizontal" method="get" action="/">
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">회사명</label>
								<div class="col-md-9">
										<input class="form-control" type="text"  v-model="addPartnersData.name"/>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">대표</label>
								<div class="col-md-9">
										<input class="form-control" type="text"  v-model="addPartnersData.ceoName"/>
										<span class="form-text"></span>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">카테고리</label>
								<div class="col-md-9">
									<select class="custom-select custom-select-sm" v-model="addPartnersData.categoryId">
										<option v-for="category in categoryList" :value="category.categoryId">{{category.categoryName}}</option>
									</select>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label" for="input-logo-image">로고이미지</label>
								<div class="col-md-9">
									<input class="form-control" id="input-logo-image" type="file" />
								</div>
							</div>
						</fieldset>
					</form>
				</b-modal>
			</div>

		</div>
	</ContentWrapper>
</template>

<script>
	export default {
		mounted() {
			this.loadCategoryList()
			this.loadPartnersList('all');
		},
		components: {
			
		},
		data() {
			return {
				allCount : 0,
				addCategoryName : '',
				activeCategoryName : '',
				categoryList : [],
				partnersList : [],
				addPartnersData : {
					categoryId : '',
					name : '',
					ceoName : ''
				}
			}
		},
		methods : {
			loadCategoryList() {
				// /admin/partners/category/list
				this.ajax.get('/partners/category/list')
				.then((res) => { // Arrow Function
					res = res.data; 
					if(res.code === 0) {
						this.categoryList = res.data.list;
						for(let key in this.categoryList) {
							this.allCount += Number(this.categoryList[key].categoryCount);
						}
					} else {
						alert("카테고리를 가져오지 못했습니다.")
					}
				})
			},
			loadPartnersList(categoryId, event) {
				// /partners/:categoryId/list
				this.activeCategoryName = categoryId;
				this.ajax.get(['/partners', categoryId, 'list'].join('/'))
				.then(res => {
					res = res.data; 
					if(res.code === 0) {
						this.partnersList = res.data.list;

						$('.btn-category').css('opacity', 0.5);
						if(typeof event !== 'undefined' && event !== null) {
							$(event.path[0]).css('opacity', 1);
						} else {
							$('#btn-category-all').css('opacity', 1);
						}
					} else {
						alert("파트너스 목록을 가져오지 못했습니다.")
					}
				})
			},
			addPartners() {
				const input = document.getElementById('input-logo-image');

				const formData = new FormData();

				for(let key in this.addPartnersData) {
					if(this.addPartnersData[key].length === 0) {
						return alert("모든 필드를 정확히 입력해주세요.");
					} else {
						formData.append(key, this.addPartnersData[key]);
					}
				}

				if(input.files.length === 0) {
					return alert("로고 파일을 선택해주세요.");
				}
				
				formData.append('logo', input.files[0]);

				this.ajax({
					method : 'post',
					url : '/partners/add',
					data : formData,
					headers : {
						'Content-Type' : 'multipart/form-data'
					}
				}).then(res => {
					console.log(res)
					res = res.data;
					if(res.code === 0) {
						this.loadPartnersList(this.addPartnersData['categoryId']);
					} else {
						alert("파트너스추가에 실패했습니다")
					}
				})
			},
			isDelPartners(partnersId) {
				if(confirm("선택한 파트너스를 삭제하시겠습니까?\n파트너스의 모든 데이터가 삭제됩니다.")) {
					this.ajax.post('/partners/delete', {
						id : partnersId
					}).then(res => {
						res = res.data;
						if(res.code === 0){
							this.loadPartnersList(this.activeCategoryName);
						} else {
							alert("삭제에 실패했습니다");
						}
					})
				}
			},
			addCategory() {
				const name = this.addCategoryName;

				if(name.length === 0) {
					return alert("카테고리 이름을 입력해 주세요");
				} else {
					this.ajax.post('/partners/category/add', {
						name : name
					}).then(res => {
						res = res.data; 
						if(res.code === 0) {
							this.loadCategoryList()
						} else {
							alert("카테고리추가에 실패했습니다")
						}
					})
				}
			},
			deleteCategory(categoryId) {
				if(confirm("정말로 이 카테고리를 삭제하시겠습니까?\n연결된 모든 파트너스가 삭제됩니다!")) {
					this.ajax.post('/partners/category/delete', {
						id : categoryId
					}).then(res => {
						res = res.data; 
						if(res.code === 0) {
							this.loadCategoryList()
						} else {
							alert("카테고리삭제에 실패했습니다")
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	/*파트너스 전체페이지*/

	#partners .row .boxwrap {border:1px solid #dedede; margin-bottom:5%; background:#fff;}
	#partners .boxwrap .imgbox {width:100%; height:320px; overflow:hidden; position:relative;}
	#partners .boxwrap .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}
	#partners .txtbox {width:100%; padding:3% 5%; overflow:hidden;}
	#partners .txtbox .partnerLogo {float:left; width:80px; height:80px; border:1px solid #eee; border-radius:100vh; overflow:hidden; position:relative;}
	#partners .txtbox .partnerLogo img {width:80%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}
	#partners .txtbox .partnerName {float:left; width:calc(100% - 88px); padding:3% 0 0 8px; line-height:1.6;}
	#partners .txtbox h6 {font-size:1.2rem; letter-spacing:-0.03em; line-height:1.8; margin-bottom:0;}
	#partners .row .txtbox p {font-size:16px; color:#666;}

	#partners .page-header button {margin-top:-0.5rem;}
	#partners .container-fluid>div {margin-bottom:7%;}

	#partnersCategoryAdmin .col-sm-3 button {padding:0.7rem; position:relative;}
	#partnersCategoryAdmin button i.x-btn {position:absolute; top:50%; right:5%; transform:translate(-50%,-50%);}

	#partnersListAdmin .boxwrap {width:100%; position:relative; margin-top:10px;}
	#partnersListAdmin .boxwrap i.fa-times-circle {position:absolute; top:-15px; right:-15px; z-index:1; font-size:26px; color:#656565;}
</style>