<template>
<div>
  <search></search>
  <div id="group-bar">
    <group title="All Channels" class="group"></group>
    <group v-for="(groupName, index) in groups" :key="index" v-bind:title="groupName" class="group"></group>
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
</div>
</template>

<script>
import axios from 'axios';
import Group from '../components/Group.vue';
import Search from '../components/Search.vue';

export default {
  data() {
    return {
      greeting: "",
      dialog: false,
      newGroupName: "",
      groups: [],
    }
  },
  components: {
    Group,
    Search
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
      this.groups = groups.data.map(x => x.name)
    } catch(error) {
      if (error.response.status == 401) {
        localStorage.removeItem("token");
        this.$root.$data.isLoggedIn = false;
        this.$router.push("/");
      }
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
      this.groups.push(this.newGroupName);
      this.newGroupName = "";
    }
  }

}
</script>

<style>
.group {
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

</style>