<template>
  <div class="app">
    <!-- 功能切换栏 -->
    <div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        mode="vertical"
      >
        <el-menu-item index="1">
          <el-icon><View /></el-icon>
          查阅
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Plus /></el-icon>
          上传
        </el-menu-item>

        <el-menu-item index="3">
          <el-icon><Headset /></el-icon>
          关于
        </el-menu-item>

        <el-menu-item index="4">
          <el-icon><Comment /></el-icon>
          留言
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 标签按钮 -->
    <div class="tag" v-show="tagShow">
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="HcBtn('1')"
          ><el-icon><Orange /></el-icon>html/css</el-button
        >
      </div>
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="jsBtn('2')"
          ><el-icon><Cherry /></el-icon>javascript</el-button
        >
      </div>
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="vueBtn('3')"
          ><el-icon><Apple /></el-icon>vue</el-button
        >
      </div>
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="JqBtn('4')"
          ><el-icon><Pear /></el-icon>jquery</el-button
        >
      </div>
      <div class="btnMargin">
        <el-button style="font-size: 20px" @click="AjaxBtn('5')"
          ><el-icon><Grape /></el-icon>ajax</el-button
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
                <span style="color: red"> （{{ index + 1 }}）</span
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
                <span style="color: red"> （{{ index + 1 }}）</span
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
                <span style="color: red"> （{{ index + 1 }}）</span
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
                <span style="color: red"> （{{ index + 1 }}）</span
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
                <span style="color: red"> （{{ index + 1 }}）</span
                ><span style="font-size: 22px"> {{ item.question }}</span>
              </li>
              <li>答：{{ item.answer }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 第二个区域展示 -->
      <div class="tag2" v-show="tagShow2">
        <!-- 布局 -->
        <div style="padding-left: 20px">
          <div class="readLayout">
            <h5 style="color: gray">添加成功后到查阅中选择类型刷题!</h5>
          </div>
          <div>
            <el-select
              v-model="choice"
              width="30px"
              placeholder="请选择要上传的类型"
              style="width: 245px"
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
            <el-button @click="uploadingBtn">上传到</el-button
            ><el-button @click="lookListBtn">查看题库</el-button>
          </div>
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
          title="题库"
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
        <div style="height: 400px; font-size: 14px">
          <!-- 默认card1板块 -->
          <div v-show="audio1">
            <el-card
              style="
                margin-top: 2%;
                padding-top: 2%;
                max-width: 800px;
                margin: 0 auto;
              "
            >
              <!-- 文字 -->
              <div
                style="
                  font-size: 16px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color: gray;
                "
              >
                <div>我们每个人都是不会飞的超人</div>
                <div>生活即使不尽如人意 迈过去 便是轻舟已过万重山</div>
              </div>

              <!-- 默认播放器 -->
              <div
                style="
                  display: flex;
                  justify-content: center;
                  padding-top: 20px;
                "
              >
                <div><h3>周杰伦 - 超人不会飞</h3></div>
                <div>
                  <audio
                    controls
                    style="
                      height: 30px;
                      position: relative;
                      top: 7px;
                      left: 6px;
                    "
                  >
                    <source
                      src="/public/周杰伦 - 超人不会飞.mp3"
                      type="audio/ogg"
                    />
                    <source
                      src="/public/周杰伦 - 超人不会飞.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
            </el-card>
          </div>
          <!-- 切换card2板块 -->
          <div v-show="audio2">
            <el-card
              style="
                margin-top: 2%;
                padding-top: 2%;
                max-width: 800px;
                margin: 0 auto;
              "
            >
              <!-- 文字 -->
              <div
                style="
                  font-size: 16px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color: gray;
                "
              >
                <div>天空之大</div>
                <div>任凭遨游</div>
              </div>

              <!-- 播放器 -->
              <div
                style="
                  display: flex;
                  justify-content: center;
                  padding-top: 20px;
                "
              >
                <div><h3>Cz_9 - 你是蓝天里的孤鹤</h3></div>
                <div>
                  <audio
                    controls
                    style="
                      height: 30px;
                      position: relative;
                      top: 7px;
                      left: 6px;
                    "
                  >
                    <source
                      src="/public/你是蓝天里的孤鹤 .mp3"
                      type="audio/ogg"
                    />
                    <source
                      src="/public/你是蓝天里的孤鹤 .mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
            </el-card>
          </div>

          <!-- 切换card3板块 -->
          <div v-show="audio3">
            <el-card
              style="
                margin-top: 2%;
                padding-top: 2%;
                max-width: 800px;
                margin: 0 auto;
              "
            >
              <!-- 文字 -->
              <div
                style="
                  font-size: 16px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color: gray;
                "
              >
                <div>人心微凉</div>
                <div>...</div>
              </div>

              <!-- 播放器 -->
              <div
                style="
                  display: flex;
                  justify-content: center;
                  padding-top: 20px;
                "
              >
                <div><h3>K_D - 你走.mp3</h3></div>
                <div>
                  <audio
                    controls
                    style="
                      height: 30px;
                      position: relative;
                      top: 7px;
                      left: 6px;
                    "
                  >
                    <source
                      src="/public/K_D - 你走.mp3"
                      type="audio/ogg"
                    />
                    <source
                      src="/public/K_D - 你走.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
            </el-card>
          </div>

          <!-- 切换card4板块 -->
          <div v-show="audio4">
            <el-card
              style="
                margin-top: 2%;
                padding-top: 2%;
                max-width: 800px;
                margin: 0 auto;
              "
            >
              <!-- 文字 -->
              <div
                style="
                  font-size: 16px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color: gray;
                "
              >
                <div>如果你也喜欢这种音乐</div>
                <div>带好耳机..</div>
              </div>

              <!-- 播放器 -->
              <div
                style="
                  display: flex;
                  justify-content: center;
                  padding-top: 20px;
                "
              >
                <div><h3>отрава музыка - Дай Мне Минуту</h3></div>
                <div>
                  <audio
                    controls
                    style="
                      height: 30px;
                      position: relative;
                      top: 7px;
                      left: 6px;
                    "
                  >
                    <source
                      src="/public/отрава музыка - Дай Мне Минуту С Тобой.mp3"
                      type="audio/ogg"
                    />
                    <source
                      src="/public/отрава музыка - Дай Мне Минуту С Тобой.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <!-- 轮播图  -->
        <div style="width: 75%; margin: 0 auto">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item
              @click="clickBtn(item)"
              :style="{
                backgroundImage: `url(' ${item.src} ')`,
                backgroundSize: `cover`,
              }"
              v-for="item in images"
              :key="item"
            >
              <img text="2xl" justify="center" />
              {{ item.value }}
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <!-- 第四个区域 -->
      <div class="tag4" v-show="tagShow4">
        <!-- 显示区域 -->
        <div class="comment">
          <ul v-for="(item, index) in commentAll" :key="index">
            <li style="font-size: 16px">
              <el-avatar
                :size="26"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              />
              <span style="position: relative; bottom: 7px; left: 6px"
                >用户留言 {{ index + 1 }} ： {{ item.content }}</span
              >
            </li>
          </ul>
        </div>
        <div style="width: 90%">
          <el-input
            type="text"
            style="height: 60px"
            v-model="inputList"
            @keyup.enter="sendBtn"
            maxlength="100"
            clearable
            @input="handleInput"
            placeholder="欢迎留言 (◠‿◠)ﾉ 不断完善 .."
          />

          <el-button @click="sendBtn">发表</el-button>
          <span style="color: gray; margin-left: 10px; font-size: 14px"
            >最多能输入100字 * 还可以输入({{ surplus }})个字</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, reactive } from "vue";
import {
  View,
  Plus,
  Comment,
  Headset,
  Cherry,
  Apple,
  Pear,
  Grape,
  Orange,
  Refresh,
} from "@element-plus/icons-vue";
import {
  getType,
  getQuestion,
  addQuestion,
  deleteQuestion,
} from "/src/api/questionBank";
import { getComment, addComment } from "/src/api/comment";
import { ElMessage } from "element-plus";
onMounted(() => {
  // 默认选择第一个标签
  tagShow1.value = true;
  tagShow.value = true;
  getList();
});

let audio1 = ref(true);
let audio2 = ref(false);
let audio3 = ref(false);
let audio4 = ref(false);

const tagShow = ref(false);

// 全部留言数据集合
let commentAll = ref([]);

// 留言板请求体
let queryParamsComment = ref({
  id: "",
  content: "",
});

// 选择导航的显示
const handleSelect = (key) => {
  if (key == 1) {
    tagShow.value = true;
    tagShow1.value = true;
    tagShow2.value = false;
    tagShow3.value = false;
    tagShow4.value = false;
  } else if (key == 2) {
    tagShow.value = false;
    jsShow.value = false;
    vueShow.value = false;
    HcShow.value = false;
    tagShow1.value = false;
    tagShow2.value = true;
    tagShow3.value = false;
    tagShow4.value = false;
  } else if (key == 3) {
    tagShow.value = false;
    jsShow.value = false;
    vueShow.value = false;
    HcShow.value = false;
    tagShow1.value = false;
    tagShow2.value = false;
    tagShow3.value = true;
    tagShow4.value = false;
  } else if (key == 4) {
    tagShow.value = false;
    jsShow.value = false;
    vueShow.value = false;
    HcShow.value = false;
    tagShow1.value = false;
    tagShow2.value = false;
    tagShow3.value = false;
    tagShow4.value = true;
    // 调用留言
    getCommentList();
  }
};

// 获取留言
function getCommentList() {
  getComment().then((res) => {
    commentAll.value = res.data;
  });
}

// 初始文字数
let initial = ref(100);
// 剩余文字数
let surplus = ref(100);
// input输入
let inputList = ref("");

// 输入监听
function handleInput(e) {
  // 监听输入值是否为空
  if (e) {
    surplus.value = initial.value - e.length;
  } else {
    // 为空就把剩余值变成100
    surplus.value = 100;
  }
}

// 发表按钮
function sendBtn() {
  if (inputList.value == "") {
    ElMessage({
      message: "请先输入评论内容",
      type: "warning",
    });
    return;
  }
  queryParamsComment.value.content = inputList.value;
  addComment(queryParamsComment.value).then((res) => {
    commentAll.value = res;
    getCommentList();
  });

  // 发表后将输入框置空
  inputList.value = "";

  // 发表后把剩余数变成100
  surplus.value = 100;
}

let tagShow1 = ref(false);
let tagShow2 = ref(false);
let tagShow3 = ref(false);
let tagShow4 = ref(false);

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

// 轮播图数据
let images = ref([
  {
    id: "1",
    src: "src/assets/element1.png",
  },
  {
    id: "2",
    src: "src/assets/element2.png",
  },
  {
    id: "3",
    src: "src/assets/element3.png",
  },
  {
    id: "4",
    src: "src/assets/element4.png",
  },
]);

// 点击轮播图片
function clickBtn(e) {
  if (e.id == "1") {
    audio1.value = true;
    audio2.value = false;
    audio3.value = false;
    audio4.value = false;
  } else if (e.id == "2") {
    audio1.value = false;
    audio2.value = true;
    audio3.value = false;
    audio4.value = false;
  } else if (e.id == "3") {
    audio1.value = false;
    audio2.value = false;
    audio3.value = true;
    audio4.value = false;
  } else if (e.id == "4") {
    audio1.value = false;
    audio2.value = false;
    audio3.value = false;
    audio4.value = true;
  }
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
.tag3,
.tag4 {
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
}

.btnMargin {
  margin-bottom: 50px;
}

.comment {
  display: flex;
  flex-direction: column;
  height: 460px;
  width: 90%;
  background-color: #ffffff;
  opacity: 0.5;
  margin-bottom: 30px;
  padding: 15px;
  overflow-y: scroll; /* 显示y轴滚动条 */
  overflow-x: hidden; /* 隐藏x轴滚动条 */
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

</style>
