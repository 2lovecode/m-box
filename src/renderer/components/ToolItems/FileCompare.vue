<template>
  <el-container>
    <el-header>
      <h4>文件对比</h4>
    </el-header>
    <el-main>
      <div class="mergely-full-screen-8">
        <div class="mergely-resizer">
          <div id="mergely"></div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import 'codemirror/lib/codemirror.css'
import 'mergely/lib/mergely.css'
import 'mergely'

export default {
  name: 'file-compare',
  data: () => {
    return {}
  },
  mounted () {
    jQuery(document).ready(() => {
      jQuery('#mergely').mergely({
        lhs: (setValue) => {
          setValue('the quick red fox\njumped over the hairy dog');
        },
        rhs: (setValue) => {
          setValue('the quick brown fox\njumped over the lazy dog');
        }
      });
    });
  }
}
</script>