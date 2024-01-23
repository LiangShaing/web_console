<template>
  <v-app>
    <v-toolbar color="primary">
      <v-toolbar-title class="font-weight-black">Web Console</v-toolbar-title>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-layout>
      <v-navigation-drawer permanent>
        <template v-slot:prepend>
          <v-card
            class="mx-auto"
            max-width="344"
            title="Allen"
            subtitle="Logged in"
          >
            <template v-slot:prepend>
              <v-avatar color="green-darken-2"> AL </v-avatar>
            </template>
          </v-card>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            value="dashboard"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-cog"
            title="Setting"
            value="setting"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <HelloWorld />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
