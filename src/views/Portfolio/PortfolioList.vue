<template>
	<ContentWrapper id="portfolio">
		<div class="content-heading">
			<div>포트폴리오 관리</div>
		</div>
		<div class="container-fluid">
			<div id="portfolioCategoryAdmin">
				<h4 class="page-header"><span>포트폴리오 카테고리 관리</span> </h4>
				<div class="row">
					<div class="col-sm-3">
						<h5 class="categoryTitle">전체 포트폴리오</h5>
					</div>
					<div class="col-sm-3">
						<h5 class="categoryTitle">공사유형</h5>
						<div class="input-group" v-if="this.isAdmin">
							<input class="form-control" name="buildType" type="text" placeholder="공사유형옵션" v-model="addCategoryOptionName['build']" @keyup.enter="addCategoryOption('build')">
							<div class="input-group-append">
								<button class="btn btn-success" type="button" id="button-addon2">
									<i class="fas fa-plus" @click="addCategoryOption('build')"></i>
								</button>
							</div>
						</div>
						<div class="input-group">
							<select class="form-control" v-model="selectedCategory['build']">
								<option value="all">전체</option>
								<option v-for="list in categoryList.build" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
							</select>
							<div class="input-group-append" v-if="this.isAdmin">
								<button class="btn btn-danger" type="button" id="button-addon2" @click="deleteCatgoryOption(selectedCategory['build'], 'build')" :disabled="selectedCategory['build'] === 'all'">
									<i class="fas fa-times"></i>
								</button>
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<h5 class="categoryTitle">시설유형</h5>
						<div class="input-group" v-if="this.isAdmin">
							<input class="form-control" name="buildType" type="text" placeholder="시설유형옵션" v-model="addCategoryOptionName['establishment']" @keyup.enter="addCategoryOption('establishment')">
							<div class="input-group-append">
								<button class="btn btn-success" type="button" id="button-addon2">
									<i class="fas fa-plus" @click="addCategoryOption('establishment')"></i>
								</button>
							</div>
						</div>
						<div class="input-group">
							<select class="form-control" v-model="selectedCategory['establishment']">
								<option value="all">전체</option>
								<option v-for="list in categoryList.establishment" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
							</select>
							<div class="input-group-append" v-if="this.isAdmin">
								<button class="btn btn-danger" type="button" id="button-addon2" @click="deleteCatgoryOption(selectedCategory['establishment'], 'establishment')" :disabled="selectedCategory['establishment'] === 'all'">
									<i class="fas fa-times"></i>
								</button>
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<h5 class="categoryTitle">공사비용</h5>
						<div class="input-group" v-if="this.isAdmin">
							<input class="form-control" name="buildType" type="text" placeholder="공사비용옵션" v-model="addCategoryOptionName['cost']" @keyup.enter="addCategoryOption('cost')">
							<div class="input-group-append">
								<button class="btn btn-success" type="button" id="button-addon2">
									<i class="fas fa-plus"></i>
								</button>
							</div>
						</div>

						<div class="input-group">
							<select class="form-control" v-model="selectedCategory['cost']">
								<option value="all">전체</option>
								<option v-for="list in categoryList.cost" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
							</select>
							<div class="input-group-append" v-if="this.isAdmin">
								<button class="btn btn-danger" type="button" id="button-addon2" @click="deleteCatgoryOption(selectedCategory['cost'], 'cost')" :disabled="selectedCategory['cost'] === 'all'">
									<i class="fas fa-times"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="portfolioListAdmin">
				<h4 class="page-header d-flex">
					<span>포트폴리오 목록 관리</span>
					<div class="form-group" style="width : 200px; font-size : 11pt; margin-bottom : 0; margin-top : -10px; margin-left : 20px">
					<model-select :options="partnersList" placeholder="파트너스로 검색" v-model="partnersId" v-if="this.isAdmin"></model-select>
					</div>
					<b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.myModal>포트폴리오 추가</b-btn>
				</h4>
				<div class="row">
					<div class="col-6 col-md-3" v-for="list in portfolioList">
						<div class="boxwrap">
							<i class="fas fa-times-circle" @click="isDelPortfolio(list.portfolioId)"></i>
							<router-link :to="'/portfolio/edit/' + list.portfolioId">
								<div class="imgbox"><img :src="list.portfolioThumbnail" alt="포트폴리오이미지"></div>
								<div class="txtbox">
									<div class="btnwrap d-flex">
										<p class="text-primary">#{{list.portfolioBuildCategory.optionName}}</p>
										<p class="text-primary">#{{list.portfolioEstablishmentCategory.optionName}}</p>
									</div>
									<h6 class="title">{{list.portfolioName}}</h6>
								</div>
							</router-link>
						</div>
					</div>
				</div>

				<!-- Modals -->
				<b-modal id="myModal" title="땅집고건축 포트폴리오 추가" @ok="addPortfolio()">
					<form class="form-horizontal" method="get" action="/">
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">제목</label>
								<div class="col-md-9">
									<input class="form-control" type="text" v-model="addPortfolioData.portfolioName">
								</div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">공사유형</label>
								<div class="col-md-9">
									<select class="custom-select custom-select-sm" v-model="addPortfolioData.portfolioBuildOptionId">
										<option v-for="list in categoryList.build" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
									</select>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">시설유형</label>
								<div class="col-md-9">
									<select class="custom-select custom-select-sm" v-model="addPortfolioData.portfolioEstablishmentOptionId">
										<option v-for="list in categoryList.establishment" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
									</select>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label">비용유형</label>
								<div class="col-md-9">
									<select class="custom-select custom-select-sm" v-model="addPortfolioData.portfolioCostOptionId">
										<option v-for="list in categoryList.cost" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
									</select>
								</div>
							</div>
						</fieldset>
						<fieldset v-if="this.isAdmin">
							<div class="form-group row">
								<label class="col-md-3 col-form-label">해당 파트너스</label>
								<div class="col-md-9">
									<model-select :options="partnersList" v-model="addPortfolioData.portfolioPartnersId" placeholder="선택이염"></model-select>
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
	import {ModelSelect} from 'vue-search-select'
	export default {
		created() {
			this.ajax.get('/account').then(res => {
                res = res.data;
                if(res.code === 0) {
                    if(res.data.type === "ADMIN") {
                        this.isAdmin = true;
                    } else {
                    	this.addPortfolioData.portfolioPartnersId = res.data.partners_id;
                    	this.partnersId = res.data.partners_id;
                    }

                    this.loadPartnersList();
					this.loadCategoryList('build');
					this.loadCategoryList('establishment');
					this.loadCategoryList('cost');
					this.loadPortfolioList();
                } else {
                	location.href = '/login'
                }
            })
		},
		components: {
			ModelSelect
		},
		data() {
			return {
				isAdmin : false,
				partnersList : [
				],
				item2 : '',
				addCategoryOptionName : {
					build : '',
					establishment : '',
					cost : ''
				},
				categoryList : {
					build : [],
					establishment : [],
					cost : []
				},
				selectedCategory : {
					build : 'all',
					establishment : 'all',
					cost : 'all'
				},
				partnersId : '',
				addPortfolioData : {
					portfolioName : '',
					portfolioBuildOptionId : '',
					portfolioEstablishmentOptionId : '',
					portfolioCostOptionId : '',
					portfolioPartnersId : '',
				},
				portfolioList : []
			}
		},
		watch : {
			'selectedCategory.build' () {
				this.loadPortfolioList();
			},
			'selectedCategory.establishment' () {
				this.loadPortfolioList();
			},
			'selectedCategory.cost' () {
				this.loadPortfolioList();
			},
			partnersId () {
				this.loadPortfolioList();
			}
		},
		methods: {
			addCategoryOption(categoryType){
				this.ajax.post(['/portfolio', 'category', categoryType, 'add'].join('/'), {
					name : this.addCategoryOptionName[categoryType]
				}).then(res => {
					res = res.data;
					if(res.code === 0){
						this.loadCategoryList(categoryType)
						this.addCategoryOptionName[categoryType] = '';
					}else{
						alert("카테고리옵션추가에 실패했습니다");
					}
				})
			},
			loadCategoryList(categoryType) {
				this.ajax.get(['/portfolio', 'category', categoryType, 'list'].join('/'))
				.then(res => {
					res = res.data;
					console.log(res)
					if(res.code === 0){
						this.categoryList[categoryType] = res.data.list;
					}else{
						alert("카테고리목록을 불러오는데 실패했습니다")
					}
				})
			},
			deleteCatgoryOption(categoryOptionId, categoryType){
				if(confirm("선택한 카테고리옵션을 삭제하시겠습니까?\n해당하는 카테고리옵션데이터가 삭제됩니다")){
					this.ajax.post('/portfolio/category/delete', {
						id : categoryOptionId
					}).then (res => {
						res = res.data;
						if(res.code === 0){
							this.loadCategoryList(categoryType);
						}else{
							alert("삭제에 실패했습니다");
						}
					})
				}
			},
			loadPartnersList() {
				// 불러온다
				// value,text 형태로 바꾼다
				// this.partnersList에 할당한다.
				this.ajax.get(['/partners', 'all', 'list'].join('/'))
				.then(res => {
					res = res.data;
					const partnersList = [];
					if (res.code === 0) {
						for (let i = 0, len = res.data.list.length; i < len; i++) {
							partnersList.push({
								text: res.data.list[i].partnersName,
								value: res.data.list[i].partnersId
							})
						}
						this.partnersList = partnersList;
					} else {

					}
				})
			},
			addPortfolio(){
				for(let key in this.addPortfolioData) {
					if(this.addPortfolioData[key].length === 0) {
						return alert("모든 필드를 정확히 입력해주세요.");
					}
				}

				this.ajax.post('/portfolio/add', this.addPortfolioData)
				.then(res => {
					res = res.data;
					if(res.code === 0){
						this.loadPortfolioList();
					} else {

					}
				})
			},
			loadPortfolioList(){
				this.ajax.get('/portfolio/list', {
					params : {
						portfolioBuildOptionId : this.selectedCategory.build,
						portfolioEstablishmentOptionId : this.selectedCategory.establishment,
						portfolioCostId : this.selectedCategory.cost,
						portfolioPartnersId :this.partnersId,
					}
				}).then(res => {
					res = res.data;
					this.portfolioList = res.data.list;
					console.log(this.portfolioList)
				})
			},
			isDelPortfolio(portfolioId){
				if(confirm("선택한 포트폴리오를 삭제하시겠습니까?\n해당 포트폴리오의 모든 데이터가 삭제됩니다")) {
					this.ajax.post('portfolio/delete', {
						id: portfolioId
					}).then(res => {
						res = res.data;
						if(res.code === 0){
							this.loadPortfolioList()
						} else {
							alert("삭제에 실패했습니다");
						}
					})
				}
			}
		},
	}
</script>

<style scoped>
	/*포트폴리오 전체페이지*/
	#portfolio h5.categoryTitle {text-align:center; font-size:17px; font-weight:bold; margin-bottom:10px;}

	#portfolio .page-header button {margin-top:-0.5rem;}
	#portfolio .container-fluid>div {margin-bottom:7%;}
	#portfolioCategoryAdmin .input-group {margin-top:10px;}
	#portfolio .optionList {margin-left:0; margin-bottom:0; padding:10px;}
	#portfolio .optionList p {}
	#portfolio .optionList i.ml-auto {}

	#portfolio .boxwrap {border:1px solid #dedede; margin-bottom:5%; position:relative; background:#fff;}
	#portfolio .btn-sm {border-radius:3px; font-size:0.8rem; margin-right:5px;}
	#portfolio .imgbox {width:100%; height:440px; border:1px solid #dedede; overflow:hidden;}
	#portfolio .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#portfolio .txtbox {width:100%; position:absolute; bottom:0; padding:4%; background:rgba(255,255,255,0.7); z-index:10;}
	#portfolio .btnwrap p {margin-right:5px; font-weight:bold; color:#007bff !important;}
	#portfolio .title {font-size:18px; font-weight:bold; color:#000; padding-top:3%;}

	#portfolio .boxwrap {width:100%; position:relative; margin-top:10px;}
	#portfolio .boxwrap i.fa-times-circle {position:absolute; top:-15px; right:-15px; z-index:1; font-size:26px; color:#656565; cursor:pointer;}
</style>
