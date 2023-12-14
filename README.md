# web-template

个人搭建的 vite + ts + vue3 + pinia + unicss + less + eslint + prettierr 的项目模板

都是自己写的，不需要的部分自行删除

### 图片/文件引入方式大全

1. 原生的 img 标签直接使用设置好的别名即可：<img src="@@/" />;
2. 背景图片一定要采用相对路径，不能写错行内标签，用 class 这类方式实现：background-image: url('../assets/images/xxx.png')
3. 确定的路径可以采用 require 方式引入,以 Element-plus 的图片组件为例：<ElImage :src="require('@@/')" >
4. 不确定的路径可以采用 requireImage 或者 requireFile 方式引入，默认路径为
    - requireImage: 'src/assets/images/',引入方式如： <ElImage :src="requireImage('xxx')" />
    - requireFile: 'src/assets/',引入方式如：<ElImage :src="requireFile('xxx')" />
      requireImage 和 requireFile 方法请到 "src/utils/common.ts" 下查看
