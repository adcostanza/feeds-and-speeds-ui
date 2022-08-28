(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["calculator"],{"8e22":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-toolbar",{attrs:{color:"primary",dark:""}},[a("v-icon",{staticStyle:{"margin-right":"8px"}},[e._v("mdi-calculator")]),a("v-toolbar-title",[e._v("Calculators Configuration")])],1),a("v-card",{attrs:{elevation:"2"}},[a("v-expansion-panels",e._l(Object.values(e.calculators),(function(t,l){return a("v-expansion-panel",{key:l},[a("v-expansion-panel-header",[e._v(e._s(t.name)+" ")]),a("v-expansion-panel-content",[a("calculator-form",{attrs:{calculator:t,"update-calculator":e.updateCalculator(t.name),"delete-calculator":e.deleteCalculator(t.name),"potential-cutters":e.potentialCutters,"potential-materials":e.potentialMaterials}})],1)],1)})),1)],1),a("v-card",[a("v-btn",{staticClass:"mr-4",staticStyle:{margin:"18px"},attrs:{color:"success"},on:{click:e.addNewCalculator}},[a("v-icon",[e._v("mdi-plus")]),e._v("Add New Calculator")],1)],1)],1)},c=[],r=a("ade3"),i=a("5530"),n=a("d4ec"),u=a("bee2"),o=a("262e"),s=a("2caf"),d=(a("d3b7"),a("b0c0"),a("07ac"),a("9ab4")),m=a("1b40"),b=a("c5c7"),v=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-row",[a("v-col",{attrs:{cols:"4"}},[a("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-text-field",{attrs:{rules:[e.requiredRule("Name")],label:"Name",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("v-select",{attrs:{items:[e.machine],"item-text":"name",label:"Machine",disabled:!0},model:{value:e.machine,callback:function(t){e.machine=t},expression:"machine"}}),a("v-select",{attrs:{items:e.potentialCutters,"item-text":"name",label:"Cutter","return-object":""},model:{value:e.cutter,callback:function(t){e.cutter=t},expression:"cutter"}}),a("v-select",{attrs:{items:e.potentialMaterials,"item-text":"name",label:"Material","return-object":""},model:{value:e.material,callback:function(t){e.material=t},expression:"material"}}),e._l(Object.keys(e.numberFields),(function(t){return a("v-text-field",{key:t,attrs:{rules:[e.requiredRule(e.numberFields[t].name)],label:e.numberFields[t].name,required:""},model:{value:e.numberFields[t].value,callback:function(a){e.$set(e.numberFields[t],"value",a)},expression:"numberFields[numberField].value"}})})),a("v-switch",{attrs:{label:"Show Equations",color:"success","hide-details":""},model:{value:e.showEquations,callback:function(t){e.showEquations=t},expression:"showEquations"}}),a("v-btn",{staticClass:"mr-4",staticStyle:{margin:"18px"},attrs:{disabled:!e.valid,color:"success"},on:{click:e.validate}},[e._v(" Submit ")]),a("v-btn",{staticClass:"mr-4",staticStyle:{margin:"18px"},attrs:{color:"error"},on:{click:e.deleteCalculator}},[a("v-icon",[e._v("mdi-delete")]),e._v("Delete ")],1)],2)],1),a("v-col",{attrs:{cols:"8"}},[a("v-simple-table",{scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[e._v("Calculation")]),e.showEquations?a("th",{staticClass:"text-left"},[e._v("Equation")]):e._e(),a("th",{staticClass:"text-left"},[e._v("Value")])])]),a("tbody",e._l(Object.entries(e.allValues),(function(t){var l=t[0],c=t[1];return a("tr",{key:l},[a("td",[e._v(e._s(l))]),e.showEquations?a("td",[a("div",{directives:[{name:"katex",rawName:"v-katex",value:e.asTex(l),expression:"asTex(key)"}],staticStyle:{"font-size":"16pt",padding:"4px"}})]):e._e(),a("td",[e._v(" "+e._s(e.valueDisplay(l,c))+" ")])])})),0)]},proxy:!0}])})],1)],1)],1)},h=[],p=(a("99af"),a("b64b"),a("2fe1")),f=a("d22b"),x=a("68da"),j=a("15f6"),O=a.n(j),k=a("6284"),y=function(e){Object(o["a"])(a,e);var t=Object(s["a"])(a);function a(){var e;return Object(n["a"])(this,a),e=t.apply(this,arguments),e.valid=!0,e.name="New Calculator",e.machine=null,e.cutter=null,e.material=null,e.showEquations=!0,e.numberFields={chipload:{name:"Chipload (in)",value:0},woc:{name:"Width of Cut (in)",value:0},doc:{name:"Depth of Cut (in)",value:0},rpm:{name:"RPM",value:0},maxAcceptableDeflection:{name:"Maximum Acceptable Deflection (in)",value:0}},e}return Object(u["a"])(a,[{key:"inputs",get:function(){return{chipload:this.numberFields.chipload.value,woc:this.numberFields.woc.value,doc:this.numberFields.doc.value,rpm:this.numberFields.rpm.value,maxAcceptableDeflection:this.numberFields.maxAcceptableDeflection.value,cutterDiameter:this.cutter.diameter,materialKFactor:this.material.kFactor,cutterFlutes:this.cutter.flutes,maximumMachineForce:this.machine.maximumMachineForce,routerOutputPower:Object(f["a"])(this.machine.router),cutterOverallStickout:this.cutter.overallStickout,cutterYoungsModulus:Object(x["c"])(this.cutter.material),cutterShankDiameter:this.cutter.shankDiameter,cutterLength:this.cutter.length}}},{key:"allMath",get:function(){return Object(b["a"])(this.inputs.woc,this.inputs.cutterDiameter,this.inputs.cutterShankDiameter)}},{key:"allValues",get:function(){try{return Object(b["d"])(this.inputs)}catch(e){return{adjustedChipload:0,feedrate:0,materialRemovalRate:0,powerUsage:0,torque:0,machineForce:0,machineForcePercent:0,availablePowerPercent:0,routerCutterPowerIncrease:0,maxDeflection:0,maxDeflectionPercent:0}}}},{key:"valueDisplay",value:function(e,t){return k["a"][e]?"".concat(k["a"][e].formatting(t)," ").concat(k["a"][e].unit):t}},{key:"asTex",value:function(e){return O()(this.allMath[e]).toTeX()}},{key:"subbed",value:function(e){return O()(Object(b["c"])(e,this.allMath)).toTeX()}},{key:"created",value:function(){this.name=this.calculator.name,this.machine=this.calculator.machine,this.cutter=this.calculator.cutter,this.material=this.calculator.material;for(var e=0,t=Object.keys(this.numberFields);e<t.length;e++){var a=t[e];this.numberFields[a].value=this.calculator[a]}}},{key:"requiredRule",value:function(e){return function(t){return!!t||"".concat(e," is required")}}},{key:"validate",value:function(){this.$refs.form.validate(),this.updateCalculator({name:this.name,machine:this.machine,cutter:this.cutter,material:this.material,chipload:this.numberFields.chipload.value,woc:this.numberFields.woc.value,doc:this.numberFields.doc.value,rpm:this.numberFields.rpm.value,maxAcceptableDeflection:this.numberFields.maxAcceptableDeflection.value})}},{key:"reset",value:function(){this.$refs.form.reset()}},{key:"resetValidation",value:function(){this.$refs.form.resetValidation()}}]),a}(m["c"]);Object(d["a"])([Object(m["b"])({required:!0})],y.prototype,"calculator",void 0),Object(d["a"])([Object(m["b"])({required:!0})],y.prototype,"potentialCutters",void 0),Object(d["a"])([Object(m["b"])({required:!0})],y.prototype,"potentialMaterials",void 0),Object(d["a"])([Object(m["b"])({required:!0})],y.prototype,"updateCalculator",void 0),Object(d["a"])([Object(m["b"])({required:!0})],y.prototype,"deleteCalculator",void 0),y=Object(d["a"])([p["b"]],y);var C=y,w=C,F=a("2877"),_=a("6544"),V=a.n(_),g=a("8336"),q=a("62ad"),M=a("4bd4"),D=a("132d"),S=a("0fd9"),E=a("b974"),P=a("1f4f"),T=a("b73d"),N=a("8654"),A=Object(F["a"])(w,v,h,!1,null,null,null),R=A.exports;V()(A,{VBtn:g["a"],VCol:q["a"],VForm:M["a"],VIcon:D["a"],VRow:S["a"],VSelect:E["a"],VSimpleTable:P["a"],VSwitch:T["a"],VTextField:N["a"]});var $=a("8e1a"),I=function(e){Object(o["a"])(a,e);var t=Object(s["a"])(a);function a(){var e;return Object(n["a"])(this,a),e=t.apply(this,arguments),e.calculators=b["b"].get().reduce((function(e,t){return Object(i["a"])(Object(i["a"])({},e),{},Object(r["a"])({},t.name,t))}),{}),e.defaultMachine=f["b"].get(),e.potentialMaterials=$["a"].get(),e.potentialCutters=x["b"].get(),e}return Object(u["a"])(a,[{key:"defaultMaterial",get:function(){return this.potentialMaterials[0]}},{key:"defaultCutter",get:function(){return this.potentialCutters[0]}},{key:"updateCalculator",value:function(e){var t=this;return function(a){a.name!==e&&delete t.calculators[e],t.calculators=Object(i["a"])(Object(i["a"])({},t.calculators),{},Object(r["a"])({},a.name,a))}}},{key:"deleteCalculator",value:function(e){var t=this;return function(){delete t.calculators[e],t.calculators=Object(i["a"])({},t.calculators)}}},{key:"calculatorsUpdated",value:function(){b["b"].set(Object.values(this.calculators))}},{key:"addNewCalculator",value:function(){this.calculators=Object(i["a"])(Object(i["a"])({},this.calculators),{},{"New Calculator":{name:"New Calculator",machine:this.defaultMachine,cutter:this.defaultCutter,material:this.defaultMaterial,chipload:.002,woc:.5*this.defaultCutter.diameter,doc:2*this.defaultCutter.diameter,rpm:18e3,maxAcceptableDeflection:.001}})}}]),a}(m["c"]);Object(d["a"])([Object(m["d"])("calculators",{deep:!0})],I.prototype,"calculatorsUpdated",null),I=Object(d["a"])([Object(m["a"])({components:{CalculatorForm:R}})],I);var U=I,z=U,B=a("b0af"),J=a("cd55"),X=a("49e2"),H=a("c865"),K=a("0393"),L=a("71d9"),W=a("2a7f"),Y=Object(F["a"])(z,l,c,!1,null,null,null);t["default"]=Y.exports;V()(Y,{VBtn:g["a"],VCard:B["a"],VExpansionPanel:J["a"],VExpansionPanelContent:X["a"],VExpansionPanelHeader:H["a"],VExpansionPanels:K["a"],VIcon:D["a"],VToolbar:L["a"],VToolbarTitle:W["a"]})}}]);
//# sourceMappingURL=calculator.2af398b3.js.map