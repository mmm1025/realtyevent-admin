<template>
<ContentWrapper>
  <div class="content-heading">
    <div>세무신청관리 > 내용상세</div>
  </div>

  <div id="detail-table">
    <h4 class="page-header" style="height:40px;">신청내용
      <router-link :to="{ path: '/tax/reqInfoMng'}"><input type="button" class="btn btn-primary float-right" variant="primary" value="목록"></router-link>
    </h4>
    <table class="table">
      <colgroup>
        <col width="20%">
        <col width="30%">
        <col width="20%">
        <col width="30%">
      </colgroup>
      <tbody>
        <tr>
          <th>이름</th>
          <td>{{reqInfo.name}} ({{reqInfo.user_login_id}})</td>
          <th>휴대폰</th>
          <td>{{reqInfo.phone}}</td>
        </tr>
        <tr>
          <th>보유주택수</th>
          <td colspan="3">{{reqInfo.house}}</td>
        </tr>
        <tr>
          <th>보증금1</th>
          <td>{{reqInfo.rental_deposit_1}}</td>
          <th>월세1</th>
          <td>{{reqInfo.rental_monthly_1}}</td>
        </tr>
        <tr>
          <th>보증금2</th>
          <td>{{reqInfo.rental_deposit_2}}</td>
          <th>월세2</th>
          <td>{{reqInfo.rental_monthly_2}}</td>
        </tr>
        <tr>
          <th>보증금합계</th>
          <td>{{reqInfo.rental_deposit_sum}}</td>
          <th>월세합계</th>
          <td>{{reqInfo.rental_monthly_sum}}</td>
        </tr>
        <tr>
          <th>기타소득</th>
          <td>{{reqInfo.etc_income_str}}</td>
          <th>배우자</th>
          <td>{{reqInfo.spouse}}</td>
        </tr>
        <tr>
          <th>세무신청일</th>
          <td>{{(new Date(reqInfo.datetime)).toCondString()}}</td>
          <th>결제일</th>
          <td>{{(new Date(reqInfo.pay_datetime)).toCondString()}}</td>
        </tr>
        <tr>
          <th>등급</th>
          <td>{{reqInfo.grade}}</td>
          <th>세무사</th>
          <td>{{reqInfo.tax_acnt_name}}</td>
        </tr>
        <tr>
          <th>결과</th>
          <td>{{reqInfo.result==='Y'?'전송':reqInfo.result==='I'?'작업중':'대기'}} ({{reqInfo.result}})</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="detail-table">
    <h4 class="page-header">세무사 처리내용</h4>
    <table class="table">
      <tbody>
        <tr>
          <th>세무사</th>
          <td>{{reqInfo.tax_acnt_name}}</td>
        </tr>
        <tr>
          <th>신고일</th>
          <td v-if="!resultInfo.return_m"></td>
          <td v-else>{{resultInfo.return_m}}월 {{resultInfo.return_d}}일</td>
        </tr>
        <tr>
          <th>신고유형</th>
          <td>{{resultInfo.return_type_nm}}</td>
        </tr>
        <tr>
          <th>납부세액</th>
          <td>{{resultInfo.payment_tax_amt}}</td>
        </tr>
        <tr>
          <th>수임료</th>
          <td>{{resultInfo.commission}}</td>
        </tr>
        <tr>
          <th>비고/특이사항</th>
          <td><pre style="font-size : 0.875rem">{{resultInfo.memo}}</pre></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="text-center mt-3">
    <router-link :to="{ path: `/tax/reqInfoModify/${this.$route.params.id}`}"><input type="button" class="btn btn-green" value="수정"></router-link>
  </div>

</ContentWrapper>
</template>

<script>
import 'loaders.css/loaders.css';

export default {
  created() {
    this.loadReqInfoDetail(this.$route.params.id);
    this.loadResultInfoDetail(this.$route.params.id);
    window.scrollTo(0, top);
  },
  data() {
    return {
      reqInfo:{},
      resultInfo:{
        return_m:''
      }
    }
  },
  methods: {
    loadReqInfoDetail(id) {
      this.ajax.get(`/tax/reqInfo?id=${id}`).then(res => {
        this.reqInfo = res.data.data
      })
    },
    loadResultInfoDetail(id) {
      this.ajax.get(`/tax/resultInfo?id=${id}`).then(res => {
        if(res.data.code === 0 && res.data.data){
          this.resultInfo = res.data.data
        }
      })
    }
  }
}
</script>
