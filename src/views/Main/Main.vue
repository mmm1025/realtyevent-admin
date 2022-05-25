<template>
	<ContentWrapper id="Main">
		<div class="content-heading">
			<div>메인페이지 관리</div>
		</div>

		<div id="MainAdmin">
			<div class="row">
				<div class="col-sm-9">
					<h4 class="page-header">HEADER POSITION</h4>
					<h6 class="text-center">원하시는 순서대로 각 헤더를 이동해주세요</h6>
					<div class="sectionWrap">
						<draggable v-model="headerList" class="row">
							<div class="col-sm" v-for="header in headerList" v-if="header.show">
								{{header.text}}
							</div>

						</draggable>
					</div>
				</div>
				<div class="col-sm-3">
					<h4 class="page-header">HEADER DISPLAY</h4>
					<div class="boxwrap">
						<div class="row" v-for="header in headerList">
							<div class="col-8">
								<p class="name">{{header.text}}</p>
							</div>
							<div class="col-4">
								<label class="switch">
									<input type="checkbox" v-model="header.show" @click="updateHeaderShow(header.id, header.show)"/>
									<span></span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-9">
					<h4 class="page-header">SECTION POSITION</h4>
					<h6 class="text-center">원하시는 순서대로 각 section을 이동해주세요</h6>
					<div class="sectionWrap">
						<draggable v-model="sectionList">
							<section id="section" class="card shadow-sm" v-for="section in sectionList" v-if="section.show" >
								<div class="card-body">{{section.text}}</div>
								<router-link class="ml-auto" :to="section.adminLink" v-if="section.adminLink">
									<button type="button" class="btn btn-sm btn-dark">수정하기</button>
								</router-link>
							</section>
						</draggable>
					</div>
				</div>
				<div class="col-sm-3">
					<h4 class="page-header">SECTION DISPLAY</h4>
					<div class="boxwrap">
						<div class="row" v-for="section in sectionList">
							<div class="col-8">
								<p class="name">{{section.text}}</p>
							</div>
							<div class="col-4">
								<label class="switch">
									<input type="checkbox" v-model="section.show" @click="updateShow(section.id, section.show)"/>
									<span></span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</ContentWrapper>
</template>

<style>
	#MainAdmin .page-header {margin-top:0.5rem;}
	#MainAdmin .sectionWrap {width:80%; margin:0 auto; padding:30px; background:#fff;}
	#MainAdmin h6 {padding:1rem 0;}
	#MainAdmin section {width:100%; height:200px; background:#f8f8f8;}
	#MainAdmin .card {border:0; position:relative; border:1px solid #dedede; border-radius:5px; text-align:center;}
	#MainAdmin .card-body {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:24px; font-weight:bold;}
	#MainAdmin .card button {width:80px; margin:10px 10px 0 0;}

	#MainAdmin .boxwrap {background:#fff; padding:20px;}
	#MainAdmin .boxwrap .row {margin:0; padding:0.8rem 0; border-bottom:1px dashed #eee;}
	#MainAdmin .boxwrap .row:last-child {border-bottom:0;}
	#MainAdmin .boxwrap p {margin:0;}
	#MainAdmin .boxwrap .col-4 {position:relative;}
	#MainAdmin .boxwrap .col-4 label {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}
	
</style>

<script>
import draggable from 'vuedraggable'
export default {
  	components: {
		draggable
	},
	created() {
		this.getList();
		this.getHeaderList();
	},
	watch : {
		'sectionList'(){
			this.updateOrder();
		},
		'headerList'(){
			this.updateHeaderOrder();
		}
	},
	data() {
		return {
			section : 0,
			sectionList : [],
			headerList : []
		}
	},
	methods : {
		getList(){
			this.ajax.get('/section/list').then(res => {
				res = res.data;
				if(res.code === 0) {
					for(let idx in res.data.list) {
						res.data.list[idx].show = res.data.list[idx].show === 'Y' ? true : false;
					}
					this.sectionList = res.data.list;
				} else {
					console.log(res);
				}
			})
		},
		updateOrder() {
			const list = [];
			for(let i = 0, len = this.sectionList.length; i < len; i++) {
				const data = this.sectionList[i];
				list.push({
					id : data.id,
					order : i
				})
			}

			this.ajax.post('/section/order', {list : list}).then(res => {

			})
		},
		updateShow(id, value) {
			this.ajax.post('/section/show', {id : id, value : (!value) ? 'Y' : 'N'})
		},
		getHeaderList(){
			this.ajax.get('/header/list').then(res => {
				res = res.data;
				if(res.code === 0) {
					for(let idx in res.data.list) {
						res.data.list[idx].show = res.data.list[idx].show === 'Y' ? true : false;
					}
					this.headerList = res.data.list;
				} else {
					console.log(res);
				}
			})
		},
		updateHeaderOrder() {
			const list = [];
			for(let i = 0, len = this.headerList.length; i < len; i++) {
				const data = this.headerList[i];
				list.push({
					id : data.id,
					order : i
				})
			}

			this.ajax.post('/header/order', {list : list}).then(res => {

			})
		},
		updateHeaderShow(id, value) {
			this.ajax.post('/header/show', {id : id, value : (!value) ? 'Y' : 'N'})
		}
	}
  }
</script>