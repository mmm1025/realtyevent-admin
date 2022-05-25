<template>
  <div class="portfolio">
    <h4 class="page-header d-flex">
      <span>시공사례 관리</span>
      <div class="btn-box ml-auto"></div>
    </h4>
    <div class="row" style="">
      <select class="col-sm-5 custom-select" multiple v-model="selectedProjectPortfolioIds">
        <option v-for="list in projectPortfolioList" :value="list.portfolio_id">{{list.name}}</option>
      </select>
      <div class="col-sm-2" style="text-align:center;">
        <div style="margin-top:100%;">
          <input type="button" value="<< 추가" @click="addProjectPortfolio();"/><br/>
          <input type="button" value=">> 삭제" @click="delProjectPortfolio();"/><br/>
        </div>
      </div>
      <div class="col-sm-5">
        <select class="custom-select" v-model="selectedPartnersId">
          <option value="all">파트너를 선택하세요.</option>
          <option v-for="list in partnersList" :value="list.partnersId">{{list.partnersName}}</option>
        </select>
        <select class="custom-select" v-model="selectedCategory.build">
          <option value="all">공사유형을 선택하세요.</option>
          <option v-for="list in categoryList.build" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
        </select>
        <select class="custom-select" v-model="selectedCategory.establishment">
          <option value="all">시설유형을 선택하세요.</option>
          <option v-for="list in categoryList.establishment" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
        </select>
        <select class="custom-select" v-model="selectedCategory.cost">
          <option value="all">공사비용을 선택하세요.</option>
          <option v-for="list in categoryList.cost" :value="list.categoryOptionId">{{list.categoryOptionName}}</option>
        </select>
        <!-- <multi-list-select :list="portfolioList" :selected-items="selectedPortfolio" option-value="portfolioId" option-text="portfolioName" placeholder="포트폴리오 선택">
        </multi-list-select> -->
        <select class="custom-select" multiple v-model="selectedPortfolioIds" style="height:310px;">
          <option v-for="list in portfolioList" :value="list.id">{{list.name}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props : ['projectId'],
	created(){
    this.loadProjectPortfolioList();
    this.loadPartnersList();
    this.loadCategoryList('build');
    this.loadCategoryList('establishment');
    this.loadCategoryList('cost');
    this.loadPortfolioList();
	},
	mounted() {

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
    selectedPartnersId () {
      this.loadPortfolioList();
    }
	},
	data () {
		return {
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
      selectedPartnersId : 'all',
      selectedPortfolioIds : [],
      partnersList : [],
      portfolioList : [],
      projectPortfolioList : [],
      selectedProjectPortfolioIds : []
		}
	},
	methods: {
    loadProjectPortfolioList(){
      this.ajax.get('/project/portfolio/list', {
        params : {
          projectId : this.projectId
        }
      }).then(res => {
        res = res.data;
        this.projectPortfolioList = res.data.list;
      })
    },
    loadPartnersList() {
      this.ajax.get(['/partners', 'all', 'list'].join('/'))
      .then(res => {
        res = res.data;
        if (res.code === 0) {
          this.partnersList = res.data.list;
        }
      })
    },
    loadCategoryList(categoryType) {
      this.ajax.get(['/portfolio', 'category', categoryType, 'list'].join('/'))
      .then(res => {
        res = res.data;
        if(res.code === 0){
          this.categoryList[categoryType] = res.data.list;
        }else{
          alert("카테고리목록을 불러오는데 실패했습니다")
        }
      })
    },
    loadPortfolioList(){
      this.ajax.get('/project/portfolioList', {
        params : {
          projectId : this.projectId,
          portfolioBuildOptionId : this.selectedCategory.build,
          portfolioEstablishmentOptionId : this.selectedCategory.establishment,
          portfolioCostId : this.selectedCategory.cost,
          portfolioPartnersId :this.selectedPartnersId
        }
      }).then(res => {
        res = res.data;
        this.portfolioList = res.data.list;
      })
    },
    addProjectPortfolio(){
      let addArr = [];
      for(let i=0,len=this.selectedPortfolioIds.length; i<len; i++){
        addArr.push({
          project_id : this.projectId,
          portfolio_id : this.selectedPortfolioIds[i],
          order : this.projectPortfolioList.length + i
        });
      }
      this.ajax.post('/project/portfolio/add', addArr).then(res => {
        this.selectedPortfolioIds = [];
        this.loadPortfolioList();
        this.loadProjectPortfolioList();
      })
    },
    delProjectPortfolio(){
      let addArr = [];
      for(let i=0,len=this.selectedProjectPortfolioIds.length; i<len; i++){
        addArr.push({
          project_id : this.projectId,
          portfolio_id : this.selectedProjectPortfolioIds[i]
        });
      }
      this.ajax.post('/project/portfolio/remove', {
        params : addArr
      }).then(res => {
        this.selectedProjectPortfolioIds = [];
        this.loadPortfolioList();
        this.loadProjectPortfolioList();
      })
    }
	}
}
</script>

<style>
	#sliderListAdmin .list {}
	#Slider .page-header button {margin-top:-0.9rem;}

	#Slider .carousel-item {width:100%; height:480px; position:relative; overflow:hidden;}
	#Slider .carousel-item img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover; z-index: 1;}

	/*#Slider .card-header {text-align:right;}
	#Slider .card-header i {font-size:20px;}
	#Slider .card-body {width:100%; height:180px; overflow:hidden; position:relative;}*/
	#Slider .row {padding-top:2%;}
	#Slider .row .col-sm-2 {/*padding-right:10px; padding-left:10px; */position:relative;}
	#Slider .row .imgbox {width:100%; height:180px; overflow:hidden; position:relative;}
	#Slider .row .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover; z-index: 1;}
	#Slider .row i {font-size:24px; position:absolute; top:-8px; right:-2px; z-index:99;}
	#Slider .card-body .card-text {position:absolute; top:50%; right:10%; transform:translate(0%,-50%); z-index:100; text-align:right; color:#333;}
	#Slider .card-body .card-text h6 {font-size:18px;}
	#Slider .card-body .card-text h5 {font-size:30px; font-weight:bold;}
	#Slider .card-body .card-text .txt {font-size:14px; width:60%; margin-left:40%;}

	#sliderAddAdmin>div {width:100%; position:relative;}
	#sliderAddAdmin .background {width:100%; height:480px; position:relative;}
	#sliderAddAdmin .background button {position:absolute; top:10px; left:10px; z-index:1;}
	#sliderAddAdmin .background img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover; opacity:0.5;}
	#sliderAddAdmin .slideText {width:40%; position:absolute; top:50%; right:10%; transform:translate(0,-50%);}
	#sliderAddAdmin table td {padding:0.35rem;}
	#sliderAddAdmin button.btn-success {width:100%; font-size:18px;}
	#sliderAddAdmin input {text-align:right;}
</style>
