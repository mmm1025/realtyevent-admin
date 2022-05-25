<template>
	<ContentWrapper id="EventList">
		<div class="content-heading">
			<div>이벤트 관리</div>
		</div>

		<div class="eventListAdmin">
			<h4 class="page-header d-flex">
				<span>이벤트 목록 관리</span> 
				<router-link to="/event/add" class="btn btn-dark ml-auto">글쓰기</router-link>
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
							<!-- <td class="text-center">
								<label class="switch">
									<input type="checkbox" />
									<span></span>
								</label>
							</td> -->
							<td>
								<router-link :to="`/event/edit/${item.boardId}`" class="btn btn-outline-info btn-xs">수정하기</router-link>
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
	#EventList label {margin-bottom:0;}
	#EventList .text-center {width:10%; position:relative;}
	#EventList label.switch {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}

	#EventList .page-header a {margin-top:-0.5rem;}

	#EventList table {background:#fff;}
	#EventList table th {background:#444; color:#fff; text-align:center;}
	#EventList table tr td {text-align:center;}
	#EventList table tr td:first-child {width:5%;}
	#EventList table tr td:nth-child(2) {width:60%; text-align:left;}
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
			this.ajax.get('/board/event/list').then(res => {
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