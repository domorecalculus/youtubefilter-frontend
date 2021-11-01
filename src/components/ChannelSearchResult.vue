<template>
  <div>
  <div class="channel-container" @mouseenter="hovered=true" @mouseleave="hovered=false">
    <div class="detail-container">
    <img class="channel-thumbnail" :src="imgUrl">
    <div class="channel-text-container">
      <h3>{{this.title}}</h3>
      <p>{{this.description}}</p>
    </div>
    </div>
    <div class="hover-button">
      <v-dialog v-model="dialog" max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="primary" class="font-weight-bold">Add to group</v-btn>
        </template>
        <v-card>
          <v-card-title>Add Channel to Group</v-card-title>
          <v-card-text>
            <v-select v-model="groupSelect" :items="$root.$data.groups" item-text="name" item-value="id" label="Choose group..." solo return-object></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="addToGroup">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    imgUrl: String,
    title: String,
    description: String,
    id: String
  },
  data() {
    return {
      hovered: false,
      dialog: false,
      groupSelect: {},
    }
  },
  methods: {
    async addToGroup() {
      this.dialog = false;
      try {
        await axios.get("/api/channels/" + this.id, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
      } catch(error) {
        if (error.response.status == 404) {
          await axios.post("/api/channels", {id: this.id, title: this.title, description: this.description, thumbnail: this.imgUrl}, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
        }
      }
      const res3 = await axios.put("/api/groups/" + this.groupSelect.id, {name: this.groupSelect.name, channels: [...this.groupSelect.channels, this.id]}, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}});
      console.log(res3);
      this.$root.$data.groups.filter(x => x.id == this.groupSelect.id)[0].channels = res3.data.channels;
    }
  }
}
</script>

<style>
.channel-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 145px;
  width: 60%;
  max-width: 800px;
  margin: 0 auto;
  padding: 15px;
}

.detail-container {
  display: flex;
}

.channel-container:hover {
  background: #efefef;
}

.channel-text-container {
  text-align: left;
}

.channel-thumbnail {
  border-radius: 50%;
  margin-right: 50px;
}

.hover-button {
  width: 180px;
  padding: 15px;
  flex-shrink: 0;
  float: right;
  display: flex;
  align-items: center;
}

</style>