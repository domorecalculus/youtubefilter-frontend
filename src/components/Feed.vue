<template>
<div>
  <div id="group-bar">
    <group :class="{active: activeGroup === 'all'}" title="All Channels" class="group-card" @wasClicked="activeGroup = 'all'"></group>
    <group v-for="(group, index) in groups" :key="index" v-bind:title="group.name" :class="{active: activeGroup === group.id}" class="group-card" @wasClicked="activeGroup = group.id"></group>
    <v-dialog
      v-model="dialog"
      max-width="400px"
    >
      <template v-slot:activator="{ on, attrs }">
        <div id="add-group" v-bind="attrs" v-on="on"><v-icon x-large>mdi-plus</v-icon></div>
      </template>
      <v-card>
        <v-card-title class="justify-center">
          <span class="text-h5">Add Group</span>
        </v-card-title>
        <v-card-text class="pb-0 pt-5">
          <v-row>
            <v-text-field outlined counter="50" label="Group Name" v-model="newGroupName"></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addGroup"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div id="videos-list"> 
    <grid-video v-for="video in filteredVideos" 
    :key="video.snippet.resourceId.videoId" 
    :id="video.snippet.resourceId.videoId" 
    :title="video.snippet.title" 
    :thumbnail="video.snippet.thumbnails.medium.url" 
    :channelThumbnail="channels.filter(x => x.id == video.snippet.channelId)[0].thumbnail" 
    :datePublished="video.snippet.publishedAt"></grid-video> 
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Group from './Group.vue';
import qs from 'qs';
import GridVideo from './GridVideo.vue';

export default {
  data() {
    return {
      greeting: "",
      dialog: false,
      newGroupName: "",
      groups: [],
      channels: [],
      videos: [],
      loadingVideos: false,
      activeGroup: 'all'
    }
  },
  components: {
    Group,
    GridVideo,
  },
  async created() {
    if (!localStorage.getItem("token")){
      this.$root.$data.isLoggedIn = false;
      this.$router.push("/");
      return;
    }
    try {
      const groups = await axios.get("/api/groups", {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}});
      console.log(groups);
      this.groups = groups.data;
      this.$root.$data.groups = this.groups;
      
      console.log(this.groups.map(x => x['channels']));
      let allChannelIds = [].concat.apply([], this.groups.map(x => x['channels']));
      console.log(allChannelIds);
      
      const channels = await axios.get("/api/channels", {
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}, 
        params: {ids: allChannelIds}, 
        paramsSerializer: (params) => { return qs.stringify(params, { arrayFormat: 'repeat'}) }
      });
      this.channels = channels.data;
      
      this.loadingVideos = true;
      const videos = await axios.get("/api/videos", {
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}, 
        params: {ids: this.channels.map(x => x['uploads_playlist_id'])}, 
        paramsSerializer: (params) => { return qs.stringify(params, { arrayFormat: 'repeat'}) }
      });
      console.log(videos);
      this.videos = videos.data;
      this.$root.$data.videos = this.videos;
      this.videos = this.videos.sort((a, b) => {return Date.parse(b.snippet.publishedAt) - Date.parse(a.snippet.publishedAt)})
      this.loadingVideos = false;
    } catch(error) {
      console.log(error);
      if (this.loadingVideos) {
        this.loadingVideos = false;
      }
      if (error.response.status == 401) {
        localStorage.removeItem("token");
        this.$root.$data.isLoggedIn = false;
        this.$router.push("/");
      }
    }
  },
  computed: {
    filteredVideos() {
      if (this.activeGroup === 'all') {
        return this.videos;
      }

      return this.videos.filter(x => {
        let channels = this.groups.filter(x => x.id === this.activeGroup)[0].channels
        console.log(channels);
        return channels.includes(x.snippet.channelId);
      });
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.newGroupName = "";
    },
    async addGroup() {
      this.dialog = false;
      const res = await axios.post("/api/groups", {"name": this.newGroupName}, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}});
      console.log(res);
      this.groups.push(res.data);
      this.newGroupName = "";
    },
    switchGroup() {
      console.log("clicked all")
      this.activeGroup = "all";
    }
  }

}
</script>

<style>
.group-card {
  margin-right: 40px;
}
#group-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-left: 40px;
  padding-right: 40px;
}

/* .group:hover {
  color: #AAA;
  text-decoration-line: underline;
  text-decoration-color: #AAA;
  text-decoration-thickness: 3px;
} */

#add-group {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 175px;
  height: 100px;
  border-radius: 10px;
  color: #AAA;
  border: 3px solid #AAA;
  margin-bottom: 30px;
}

#add-group:hover {
  color: #555;
  border: 3px solid #555;
  transform: scale(1.05);
  transition: .2s ease-in-out all;
  cursor: pointer;
}

#videos-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.active {
  text-decoration-line: underline;
  text-decoration-color: red;
  text-decoration-thickness: 3px;
}

</style>