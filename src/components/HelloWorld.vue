<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-card-title class="d-flex align-center pe-2">
            Information
          </v-card-title>
          <v-row class="ma-1">
            <v-btn
              :loading="loading3"
              :disabled="loading3"
              color="blue-grey"
              class="white--text"
              @click="loader = 'loading3'"
              small
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              density="compact"
              label="Search"
              single-line
              flat
              hide-details
              variant="solo-filled"
            ></v-text-field>
          </v-row>
          <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items-length="totalItems"
            :items="serverItems"
            :loading="loading"
            item-value="name"
            @update:options="loadItems"
            :search="search"
          >
            <template v-slot:item.status="{ value }">
              <v-chip :color="getColor(value)">
                {{ value }}
              </v-chip>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const desserts = [
  {
    client: "Server A",
    backupVersion: "202401021223",
    backupType: "Full",
    status: "completed",
    recoverySite: "SiteB",
    run: "N/A",
  },
  {
    client: "Server A",
    backupVersion: "202401021224",
    backupType: "Full",
    status: "completed",
    recoverySite: "SiteB",
    run: "N/A",
  },
  {
    client: "Server A",
    backupVersion: "202401021225",
    backupType: "Full",
    status: "completed",
    recoverySite: "SiteB",
    run: "N/A",
  },
  {
    client: "Server B",
    backupVersion: "202401021226",
    backupType: "Incremental",
    status: "uploading",
    recoverySite: "SiteB",
    run: "Running",
  },
  {
    client: "Server B",
    backupVersion: "202401021227",
    backupType: "Incremental",
    status: "waiting",
    recoverySite: "SiteB",
    run: "Waiting",
  },
];

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = desserts.slice();

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
          });
        }

        const paginated = items.slice(start, end);

        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};

export default {
  name: "HelloWorld",
  data: () => ({
    itemsPerPage: 5,
    search: "",
    headers: [
      {
        title: "Client",
        // sortable: false,
        key: "client",
      },
      { title: "Backup Version", key: "backupVersion" },
      { title: "Backup Type", key: "backupType" },
      { title: "Status", key: "status" },
      { title: "Recovery Site", key: "recoverySite" },
      { title: "Run", key: "run" },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    loading3: false,
  }),
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;
        this.loading = false;
      });
    },
    getColor(status) {
      if (status == "waiting") return "red";
      else if (status == "uploading") return "orange";
      else return "green";
    },
  },
};
</script>
