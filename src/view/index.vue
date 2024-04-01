<template>
  <div class="app">
    <!-- 功能切换栏 -->
    <div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <el-icon><View /></el-icon>
          阅读
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Plus /></el-icon>
          上传
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Avatar /></el-icon>
          作者
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 标签按钮 -->
    <div class="tag" v-show="tagShow">
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="HcBtn('1')"
          ><el-icon><Orange /></el-icon>Html+Css's Q&A</el-button
        >
      </div>
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="jsBtn('2')"
          ><el-icon><Cherry /></el-icon>JavaScript's Q&A</el-button
        >
      </div>
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="vueBtn('3')"
          ><el-icon><Apple /></el-icon>Vue's Q&A</el-button
        >
      </div>
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="JqBtn('4')"
          ><el-icon><Pear /></el-icon>Jquery's Q&A</el-button
        >
      </div>
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="AjaxBtn('5')"
          ><el-icon><Grape /></el-icon>Ajax's Q&A</el-button
        >
      </div>
    </div>

    <!-- 显示内容 -->
    <div class="main">
      <!-- 标签分类 -->
      <div v-show="tagShow1" class="readLayout">
        <!-- 文本布局 -->
        <div class="textLayout">
          <!-- 显示Html+Css的内容 -->
          <div v-show="HcShow">
            <ul
              style="font-size: 20px"
              v-for="(item, index) in questionBank"
              :key="index"
            >
              <li>
                <span style="color: red"> {{ index + 1 }}、</span
                ><span style="font-size: 22px"> {{ item.question }}</span>
              </li>

              <li>答：{{ item.answer }}</li>
            </ul>
          </div>

          <!-- 显示js的内容 -->
          <div v-show="jsShow">
            <ul
              style="font-size: 20px"
              v-for="(item, index) in questionBank"
              :key="index"
            >
              <li>
                <span style="color: red"> {{ index + 1 }}、</span
                ><span style="font-size: 22px"> {{ item.question }}</span>
              </li>
              <li>答：{{ item.answer }}</li>
            </ul>
          </div>

          <!-- 显示vue的内容 -->
          <div v-show="vueShow">
            <ul
              style="font-size: 20px"
              v-for="(item, index) in questionBank"
              :key="index"
            >
              <li>
                <span style="color: red"> {{ index + 1 }}、</span
                ><span style="font-size: 22px"> {{ item.question }}</span>
              </li>
              <li>答：{{ item.answer }}</li>
            </ul>
          </div>

          <!-- 显示的jq内容 -->
          <div v-show="jqShow">
            <ul
              style="font-size: 20px"
              v-for="(item, index) in questionBank"
              :key="index"
            >
              <li>
                <span style="color: red"> {{ index + 1 }}、</span
                ><span style="font-size: 22px"> {{ item.question }}</span>
              </li>
              <li>答：{{ item.answer }}</li>
            </ul>
          </div>

          <!-- 显示的ajax内容 -->
          <div v-show="AjaxShow">
            <ul
              style="font-size: 20px"
              v-for="(item, index) in questionBank"
              :key="index"
            >
              <li>
                <span style="color: red"> {{ index + 1 }}、</span
                ><span style="font-size: 22px"> {{ item.question }}</span>
              </li>
              <li>答：{{ item.answer }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 第二个区域展示 -->
      <div class="tag2" v-show="tagShow2">
        <div class="readLayout">
          <h5 style="color: gray">添加成功后到阅读中刷题!!</h5>
        </div>
        <div>
          <el-select
            v-model="choice"
            width="30px"
            placeholder="请选择要上传的类型"
            style="width: 240px"
            clearable
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div>
          <el-button @click="uploadingBtn">上传题库</el-button
          ><el-button @click="lookListBtn">查看题库</el-button>
        </div>

        <!-- 确定选择后的弹窗内容 -->
        <el-dialog
          @closed="closed"
          v-model="dialogVisible"
          :title="title"
          width="800"
        >
          <el-form
            ref="formRef"
            style="max-width: 600px"
            :model="qaValidateForm"
            label-width="auto"
            class="demo-ruleForm"
          >
            <el-form-item
              label="问题"
              prop="question"
              :rules="[{ required: true, message: '问题不能为空' }]"
              ><el-input
                v-model="qaValidateForm.question"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              label="答案"
              prop="answer"
              :rules="[{ required: true, message: '答案不能为空' }]"
            >
              <el-input v-model="qaValidateForm.answer" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(formRef)"
                >添加</el-button
              >
              <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <!-- 点击查看后的弹窗 -->
        <el-dialog
          @closed="closed"
          v-model="lookListVisible"
          title="全部题库"
          width="999"
        >
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column
              prop="typeid"
              label="类型"
              width="80"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="question"
              label="问题"
              width="250"
              header-align="center"
            />
            <el-table-column
              prop="answer"
              label="答案"
              width="566"
              header-align="center"
            />
            <el-table-column
              label=" 操 作"
              class="custom-header"
              width="70"
              header-align="center"
            >
              <template #default="scope">
                <div>
                  <el-button
                    :plain="true"
                    size="small"
                    @click="deleteBtn(scope)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination
            style="padding-top: 20px; padding-left: 20px"
            :page-sizes="[10, 20]"
            v-model:page-size="pageSize"
            v-model:current-page="pageNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalLimit"
          />
        </el-dialog>
      </div>

      <!-- 第三个区域展示 -->
      <div class="tag3" v-show="tagShow3">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, getCurrentInstance, reactive } from "vue";
import {
  View,
  Plus,
  Avatar,
  Cherry,
  Apple,
  Pear,
  Grape,
  Orange,
} from "@element-plus/icons-vue";
import {
  getType,
  getQuestion,
  addQuestion,
  deleteQuestion,
} from "/src/api/questionBank";
import { ElMessage } from "element-plus";
onMounted(() => {
  // 默认选择第一个标签
  tagShow1.value = true;
  tagShow.value = true;
  getList();
});

const tagShow = ref(false);

// 选择导航的显示
const handleSelect = (key) => {
  if (key == 1) {
    tagShow.value = true;
    tagShow1.value = true;
    tagShow2.value = false;
    tagShow3.value = false;
  } else if (key == 2) {
    tagShow.value = false;
    jsShow.value = false;
    vueShow.value = false;
    HcShow.value = false;
    tagShow1.value = false;
    tagShow2.value = true;
    tagShow3.value = false;
  } else if (key == 3) {
    tagShow.value = false;
    jsShow.value = false;
    vueShow.value = false;
    HcShow.value = false;
    tagShow1.value = false;
    tagShow2.value = false;
    tagShow3.value = true;
  }
};

let tagShow1 = ref(false);
let tagShow2 = ref(false);
let tagShow3 = ref(false);

let jsShow = ref(false);
let vueShow = ref(false);
let HcShow = ref(false);
let jqShow = ref(false);
let AjaxShow = ref(false);

// 弹窗显示
let dialogVisible = ref(false);

let totalLimit = ref(10);
// 避开vue提示未定义
let pageNum = ref();
let pageSize = ref();

// 每页有多少条数据
const handleSizeChange = (val) => {
  queryParamsList.value.pageSize = val;
  lookListBtn();
};

// 当前是第几页
const handleCurrentChange = (val) => {
  queryParamsList.value.pageNum = val;
  lookListBtn();
};

// 选择Html+Css的显示
function HcBtn(id) {
  HcShow.value = true;
  jsShow.value = false;
  vueShow.value = false;
  jqShow.value = false;
  AjaxShow.value = false;
  QuestionList(id);
}
// 选择js的显示
function jsBtn(id) {
  HcShow.value = false;
  jsShow.value = true;
  vueShow.value = false;
  jqShow.value = false;
  AjaxShow.value = false;
  QuestionList(id);
}
// 选择vue的显示
function vueBtn(id) {
  HcShow.value = false;
  jsShow.value = false;
  vueShow.value = true;
  jqShow.value = false;
  AjaxShow.value = false;
  QuestionList(id);
}
// 选择Jq的显示
function JqBtn(id) {
  HcShow.value = false;
  jsShow.value = false;
  vueShow.value = false;
  jqShow.value = true;
  AjaxShow.value = false;
  QuestionList(id);
}

// 选择Ajax的显示
function AjaxBtn(id) {
  HcShow.value = false;
  jsShow.value = false;
  vueShow.value = false;
  jqShow.value = false;
  AjaxShow.value = true;
  QuestionList(id);
}

// 请求问题与相应答案的数据
let questionBank = ref([]);

// 阅读中的请求体
let questionBankParams = ref({
  typeid: "",
  question: "",
  answer: "",
});

// 请求问题根据类型返回问题与答案
function QuestionList(id) {
  if (id) {
    questionBankParams.value.typeid = id;
  }

  getQuestion(questionBankParams.value).then((res) => {
    questionBank.value = res.rows;
    tableData.value = res.rows;
  });
}

// 请求全部类型参数
const queryParamsType = ref({
  typeName: "",
  remark: "",
});

// 接收页面选择的数据
let choice = ref("");

let title = ref("");

// 上传按钮
function uploadingBtn() {
  if (choice.value == "") {
    ElMessage({
      message: "请先选择类型",
      type: "warning",
    });
    // 不显示弹窗
    dialogVisible.value = false;
  } else {
    // 确定后弹出弹窗内容
    dialogVisible.value = true;
  }

  if (choice.value == 1) {
    title.value = "添加问题与答案到html+Css库";
  } else if (choice.value == 2) {
    title.value = "添加问题与答案到Js库";
  } else if (choice.value == 3) {
    title.value = "添加问题与答案到Vue库";
  } else if (choice.value == 4) {
    title.value = "添加问题与答案到Jquery库";
  } else if (choice.value == 5) {
    title.value = "添加问题与答案到Ajax库";
  }
  qaBankAddParams.value.typeid = choice.value;
}

// 关闭弹窗后的操作
function closed() {
  choice.value = "";
}

// 类型
let typeList = ref([]);

// 获取类型
function getList() {
  getType(queryParamsType.value).then((res) => {
    typeList.value = res.rows;
  });
}
// 表单
const formRef = ref();

const qaValidateForm = reactive({
  typeid: "",
  question: "",
  answer: "",
});

// 添加问题和答案的请求
const qaBankAddParams = ref({
  typeid: "",
  question: "",
  answer: "",
});

// 提交按钮
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      qaBankAddParams.value.question = qaValidateForm.question;
      qaBankAddParams.value.answer = qaValidateForm.answer;
      addQuestion(qaBankAddParams.value).then((res) => {
        ElMessage({
          message: "成功了去刷题吧",
          type: "success",
        });
        // 成功后关闭弹窗
        dialogVisible.value = false;
        // 重置表单
        formEl.resetFields();
        qaBankAddParams.value = ref("");
      });
    } else {
      return false;
    }
  });
};

// 重置按钮
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 给查看显示弹窗设置初始值
let lookListVisible = ref(false);

// table表格绑定数据
let tableData = ref([]);

// 上传中查看的请求体
let queryParamsList = ref({
  pageNum: 1,
  pageSize: 10,
  id: "",
  typeid: "",
  question: "",
  answer: "",
});

// 封装循环的一个方法
function circulation() {
  for (let i = 0; i < tableData.value.length; i++) {
    if (tableData.value[i].typeid == 1) {
      tableData.value[i].typeid = "Html";
    } else if (tableData.value[i].typeid == 2) {
      tableData.value[i].typeid = "Js";
    } else if (tableData.value[i].typeid == 3) {
      tableData.value[i].typeid = "Vue";
    } else if (tableData.value[i].typeid == 4) {
      tableData.value[i].typeid = "Jquery";
    } else if (tableData.value[i].typeid == 5) {
      tableData.value[i].typeid = "Ajax";
    }
  }
}

// 查看按钮
function lookListBtn() {
  lookListVisible.value = true;
  // 通过选择类型进行查看相应类型数据
  queryParamsList.value.typeid = choice.value;
  getQuestion(queryParamsList.value).then((res) => {
    tableData.value = res.rows;
    circulation();
    totalLimit.value = res.total;
  });
}

// 删除按钮
function deleteBtn(e) {
  deleteQuestion(e.row.id).then(() => {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    QuestionList();
  });
}
</script>

<style scoped>
* {
  list-style: none;
  line-height: 50px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 720px;
}
.textLayout,
.tag2,
.tag3 {
  overflow-y: scroll;
  height: 640px;
  width: 75%;
  padding: 40px;
  background-image: url("../assets/background.jpg");
  background-size: 110%;
}
.main {
  width: 99%;
}
.app {
  display: flex;
  margin-top: 3%;
  justify-content: center;
}

.content {
  width: 80%;
}

.readLayout {
  display: flex;
  flex-direction: column;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: rgb(228, 228, 228); /*滚动条的背景颜色*/
}

.tag {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  /* margin-left: 5%; */
}

.btnMargin {
  margin-bottom: 50px;
}
</style>
