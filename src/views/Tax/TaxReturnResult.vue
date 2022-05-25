<template>
<ContentWrapper id="reqInfoPage">
  <div class="content-heading">
    <div>소득신고관리</div>
  </div>

  <div id="list-table">
    <h4 class="page-header" style="position: relative; height: 35px;">총 {{totalCount}}건
      <div class="input-group col-4 float-right">
        <select class="custom-select" v-model="searchCond.searchVal" @change="searchReqInfoResultList">
          <option value="" selected>전체</option>
          <option value="Y">전송</option>
          <option value="N">미전송</option>
        </select>
      </div>
    </h4>
    <div class="list">
      <div class="table-responsive">
        <table id="reqInfoTable" class="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="10%">이름</th>
              <th width="10%">휴대폰</th>
              <th width="10%">주택수</th>
              <th width="12%">보증금 합계(만원)</th>
              <th width="12%">월세 합계(만원)</th>
              <th width="">기타소득</th>
              <th width="10%">배우자</th>
              <th width="20%">상태</th>
              <!-- <th width="5%">신고일</th>
              <th width="6%">신고유형</th>
              <th width="6%">납부세액</th>
              <th width="6%">수임료</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="reqInfo in reqInfoList" :key="reqInfoList.id">
              <td>{{reqInfo.name}}</td>
              <td>{{reqInfo.phone}}</td>
              <td>{{reqInfo.house_nm}}</td>
              <td>{{reqInfo.deposit_sum}}</td>
              <td>{{reqInfo.monthly_sum}}</td>
              <td>{{reqInfo.etc_income_str}}</td>
              <td>{{reqInfo.spouse}}</td>
              <td v-if="!reqInfo.result_datetime">
								<b-btn type="button" class="btn btn-green" v-if="reqInfo.result === 'N'" @click="openResultModal(reqInfo.id,'I')">작성</b-btn>
								<b-btn type="button" class="btn btn-green" v-else-if="reqInfo.result === 'I'"  @click="openResultModal(reqInfo.id,'U')">수정</b-btn>
								<b-btn type="button" class="btn btn-warning" variant="primary" v-if="reqInfo.result === 'I'" @click="sendResult(reqInfo.id)">전송</b-btn>
							</td>
              <td v-else>{{format(reqInfo.result_datetime)}}</td>
              <!-- <td>{{reqInfo.return_m}}/{{reqInfo.return_d}}</td>
              <td>{{reqInfo.return_type_nm}}</td>
              <td>{{reqInfo.payment_tax_amt}}</td>
              <td>{{reqInfo.commission}}</td> -->
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

  <b-modal id="saveResultModal" size="lg" title="처리내용 작성" @ok="saveResult()" ref="modal">
    <form class="form-horizontal" name="returnResultForm">
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">신고일</label>
          <div class="col-md-2">
            <select id="result_m" class="form-control" v-model="resultInfo.return_m">
              <option value="">월</option>
              <option value="5">5월</option>
              <option value="6">6월</option>
            </select>
          </div>
          <div class="col-md-2">
            <select id="result_d" class="form-control" v-model="resultInfo.return_d">
              <option value="">일</option>
              <option v-for="idx in 31" v-bind:value="idx">{{idx}}일</option>
            </select>
          </div>
          <label class="col-md-2 col-form-label">신고유형</label>
          <div class="col-md-4">
            <select id="return_type" class="form-control" v-model="resultInfo.return_type">
              <option value="">선택</option>
              <option value="1">과세미달</option>
              <option value="2">단일소득</option>
              <option value="3">타소득합산</option>
              <option value="4">간편장부</option>
              <option value="5">복식장부</option>
            </select>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">납부세액</label>
          <div class="col-md-4">
            <input class="form-control" type="text" id="payment_tax_amt" v-model="resultInfo.payment_tax_amt" v-on:input="toCommaNumber2">
          </div>
          <label class="col-md-2 col-form-label">수임료</label>
          <div class="col-md-4">
            <input class="form-control" type="text" id="commission" v-model="resultInfo.commission" v-on:input="toCommaNumber2">
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group row">
          <label class="col-md-2 col-form-label">비고/특이사항</label>
          <div class="col-md-10">
            <textarea class="form-control" rows="7" style="width:100%" v-model="resultInfo.memo" maxlength="110"></textarea>
            <div class="float-right"><small>100자내외로입력 ({{curLength}})</small></div>
          </div>
        </div>
      </fieldset>
    </form>
  </b-modal>
</ContentWrapper>
</template>

<script>
export default {
  watch:{
    'resultInfo.memo'(val){
      if(val){
        this.curLength = val.length
      }
    }
  },
  created() {
    this.searchReqInfoResultList();
  },
  methods: {
    searchReqInfoResultList() {
      this.getReqInfoResultTotalCount();
      this.getReqInfoResultList();
      window.scrollTo(0, top);
    },
    getReqInfoResultTotalCount(){
      this.ajax.get('/tax/resultInfo/list/cnt', {
        params: this.searchCond
      }).then(res => {
        this.totalCount = res.data.data;
      })
    },
    getReqInfoResultList() {
      this.ajax.get('/tax/resultInfo/list', {
        params: this.searchCond
      }).then(res => {
        this.reqInfoList = res.data.data;
        var top = document.getElementById('reqInfoPage').offsetTop; //Getting Y of target element
      })
    },
    openResultModal(id, gbn){
      this.resultInfo = {
        return_m:'',
        return_d:'',
        return_type:'',
        memo:''
      }
      if(gbn === 'I'){
        this.resultInfo.req_id = id;
        this.$root.$emit('bv::show::modal','saveResultModal');
      }else{
        this.ajax.get('/tax/resultInfo', {
          params : {
            id : id
          }
        }).then(res => {
          if(res.data.code === 0 && res.data.data){
            this.resultInfo = res.data.data
            this.$root.$emit('bv::show::modal','saveResultModal')
          }else{
            alert("저장정보 조회 실패")
            this.resultInfo.req_id = id;
            this.$root.$emit('bv::show::modal','saveResultModal');
          }
        });
      }
    },
    saveResult(id){
      delete this.resultInfo.return_type_nm
      this.ajax.post('/tax/resultInfo', this.resultInfo).then(res => {
        if(res.data.code === 0){
          this.$root.$emit('bv::hide::modal','saveResultModal')
          // location.reload()
          this.searchReqInfoResultList();
        }else{
          alert("저장정보 조회 실패")
        }
      });
    },
    sendResult(id){
      this.ajax.post('/tax/resultInfo', {
        req_id : id,
        confirm_datetime : 'Y'
      }).then(res => {
        if(res.data.code === 0){
          this.$root.$emit('bv::hide::modal','saveResultModal')
          // location.reload()
          this.searchReqInfoResultList();

        }else{
          alert("저장정보 조회 실패")
        }
      });
    },
    goPage(page) {
      this.searchCond.page = page;
      this.getReqInfoResultList();
    },
    format(date) {
      const d = new Date(date);
      return d.toCondString()
    },
    toCommaNumber2 : function(e){
      var value = ''
      if(e.target.value){
        value = e.target.value.replace(/[^0-9]/g, '');
      }
      if(value !== ''){
        var num = new Number(value)
        var chgNum = num.toLocaleString()
        value = chgNum;
      }
      this.resultInfo[e.target.id] = value
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
      searchCond: {
        page: 1,
        taxAcntId : this.$route.params.taxpartnerId,
        searchType: 'result',
        searchVal: ''
      },
      resultInfo : {
        return_m:'',
        return_d:'',
        return_type:'',
        memo:''
      },
      curLength:0
    }
  }
}
</script>
