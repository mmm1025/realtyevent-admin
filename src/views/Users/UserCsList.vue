<template>
<ContentWrapper id="reqInfoPage">
  <div class="content-heading">
    <div>상담이력관리</div>
  </div>

  <!-- <div class="card card-default">
    <div class="card-footer">
      <div class="d-flex __web-inspector-hide-shortcut__">
        <div class="ml-auto">
          <div class="input-group float-right">
              <input type="text" class="form-control" placeholder="이름을 입력하세요." v-model="searchCond.searchVal" @keyup.enter="searchUserList">
            <div class="input-group-append">
              <b-btn type="button" class="btn btn-primary" variant="primary" v-on:click="searchUserList" >검색</b-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <div id="list-table">
    <div class="row">
      <div class="col-6">총 {{totalCount}}건</div>
      <div class="col-6 input-group">
        <input type="text" class="form-control" placeholder="이름을 입력하세요." v-model="searchCond.searchVal" @keyup.enter="searchUserList">
        <div class="input-group-append">
          <b-btn type="button" class="btn btn-primary" variant="primary" v-on:click="searchUserList" >검색</b-btn>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="table-responsive">
        <table id="csTable" class="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="20%">회원성명</th>
              <th width="20%">회원ID</th>
              <th width="20%">휴대폰번호</th>
              <th width="">작업</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userList" :key="user.id">
              <td>{{user.name}}</td>
              <td>{{user.login_id}}</td>
              <td>{{user.phone}}</td>
              <td class="text-center">
                <b-btn type="button" class="btn btn-green mr-1" @click="$router.history.push(`/csDetail/${user.id}`)">상담관리</b-btn>
                <b-btn type="button" class="btn btn-green" @click="$router.history.push(`/users/${user.id}`)">회원정보</b-btn>
              </td>
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
export default {
  created() {
    this.searchUserList();
  },
  data() {
      return {
      // 테이블&페이징{
      totalCount: 0,
      perPage: 50,
      page: 1,
      // }
      userList:[],
      searchCond: {
        page: 1,
        searchType: 'name',
        searchVal: ''
      }
    }
  },
  methods: {
    loadUserList(){
			this.ajax.get('/user/list2',{
        params:this.searchCond
      }).then((res) => {
				res = res.data;
				if(res.code === 0) {
					this.userList = res.data;
				} else {
					alert(res.msg);
				}
			})
    },
    searchUserList() {
      this.loadUserListCount();
      this.loadUserList();
    },
    loadUserListCount(){
      this.ajax.get('/user/list2/cnt',{
        params: this.searchCond
      }).then(res => {
        this.totalCount = res.data.data;
      })
    },
    goPage(page) {
      this.searchCond.page = page;
      this.searchUserList();
    }
  }
}
</script>
