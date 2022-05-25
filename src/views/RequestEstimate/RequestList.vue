<template>
	<ContentWrapper id="RequestList">
		<div class="content-heading">
			<div>견적상담 관리</div>
		</div>

		<div id="consultList">
			<h4 class="page-header">견적신청목록</h4>
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
			this.loadOption().then(() => {
				this.loadRequest();
			})
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
					buildingType: {
						// This key overrides `buildingType`!
						key: 'buildingType',
						label: '희망건축유형',
						sortable: true,
						tdClass : "text",
						thClass : "title"
					},
					dueDate: {
						key: 'dueDate',
						label : '건축예정일',
						sortable : true,
						tdClass : "text",
						thClass : "title"
					},
					status: {
						key : 'status',
						label: '진행상태',
						sortable : true,
						tdClass : "text",
						thClass : "title"
					}
				},
				list: [],
			}
		},
		methods : {
			loadOption() {
				return new Promise((resolve, reject) => {
					this.ajax.get('/consulting/option')
					.then(res => {
						res = res.data;
						if(res.code === 0){
							for(let i = 0, len = res.data.buildingType.length; i < len; i++) {
								this.buildingType[res.data.buildingType[i]['code']] = res.data.buildingType[i]['name']
							}
							for(let i = 0, len = res.data.buildingMethod.length; i < len; i++) {
								this.buildingMethod[res.data.buildingMethod[i]['code']] = res.data.buildingMethod[i]['name']
							}
							for(let i = 0, len = res.data.cost.length; i < len; i++) {
								this.cost[res.data.cost[i]['code']] = res.data.cost[i]['name']
							}
							resolve();
						} else {
							reject();
						}
					})
				})
			},
			rowClick(record, index) {
				this.$router.history.push(`/request/${record.id}`)
			},
			loadRequest(){
				this.ajax.get('/consulting/list').then((res) => {
					res = res.data;

					if(res.code === 0) {
						this.list = res.data.list;
						for(let i = 0, len = this.list.length; i < len;i++){
							this.list[i].buildingType = this.buildingType[this.list[i].buildingType]
							this.list[i].status = this.statusToLabel(this.list[i].status)
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