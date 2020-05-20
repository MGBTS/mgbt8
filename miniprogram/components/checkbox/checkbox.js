// miniprogram/components/checkbox/checkbox.js
Component({
  properties:{
    checked:{
      type:Boolean,
      default:false
    }
  },
  data:{

  },
  ready(){

  },
  methods:{
    handleToggle(e){
      this.data.checked=!this.data.checked
      this.setData(this.data)
      this.triggerEvent('change',this)
    }
  }
})