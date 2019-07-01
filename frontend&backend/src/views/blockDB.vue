<template>
  <div class="blockDB-page">
    <div class="search">
      <el-input placeholder="search primary_key" v-model="searchInput" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </div>
    <el-table
      class="table"
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        sortable
        property="height"
        label="Height"
        width="90">
      </el-table-column>
      <el-table-column
        property="hash"
        label="Hash"
        width="280">
      </el-table-column>
      <el-table-column
        property="data.type"
        label="Type"
        width="80">
      </el-table-column>
      <el-table-column
        property="data.ip"
        label="Ip"
        width="145">
      </el-table-column>
      <el-table-column
        sortable
        property="data.timestamp"
        label="Timestamp"
        width="150">
      </el-table-column>
      <el-table-column
        property="primaryKey"
        label="PrimaryKey"
        width="210">
      </el-table-column>
      <el-table-column
        property="op"
        label="Op"
        width="80">
      </el-table-column>
      <el-table-column
        property="dbUser"
        label="DbUser"
        width="90">
      </el-table-column>
      <el-table-column
        property="db"
        label="DB"
        width="80">
      </el-table-column>
      <el-table-column
        property="collection"
        label="Collection"
        width="100">
      </el-table-column>
      <el-table-column label="operate"
      width="80">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleInfo(scope.$index, scope.row)">info</el-button>
        </template>
      </el-table-column>
      <el-table-column
        property="data.data"
        label="Data"
        >
      </el-table-column>
    </el-table>
    <el-dialog title="SEARCH PrimaryKey" :visible.sync="searchTableVisible" width="84%">
      <el-table
        class="table"
        ref="singleTable"
        :data="searchResult"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          sortable
          property="height"
          label="Height"
          width="120">
        </el-table-column>
        <el-table-column
          property="hash"
          label="Hash"
          width="280">
        </el-table-column>
        <el-table-column
          property="data.type"
          label="Type"
          width="80">
        </el-table-column>
        <el-table-column
          property="data.ip"
          label="Ip"
          width="145">
        </el-table-column>
        <el-table-column
          sortable
          property="data.timestamp"
          label="Timestamp"
          width="150">
        </el-table-column>
        <el-table-column
          property="primaryKey"
          label="PrimaryKey"
          width="210">
        </el-table-column>
        <el-table-column
          property="op"
          label="Op"
          width="80">
        </el-table-column>
        <el-table-column
          property="dbUser"
          label="DbUser"
          width="90">
        </el-table-column>
        <el-table-column
          property="db"
          label="DB"
          width="80">
        </el-table-column>
        <el-table-column
          property="collection"
          label="Collection"
          width="100">
        </el-table-column>
        <el-table-column label="operate"
          width="80">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleInfo(scope.$index, scope.row)">info</el-button>
            </template>
          </el-table-column>
        <el-table-column
          property="data.data"
          label="Data"
          >
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="INFO" :visible.sync="infoDialogTableVisible" :center="false">
      <json-viewer
        :value="info"
        :expand-depth=5
        copyable
        boxed
        sort></json-viewer>
    </el-dialog>
  </div>
</template>
<script>
import { queryRec,search } from "@/api"

export default {
  name: 'blockDB-page',
  data() {
    return {
      tableData: [],
      currentRow: null,
      searchInput: '',
      searchTableVisible: false,
      searchResult: {},
      infoDialogTableVisible: false,
      info: {}
    }
  },
  watch: {},
  route: {},
  computed: {},
  created() {},
  components: {},
  filters: {},
  methods: {
    setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    async queryRec() {
      try {
        const res = await queryRec();
        console.log(res)
        this.tableData = res.data
      } catch (e) {
        console.log(e)
      }
    },
    async search () {
      this.searchTableVisible = true;
      try {
        const res = await search(this.searchInput);
        console.log(res)
        this.searchResult = res.data
      } catch (e) {
        console.log(e)
      }
    },
    handleInfo (a, b) {
      this.infoDialogTableVisible = true;
      this.info = b;
    }
  },
  mounted() {
    this.queryRec()
    var self = this
    setInterval(
      function () {
        self.queryRec() 
      }
      , 2000)
  },
  beforeDestroy () {}
};

</script>
<style lang="scss">
.blockDB-page{
  width: 86%;
  margin: 60px auto;
  .search{
    width: 30%;
    position: absolute;
    top:120px;
    right:140px;
    z-index: 100;
  }
  .table{
    padding-top: 50px;
  }
}
</style>
