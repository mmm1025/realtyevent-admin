<template>
<ContentWrapper id="memberPage">
  <div class="content-heading">
    <div>세무회원관리 (4월13일이후 가입자 기준입니다.)</div>
  </div>

  <div id="list-table">
    <div class="row">
      <div class="col-6">총 {{totalCount}}건</div>
      <div class="col-2" style="text-align:right;">
        <a class="btn btn-dark mr-auto" :href="`${this.$root.$data.baseURL}/tax/member/exceldown`" type="button" download="" v-if="adminType==='ADMIN'">다운로드</a>
      </div>
      <div class="col-4 input-group">
        <input type="text" class="form-control" placeholder="이름을 입력하세요." v-model="searchCond.searchVal" @keyup.enter="searchMemberList">
        <div class="input-group-append">
          <b-btn type="button" class="btn btn-primary" variant="primary" v-on:click="searchMemberList" >검색</b-btn>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="table-responsive">
        <table id="memberTable" class="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="7%">성명</th>
              <th width="10%">주소1</th>
              <th width="10%">주소2</th>
              <th width="10%">휴대폰</th>
              <th width="14%">가입일자</th>
              <th width="10%">가입경로</th>
              <th width="7%">마케팅</th>
              <th width="7%">신청서</th>
              <th width="8%">결제상태</th>
              <th width="8%">결제수단</th>
              <th width=""></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in memberList" :key="memberList.id">
              <td>{{member.name}}</td>
              <td>{{member.address1}}</td>
              <td>{{member.address2}}</td>
              <td>{{member.phone}}</td>
              <td>{{new Date(member.create_datetime).toCondString()}}</td>
              <td>{{member.join_path}}</td>
              <td>{{member.marketing}}</td>
              <td>{{member.request}}</td>
              <td>{{member.status_nm}}</td>
              <td>{{member.method_nm}}</td>
              <td><b-btn type="button" class="btn btn-green mr-1" @click="$router.history.push(`/csDetail/${member.id}`)">상담</b-btn></td>
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

</ContentWrapper>
</template>

<script>
import datepicker from 'vuejs-datepicker';

export default {
  components: {
    datepicker
  },
  created() {
    this.searchMemberList();
    this.getAdminType();
  },
  methods: {
    getMemberList() {
      this.ajax.get('/tax/member/list', {
        params : this.searchCond
      }).then(res => {
        this.memberList = res.data.data;
      })
    },
    getMemberTotalCount(){
      this.ajax.get('/tax/member/list/cnt', {
        params: this.searchCond
      }).then(res => {
        this.totalCount = res.data.data;
      })
    },
    searchMemberList() {
      this.getMemberTotalCount();
      this.getMemberList();
    },
    goPage(page) {
      this.searchCond.page = page;
      this.searchMemberList();
      window.scrollTo(0, top);
    },
    getAdminType(){
      this.ajax.get('/account').then(res => {
        this.adminType = res.data.data.type;
      })
    }
  },
  data() {
    return {
      adminType:'',
      totalCount: 0,
      page:1,
      perPage:50,
      memberList:[],
      searchCond: {
        page: 1,
        searchVal: ''
      }
    }
  }
}
</script>
