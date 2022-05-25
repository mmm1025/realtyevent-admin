<template>
	<ContentWrapper id="PortfolioEdit">
		<div class="content-heading">
			<div>포트폴리오 관리</div>
		</div>
		<div class="container-fluid">
			<div class="row">
				<div id="portfolioView" class="col-md-8">
					<div class="portfolioImage" @dragover="dragOver($event)" >
						<div style="position: absolute; top : 0; left : 0; width : 100%; height: 100%; z-index : 999999; background: #00000077; display: none;" @drop="dropFile($event)" id="dropzone" @dragleave="dragleave($event)">
							<p style="position : absolute; font-size : 40pt; top:50%; left:50%; transform:translate(-50%,-50%);color : white; padding:10px 30px; border:2px dashed #fff"><i class="fas fa-plus"></i></p>
						</div>
						<h6>포트폴리오 이미지업로드 (기준 : 370px * 440px / 1110px * 1320px)</h6>
						<draggable class="row list" v-model="portfolioImageList">
							<div class="boxwrap">
								<p>올리고 싶은 이미지를 이곳으로 drag해주세요</p>
							</div>
							<div class="col-6 col-sm-3" v-for="image in portfolioImageList">
								<i class="fas fa-times-circle" @click="deleteImage(image.portfolioImageId)"></i>
								<p class="btn btn-sm btn-success" v-if="image.isMain" :style="image.isMain ? 'display:block !important;' : ''">대표사진</p>
								<p class="btn btn-sm btn-info" v-if="!image.isMain" @click="setMainImage(image.portfolioImageId)" style="cursor: pointer;">대표사진으로 설정</p>
								<div class="imgbox">
									<img :src="image.portfolioImageUrl" alt="업로드이미지">
								</div>
							</div>
						</draggable>

						<!-- Modals -->
						<!-- <b-modal id="imageUpload" size="lg" title="포트폴리오 이미지 추가">
							<form class="form-horizontal" method="get" action="/">
								<b-card class="mb-3">
									<vue-dropzone id="my-dropzone" :options="dropzoneOptions" ref="dropzoneInstance" />
								</b-card>
							</form>
						</b-modal> -->
						
						<!-- <div class="portfolioImageUpload">
							<b-card class="mb-3">
								<vue-dropzone id="my-dropzone" :options="dropzoneOptions" ref="dropzoneInstance" />
							</b-card>
						</div> -->
					</div>
					<div class="portfolioText">
						<h6>포트폴리오 상세설명</h6>
						<div class="form-group textarea">
							<textarea rows="5" class="form-control" name="buildType" type="text" placeholder="상세설명" v-model="modifedPortfolio.portfolioDescription" @keyup.enter="setPortfolioData('portfolioDescription')">		      						
							</textarea>
							<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioDescription')" v-if="modifedPortfolio.portfolioDescription != portfolio.portfolioDescription">
								<i class="fas fa-check"></i>
							</button>
						</div> 
					</div>
				</div>	      
				<div id="portfolioList" class="col-md-4">
					<form>
						<h6>포트폴리오 제목	</h6>
						<div class="input-group titlebox">
							<input class="form-control" name="portfolioTitle" type="text" placeholder="포트폴리오제목" v-model="modifedPortfolio.portfolioName">
							<div class="input-group-append" @keyup.enter="setPortfolioData('portfolioName')">
								<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioName')" v-if="modifedPortfolio.portfolioName != portfolio.portfolioName">
									<i class="fas fa-check"></i>
								</button>
							</div>
						</div>
						<table class="table table-borderless">
							<tr>
								<th scope="col">공사유형</th>
								<td>
									<div class="input-group select-group">
										<select class="custom-select custom-select-sm" v-model="modifedPortfolio.portfolioBuildOptionId">
											<option v-for="list in categoryList.build" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
										</select>
										<div class="input-group-append">
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioBuildOptionId')" v-if="modifedPortfolio.portfolioBuildOptionId != portfolio.portfolioBuildOptionId">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">시설유형</th>
								<td>
									<div class="input-group select-group">
										<select class="custom-select custom-select-sm" v-model="modifedPortfolio.portfolioEstablishmentOptionId">
											<option v-for="list in categoryList.establishment" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
										</select>
										<div class="input-group-append">
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioEstablishmentOptionId')" v-if="modifedPortfolio.portfolioEstablishmentOptionId != portfolio.portfolioEstablishmentOptionId">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">비용유형</th>
								<td>
									<div class="input-group select-group">
										<select class="custom-select custom-select-sm" v-model="modifedPortfolio.portfolioCostId">
											<option v-for="list in categoryList.cost" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
										</select>
										<div class="input-group-append">
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioCostId')" v-if="modifedPortfolio.portfolioCostId != portfolio.portfolioCostId">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">공사비용</th>
								<td>
									<div class="input-group">
										<input class="form-control" name="portfolioCost" type="text" placeholder="공사비용" v-model="modifedPortfolio.portfolioCost" @keyup.center="setPortfolioData('portfolioCost')">
										<div class="input-group-append">
											<span class="input-group-text">만원</span>
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioCost')" v-if="modifedPortfolio.portfolioCost != portfolio.portfolioCost">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">현장위치</th>
								<td>
									<div class="input-group">
										<input class="form-control" name="portfolioAddress" type="text" placeholder="현장위치" v-model="modifedPortfolio.portfolioAddress" @keyup.center="setPortfolioData('portfolioAddress')">
										<div class="input-group-append">
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioAddress')" v-if="modifedPortfolio.portfolioAddress != portfolio.portfolioAddress">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">대지면적</th>
								<td>
									<div class="input-group">
										<input class="form-control" name="portfolioSiteArea" type="text" placeholder="대지면적" v-model="modifedPortfolio.portfolioSiteArea" @keyup.center="setPortfolioData('portfolioSiteArea')">
										<div class="input-group-append">
											<span class="input-group-text">m<sup>2</sup></span>
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioSiteArea')" v-if="modifedPortfolio.portfolioSiteArea != portfolio.portfolioSiteArea">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">연면적</th>
								<td>
									<div class="input-group">
										<input class="form-control" name="portfolioFloorArea" type="text" placeholder="연면적" v-model="modifedPortfolio.portfolioFloorArea" @keyup.center="setPortfolioData('portfolioFloorArea')">
										<div class="input-group-append">
											<span class="input-group-text">m<sup>2</sup></span>
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioFloorArea')" v-if="modifedPortfolio.portfolioFloorArea != portfolio.portfolioFloorArea">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">건물규모</th>
								<td>
									<div class="input-group">
										<input class="form-control" name="portfolioScale" type="text" placeholder="건물규모" v-model="modifedPortfolio.portfolioScale" @keyup.enter="setPortfolioData('portfolioScale')">
										<div class="input-group-append">
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioScale')" v-if="modifedPortfolio.portfolioScale != portfolio.portfolioScale">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">구조</th>
								<td>
									<div class="input-group">
										<input class="form-control" name="portfolioFinishMaterial" type="text" placeholder="구조" v-model="modifedPortfolio.portfolioFinishMaterial" @keyup.enter="setPortfolioData('portfolioFinishMaterial')">
										<div class="input-group-append">
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioFinishMaterial')" v-if="modifedPortfolio.portfolioFinishMaterial != portfolio.portfolioFinishMaterial">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">주차대수</th>
								<td>
									<div class="input-group">
										<input class="form-control" name="portfolioParking" type="text" placeholder="주차대수" v-model="modifedPortfolio.portfolioParking" @keyup.enter="setPortfolioData('portfolioParking')">
										<div class="input-group-append">
											<span class="input-group-text">대</span>
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioParking')" v-if="modifedPortfolio.portfolioParking != portfolio.portfolioParking">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">최고높이</th>
								<td>
									<div class="input-group">
										<input class="form-control" name="portfolioMasHeight" type="text" placeholder="최고높이" v-model="modifedPortfolio.portfolioMasHeight" @keyup.enter="setPortfolioData('portfolioMasHeight')">
										<div class="input-group-append">
											<span class="input-group-text">m</span>
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioMasHeight')" v-if="modifedPortfolio.portfolioMasHeight != portfolio.portfolioMasHeight">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">파트너스</th>
								<td>
									<div class="input-group select-group">
										<model-select class="form-control" :options="partnersList" v-model="modifedPortfolio.portfolioPartnersId" placeholder="선택이염"></model-select>
										<div class="input-group-append">
											<button class="btn btn-success" type="button" id="button-addon2" @click="setPortfolioData('portfolioPartnersId')" v-if="modifedPortfolio.portfolioPartnersId != portfolio.portfolioPartnersId">
												<i class="fas fa-check"></i>
											</button>
										</div>
									</div>
								</td>
							</tr>
						</table>		      	  				
					</form>
				</div>
			</div>
		</div>
	</ContentWrapper>
</template>

<style scoped>
	/*포트폴리오 상세페이지*/

	.table th {padding:0; font-size:14px; font-weight:normal; text-align:left; vertical-align:middle; padding:0 0 5px 0;}
	.table td {padding:0; padding:0 0 5px 0;}
	.form-group {margin:0;}

	#PortfolioEdit {background:#fff;}
	#portfolioView {border-right:1px solid #dedede;}

	.portfolioImage {min-height:60vh; position: relative;}
	.portfolioImage .row {width:100%; margin:2% auto 0;}
	.portfolioImage .row .boxwrap {}
	.portfolioImage .row .boxwrap p {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#eee; font-size:24px; font-weight:bold; text-align:center;}

	.portfolioImage .col-sm-3 {padding-right:5px; padding-left:5px; margin-bottom:10px; position:relative;}
	.portfolioImage .col-sm-3 i {position:absolute; top:-8px; right:-8px; z-index:1; font-size:25px;}
	.portfolioImage .col-sm-3 p.btn {display:none; position:absolute; top:9px; left:15px; z-index:1; font-size:12px; transition:0.3s; transition-duration:0.3s;}
	.portfolioImage .col-sm-3:hover p.btn {display:block !important; transition:0.3s; transition-duration:0.3s;}
	.portfolioImage .col-sm-3:hover .imgbox {opacity:0.5; transition:0.3s; transition-duration:0.3s;}
	.portfolioImage .imgbox {width:100%; height:20vh; position:relative; overflow:hidden; padding:5px; border:1px solid #efefef;}
	.portfolioImage .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit: cover;}

	#portfolioView .portfolioMainImage {width:100%; height:470px; position:relative; overflow:hidden;}
	#portfolioView .portfolioMainImage img {width:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}

	.portfolioText h6 {font-size:14px;}
	.portfolioText .textarea button {width:100%; border-top-left-radius:0; border-top-right-radius:0;}

	#portfolioList .titlebox {margin-bottom:10px;}

	.custom-select-sm {padding-left:1rem;}
	.ui.fluid.dropdown[data-v-3a0c7bea] {width:unset !important;}
	.ui.selection.dropdown[data-v-3a0c7bea]:hover {width:unset !important;}
	.ui.search.selection.dropdown > input.search[data-v-3a0c7bea] {}
</style>

<script>
	import vue2Dropzone from 'vue2-dropzone'
	import {ModelSelect} from 'vue-search-select'
	import draggable from 'vuedraggable'

	export default {
		created() {
			this.portfolioId = this.$route.params.portfolioId;
			this.loadPortfolioData(this.portfolioId);
			this.loadCategoryList('build');
			this.loadCategoryList('establishment');
			this.loadCategoryList('cost');
			this.loadPartnersList();
		},
		components: {
			vueDropzone: vue2Dropzone,
			ModelSelect,
			draggable
		},
		watch : {
			'portfolioImageList'(){
				console.log(this.portfolioImageList)
			}
		},
		data() {
			return {
				categoryList : {
					build : [],
					establishment : [],
					cost : []
				},
				portfolioImageList : [],
				partnersList : [

				],
				portfolio : {

				},
				modifedPortfolio : {
					portfolioId: '',
					portfolioThumbnail: '',
					portfolioName: '',
					portfolioDescription: '',
					portfolioBuildOptionId: '',
					portfolioEstablishmentOptionId: '',
					portfolioCostId: '',
					portfolioCost: '',
					portfolioPartnersId: '',
					portfolioAddress: '',
					portfolioSiteArea: '',
					portfolioFloorArea: '',
					portfolioScale: '',
					portfolioFinishMaterial: '',
					portfolioParking: '',
					portfolioMasHeight: '',
					portfolioIsShow: '',
				},
				dropzoneOptions: {
					url: '/upload',
					autoProcessQueue: false,
					uploadMultiple: true,
					parallelUploads: 100,
					maxFiles: 100,
					dictDefaultMessage: '<em class="fa fa-upload text-muted"></em><br>Drop files here to upload', // default messages before first drop
					paramName: 'file', // The name that will be used to transfer the file
					maxFilesize: 2, // MB
					addRemoveLinks: true,
					accept: function(file, done) {
						if (file.name === 'justinbieber.jpg') {
								done('Naha, you dont. :)');
						} else {
								done();
						}
					}
				}
			}
		},
		methods : {
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
			loadPartnersList(){
				this.ajax.get(['/partners', 'all', 'list'].join('/'))
				.then(res => {
					res = res.data;
					const partnersList = [];
					if(res.code === 0){
						for(let i = 0, len = res.data.list.length; i < len; i++){
							partnersList.push({
								text : res.data.list[i].partnersName,
								value : res.data.list[i].partnersId
							})
						}
						this.partnersList = partnersList;
					} else {

					}
				})
			},
			loadPortfolioData(portfolioId) {
				this.loadPortfolioImage()
				this.ajax.get(['/portfolio', portfolioId, 'detail'].join('/'))
				.then(res => {
					res = res.data;
					this.portfolio = this.objClone(res.data);
					this.modifedPortfolio = this.objClone(res.data);
				})
			},
			loadPortfolioImage() {
				this.ajax.get(`/portfolio/${this.portfolioId}/image/list`)
				.then(res => {
					res = res.data;
					this.portfolioImageList = res.data.list;
				})
			},
			objClone(obj) {
				const result = {}

				for(let key in obj) {
					result[key] = obj[key];
				}

				return result;
			},
			setMainImage(imageId) {
				this.ajax.post(`/portfolio/${this.portfolioId}/image/main`, {
					id : imageId
				}).then(res => {
					res = res.data;
					if(res.code === 0) {
						this.loadPortfolioData(this.portfolioId);
					}else{
						alert("내용변경에 실패했습니다")
					}
				})
			},
			setPortfolioData(field) {
				this.ajax.post(`/portfolio/${this.portfolioId}/set/${field}`, {
					value : this.modifedPortfolio[field]
				}).then(res => {
					res = res.data;
					if(res.code === 0) {
						this.portfolio[field] = this.modifedPortfolio[field]
						// this.loadPortfolioData(this.portfolioId);
					}else{
						alert("내용변경에 실패했습니다")
					}
				})
			},
			addImage(file) {
				const formData = new FormData();

				formData.append('image', file);
				this.ajax({
					method : 'post',
					url : `/portfolio/${this.portfolioId}/image/upload`,
					data : formData,
					headers : {
						'Content-Type' : 'multipart/form-data'
					}
				}).then(res => {
					res = res.data;
					if(res.code === 0) {
						this.loadPortfolioData(this.portfolioId);
						// this.loadPartnersList(this.addPartnersData['categoryId']);
					} else {
						alert("파트너스추가에 실패했습니다")
					}
				})
			},
			deleteImage(imageId) {
				// `/portfolio/${this.portfolioId}/image/delete`
				// {id : imageId}
				if(confirm("선택한 이미지를 삭제하시겠습니까?\n해당 이미지가 삭제됩니다")) {
					this.ajax.post(`/portfolio/${this.portfolioId}/image/delete`, {
						id : imageId
					}).then(res => {
						res = res.data;
						if(res.code === 0){
							this.loadPortfolioImage();
						} else {
							alert("삭제에 실패했습니다");
						}
					})
				}
			},
			dropFile(e) {
				e.stopPropagation();
				e.preventDefault();
				const files = e.dataTransfer.files; // Array of all files

				for (var i=0, file; file=files[i]; i++) {
					this.addImage(file)
				}

				$('#dropzone').hide();
				return false;
			},
			dragOver(e) {
				e.stopPropagation();
				e.preventDefault();
				e.dataTransfer.dropEffect = 'copy';
				$('#dropzone').show();
			},
			dragleave(e) {
				$('#dropzone').hide();
			}
		}
	}
</script>