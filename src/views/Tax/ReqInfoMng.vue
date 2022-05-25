<template>
<ContentWrapper id="reqInfoPage">
  <div class="content-heading">
    <div>세무신청관리</div>
  </div>

  <div class="card card-default">
    <div class="card-footer">
      <div class="d-flex __web-inspector-hide-shortcut__">
        <div>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">세무사</div>
            </div>
            <select class="custom-select" style="width:300px" v-model="match_tax_acnt_id">
              <option value="">세무사 선택</option>
              <!-- <option value="0">테스트</option> -->
              <option v-for="taxAcnt in taxAcntList" v-bind:value="taxAcnt.id">{{taxAcnt.name}}({{taxAcnt.office_name}})</option>
            </select>
            <div class="input-group-append">
              <b-btn type="button" class="btn btn-green" variant="primary" v-on:click="setTaxAccountant()">매칭</b-btn>
            </div>
          </div>
        </div>
        <div class="ml-auto">
          <div class="input-group float-right">
            <div class="input-group-prepend">
              <select class="custom-select" v-model="searchCond.searchType" @change="searchCond.searchVal=''">
                <option value="">검색조건</option>
                <option value="name">이름</option>
                <option value="reqDate">결제일</option>
                <option value="taxAcntName">매칭세무사</option>
                <option value="grade">등급</option>
                <option value="result">처리결과</option>
              </select>
            </div>
            <div v-if="searchCond.searchType === 'reqDate'">
              <input class="form-control" name="toDate" type="date" v-model="searchCond.searchVal">
            </div>
            <div v-else-if="searchCond.searchType === 'grade'">
              <select class="custom-select" v-model="searchCond.searchVal">
                <option value="">등급선택</option>
                <option value="X">미할당</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div v-else-if="searchCond.searchType === 'result'">
              <select class="custom-select" v-model="searchCond.searchVal">
                <option value="">결과선택</option>
                <option value="Y">전송(Y)</option>
                <option value="N">대기(N)</option>
                <option value="I">작업중(I)</option>
              </select>
            </div>
            <div v-else>
              <input type="text" class="form-control" :placeholder="searchCond.searchType===''?'검색조건을 선택하세요':''" v-model="searchCond.searchVal" @keyup.enter="searchReqInfoList">
            </div>
            <div class="input-group-append">
              <b-btn type="button" class="btn btn-primary" variant="primary" v-on:click="searchReqInfoList" >검색</b-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="list-table">
    <h4 class="page-header" style="position: relative; height: 35px;">총 {{totalCount}}건 <small style="color:red" v-if="match_tgt_ids.length > 0">{{match_tgt_ids.length}}개 체크</small>
      <b-btn type="button" class="btn btn-green float-right" v-b-modal.addTaxReqModal>추가</b-btn>
    </h4>
    <div class="list">
      <div class="table-responsive">
        <table id="reqInfoTable" class="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="2%">
                <div class="checkbox c-checkbox">
                  <label>
                    <input type="checkbox" name="allchk" v-model="allchk" />
                    <span class="fa fa-check"></span>
                  </label>
                </div>
              </th>
              <th width="4%">순번</th>
              <th width="7%">이름</th>
              <th width="7%">휴대폰</th>
              <th width="5%">주택수</th>
              <th width="10%">보증금 합계</th>
              <th width="8%">월세 합계</th>
              <th width="">기타소득</th>
              <th width="6%">배우자</th>
              <th width="10%">등급</th>
              <th width="8%">세무사</th>
              <th width="10%">매칭일시</th>
              <th width="4%">결과</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reqInfo in reqInfoList" :key="reqInfoList.id">
              <td>
                <div class="checkbox c-checkbox" v-if="!reqInfo.tax_acnt_id">
                  <label>
                    <input type="checkbox" name="chk" :value="reqInfo.id" v-model="match_tgt_ids" :disabled="!reqInfo.grade?true:false"/>
                    <span class="fa fa-check"></span>
                  </label>
                </div>
              </td>
              <td>{{reqInfo.seq}}</td>
              <!-- <td><router-link :to="{ path: `/tax/reqInfoView/${reqInfo.id}`}">{{reqInfo.name}}</router-link></td> -->
              <td><a :href="`/tax/reqInfoView/${reqInfo.id}`" target="_blank">{{reqInfo.name}}</a></td>
              <td>{{reqInfo.phone}}</td>
              <td>{{reqInfo.house}}</td>
              <td>{{reqInfo.deposit_sum}}</td>
              <td>{{reqInfo.monthly_sum}}</td>
              <td>{{reqInfo.etc_income_str}}</td>
              <td>{{reqInfo.spouse}}</td>
              <td>
                <div v-if="!reqInfo.grade">
                  <div class="input-group">
                    <select class="custom-select" :id="`gradeSelect_${reqInfo.id}`">
                      <option value="">선택</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                    <div class="input-group-append">
                      <b-btn type="button" class="btn btn-green" v-on:click="saveGrade(`${reqInfo.id}`)"><span class="fa fa-check"></span></b-btn>
                    </div>
                  </div>
                </div>
                <div v-else>{{reqInfo.grade}}</div>
              </td>
              <td>{{reqInfo.tax_acnt_name}}</td>
              <td v-if="reqInfo.match_datetime">{{new Date(reqInfo.match_datetime).toCondString()}}</td>
              <td v-else></td>
              <td>{{reqInfo.result}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagenation" v-if="totalCount > 0">
        <div class="overflow-auto">
          <b-pagination v-model="page" @input="goPage(page)" :total-rows="totalCount" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination>
        </div>
      </div>
    </div>
  </div>

  <b-modal id="addTaxReqModal" size="lg" title="세무신고 추가등록" @ok="addTaxReq" ref="modal">
    <form class="form-horizontal" name="reqInfoForm">
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">이름</label>
          <div class="col-md-4">
            <input class="form-control" type="text" v-model="addTaxReqInfo.name">
          </div>
          <label class="col-md-2 col-form-label">연락처</label>
          <div class="col-md-4">
            <input class="form-control" type="text" v-model="addTaxReqInfo.phone">
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">거주지</label>
          <div class="col-md-4">
            <select id="inputState1" class="form-control" v-model="firstArea">
              <option v-for="option,index in firstAreaList" v-bind:value="index">{{option}}</option>
            </select>
          </div>
          <div class="col-md-4">
            <select id="inputState2" class="form-control" v-model="secondArea">
              <option v-for="option,index in secondAreaList[firstArea]" v-bind:value="index">{{option}}</option>
            </select>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">거주지상세</label>
          <div class="col-md-10">
            <input class="form-control" type="text" name="address_detail" v-model="addTaxReqInfo.address_detail">
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">보유주택수</label>
          <div class="col-md-10">
            <label class="c-radio">
              <input type="radio" id="house-0" name="house" value="0" v-model="addTaxReqInfo.house" />
              <span class="fa fa-circle"></span>없음
            </label>
            <label class="c-radio">
              <input type="radio" id="house-1" name="house" value="1" v-model="addTaxReqInfo.house" />
              <span class="fa fa-circle"></span>1채
            </label>
            <label class="c-radio">
              <input type="radio" id="house-2" name="house" value="2" v-model="addTaxReqInfo.house" />
              <span class="fa fa-circle"></span>2채
            </label>
            <label class="c-radio">
              <input type="radio" id="house-3" name="house" value="3" v-model="addTaxReqInfo.house" />
              <span class="fa fa-circle"></span>3채 이상
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">임대소득현황</label>
          <div class="col-md-10">
            <div class="row">
              <label class="col-2 col-form-label">보증금1</label>
              <input class="form-control col-4" type="text" id="rental_deposit_1" v-model="addTaxReqInfo.rental_deposit_1" v-on:input="toCommaNumber2($event,'rental_deposit_1')">
              <label class="col-2 col-form-label">월세1</label>
              <input class="form-control col-4" type="text" id="rental_monthly_1" v-model="addTaxReqInfo.rental_monthly_1" v-on:input="toCommaNumber2($event,'rental_monthly_1')">
            </div>
            <div class="row">
              <label class="col-2 col-form-label">보증금2</label>
              <input class="form-control col-4" type="text" id="rental_deposit_2" v-model="addTaxReqInfo.rental_deposit_2" v-on:input="toCommaNumber2($event,'rental_deposit_2')">
              <label class="col-2 col-form-label">월세2</label>
              <input class="form-control col-4" type="text" id="rental_monthly_2" v-model="addTaxReqInfo.rental_monthly_2" v-on:input="toCommaNumber2($event,'rental_monthly_2')">
            </div>
            <div class="row">
              <label class="col-2 col-form-label">보증금합</label>
              <input class="form-control col-4" type="text" id="rental_deposit_sum" v-model="addTaxReqInfo.rental_deposit_sum" v-on:input="toCommaNumber2($event,'rental_deposit_sum')">
              <label class="col-2 col-form-label">월세합</label>
              <input class="form-control col-4" type="text" id="rental_monthly_sum" v-model="addTaxReqInfo.rental_monthly_sum" v-on:input="toCommaNumber2($event,'rental_monthly_sum')">
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">기타소득</label>
          <div class="col-md-10">
            <div class="c-checkbox">
              <label>
                <input type="checkbox" id="etc_income-0" name="etc_income" value="0" @change="incomeChk" v-model="addTaxReqInfo.etc_income"/>
                <span class="fa fa-check"></span>없음
              </label>
            </div>
            <label class="c-checkbox">
              <input type="checkbox" id="etc_income-1" name="etc_income" value="1" @change="incomeChk" v-model="addTaxReqInfo.etc_income"/>
              <span class="fa fa-check"></span>근로-급여소득
            </label>
            <label class="c-checkbox">
              <input type="checkbox" id="etc_income-2" name="etc_income" value="2" @change="incomeChk" v-model="addTaxReqInfo.etc_income"/>
              <span class="fa fa-check"></span>주택 외 부동산 임대소득
            </label>
            <label class="c-checkbox">
              <input type="checkbox" id="etc_income-3" name="etc_income" value="3" @change="incomeChk" v-model="addTaxReqInfo.etc_income"/>
              <span class="fa fa-check"></span>연금
            </label>
            <label class="c-checkbox">
              <input type="checkbox" id="etc_income-4" name="etc_income" value="4" @change="incomeChk" v-model="addTaxReqInfo.etc_income"/>
              <span class="fa fa-check"></span>이자소득
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">배우자유무</label>
          <div class="col-md-10">
            <label class="c-radio">
              <input type="radio" id="spouse-Y" name="spouse" value="Y" v-model="addTaxReqInfo.spouse" />
              <span class="fa fa-circle"></span>있음
            </label>
            <label class="c-radio">
              <input type="radio" id="spouse-N" name="spouse" value="N" v-model="addTaxReqInfo.spouse" />
              <span class="fa fa-circle"></span>없음
            </label>
          </div>
        </div>
      </fieldset>
    </form>
  </b-modal>
</ContentWrapper>
</template>

<script>
import datepicker from 'vuejs-datepicker';

export default {
  components: {
    datepicker
  },
  created() {
    this.searchReqInfoList();
    this.getTaxAcntList();
  },
  watch:{
    allchk : function(newVal){
      if(newVal){
        var list = document.querySelectorAll('input[name=chk]');
        for (var item of list) {
          if(item.disabled === false && item.checked === false){
            this.match_tgt_ids.push(item.value)
          }
        }
      }else{
        this.match_tgt_ids = [];
      }
    },
    'addTaxReqInfo.house'(newVal){
      const f = document.reqInfoForm.getElementsByTagName('input');
      for(let i=0; i<f.length; i++){
        const inputName = f[i].getAttribute('id') ? f[i].getAttribute('id') : '';
        if(newVal === '0'){
          if(inputName.indexOf('rental_deposit') === 0 || inputName.indexOf('rental_monthly') === 0){
            f[i].disabled = true;
          }
        }else if(newVal === '1' || newVal === '2'){
          if(inputName.indexOf('rental_deposit_sum') === 0 || inputName.indexOf('rental_monthly_sum') === 0){
            f[i].disabled = true;
          }else{
            f[i].disabled = false;
          }
        }else{
          if(inputName.indexOf('rental_deposit_1') === 0 || inputName.indexOf('rental_monthly_1') === 0
            || inputName.indexOf('rental_deposit_2') === 0 || inputName.indexOf('rental_monthly_2') === 0){
            f[i].disabled = true;
          }else{
            f[i].disabled = false;
          }
        }
      }
    }
  },
  methods: {
    getTaxAcntList() {
      this.ajax.get('/tax/taxAccountant/listall').then(res => {
        this.taxAcntList = res.data.data;
      })
    },
    searchReqInfoList() {
      this.getReqInfoTotalCount();
      this.getReqInfoList();
    },
    getReqInfoTotalCount(){
      this.ajax.get('/tax/reqInfo/list/cnt', {
        params: this.searchCond
      }).then(res => {
        this.totalCount = res.data.data;
      })
    },
    getReqInfoList() {
      this.ajax.get('/tax/reqInfo/list', {
        params: this.searchCond
      }).then(res => {
        this.reqInfoList = res.data.data;
        var top = document.getElementById('reqInfoPage').offsetTop; //Getting Y of target element
      })
    },
    setTaxAccountant(){
      if(this.match_tgt_ids.length < 1){
        alert("매칭대상을 선택하세요.")
        return;
      }

      if(!this.match_tax_acnt_id){
        alert("매칭할 세무사를 선택하세요.")
        return;
      }

      const acntId = this.match_tax_acnt_id;
      const acntName = this.taxAcntList.filter(function(obj, idx){
        return obj.id == acntId
      })[0].name;

      if(confirm(`${this.match_tgt_ids.length}건을 매칭합니다. 계속하시겠습니까?`)){
        this.ajax.post('/tax/reqInfo/matching', {
          ids : this.match_tgt_ids,
          tax_acnt_id : this.match_tax_acnt_id,
          tax_acnt_name : acntName,
          match_datetime : new Date()
        }).then(res => {
          if(res.data.code === 0){
            location.reload()
          }
        })
      }
    },
    saveGrade(id){
      const gradeVal = document.getElementById(`gradeSelect_${id}`).value;
      if(gradeVal === ''){
        alert('등급을 선택하세요.');
        return;
      }

      this.ajax.post('/tax/reqInfo/modify', {
        id : id,
        grade : gradeVal
      }).then(res => {
        if(res.data.code === 0){
          this.reqInfoList.filter(function(obj, idx){
            // console.log(obj.id, id, obj.id == id)
            return obj.id == id
          })[0].grade = gradeVal;
        }
      })
    },
    addTaxReq(bvModalEvt){
      bvModalEvt.preventDefault();

      this.addTaxReqInfo.address1 = this.firstAreaList[this.firstArea]
      this.addTaxReqInfo.address2 = this.secondAreaList[this.firstArea][this.secondArea]

      if(!this.addTaxReqInfo.address_detail){
        alert("거주지 상세를 입력해주세요.");
        return false;
      }
      if(!this.addTaxReqInfo.house){
        alert("보유 주택 수를 선택해주세요.");
        return false;
      }
      if(this.addTaxReqInfo.house === '0'){
        this.addTaxReqInfo.rental_deposit_1 = null;
        this.addTaxReqInfo.rental_monthly_1 = null;
        this.addTaxReqInfo.rental_deposit_2 = null;
        this.addTaxReqInfo.rental_monthly_2 = null;
        this.addTaxReqInfo.rental_deposit_sum = null;
        this.addTaxReqInfo.rental_monthly_sum = null;
      }else{
        if(this.addTaxReqInfo.house === '3'){
          this.addTaxReqInfo.rental_deposit_1 = null;
          this.addTaxReqInfo.rental_monthly_1 = null;
          this.addTaxReqInfo.rental_deposit_2 = null;
          this.addTaxReqInfo.rental_monthly_2 = null;
          if(!this.addTaxReqInfo.rental_deposit_sum || !this.addTaxReqInfo.rental_monthly_sum){
            alert("임대 소득 합계를 입력해주세요.");
            return false;
          }
        }else{
          this.addTaxReqInfo.rental_deposit_sum = null;
          this.addTaxReqInfo.rental_monthly_sum = null;
          if(!this.addTaxReqInfo.rental_deposit_1 || !this.addTaxReqInfo.rental_monthly_1){
            alert("임대 소득 현황을 입력해주세요.");
            return false;
          }
        }
      }

      if(!this.addTaxReqInfo.spouse){
        alert("배우자 유무를 선택해주세요.");
        return false;
      }

      if(!this.addTaxReqInfo.id){
        this.ajax.put('/tax/reqInfo', this.addTaxReqInfo).then(res => {
          if (res.data.code === 0) {
            alert('등록되었습니다.');
            this.$root.$emit('bv::hide::modal','addTaxReqModal')
            this.searchReqInfoList();
          }
        })
      }
    },
    goPage(page) {
      this.searchCond.page = page;
      this.allchk = false
      this.getReqInfoList();
      window.scrollTo(0, top);
    },
    format(date) {
      const d = new Date(date);
      return d.toCondString(true)
    },
    toCommaNumber2 : function(e, key){
      var value = ''
      if(e.target.value){
        value = e.target.value.replace(/[^0-9]/g, '');
      }
      if(value !== ''){
        var num = new Number(value)
        var chgNum = num.toLocaleString()
        value = chgNum;
      }
      this.addTaxReqInfo[key] = value
    },
    incomeChk(e){
      const incomeChk = e.target.value
      const checked = e.target.checked
      if(incomeChk === '0' && checked){
        this.addTaxReqInfo.etc_income = ['0']
      }else{
        var index = this.addTaxReqInfo.etc_income.indexOf('0');
        if (index !== -1) this.addTaxReqInfo.etc_income.splice(index, 1);
      }
    }
  },
  data() {
    return {
      // 테이블&페이징{
      totalCount: 0,
      perPage: 50,
      page: 1,
      // }
      reqInfoList:[],
      taxAcntList: [],
      match_tax_acnt_id: '',
      match_tgt_ids:[],
      searchCond: {
        page: 1,
        searchType: '',
        searchVal: ''
      },
      allchk : false,
      addTaxReqInfo:{
        etc_income:[]
      },
      firstArea : 0,
			secondArea : 0,
			firstAreaList : ["시/도 선택","서울특별시","인천광역시","대전광역시","광주광역시","대구광역시","세종특별자치시","울산광역시","부산광역시","경기도","강원도","충청북도","충청남도","전라북도","전라남도","경상북도","경상남도","제주도"],
			secondAreaList : [
				['-']
				,["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"]
				,["계양구","미추홀구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"]
				,["대덕구","동구","서구","유성구","중구"]
				,["광산구","남구","동구",	  "북구","서구"]
				,["남구","달서구","동구","북구","서구","수성구","중구","달성군"]
				,["-"]
				,["남구","동구","북구","중구","울주군"]
				,["강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"]
				,["고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군"]
				,["강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"]
				,["제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"]
				,["계룡시","공주시","논산시","보령시","서산시","아산시","천안시","금산군","당진군","부여군","서천군","예산군","청양군","태안군","홍성군"]
				,["군산시","김제시","남원시","익산시","전주시","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군"]
				,["광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"]
				,["경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"]
				,["거제시","김해시","마산시","밀양시","사천시","양산시","진주시","진해시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군"]
				,["서귀포시","제주시","남제주군","북제주군"]
			],
    }
  }
}
</script>
