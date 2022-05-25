<template>
<div id="imageBannerList" class="imageBannerListAdmin row">
  <div class="col-sm-6 boxwrap">
    <h4 class="page-header">이미지배너 등록</h4>

    <form class="form-horizontal" method="post" action="/">
      <fieldset>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">이미지</label>
          <div class="col-sm-9">
            <input class="form-control" type="file" id="bannerImage">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">링크유형</label>
          <div class="col-sm-9">
            <label class="c-radio"><input id="linkType1" type="radio" name="linkType" value="news" checked="checked" v-model="banner.link_type"><span class="fa fa-check"></span> 땅집고 뉴스</label>
            <label class="c-radio"><input id="linkType2" type="radio" name="linkType" value="outlink"><span class="fa fa-check" v-model="banner.link_type"></span> 외부링크</label>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">링크</label>
          <div class="col-sm-9">
            <input class="form-control" type="text" id="linkUrl" v-model="banner.link_url">
          </div>
        </div>
      </fieldset>
    </form>

    <div class="row">
      <div class="col-md-12">
        <button class="btn btn-primary btn-block" @click="addBanner()">배너 저장</button>
      </div>
    </div>
  </div>

  <div class="col-sm-6">
    <h4 class="page-header">이미지배너 목록 (노출은 최대 3개)</h4>
    <div class="list">
      <draggable v-model="bannerList">
        <div class="card mb-3" v-for="banner in bannerList">
          <div class="row no-gutters">
            <div class="col-sm-12">
              <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 0">{{banner.link_url}}</h5>
                <img :src="banner.image_url" width="100%" style="max-height:130px;">
              </div>
              <i class="fas fa-times" @click="remove(banner.id)"></i>
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
  props: ['projectId'],
  created() {
    this.loadList();
  },
  components: {
    draggable
  },
  data() {
    return {
      news: {},
      banner: {
        project_id: '',
        id: '',
        link_url: '',
        image_url: '',
        order: '',
				link_type:''
      },
      bannerList: []
    }
  },
  watch: {
    bannerList() {
      this.sort();
    }
  },
  methods: {
    loadList() {
      this.ajax.get('/project/banner/list', {
        params: {
          projectId: this.projectId
        }
      }).then(res => {
        res = res.data;
        this.bannerList = res.data.list;
      })
    },
    addBanner() {
      if (this.bannerList.length >= 3) {
        alert("이미지배너는 3개까지 추가 할 수 있습니다.")
      } else {
        if (this.banner.link_url === '') {
          return alert("링크를 입력해주세요.");
        }

        let formData = new FormData();
        const bannerImage = document.getElementById('bannerImage');
        formData.append('image', bannerImage.files[0]);
        formData.append('project_id', this.projectId);
        formData.append('link_url', $("#linkUrl").val());
				formData.append('link_type', $(":radio[name=linkType]:checked").val());

        this.ajax({
          method: 'post',
          url: `/project/banner/add`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          res = res.data;
          if (res.code === 0) {
            location.reload();
          } else {}
        })
      }
    },
    remove(id) {
      if (confirm("해당 배너를 정말 삭제하시겠습니까?")) {
        this.ajax.post('/project/banner/remove', {
          projectId: this.projectId,
          id: id
        }).then(res => {
          location.reload()
        })
      }
    },
    sort() {
      const arr = []
      for (let i = 0, len = this.bannerList.length; i < len; i++) {
        const item = this.bannerList[i];
        item.order = i;
        arr.push(item);
      }
      this.ajax.post('/project/banner/sort', {
        arr: arr
      })
    },
    loadImages() {
      this.ajax.get(`/project/images/${this.projectId}`).then(res => {
        res = res.data;
        for (let i = 0, len = res.data.list.length; i < len; i++) {
          this.imageForList[`image${res.data.list[i].gubun}`] = res.data.list[i].url;
        }
      })
    },
  }
}
</script>

<style>
#imageBannerList .boxwrap .imgbox button {
  width: 80px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

#imageBannerList .imgbox {
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  border: 1px solid;
}

#imageBannerList .imgbox img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#imageBannerList .list {
  padding-right: 10px;
  padding-left: 10px;
}

#imageBannerList .newsInfo {
  width: 100%;
  background: #fff;
  padding: 20px;
}

#imageBannerList .newsInfo .row {
  margin-bottom: 20px;
}

#imageBannerList .newsInfo .row:last-child {
  margin-bottom: 0;
}

#imageBannerList .newsimage .imgbox {
  width: 100%;
  height: 300px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

#imageBannerList .newsimage img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

#imageBannerList .card {
  position: relative;
}

#imageBannerList .card i {
  position: absolute;
  font-size: 20px;
  top: 10px;
  right: 20px;
  z-index: 1;
}

#imageBannerList .card .col-sm-3 {
  height: 160px;
  overflow: hidden;
  position: relative;
}

#imageBannerList .card .col-sm-3 img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

#imageBannerList .card .card-body {
  width: 95%;
}

#imageBannerList .card-title {
  font-size: 18px;
  line-height: 1.3;
}

.c-radio {
  margin-bottom: 0px;
  padding-top: 7px;
}
</style>
