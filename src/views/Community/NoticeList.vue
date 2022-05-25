<template>
	<ContentWrapper id="NoticeList">
		<div class="content-heading">
			<div>공지사항 관리</div>
		</div>

		<div class="noticeListAdmin">
			<h4 class="page-header d-flex">
				<span>공지사항 목록 관리</span> 
				<router-link to="/notice/add" class="btn btn-dark ml-auto">글쓰기</router-link>
			</h4>
			<!-- START table-responsive-->
			<div class="table-responsive">
				<table class="table table-bordered" id="table-ext-2">
					<thead>
						<tr>
							<th>번호</th>
							<th>제목</th>
							<th>등록일</th>
							<!-- <th>display</th> -->
							<th>수정</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in list">
							<td>{{item.boardId}}</td>
							<td>{{item.boardTitle}}</td>
							<td>{{dateFormat(item.boardCreateDatetime)}}</td>
							<td>
								<router-link :to="`/notice/edit/${item.boardId}`" class="btn btn-outline-info btn-xs">수정하기</router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- END table-responsive-->
		</div>
				
	</ContentWrapper>
</template>

<style>
	#NoticeList label {margin-bottom:0;}
	#NoticeList .text-center {width:10%; position:relative;}
	#NoticeList label.switch {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}

	#NoticeList .page-header a {margin-top:-0.5rem;}

	#NoticeList table {background:#fff;}
	#NoticeList table th {background:#444; color:#fff; text-align:center;}
	#NoticeList table tr td {text-align:center;}
	#NoticeList table tr td:first-child {width:5%;}
	#NoticeList table tr td:nth-child(2) {width:60%; text-align:left;}
</style>

<script>
  export default {  		
  		created() {
  			this.loadData();
  		},
		data() {
			return {
				list : []
			}
		},
		methods : {
			loadData() {
				this.ajax.get('/board/notice/list').then(res => {
					res = res.data;

					if(res.code === 0) {
						this.list = res.data.list;
					}
				})
			},
			dateFormat(date) {
				const d = new Date(date);

				const y = d.getFullYear();
				let m = d.getMonth() + 1;
				if(m < 10) {
					m = '0' + m;
				}
				let D = d.getDate();

				if(D<10) {
					D = '0' + D;
				}

				return `${y}-${m}-${D}`;

			}
		}
  }
</script>