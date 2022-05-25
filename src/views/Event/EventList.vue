<template>
	<ContentWrapper id="RequestList">
		<div class="content-heading">
			<div>청년주택 개발지원</div>
		</div>

		<div id="consultList">
			<h4 class="page-header">신청목록</h4>
			<div class="list">
				<b-table @row-clicked="rowClick" responsive :items="list" :fields="fieldsSortable"></b-table>
			</div>
		</div>
	</ContentWrapper>
</template>

<style>
	/* 견적신청 전체페이지 */
	#RequestList .list {width:100%; background:#fff;}
	#RequestList .title {background:#444; color:#fff; padding:15px; text-align:center;}
	#RequestList .title:before {right:2em !important;}
	#RequestList .title:after {right:1.35em !important;}
	#RequestList .text {padding:15px; text-align:center; cursor:pointer;}
	.b-table {margin-bottom:0 !important;}
</style>

<script>
	export default {
		created(){
			this.loadEvent();
		},
		data() {
			return {
				buildingType : {},
				buildingMethod : {},
				cost : {},
				fieldsSortable: {
					name: {
						key : 'name',
						label: '이름',
						sortable: true,
						tdClass : "text",
						thClass : "title"
					},
					phone: {
						key : 'phone',
						label: '휴대폰번호',
						sortable: true,
						tdClass : "text",
						thClass : "title"
					},
					datetime: {
						key: 'datetime',
						label : '신청 일시',
						sortable : true,
						tdClass : "text",
						thClass : "title"
					}
				},
				list: [],
			}
		},
		methods : {
			rowClick(record, index) {
				this.$router.history.push(`/event/${record.id}`)
			},
			loadEvent(){
				this.ajax.get('/event/list').then((res) => {
					res = res.data;

					if(res.code === 0) {
						this.list = res.list;

						for(let i = 0, len = this.list.length; i < len; i++) {
							this.list[i].datetime = new Date(this.list[i].datetime).toFormatString();
						}
					}
				})
			},
			statusToLabel(status){
				return {
					'WAIT' : '접수',
					'ING' : '처리중',
					'COMPLETE' : '완료',
				}[status]
			}
		}
	}
</script>