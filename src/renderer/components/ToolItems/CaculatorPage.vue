<template>
  <el-card class="box-card" style="width:76%;margin-left:12%;">
    <div slot="header" class="clearfix">
      <el-input
        type="textarea"
        resize="none"
        :autosize="{ minRows: 4, maxRows: 4}"
        :disabled="true"
        v-model="input">
      </el-input>
    </div>
    <el-main>
      <el-row v-for="(rowItem, rowKey) in keyMap" :key="rowKey">
        <el-col v-for="(colItem, colKey) in rowItem" :key="colKey" :span="colItem.span">
          <el-button style="min-width:100px;margin:4px;" :value="colItem.text" @click="pressKey">{{ colItem.text }}</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-card>
</template>
<script>
export default {
  name: 'caculator-page',
  data: () => {
    return {
      keyMap: {
        'row-1': {
          'clear': {
            'text': 'AC',
            'span': 6,
            'backgroundColor': '#000000'
          },
          'sign': {
            'text': '+/-',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          'percentage': {
            'text': '%',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          'divide': {
            'text': '/',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          }
        },
        'row-2': {
          '7': {
            'text': '7',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          '8': {
            'text': '8',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          '9': {
            'text': '9',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          'multiply': {
            'text': 'x',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          }
        },
        'row-3': {
          '4': {
            'text': '4',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          '5': {
            'text': '5',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          '6': {
            'text': '6',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          'subtract': {
            'text': '-',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          }
        },
        'row-4': {
          '1': {
            'text': '1',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          '2': {
            'text': '2',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          '3': {
            'text': '3',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          'add': {
            'text': '+',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          }
        },
        'row-5': {
          '0': {
            'text': '0',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          'space': {
            'text': 'M',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          '.': {
            'text': '.',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          },
          'equal': {
            'text': '=',
            'span': 6,
            'backgroundColor': '#FFFFFF'
          }
        }
      },
      input: '0'
    }
  },
  methods: {
    pressKey: function (event) {
      this.$electron.ipcRenderer.once('caculator-reply', function (event, arg) {
        console.log('emmm')
        console.log(arg)
      })
      this.$electron.ipcRenderer.send('caculator-send', event.target.value)

      this.valueDisplay(event.target.value)
    },
    valueDisplay: function (value) {
      this.$data.input = value
    }
  }
}
</script>