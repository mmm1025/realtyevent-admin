<template>
	<div id="NewsList" class="newsListAdmin row">
		<div class="col-sm-6">
			<h4 class="page-header">영역제목</h4>
      <form class="form-horizontal" method="get" action="/">
        <fieldset>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">영역 제목</label>
            <div class="col-sm-9">
							<div class="input-group">
								<input class="form-control" type="text" name="title" v-model="section.title">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="titleUpdateBtn" @click="updateSection()" style="display:none;">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
            </div>
          </div>
        </fieldset>
      </form>

			<h4 class="page-header">기사 추가하기</h4>
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
			<h4 class="page-header">뉴스 목록 (노출은 최대 4개)</h4>
			<div class="list">
				<draggable v-model="newsList">
					<div class="card mb-3" v-for="news in newsList">
					  <div class="row no-gutters">
					    <div class="col-sm-12">
					      <div class="card-body">
					        <h5 class="card-title" style="margin-bottom: 0">{{news.title}}</h5>
					      </div>
					      <i class="fas fa-times" @click="remove(news.url)"></i>
					    </div>
					  </div>
					</div>
				</draggable>
			</div>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  props : ['projectId'],
	created(){
    this.loadList();
		this.loadSectionInfo();
	},
  components : {
		draggable
	},
	data () {
		return {
      newsLink : '',
      news : {},
      data : {
        project_id : '',
        news_url : '',
        image_url : ''
      },
      newsList : [],
			section : {}
		}
	},
  watch: {
    newsLink() {
			this.ajax.get('/news/parse?url=' + this.newsLink).then(res => {
    			res = res.data;
          console.log(res.data);
          this.news = {
            project_id : this.projectId,
            url : this.newsLink,
            image_url : res.data.image,
            title : res.data.title,
            desc : res.data.desc,
            author : res.data.author,
            datetime : res.data.datetime
          }
    		});
		},
		newsList() {
			this.sort();
		},
		'section.title'(newVal, oldVal){
			if(newVal !== oldVal){
				document.getElementById('titleUpdateBtn').style.display = "block";
			}
		}
  },
	methods: {
    loadList(){
			this.ajax.get('/project/news/list', {
        params : {
          projectId : this.projectId
        }
      }).then(res => {
				res = res.data;
				this.newsList = res.data.list;
			})
		},
		loadSectionInfo(){
			this.ajax.get('/project/section/info', {
        params : {
          projectId : this.projectId,
					sectionId : 'newsList'
        }
      }).then(res => {
				res = res.data;
				this.section = res.data;
			})
		},
    addNews(){
			if(this.newsList.length >= 4) {
				alert("기사는 4개까지 추가 할 수 있습니다.")
			} else {
				this.ajax.post('/project/news/add', this.news)
        .then(res => {
					location.reload()
				})
			}

		},
    remove(url) {
			if(confirm("해당 기사를 정말 삭제하시겠습니까?")){
				this.ajax.post('/project/news/remove', {
					projectId : this.projectId,
					url : url
				}).then(res => {
					location.reload()
				})
			}
		},
		updateSection() {
			console.log(this.section.title);
			this.ajax.post('/project/section/update', this.section).then(res => {
				location.reload()
			})
		},
		sort() {
			const arr = []
			for(let i = 0, len = this.newsList.length; i < len; i++) {
				const item = this.newsList[i];
				item.order = i;
				arr.push(item);
			}
			this.ajax.post('/project/news/sort', {
				arr : arr
			})
		}
	}
}
</script>

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
