<template>
<ContentWrapper>
  <div class="content-heading">
    <div>상담이력 조회/등록</div>
  </div>

  <div class="input-group">
    <textarea class="form-control" rows="3" maxlength="110" v-model="csContent"></textarea>
    <div class="input-group-append">
      <b-btn type="button" class="btn btn-green" variant="primary" v-on:click="insertCs()">저장</b-btn>
    </div>
  </div>

  <div id="list-table">
    <div class="list">
      <div class="table-responsive">
        <table id="reqInfoTable" class="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="15%">등록일시</th>
              <th>상담내용</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cs in csList" :key="cs.seq">
              <td>{{new Date(cs.create_datetime).toCondString()}}</td>
              <td><pre>{{cs.content}}</pre></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</ContentWrapper>
</template>

<script>
import 'loaders.css/loaders.css';

export default {
  created() {
    this.loadCsList(this.$route.params.userId);
  },
  data() {
    return {
      userId:this.$route.params.userId,
      csList:[],
      csContent:''
    }
  },
  methods: {
    loadCsList(id) {
      this.ajax.get('/userCs/list', {
        params : {
          userId : id
        }
      }).then(res => {
        res = res.data;
        this.csList = res.data;
      });
    },
    insertCs(){
      if(!this.csContent){
         alert("내용을 입력하세요.");
         return;
      }
      this.ajax.put('/userCs/reg', {
        userId : this.userId,
        content : this.csContent
      }).then(res => {
        if(res.data.code === 0){
          location.reload()
        }
      });
    }
  }
}
</script>
