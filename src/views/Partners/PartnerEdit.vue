<template>
  <ContentWrapper id="PartnerEdit">
  	<div class="content-heading">
      <div>파트너스 관리</div>
  	</div>
  	<div class="container-fluid">
      <!-- START row-->
      <section id="partnerImage">
				<div class="container">
					<div class="companyImage">
						<div class="imgbox" @click="openImageSelector('partnersThumbnail')">
							<img :src="partners.partnersThumbnail" alt="파트너스회사이미지">
						</div>
						<input type="file" accept="image/*" id="partnersThumbnail" style="visibility: hidden;" @change="uploadImage('partnersThumbnail')">
					</div>

					<div class="partnerName row">
						<div class="col-md-6 companyintro">
							<div class="partnerLogo">
								<img :src="partners.partnersLogoImage" alt="회사로고이미지"  @click="openImageSelector('partnersLogoImage')">
								<input type="file" accept="image/*" id="partnersLogoImage" style="visibility: hidden;" @change="uploadImage('partnersLogoImage')">
							</div>
							<div class="txtbox">
								<div class="input-group">
								  <input class="form-control" name="companyName" id="companyName" type="text" placeholder="회사명" v-model="modifedPartners.partnersName" @keyup.enter="setPartnersData('partnersName')"/>		
								  <div class="input-group-append">
								    <button class="btn btn-success" type="button" id="button-addon2" @click="setPartnersData('partnersName')" v-if="modifedPartners.partnersName != partners.partnersName"><i class="fas fa-check"></i></button>
								  </div>
								</div>
								<div class="input-group">
								  <input class="form-control" name="ceoName" id="ceoName" type="text" placeholder="이름"  v-model="modifedPartners.partnersCeoName" keyup.enter="setPartnersData('partnersCeoName')"/>
								  <div class="input-group-append">
								    <button class="btn btn-success" type="button" id="button-addon2" @click="setPartnersData('partnersCeoName')" v-if="modifedPartners.partnersCeoName != partners.partnersCeoName"><i class="fas fa-check"></i></button>
								  </div>
								</div>	
								<div class="input-group">
								  <input class="form-control" name="ceoTitle" id="ceoTitle" type="text" placeholder="직함"  v-model="modifedPartners.partnersCeoTitle" keyup.enter="setPartnersData('partnersCeoTitle')"/>		
								  <div class="input-group-append">
								    <button class="btn btn-success" type="button" id="button-addon2" @click="setPartnersData('partnersCeoTitle')" v-if="modifedPartners.partnersCeoTitle != partners.partnersCeoTitle"><i class="fas fa-check"></i></button>
								  </div>
								</div>						
							</div>
						</div>
						<div class="col-md-6">
							<form>
								<table class="table table-borderless">
									<tr>
										<th scope="col">업무영역</th>
										<td>
											<div class="input-group">
											  <input class="form-control" name="businessTerritory" id="businessTerritory" type="text" placeholder="업무영역" v-model="modifedPartners.partnersBizType" keyup.enter="setPartnersData('businessTerritory')">
											  <div class="input-group-append">
											    <button class="btn btn-success" type="button" id="button-addon2" @click="setPartnersData('partnersBizType')" v-if="modifedPartners.partnersBizType != partners.partnersBizType"><i class="fas fa-check"></i></button>
											  </div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="col">시공영역</th>
										<td>
											<div class="input-group">
											  <input class="form-control" name="constructionArea" id="constructionArea" type="text" placeholder="시공영역" v-model="modifedPartners.partnersBizArea" keyup.enter="setPartnersData('partnersBizArea')">
											  <div class="input-group-append">
											    <button class="btn btn-success" type="button" id="button-addon2" @click="setPartnersData('partnersBizArea')" v-if="modifedPartners.partnersBizArea != partners.partnersBizArea"><i class="fas fa-check"></i></button>
											  </div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="col">주력시공</th>
										<td>
											<div class="input-group">
											  <input class="form-control" name="mainConstruction" id="mainConstruction" type="text" placeholder="주력시공" v-model="modifedPartners.partnersBizMain" keyup.enter="setPartnersData('partnersBizMain')">
											  <div class="input-group-append">
											    <button class="btn btn-success" type="button" id="button-addon2" @click="setPartnersData('partnersBizMain')" v-if="modifedPartners.partnersBizMain != partners.partnersBizMain"><i class="fas fa-check"></i></button>
											  </div>
											</div>									
										</td>
									</tr>
								</table>
							</form>
						</div>
					</div>
				</div>
			</section>

	  	<section id="partnerIntro" class="container">
				<div class="txtbox companyintro">
					<h6 class="blue">파트너스소개</h6>
				</div>
				<div class="row">
					<div class="col-12 col-md-3">
						<div class="imgbox">
							<img :src="partners.partnersCeoPhoto" alt="파트너스이미지"  @click="openImageSelector('partnersCeoPhoto')">
							<input type="file" accept="image/*" id="partnersCeoPhoto" style="visibility: hidden;" @change="uploadImage('partnersCeoPhoto')">
						</div>
					</div>
					<div class="col-12 col-md-9">
						<div class="txtbox userintro">
							<h6 class="ceoName">{{partners.partnersCeoName}}&nbsp;{{partners.partnersCeoTitle}}</h6>
							<p class="companyName">{{partners.partnersName}}</p>							
						</div>
						<div class="txtbox useractivity">
							<h6 class="blue">건축관련활동</h6>
							<table class="table table-borderless">
								<tbody>
									<tr>
										<td class="year">
											<input class="form-control" name="activityYear" id="activityYear" type="text" v-model="addCeoActivity.activityYear" placeholder="활동년도" />
										</td>
										<td class="txt">
											<div class="input-group">
											  <input class="form-control" name="activityContent" id="activityContent" type="text" v-model="addCeoActivity.activityTitle" placeholder="활동내용" />		
											  <div class="input-group-append">
											    <button class="btn btn-success" type="button" id="button-addon2" @click="addActivity('Ceo')"><i class="fas fa-plus"></i></button>
											  </div>
											</div>		
										</td>
									</tr>
									<tr v-for="activity in ceoActivityList">
										<td class="year"><p>{{activity.activityYear}}</p></td>
										<td class="txt d-flex">
											<p>{{activity.activityTitle}}</p>
											<i class="fas fa-times ml-auto" @click="deleteActivity(activity.activityId)"></i>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>

			<section id="partnerNews" class="container">
				<div class="d-flex">
					<h6 class="blue">파트너스뉴스</h6>
					<b-btn class="btn btn-dark btn-lg ml-auto" type="button" variant="primary" v-b-modal.addNewsLink>링크 추가하기<i class="fas fa-plus"></i></b-btn>
				</div>
				<div class="companynews row">
					<div class="col-md-4" v-for="list in newsList">
						<div class="boxwrap">
							<i class="fas fa-times-circle" @click="deleteNews(list.newsId)"></i>
							<a target="_blank" :href="list.newsUrl">
								<div class="imgbox"><img :src="list.newsImage" alt="뉴스이미지"></div>
								<div class="txtbox">
									<h5 class="title">{{list.newsTitle}}</h5>
									<p>
										<span class="date">{{list.newsPublishDate}}</span>
										<span>|</span>
										<span class="author">{{list.newsAuthorName}}</span>
									</p>
								</div>
							</a>
						</div>
					</div>
				</div>
			</section>

			<!-- Modals -->
			<b-modal id="addNewsLink" title="뉴스링크추가" @ok="addNews">
      	<form class="form-horizontal" method="get" action="/">
          <fieldset>
            <div class="form-group row">
              <label class="col-md-3 col-form-label">뉴스링크</label>
              <div class="col-md-9">
                <input class="form-control" type="text" placeholder="파트너스와 관련된 뉴스링크를 넣어주세요" v-model="news.url"/>
              </div>
            </div>
          </fieldset>
          <div class="newsInfo">
            <div class="row">
              <label class="col-md-3">뉴스이미지</label>
              <div class="col-md-9">
                <div class="imgbox"><img :src="news.image" alt="뉴스이미지"></div>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3">뉴스제목</label>
              <div class="col-md-9">
                <p>{{news.title}}</p>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3">보도날짜</label>
              <div class="col-md-9">
                <p>{{news.datetime}}</p>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3">작성자</label>
              <div class="col-md-9">
                <p>{{news.author}}</p>
              </div>
            </div>
          </div>
        </form>
      </b-modal>

			<section id="partnerActivity" class="container">
				<h6 class="blue">주요활동</h6>
				<table class="table table-borderless mainActivity">
					<tbody>
						<tr>
							<td class="year">
								<input class="form-control" name="activityYear" id="activityYear" v-model="addPartnersActivity.activityYear" type="text" placeholder="활동년도" />
							</td>
							<td class="txt">
								<div class="input-group">
								  <input class="form-control" name="activityContent" id="activityContent" v-model="addPartnersActivity.activityTitle" type="text" placeholder="활동내용" />		
								  <div class="input-group-append">
								    <button class="btn btn-success" type="button" id="button-addon2" @click="addActivity('Partners')"><i class="fas fa-plus"></i></button>
								  </div>
								</div>		
							</td>
						</tr>
						<tr v-for="activity in partnersActivityList">
							<td class="year"><p>{{activity.activityYear}}</p></td>
							<td class="txt d-flex">
								<p>{{activity.activityTitle}}</p>
								<i class="fas fa-times ml-auto" @click="deleteActivity(activity.activityId)"></i>
							</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section id="partnerGallery" class="container">
				<h6 class="blue">파트너스 포트폴리오</h6>
				<div class="row">
					<div class="col-6 col-md-3" v-for="portfolio in portfolioList">
						<router-link :to="'/portfolio/edit/' + portfolio.portfolioId">
							<div class="boxwrap">
								<div class="imgbox"><img :src="portfolio.portfolioThumbnail" alt="포트폴리오이미지"></div>
								<div class="txtbox">
									<div class="btnwrap d-flex">
										<p class="text-primary">#{{portfolio.portfolioBuildCategory.optionName}}</p>
										<p class="text-primary">#{{portfolio.portfolioEstablishmentCategory.optionName}}</p>
									</div>
									<h6 class="title">{{portfolio.portfolioName}}</h6>
								</div>
							</div>
						</router-link>
					</div>			
				</div>
			</section>
		</div>
  </ContentWrapper>
</template>

<style scoped>
	/*파트너스 상세페이지*/

	.table th {padding:0; text-align:center; vertical-align:middle;}
	.table td {padding:0;}
	.table td i.ml-auto {padding-right:10px;}
	.blue {color:#1e67c7 !important;}
	.row {margin:0;}

	#PartnerEdit p {margin-bottom:0;}
	#PartnerEdit .newsInfo .row {margin-bottom:8px;}
	#PartnerEdit .newsInfo .row:last-child {margin-bottom:0;}
	#PartnerEdit .newsInfo .imgbox {width:100%;}
	#PartnerEdit .newsInfo .imgbox img {width:100%;}

	#PartnerEdit h6 {font-size:18px; font-weight:bold; margin-bottom:5px;}
	#PartnerEdit .table {width:100%; font-size:15px;}

	#partnerImage .companyImage {margin-top:3%;}
	#partnerImage .companyImage .imgbox {height:300px; width:100%; overflow:hidden; position:relative;}
	#partnerImage .companyImage .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#partnerImage .partnerName {width:100%; padding:1.5% 0; border-bottom:1px solid #ccc;}
	#partnerImage .companyintro {padding:0 2%; overflow:hidden;}
	#partnerImage .companyintro .partnerLogo {float:left; width:100px; height:100px; background:#fff; border:1px solid #eee; border-radius:9999px; overflow:hidden; position:relative;}
	#partnerImage .companyintro .partnerLogo img {width:80%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}
	#partnerImage .companyintro .txtbox {float:left; width:calc(100% - 130px); margin-left:30px;}
	#partnerImage .companyintro .txtbox h5 {font-size:1.7rem; line-height:1.8;}
	#partnerImage .companyintro .txtbox p {font-size:1.1rem; color:#666;}
	#partnerImage .table th {}

	#partnerImage .table th {width:20%;}
	#partnerImage .table td {color:#555;}

	#partnerIntro {padding:1.5% 10px; border-bottom:1px solid #ccc;}
	#partnerIntro .row {padding-top:1%;}
	#partnerIntro .col-md-3 .imgbox {position:relative; height:280px; overflow:hidden;}
	#partnerIntro .col-md-3 .imgbox img {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:100%; height:100%; object-fit:cover;}

	#partnerIntro .companyintro p {font-size:15px;}
	#partnerIntro .userintro {margin-bottom:4%;}
	#partnerIntro .userintro h6 {margin-bottom:1%;}
	#partnerIntro .userintro h6 span {margin-left:10px; font-size:16px; font-weight:500; color:#666;}
	#partnerIntro .userintro p {font-size:15px;}
	#partnerIntro .useractivity h6 {margin-bottom:15px;}
	#partnerIntro .useractivity table {font-weight:300; color:#333;}
	#partnerIntro .useractivity table td.year {width:20%;}
	#partnerIntro .useractivity table td {padding-left:15px; padding-bottom: 5px}
	#partnerIntro .useractivity table tr:first-child td {padding-left:0; padding-bottom:10px;}

	#partnerNews {padding:1.5% 10px; border-bottom:1px solid #ccc;}
	#partnerNews .d-flex {margin:5px 0 15px;}
	#partnerNews .d-flex button {margin-top:-0.7rem;}
	#partnerNews .d-flex button i {margin-left:5px;}
	#partnerNews .boxwrap {border:1px solid #dedede; background:#fff; position:relative;}
	#partnerNews .boxwrap i.fa-times-circle {position:absolute; top:-15px; right:-15px; z-index:1; font-size:26px;}
	#partnerNews .imgbox {height:200px; overflow:hidden; position:relative;}
	#partnerNews .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#partnerNews .txtbox {height:100px; padding:3%; position:relative;}
	#partnerNews .txtbox h5 {font-size:17px;}
	#partnerNews .txtbox p {position:absolute; bottom:8%; left:3%; font-size:14px; color:#666;}

	#partnerActivity {padding:1.5% 10px; border-bottom:1px solid #ccc;}
	#partnerActivity h6 {margin-bottom:15px;}
	#partnerActivity .table tr td.year {width:15%;}
	#partnerActivity table td {padding-left:15px; padding-bottom:5px;}
	#partnerActivity table tr:first-child td {padding-left:0; padding-bottom:10px;}

	#partnerGallery {padding:1.5% 0 3%;}
	#partnerGallery h6.blue {padding:0 0 1.5% 10px;}
	#partnerGallery .boxwrap {border:1px solid #dedede; background:#fff;}
	#partnerGallery .imgbox {height:260px; overflow:hidden; position:relative;}
	#partnerGallery .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#partnerGallery .txtbox {padding:3% 5%;}
	#partnerGallery .btn {font-size:12px; border-radius:3px; padding:0.1rem 0.3rem;}
	#partnerGallery .title {padding-top:5%;}

	#partnerGallery .d-flex p {margin-right:5px;}
</style>

<script>
  export default {
  	created() {
  		this.partnersId = this.$route.params.partnersId;
  		this.loadPartnersData(this.partnersId)
  		this.loadActivityList();
  		this.loadNewsList();
  		this.loadPortfolioList(this.partnersId);
  	},
    components: {
    },
    watch : {
    	'news.url'(){
    		this.ajax.get('/partners/news/parse?url=' + this.news.url).then(res => {
    			res = res.data;
    			this.news.image = res.data.image;
    			this.news.title = res.data.title;
    			this.news.author = res.data.author;
    			this.news.datetime = res.data.datetime;
    		})
    	}
    },
    data() {
      return {
      	partnersId : '',
      	addNewsLink : "",
      	news : {
      		title : '',
      		url : '',
      		image : '',
      		author : '',
      		datetime : ''
      	},
      	newsList : [],
      	partners : {
      	},
      	modifedPartners : {
      		partnersBizArea : '',
					partnersBizMain : '',
					partnersBizType : '',
					partnersCeoDescription : '',
					partnersCeoName : '',
					partnersCeoPhoto : '',
					partnersCeoTitle : '',
					partnersDescription : '',
					partnersId : '',
					partnersIsShow : '',
					partnersLogoImage : '',
					partnersName : '',
					partnersThumbnail : ''
      	},
      	addCeoActivity : {
      		activityYear : ''
      		,activityTitle : ''
      	},
      	addPartnersActivity : {
      		activityYear : ''
      		,activityTitle : ''
      	},
      	ceoActivityList : [],
		partnersActivityList : [],
		portfolioList : []
      }
    },
    methods : {
    	addNews() {
    		this.ajax.post(['/partners', this.partnersId, 'news', 'add'].join('/') , {
    			url : this.news.url
    		}).then(res => {
    			res = res.data
    			if(res.code === 0){
    				this.loadNewsList();
    			}else{
    				alert('뉴스추가에 실패했습니다');
    			}
    		})
    	},
    	loadNewsList() {
    		this.ajax.get('/partners/' + this.partnersId + '/news').then(res => {
    			res = res.data
    			if(res.code === 0){
    				this.newsList = res.data.list;
    				console.log(res.data.list)
    			}else{
    				alert("뉴스목록을 불러오지 못했습니다");
    			}
    		})
    	},
    	deleteNews(newsId){
    		if(confirm("선택한 뉴스링크를 삭제하시겠습니까?\n해당하는 뉴스데이터가 삭제됩니다")) {
    			this.ajax.post('/partners/' + this.partnersId + '/news/delete', {
    				id : newsId
    			}).then (res => {
    				res = res.data;
    				if(res.code === 0){
    					this.loadNewsList();
    				} else {
    					alert("삭제에 실패했습니다");
    				}
    			})
    		}
    	},
    	loadPartnersData(partnersId) {
    		// /partners/:partnersId/detail
    		this.ajax.get(['/partners', partnersId, 'detail'].join('/'))
    		.then(res => {
    			res = res.data;
    			this.partners = this.objClone(res.data);
    			this.modifedPartners = this.objClone(res.data);
    		})
    	},
    	objClone(obj) {
    		const result = {}

    		for(let key in obj) {
    			result[key] = obj[key];
    		}

    		return result;
    	},
    	setPartnersData(field) {
    		// /partners/:partnersId/set/:fieldName
    		this.ajax.post(['/partners', this.partnersId, 'set', field].join('/') ,{
    			value : this.modifedPartners[field]
    		}).then(res => {
    			res = res.data;
    			if(res.code === 0){
    				this.partners[field] = this.modifedPartners[field]
    				// this.loadPartnersData(this.partnersId);
    			} else {
    				alert("내용변경에 실패했습니다")
    			}
    		})

    	},
    	openImageSelector(id) {
    		const input = document.getElementById(id);
    		if(typeof input.click === 'function') {
    			input.click();
    		}
    	},
    	uploadImage(id) {
    		const input = document.getElementById(id);
    		
    		if(input.files.length > 0) {
    			const formData = new FormData();
    			formData.append('image', input.files[0]);

    			this.ajax({
    				method : 'post',
	    			url : ['/partners', this.partnersId, 'upload', id].join('/'),
	    			data : formData,
	    			headers : {
	    				'Content-Type' : 'multipart/form-data'
	    			}
	    		}).then(res => {
	    			res = res.data;
	    			if(res.code === 0) {
	    				this.loadPartnersData(this.partnersId);
	    			} else {
	    				alert("이미지 업로드가 되지 않았습니다")
	    			}
	    		})
    		}
    	},
    	addActivity(type){
    		const data = {
    			activityYear : this['add' + type + 'Activity'].activityYear,
    			activityTitle : this['add' + type + 'Activity'].activityTitle,
    			activityType : type
    		}

    		this['add' + type + 'Activity'].activityYear = '';
    		this['add' + type + 'Activity'].activityTitle = '';

    		this.ajax.post(['/partners', this.partnersId, 'activity', 'add'].join('/'), data)
    		.then(res => {
    			res = res.data;
    			if(res.code === 0) {
    				this.loadActivityList();
    			} else {
    				alert("활동내역을 추가하지 못했습니다")
    			}
    		})
    	},
    	loadActivityList() {
    		this.ajax.get(['/partners', this.partnersId, 'activity'].join('/'))
    		.then(res => {
    			res = res.data;
    			if(res.code === 0) {
    				const ceoActivityList = [];
						const partnersActivityList = [];

    				for(let i = 0, len = res.data.list.length; i < len; i++) {
    					const activityItem = res.data.list[i];
    					if(activityItem.activityType === 'Ceo') {
    						ceoActivityList.push(activityItem);
    					} else {
    						partnersActivityList.push(activityItem);
    					}
    				}

    				this.ceoActivityList = ceoActivityList;
    				this.partnersActivityList = partnersActivityList;
    			} else {
    				alert("활동내역을 불러오지 못했습니다")
    			}
    		})
    	},
    	deleteActivity(id) {
	    	if(confirm("이 활동내역을 삭제하시겠습니까?")) {
	    		this.ajax.post(['/partners', this.partnersId, 'activity', 'delete'].join('/'), {
	    			id : id
	    		}).then(res => {
	    			res = res.data;
	    			if(res.code === 0) {
	    				this.loadActivityList();
	    			} else {
	    				alert("활동내역이 삭제되지 않았습니다")
	    			}
	    		})
	    	}
    	},
    	loadPortfolioList(partnersId) {
    		this.ajax.get('/portfolio/list', {
    			params : {
    				portfolioBuildOptionId : '',
            portfolioEstablishmentOptionId : '',
            portfolioPartnersId :this.partnersId,
    			}
    		}).then(res => {
    			res = res.data;
    			this.portfolioList = res.data.list;
    			console.log(this.portfolioList)
    		})
    	}
    }
  }
</script>