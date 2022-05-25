<template>
	<ContentWrapper id="NewsList">
		<div class="content-heading">
			<div>땅집고뉴스 관리</div>
		</div>

		<div class="newsListAdmin row">
			<div class="col-sm-6">
				<h4 class="page-header">인기 기사 추가하기</h4>
				<form class="form-horizontal" method="get" action="/">
          <fieldset>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">뉴스링크</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" v-model="newsLink">
              </div>
            </div>
          </fieldset>
        </form>

        <div class="newsInfo">
          <div class="row">
            <label class="col-md-3">뉴스제목</label>
            <div class="col-md-9">
              <p>{{news.title}}</p>
            </div>
          </div>
          <div class="row">
            <label class="col-md-3">보도날짜</label>
            <div class="col-md-9">
              <p>{{news.datetime}}</p>
            </div>
          </div>
          <div class="row">
            <label class="col-md-3">작성자</label>
            <div class="col-md-9">
              <p>{{news.author}}</p>
            </div>
          </div>
          <div class="row">
          	<div class="col-md-12">
          		<button class="btn btn-primary btn-block" @click="addNews">땅집고 뉴스 추가</button>
          	</div>
          </div>
        </div>
			</div>

			<div class="col-sm-6">
				<h4 class="page-header">인기 뉴스 목록 (노출은 최대 6개)</h4>
				<div class="list">
					<draggable v-model="newsList">
						<div class="card mb-3" v-for="item in newsList">
						  <div class="row no-gutters">
						    <div class="col-sm-12">
						      <div class="card-body">
						        <h5 class="card-title" style="margin-bottom: 0">{{item.title}}</h5>
						      </div>
						      <i class="fas fa-times" @click="remove(item.id)"></i>
						    </div>
						  </div>
						</div>
					</draggable>
				</div>
			</div>
		</div>
	</ContentWrapper>
</template>

<style>
	#NewsList .list {padding-right:10px; padding-left:10px;}
	#NewsList .newsInfo {width:100%; background:#fff; padding:20px;}

	#NewsList .newsInfo .row {margin-bottom:20px;}
	#NewsList .newsInfo .row:last-child {margin-bottom:0;}
	#NewsList .newsimage .imgbox {width:100%; height:300px; margin:0 auto; overflow:hidden; position:relative;}
	#NewsList .newsimage img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}

	#NewsList .card {position:relative;}
	#NewsList .card i {position:absolute; font-size:20px; top:10px; right:20px; z-index:1;}
	#NewsList .card .col-sm-3 {height:160px; overflow:hidden; position:relative;}
	#NewsList .card .col-sm-3 img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#NewsList .card .card-body {width:95%;}
	#NewsList .card-title { font-size:18px; line-height:1.3;}
</style>

<script>
import draggable from 'vuedraggable';
export default {
	created() {
		this.loadList()
	},
	components : {
		draggable
	},
	data() {
		return {
			newsLink : '',
			news : {
				image : '',
				title : '',
				author : '',
				datetime : '',
			},
			newsList : []
		}
	},
	watch : {
		newsLink() {
			this.ajax.get('/news/parse?url=' + this.newsLink).then(res => {
    			res = res.data;
    			this.news.image = res.data.image;
    			this.news.title = res.data.title;
    			this.news.author = res.data.author;
    			this.news.datetime = res.data.datetime;
    		})
		},
		newsList() {
			this.sort();
		}
	},
	methods : {
		addNews(){
			if(this.newsList.length >= 6) {
				alert("인기 기사는 6개까지 추가 할 수 있습니다.")
			} else {
				this.ajax.post('/news/add', {
					url : this.newsLink
				}).then(res => {
					location.reload()
				})
			}
				
		},
		loadList(){
			this.ajax.get('/news/list').then(res => {
				res = res.data;
				this.newsList = res.data.list;
			})
		},
		remove(id) {
			if(confirm("해당 기사를 정말 삭제하시겠습니까?")){
				this.ajax.post('/news/remove', {
					id : id
				}).then(res => {
					location.reload()
				})
			}
		},
		sort() {
			const arr = []
			for(let i = 0, len = this.newsList.length; i < len; i++) {
				const item = this.newsList[i];
				arr.push({
					id : item.id,
					order : i
				})
			}

			this.ajax.post('/news/sort', {
				arr : arr
			})
		},
	}
}
</script>