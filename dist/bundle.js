(()=>{"use strict";function e(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}var t;!function(e){e.ACTIVE="active",e.FINISHED="finished"}(t||(t={}));class n{constructor(e,t,n,r,s){this.Id=e,this.Title=t,this.Description=n,this.People=r,this.Status=s}}class r extends class{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new r),this.instance}addProject(e,r,s){const i=new n(Date.now().toString(),e,r,s,t.ACTIVE);this.projects.push(i),this.updateListeners()}moveProject(e,t){const n=this.projects.find((t=>t.Id===e));n&&n.Status!==t&&(n.Status=t,this.updateListeners())}updateListeners(){for(const e of this.listeners)e(this.projects.slice())}}const s=r.getInstance();class i{constructor(e){this.input=e}validate(){let e=this.input,t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length,!t)?(alert(`${e.name} kitöltése kötelező!`),!1):null==e.minLength||"string"!=typeof e.value||(t=t&&e.value.length>e.minLength,t)?null==e.maxLength||"string"!=typeof e.value||(t=t&&e.value.length>e.maxLength,t)?null==e.min||"number"!=typeof e.value||(t=t&&e.value>=e.min,t)?null==e.max||"number"!=typeof e.value||(t=t&&e.value<=e.max,t)?t:(alert(`${e.name} értéke maximum ${e.max}!`),!1):(alert(`${e.name} értéke minimum ${e.min}!`),!1):(alert(`${e.name} hossza maximum ${e.maxLength}!`),!1):(alert(`${e.name} hossza minimum ${e.minLength}!`),!1)}}class l{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}class a extends l{constructor(){super("project-input","app",!0,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.peopleInputElement=this.element.querySelector("#people"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}gatherUserInput(){const e=this.titleInputElement.value,t=this.descriptionInputElement.value,n=this.peopleInputElement.value,r=new i({name:this.titleInputElement.name,value:e,required:!0}),s=new i({name:this.descriptionInputElement.name,value:t,required:!0,minLength:5}),l=new i({name:this.peopleInputElement.name,value:+n,required:!0,min:1,max:5});return r.validate()&&s.validate()&&l.validate()?[e,t,+n]:void 0}clearInputs(){this.element.reset()}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();if(Array.isArray(t)){const[e,n,r]=t;s.addProject(e,n,r),this.clearInputs()}}}!function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);i>3&&l&&Object.defineProperty(t,n,l)}([e],a.prototype,"submitHandler",null);var o=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class c extends l{constructor(e,t){super("single-project",e,!1,t.Id),this.project=t,this.configure(),this.renderContent()}get persons(){return 1===this.project.People?"1 person":`${this.project.People} persons`}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.Id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.Title,this.element.querySelector("h3").textContent=this.persons,this.element.querySelector("p").textContent=this.project.Description}}o([e],c.prototype,"dragStartHandler",null),o([e],c.prototype,"dragEndHandler",null);var d=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class u extends l{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProjects=[],this.configure(),this.renderContent()}dragOverHandler(e){if(e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]){e.preventDefault();const t=this.element.querySelector("ul");null==t||t.classList.add("droppable")}}dropHandler(e){const t=e.dataTransfer.getData("text/plain");s.moveProject(t,this.type)}dragLeaveHandler(e){const t=this.element.querySelector("ul");null==t||t.classList.remove("droppable")}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),this.element.addEventListener("drop",this.dropHandler),s.addListener((e=>{const n=e.filter((e=>this.type===t.ACTIVE?e.Status===t.ACTIVE:e.Status===t.FINISHED));this.assignedProjects=n,this.renderProjects()})),this.renderContent()}renderContent(){const e=`${this.type}-project-list`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent=this.type.toUpperCase()+"PROJECTS"}renderProjects(){document.getElementById(`${this.type}-project-list`).innerHTML="";for(const e of this.assignedProjects)new c(this.element.querySelector("ul").id,e)}}d([e],u.prototype,"dragOverHandler",null),d([e],u.prototype,"dropHandler",null),d([e],u.prototype,"dragLeaveHandler",null),new a,new u(t.ACTIVE),new u(t.FINISHED)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiJtQkFDTyxTQUFTQSxFQUNkQyxFQUNBQyxFQUNBQyxHQUVBLE1BQU1DLEVBQWlCRCxFQUFXRSxNQVFsQyxNQVB5QyxDQUN2Q0MsY0FBYyxFQUNkQyxNQUVFLE9BRGdCSCxFQUFlSSxLQUFLQyxRQ1YxQyxJQUFZQyxHQUFaLFNBQVlBLEdBQ1Ysa0JBQ0Esc0JBRkYsQ0FBWUEsSUFBQUEsRUFBYSxLQUtsQixNQUFNQyxFQUNYQyxZQUNTQyxFQUNBQyxFQUNBQyxFQUNBQyxFQUNBQyxHQUpBLEtBQUFKLEdBQUFBLEVBQ0EsS0FBQUMsTUFBQUEsRUFDQSxLQUFBQyxZQUFBQSxFQUNBLEtBQUFDLE9BQUFBLEVBQ0EsS0FBQUMsT0FBQUEsR0NBSixNQUFNQyxVQVBiLG9CQUNZLEtBQUFDLFVBQTJCLEdBQ3JDQyxZQUFZQyxHQUNWWixLQUFLVSxVQUFVRyxLQUFLRCxLQVF0QixjQUNFRSxRQUpNLEtBQUFDLFNBQXNCLEdBTzlCQyxxQkFDRSxPQUFJaEIsS0FBS2lCLFdBR1RqQixLQUFLaUIsU0FBVyxJQUFJUixHQUZYVCxLQUFLaUIsU0FNVEMsV0FBV0MsRUFBZUMsRUFBcUJDLEdBQ3BELE1BQU1DLEVBQWEsSUFBSXBCLEVBQ3JCcUIsS0FBS0MsTUFBTUMsV0FDWE4sRUFDQUMsRUFDQUMsRUFDQXBCLEVBQWN5QixRQUdoQjFCLEtBQUtlLFNBQVNGLEtBQUtTLEdBRW5CdEIsS0FBSzJCLGtCQUdBQyxZQUFZQyxFQUFtQkMsR0FDcEMsTUFBTUMsRUFBVS9CLEtBQUtlLFNBQVNpQixNQUFNQyxHQUFRQSxFQUFJN0IsS0FBT3lCLElBQ25ERSxHQUFXQSxFQUFRdkIsU0FBV3NCLElBQ2hDQyxFQUFRdkIsT0FBU3NCLEVBQ2pCOUIsS0FBSzJCLG1CQUlEQSxrQkFDTixJQUFLLE1BQU1mLEtBQWNaLEtBQUtVLFVBQzVCRSxFQUFXWixLQUFLZSxTQUFTbUIsVUFLeEIsTUFBTUMsRUFBZTFCLEVBQWEyQixjQzlDbEMsTUFBTUMsRUFDWGxDLFlBQW1CbUMsR0FBQSxLQUFBQSxNQUFBQSxFQUNaQyxXQUNMLElBQUlDLEVBQWdDeEMsS0FBS3NDLE1BQ3JDRyxHQUFtQixFQUV2QixPQUFJRCxFQUFpQkUsV0FDbkJELEVBQ0VBLEdBQStELElBQXBERCxFQUFpQjVDLE1BQU02QixXQUFXa0IsT0FBT0MsUUFDakRILElBQ0hJLE1BQU0sR0FBR0wsRUFBaUJNLDZCQUNuQixHQUlxQixNQUE5Qk4sRUFBaUJPLFdBQ2lCLGlCQUEzQlAsRUFBaUI1QyxRQUV4QjZDLEVBQ0VBLEdBQVdELEVBQWlCNUMsTUFBTWdELE9BQVNKLEVBQWlCTyxVQUN6RE4sR0FReUIsTUFBOUJELEVBQWlCUSxXQUNpQixpQkFBM0JSLEVBQWlCNUMsUUFFeEI2QyxFQUNFQSxHQUFXRCxFQUFpQjVDLE1BQU1nRCxPQUFTSixFQUFpQlEsVUFDekRQLEdBUW1CLE1BQXhCRCxFQUFpQlMsS0FDaUIsaUJBQTNCVCxFQUFpQjVDLFFBRXhCNkMsRUFBVUEsR0FBV0QsRUFBaUI1QyxPQUFTNEMsRUFBaUJTLElBQzNEUixHQVFtQixNQUF4QkQsRUFBaUJVLEtBQ2lCLGlCQUEzQlYsRUFBaUI1QyxRQUV4QjZDLEVBQVVBLEdBQVdELEVBQWlCNUMsT0FBUzRDLEVBQWlCVSxJQUMzRFQsR0FPQUEsR0FOSEksTUFDRSxHQUFHTCxFQUFpQk0sdUJBQXVCTixFQUFpQlUsU0FFdkQsSUFmUEwsTUFDRSxHQUFHTCxFQUFpQk0sdUJBQXVCTixFQUFpQlMsU0FFdkQsSUFmUEosTUFDRSxHQUFHTCxFQUFpQk0sdUJBQXVCTixFQUFpQlEsZUFFdkQsSUFoQlBILE1BQ0UsR0FBR0wsRUFBaUJNLHVCQUF1Qk4sRUFBaUJPLGVBRXZELElDbENBLE1BQWVJLEVBUTVCaEQsWUFDRWlELEVBQ0FDLEVBQ0FDLEVBQ0FDLEdBRUF2RCxLQUFLd0QsZ0JBQWtCQyxTQUFTQyxlQUM5Qk4sR0FFRnBELEtBQUsyRCxZQUFjRixTQUFTQyxlQUFlTCxHQUMzQyxNQUFNTyxFQUFlSCxTQUFTSSxXQUM1QjdELEtBQUt3RCxnQkFBZ0JNLFNBQ3JCLEdBRUY5RCxLQUFLK0QsUUFBVUgsRUFBYUksa0JBQ3hCVCxJQUFjdkQsS0FBSytELFFBQVFFLEdBQUtWLEdBQ3BDdkQsS0FBS2tFLE9BQU9aLEdBR05ZLE9BQU9DLEdBQ2JuRSxLQUFLMkQsWUFBWVMsc0JBQ2ZELEVBQW9CLGFBQWUsWUFDbkNuRSxLQUFLK0QsVUN6QkksTUFBTU0sVUFBcUJsQixFQVF4Q2hELGNBQ0VXLE1BQU0sZ0JBQWlCLE9BQU8sRUFBTSxjQUNwQ2QsS0FBS3NFLGtCQUFvQnRFLEtBQUsrRCxRQUFRUSxjQUNwQyxVQUdGdkUsS0FBS3dFLHdCQUEwQnhFLEtBQUsrRCxRQUFRUSxjQUMxQyxnQkFHRnZFLEtBQUt5RSxtQkFBcUJ6RSxLQUFLK0QsUUFBUVEsY0FDckMsV0FFRnZFLEtBQUswRSxZQUdBQSxZQUVMMUUsS0FBSytELFFBQVFZLGlCQUFpQixTQUFVM0UsS0FBSzRFLGVBRy9DQyxpQkFFUUMsa0JBQ04sTUFBTUMsRUFBZS9FLEtBQUtzRSxrQkFBa0IxRSxNQUN0Q29GLEVBQXFCaEYsS0FBS3dFLHdCQUF3QjVFLE1BQ2xEcUYsRUFBZ0JqRixLQUFLeUUsbUJBQW1CN0UsTUFFeEN1QixFQUFRLElBQUlrQixFQUFpQixDQUNqQ1MsS0FBTTlDLEtBQUtzRSxrQkFBa0J4QixLQUM3QmxELE1BQU9tRixFQUNQckMsVUFBVSxJQUdOdEIsRUFBYyxJQUFJaUIsRUFBaUIsQ0FDdkNTLEtBQU05QyxLQUFLd0Usd0JBQXdCMUIsS0FDbkNsRCxNQUFPb0YsRUFDUHRDLFVBQVUsRUFDVkssVUFBVyxJQUdQMUIsRUFBUyxJQUFJZ0IsRUFBaUIsQ0FDbENTLEtBQU05QyxLQUFLeUUsbUJBQW1CM0IsS0FDOUJsRCxPQUFRcUYsRUFDUnZDLFVBQVUsRUFDVk8sSUFBSyxFQUNMQyxJQUFLLElBR1AsT0FBSy9CLEVBQU1vQixZQUFlbkIsRUFBWW1CLFlBQWVsQixFQUFPa0IsV0FHbkQsQ0FBQ3dDLEVBQWNDLEdBQXFCQyxRQUYzQyxFQUtJQyxjQUNObEYsS0FBSytELFFBQVFvQixRQUlQUCxjQUFjUSxHQUNwQkEsRUFBTUMsaUJBQ04sTUFBTUMsRUFBWXRGLEtBQUs4RSxrQkFDdkIsR0FBSVMsTUFBTUMsUUFBUUYsR0FBWSxDQUM1QixNQUFPbkUsRUFBT3NFLEVBQU1wRSxHQUFVaUUsRUFDOUJuRCxFQUFhakIsV0FBV0MsRUFBT3NFLEVBQU1wRSxHQUNyQ3JCLEtBQUtrRixpQiwwVEFOVCxFQURDM0YsRyw0V0NuRVksTUFBTW1HLFVBQ1h2QyxFQWFSaEQsWUFBWXdGLEVBQWdCNUQsR0FDMUJqQixNQUFNLGlCQUFrQjZFLEdBQVEsRUFBTzVELEVBQVEzQixJQUMvQ0osS0FBSytCLFFBQVVBLEVBQ2YvQixLQUFLMEUsWUFDTDFFLEtBQUs2RSxnQkFaSGUsY0FDRixPQUE0QixJQUF4QjVGLEtBQUsrQixRQUFReEIsT0FDUixXQUVBLEdBQUdQLEtBQUsrQixRQUFReEIsaUJBWTNCc0YsaUJBQWlCVCxHQUNmQSxFQUFNVSxhQUFjQyxRQUFRLGFBQWMvRixLQUFLK0IsUUFBUTNCLElBQ3ZEZ0YsRUFBTVUsYUFBY0UsY0FBZ0IsT0FJdENDLGVBQWViLElBRWZWLFlBQ0UxRSxLQUFLK0QsUUFBUVksaUJBQWlCLFlBQWEzRSxLQUFLNkYsa0JBQ2hEN0YsS0FBSytELFFBQVFZLGlCQUFpQixVQUFXM0UsS0FBS2lHLGdCQUdoRHBCLGdCQUNFN0UsS0FBSytELFFBQVFRLGNBQWMsTUFBTzJCLFlBQWNsRyxLQUFLK0IsUUFBUTFCLE1BQzdETCxLQUFLK0QsUUFBUVEsY0FBYyxNQUFPMkIsWUFBY2xHLEtBQUs0RixRQUNyRDVGLEtBQUsrRCxRQUFRUSxjQUFjLEtBQU0yQixZQUFjbEcsS0FBSytCLFFBQVF6QixhQWhCOUQsR0FEQ2YsRyxxQ0FPRCxHQURDQSxHLDZXQ3pCWSxNQUFNNEcsVUFDWGhELEVBS1JoRCxZQUFvQmlHLEdBQ2xCdEYsTUFBTSxlQUFnQixPQUFPLEVBQU8sR0FBR3NGLGNBRHJCLEtBQUFBLEtBQUFBLEVBRWxCcEcsS0FBS3FHLGlCQUFtQixHQUN4QnJHLEtBQUswRSxZQUNMMUUsS0FBSzZFLGdCQUlQeUIsZ0JBQWdCbEIsR0FDZCxHQUFJQSxFQUFNVSxjQUFnRCxlQUFoQ1YsRUFBTVUsYUFBYVMsTUFBTSxHQUFxQixDQUN0RW5CLEVBQU1DLGlCQUNOLE1BQU1tQixFQUFTeEcsS0FBSytELFFBQVFRLGNBQWMsTUFDMUNpQyxNQUFBQSxHQUFBQSxFQUFRQyxVQUFVQyxJQUFJLGNBSzFCQyxZQUFZdkIsR0FDVixNQUFNd0IsRUFBUXhCLEVBQU1VLGFBQWNlLFFBQVEsY0FDMUMxRSxFQUFhUCxZQUFZZ0YsRUFBTzVHLEtBQUtvRyxNQUl2Q1UsaUJBQWlCQyxHQUNmLE1BQU1QLEVBQVN4RyxLQUFLK0QsUUFBUVEsY0FBYyxNQUMxQ2lDLE1BQUFBLEdBQUFBLEVBQVFDLFVBQVVPLE9BQU8sYUFHM0J0QyxZQUNFMUUsS0FBSytELFFBQVFZLGlCQUFpQixXQUFZM0UsS0FBS3NHLGlCQUMvQ3RHLEtBQUsrRCxRQUFRWSxpQkFBaUIsWUFBYTNFLEtBQUs4RyxrQkFDaEQ5RyxLQUFLK0QsUUFBUVksaUJBQWlCLE9BQVEzRSxLQUFLMkcsYUFFM0N4RSxFQUFheEIsYUFBYUksSUFDeEIsTUFBTWtHLEVBQW1CbEcsRUFBU21HLFFBQVFqRixHQUNwQ2pDLEtBQUtvRyxPQUFTbkcsRUFBY3lCLE9BQ3ZCTyxFQUFJekIsU0FBV1AsRUFBY3lCLE9BRS9CTyxFQUFJekIsU0FBV1AsRUFBY2tILFdBRXRDbkgsS0FBS3FHLGlCQUFtQlksRUFDeEJqSCxLQUFLb0gsb0JBRVBwSCxLQUFLNkUsZ0JBR1BBLGdCQUNFLE1BQU13QyxFQUFTLEdBQUdySCxLQUFLb0csb0JBQ3ZCcEcsS0FBSytELFFBQVFRLGNBQWMsTUFBT04sR0FBS29ELEVBQ3ZDckgsS0FBSytELFFBQVFRLGNBQWMsTUFBTzJCLFlBQ2hDbEcsS0FBS29HLEtBQUtrQixjQUFnQixXQUd0QkYsaUJBQ1MzRCxTQUFTQyxlQUN0QixHQUFHMUQsS0FBS29HLHFCQUdIbUIsVUFBWSxHQUNuQixJQUFLLE1BQU1DLEtBQVd4SCxLQUFLcUcsaUJBQ3pCLElBQUlYLEVBQVkxRixLQUFLK0QsUUFBUVEsY0FBYyxNQUFPTixHQUFJdUQsSUFwRDFELEdBRENqSSxHLG9DQVVELEdBRENBLEcsZ0NBT0QsR0FEQ0EsRyxxQ0MvQkgsSUFBSThFLEVBQ0osSUFBSThCLEVBQVlsRyxFQUFjeUIsUUFDOUIsSUFBSXlFLEVBQVlsRyxFQUFja0gsVyIsInNvdXJjZXMiOlsid2VicGFjazovLzA4X3RzX2RyYWdfZHJvcF9wcm9qZWN0Ly4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vMDhfdHNfZHJhZ19kcm9wX3Byb2plY3QvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vMDhfdHNfZHJhZ19kcm9wX3Byb2plY3QvLi9zcmMvc3RhdGUvcHJvamVjdC1zdGF0ZS50cyIsIndlYnBhY2s6Ly8wOF90c19kcmFnX2Ryb3BfcHJvamVjdC8uL3NyYy91dGlsL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vMDhfdHNfZHJhZ19kcm9wX3Byb2plY3QvLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8wOF90c19kcmFnX2Ryb3BfcHJvamVjdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vMDhfdHNfZHJhZ19kcm9wX3Byb2plY3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHMiLCJ3ZWJwYWNrOi8vMDhfdHNfZHJhZ19kcm9wX3Byb2plY3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vMDhfdHNfZHJhZ19kcm9wX3Byb2plY3QvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGF1dG9iaW5kIGRlY29yYXRvcjogTmVlZCB0byBzZXQgdHNjb25maWcgPT4gXCJleHBlcmltZW50YWxEZWNvcmF0b3JzXCI6IHRydWVcclxuZXhwb3J0IGZ1bmN0aW9uIEF1dG9iaW5kKFxyXG4gIF90YXJnZXQ6IGFueSxcclxuICBfbWV0aG9kTmFtZTogc3RyaW5nLFxyXG4gIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxyXG4pIHtcclxuICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgY29uc3QgYWRqRGVzY3JpdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBnZXQoKSB7XHJcbiAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xyXG4gICAgICByZXR1cm4gYm91bmRGbjtcclxuICAgIH0sXHJcbiAgfTtcclxuICByZXR1cm4gYWRqRGVzY3JpdG9yO1xyXG59XHJcbiIsImV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xyXG4gIEFDVElWRSA9IFwiYWN0aXZlXCIsXHJcbiAgRklOSVNIRUQgPSBcImZpbmlzaGVkXCIsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBJZDogc3RyaW5nLFxyXG4gICAgcHVibGljIFRpdGxlOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgRGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHB1YmxpYyBQZW9wbGU6IG51bWJlcixcclxuICAgIHB1YmxpYyBTdGF0dXM6IFByb2plY3RTdGF0dXNcclxuICApIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xyXG5cclxudHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xyXG5cclxuY2xhc3MgU3RhdGU8VD4ge1xyXG4gIHByb3RlY3RlZCBsaXN0ZW5lcnM6IExpc3RlbmVyPFQ+W10gPSBbXTtcclxuICBhZGRMaXN0ZW5lcihsaXN0ZW5lckZuOiBMaXN0ZW5lcjxUPikge1xyXG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XHJcbiAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvamVjdFN0YXRlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHBlb3BsZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXHJcbiAgICAgIERhdGUubm93KCkudG9TdHJpbmcoKSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBwZW9wbGUsXHJcbiAgICAgIFByb2plY3RTdGF0dXMuQUNUSVZFXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVQcm9qZWN0KHByb2plY3RJZDogc3RyaW5nLCBuZXdTdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcclxuICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQoKHByaikgPT4gcHJqLklkID09PSBwcm9qZWN0SWQpO1xyXG4gICAgaWYgKHByb2plY3QgJiYgcHJvamVjdC5TdGF0dXMgIT09IG5ld1N0YXR1cykge1xyXG4gICAgICBwcm9qZWN0LlN0YXR1cyA9IG5ld1N0YXR1cztcclxuICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlTGlzdGVuZXJzKCkge1xyXG4gICAgZm9yIChjb25zdCBsaXN0ZW5lckZuIG9mIHRoaXMubGlzdGVuZXJzKSB7XHJcbiAgICAgIGxpc3RlbmVyRm4odGhpcy5wcm9qZWN0cy5zbGljZSgpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwcm9qZWN0U3RhdGUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKTtcclxuIiwiaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xyXG4gIG1heExlbmd0aD86IG51bWJlcjtcclxuICBtaW4/OiBudW1iZXI7XHJcbiAgbWF4PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGFibGVJbnB1dCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGlucHV0OiBWYWxpZGF0YWJsZSkge31cclxuICBwdWJsaWMgdmFsaWRhdGUoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgdmFsaWRhdGFibGVJbnB1dDogVmFsaWRhdGFibGUgPSB0aGlzLmlucHV0O1xyXG4gICAgbGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGlmICh2YWxpZGF0YWJsZUlucHV0LnJlcXVpcmVkKSB7XHJcbiAgICAgIGlzVmFsaWQgPVxyXG4gICAgICAgIGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDA7XHJcbiAgICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICAgIGFsZXJ0KGAke3ZhbGlkYXRhYmxlSW5wdXQubmFtZX0ga2l0w7ZsdMOpc2Uga8O2dGVsZXrFkSFgKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGggIT0gbnVsbCAmJlxyXG4gICAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJzdHJpbmdcIlxyXG4gICAgKSB7XHJcbiAgICAgIGlzVmFsaWQgPVxyXG4gICAgICAgIGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS5sZW5ndGggPiB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aDtcclxuICAgICAgaWYgKCFpc1ZhbGlkKSB7XHJcbiAgICAgICAgYWxlcnQoXHJcbiAgICAgICAgICBgJHt2YWxpZGF0YWJsZUlucHV0Lm5hbWV9IGhvc3N6YSBtaW5pbXVtICR7dmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGh9IWBcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCAhPSBudWxsICYmXHJcbiAgICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiXHJcbiAgICApIHtcclxuICAgICAgaXNWYWxpZCA9XHJcbiAgICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA+IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoO1xyXG4gICAgICBpZiAoIWlzVmFsaWQpIHtcclxuICAgICAgICBhbGVydChcclxuICAgICAgICAgIGAke3ZhbGlkYXRhYmxlSW5wdXQubmFtZX0gaG9zc3phIG1heGltdW0gJHt2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aH0hYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHZhbGlkYXRhYmxlSW5wdXQubWluICE9IG51bGwgJiZcclxuICAgICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwibnVtYmVyXCJcclxuICAgICkge1xyXG4gICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID49IHZhbGlkYXRhYmxlSW5wdXQubWluO1xyXG4gICAgICBpZiAoIWlzVmFsaWQpIHtcclxuICAgICAgICBhbGVydChcclxuICAgICAgICAgIGAke3ZhbGlkYXRhYmxlSW5wdXQubmFtZX0gw6lydMOpa2UgbWluaW11bSAke3ZhbGlkYXRhYmxlSW5wdXQubWlufSFgXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdmFsaWRhdGFibGVJbnB1dC5tYXggIT0gbnVsbCAmJlxyXG4gICAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJudW1iZXJcIlxyXG4gICAgKSB7XHJcbiAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPD0gdmFsaWRhdGFibGVJbnB1dC5tYXg7XHJcbiAgICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICAgIGFsZXJ0KFxyXG4gICAgICAgICAgYCR7dmFsaWRhdGFibGVJbnB1dC5uYW1lfSDDqXJ0w6lrZSBtYXhpbXVtICR7dmFsaWRhdGFibGVJbnB1dC5tYXh9IWBcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxcclxuICBUIGV4dGVuZHMgSFRNTEVsZW1lbnQsXHJcbiAgVSBleHRlbmRzIEhUTUxFbGVtZW50XHJcbj4ge1xyXG4gIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICBob3N0RWxlbWVudDogVDtcclxuICBlbGVtZW50OiBVO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHRlbXBsYXRlSWQ6IHN0cmluZyxcclxuICAgIGhvc3RFbGVtZW50SWQ6IHN0cmluZyxcclxuICAgIGluc2VydEF0U3RhcnQ6IGJvb2xlYW4sXHJcbiAgICBuZXdFbGVtZW50SWQ/OiBzdHJpbmdcclxuICApIHtcclxuICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIHRlbXBsYXRlSWRcclxuICAgICkgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSBhcyBUO1xyXG4gICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShcclxuICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCxcclxuICAgICAgdHJ1ZVxyXG4gICAgKTtcclxuICAgIHRoaXMuZWxlbWVudCA9IGltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZCBhcyBVO1xyXG4gICAgaWYgKG5ld0VsZW1lbnRJZCkgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xyXG4gICAgdGhpcy5hdHRhY2goaW5zZXJ0QXRTdGFydCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdEJlZ2lubmluZzogYm9vbGVhbikge1xyXG4gICAgdGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgIGluc2VydEF0QmVnaW5uaW5nID8gXCJhZnRlcmJlZ2luXCIgOiBcImJlZm9yZWVuZFwiLFxyXG4gICAgICB0aGlzLmVsZW1lbnRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZDtcclxuICBhYnN0cmFjdCByZW5kZXJDb250ZW50KCk6IHZvaWQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0YWJsZUlucHV0IH0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvblwiO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnQ8XHJcbiAgSFRNTERpdkVsZW1lbnQsXHJcbiAgSFRNTEZvcm1FbGVtZW50XHJcbj4ge1xyXG4gIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihcInByb2plY3QtaW5wdXRcIiwgXCJhcHBcIiwgdHJ1ZSwgXCJ1c2VyLWlucHV0XCIpO1xyXG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiN0aXRsZVwiXHJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNkZXNjcmlwdGlvblwiXHJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjcGVvcGxlXCJcclxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29uZmlndXJlKCkge1xyXG4gICAgLy8gdXNlIGEgZGVjb3JhdG9yIGluc3RlYWQgb2YgLmJpbmQodGhpcylcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXJDb250ZW50KCk6IHZvaWQge31cclxuXHJcbiAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XHJcbiAgICBjb25zdCBlbnRlcmVkVGl0bGUgPSB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3QgZW50ZXJlZERlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IGVudGVyZWRQZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IG5ldyBWYWxpZGF0YWJsZUlucHV0KHtcclxuICAgICAgbmFtZTogdGhpcy50aXRsZUlucHV0RWxlbWVudC5uYW1lLFxyXG4gICAgICB2YWx1ZTogZW50ZXJlZFRpdGxlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbmV3IFZhbGlkYXRhYmxlSW5wdXQoe1xyXG4gICAgICBuYW1lOiB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50Lm5hbWUsXHJcbiAgICAgIHZhbHVlOiBlbnRlcmVkRGVzY3JpcHRpb24sXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW5MZW5ndGg6IDUsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwZW9wbGUgPSBuZXcgVmFsaWRhdGFibGVJbnB1dCh7XHJcbiAgICAgIG5hbWU6IHRoaXMucGVvcGxlSW5wdXRFbGVtZW50Lm5hbWUsXHJcbiAgICAgIHZhbHVlOiArZW50ZXJlZFBlb3BsZSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1pbjogMSxcclxuICAgICAgbWF4OiA1LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF0aXRsZS52YWxpZGF0ZSgpIHx8ICFkZXNjcmlwdGlvbi52YWxpZGF0ZSgpIHx8ICFwZW9wbGUudmFsaWRhdGUoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gW2VudGVyZWRUaXRsZSwgZW50ZXJlZERlc2NyaXB0aW9uLCArZW50ZXJlZFBlb3BsZV07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgY2xlYXJJbnB1dHMoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xyXG4gICAgICBjb25zdCBbdGl0bGUsIGRlc2MsIHBlb3BsZV0gPSB1c2VySW5wdXQ7XHJcbiAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjLCBwZW9wbGUpO1xyXG4gICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcclxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjtcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0SXRlbVxyXG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMaW5rRWxlbWVudD5cclxuICBpbXBsZW1lbnRzIERyYWdnYWJsZVxyXG57XHJcbiAgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0O1xyXG5cclxuICBnZXQgcGVyc29ucygpIHtcclxuICAgIGlmICh0aGlzLnByb2plY3QuUGVvcGxlID09PSAxKSB7XHJcbiAgICAgIHJldHVybiBcIjEgcGVyc29uXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5wcm9qZWN0LlBlb3BsZX0gcGVyc29uc2A7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJvamVjdDogUHJvamVjdCkge1xyXG4gICAgc3VwZXIoXCJzaW5nbGUtcHJvamVjdFwiLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LklkKTtcclxuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgdGhpcy5wcm9qZWN0LklkKTtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZCA9IFwibW92ZVwiO1xyXG4gIH1cclxuXHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJhZ0VuZEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge31cclxuXHJcbiAgY29uZmlndXJlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckNvbnRlbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5UaXRsZTtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDNcIikhLnRleHRDb250ZW50ID0gdGhpcy5wZXJzb25zO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5EZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xyXG5pbXBvcnQgeyBEcmFnVGFyZ2V0IH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjtcclxuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50XCI7XHJcbmltcG9ydCBQcm9qZWN0SXRlbSBmcm9tIFwiLi9wcm9qZWN0LWl0ZW1cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RMaXN0XHJcbiAgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PlxyXG4gIGltcGxlbWVudHMgRHJhZ1RhcmdldFxyXG57XHJcbiAgYXNzaWduZWRQcm9qZWN0czogUHJvamVjdFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFByb2plY3RTdGF0dXMpIHtcclxuICAgIHN1cGVyKFwicHJvamVjdC1saXN0XCIsIFwiYXBwXCIsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xyXG4gICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gW107XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09IFwidGV4dC9wbGFpblwiKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIik7XHJcbiAgICAgIGxpc3RFbD8uY2xhc3NMaXN0LmFkZChcImRyb3BwYWJsZVwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHByaklkID0gZXZlbnQuZGF0YVRyYW5zZmVyIS5nZXREYXRhKFwidGV4dC9wbGFpblwiKTtcclxuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChwcmpJZCwgdGhpcy50eXBlKTtcclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpO1xyXG4gICAgbGlzdEVsPy5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcHBhYmxlXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRsZXIpO1xyXG5cclxuICAgIHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcigocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xyXG4gICAgICBjb25zdCByZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcmopID0+IHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSBQcm9qZWN0U3RhdHVzLkFDVElWRSkge1xyXG4gICAgICAgICAgcmV0dXJuIHByai5TdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQUNUSVZFO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJqLlN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5GSU5JU0hFRDtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IHJlbGV2YW50UHJvamVjdHM7XHJcbiAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0LWxpc3RgO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSEuaWQgPSBsaXN0SWQ7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMudHlwZS50b1VwcGVyQ2FzZSgpICsgXCJQUk9KRUNUU1wiO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcclxuICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBgJHt0aGlzLnR5cGV9LXByb2plY3QtbGlzdGBcclxuICAgICkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcblxyXG4gICAgbGlzdEVsLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XHJcbiAgICAgIG5ldyBQcm9qZWN0SXRlbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5pZCwgcHJqSXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQcm9qZWN0SW5wdXQgZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0XCI7XHJcbmltcG9ydCBQcm9qZWN0TGlzdCBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4vbW9kZWxzL3Byb2plY3RcIjtcclxuXHJcbm5ldyBQcm9qZWN0SW5wdXQoKTtcclxubmV3IFByb2plY3RMaXN0KFByb2plY3RTdGF0dXMuQUNUSVZFKTtcclxubmV3IFByb2plY3RMaXN0KFByb2plY3RTdGF0dXMuRklOSVNIRUQpO1xyXG4iXSwibmFtZXMiOlsiQXV0b2JpbmQiLCJfdGFyZ2V0IiwiX21ldGhvZE5hbWUiLCJkZXNjcmlwdG9yIiwib3JpZ2luYWxNZXRob2QiLCJ2YWx1ZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsImJpbmQiLCJ0aGlzIiwiUHJvamVjdFN0YXR1cyIsIlByb2plY3QiLCJjb25zdHJ1Y3RvciIsIklkIiwiVGl0bGUiLCJEZXNjcmlwdGlvbiIsIlBlb3BsZSIsIlN0YXR1cyIsIlByb2plY3RTdGF0ZSIsImxpc3RlbmVycyIsImFkZExpc3RlbmVyIiwibGlzdGVuZXJGbiIsInB1c2giLCJzdXBlciIsInByb2plY3RzIiwic3RhdGljIiwiaW5zdGFuY2UiLCJhZGRQcm9qZWN0IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBlb3BsZSIsIm5ld1Byb2plY3QiLCJEYXRlIiwibm93IiwidG9TdHJpbmciLCJBQ1RJVkUiLCJ1cGRhdGVMaXN0ZW5lcnMiLCJtb3ZlUHJvamVjdCIsInByb2plY3RJZCIsIm5ld1N0YXR1cyIsInByb2plY3QiLCJmaW5kIiwicHJqIiwic2xpY2UiLCJwcm9qZWN0U3RhdGUiLCJnZXRJbnN0YW5jZSIsIlZhbGlkYXRhYmxlSW5wdXQiLCJpbnB1dCIsInZhbGlkYXRlIiwidmFsaWRhdGFibGVJbnB1dCIsImlzVmFsaWQiLCJyZXF1aXJlZCIsInRyaW0iLCJsZW5ndGgiLCJhbGVydCIsIm5hbWUiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJtaW4iLCJtYXgiLCJDb21wb25lbnQiLCJ0ZW1wbGF0ZUlkIiwiaG9zdEVsZW1lbnRJZCIsImluc2VydEF0U3RhcnQiLCJuZXdFbGVtZW50SWQiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaG9zdEVsZW1lbnQiLCJpbXBvcnRlZE5vZGUiLCJpbXBvcnROb2RlIiwiY29udGVudCIsImVsZW1lbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImlkIiwiYXR0YWNoIiwiaW5zZXJ0QXRCZWdpbm5pbmciLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJQcm9qZWN0SW5wdXQiLCJ0aXRsZUlucHV0RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkZXNjcmlwdGlvbklucHV0RWxlbWVudCIsInBlb3BsZUlucHV0RWxlbWVudCIsImNvbmZpZ3VyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWJtaXRIYW5kbGVyIiwicmVuZGVyQ29udGVudCIsImdhdGhlclVzZXJJbnB1dCIsImVudGVyZWRUaXRsZSIsImVudGVyZWREZXNjcmlwdGlvbiIsImVudGVyZWRQZW9wbGUiLCJjbGVhcklucHV0cyIsInJlc2V0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJJbnB1dCIsIkFycmF5IiwiaXNBcnJheSIsImRlc2MiLCJQcm9qZWN0SXRlbSIsImhvc3RJZCIsInBlcnNvbnMiLCJkcmFnU3RhcnRIYW5kbGVyIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImVmZmVjdEFsbG93ZWQiLCJkcmFnRW5kSGFuZGxlciIsInRleHRDb250ZW50IiwiUHJvamVjdExpc3QiLCJ0eXBlIiwiYXNzaWduZWRQcm9qZWN0cyIsImRyYWdPdmVySGFuZGxlciIsInR5cGVzIiwibGlzdEVsIiwiY2xhc3NMaXN0IiwiYWRkIiwiZHJvcEhhbmRsZXIiLCJwcmpJZCIsImdldERhdGEiLCJkcmFnTGVhdmVIYW5kbGVyIiwiXyIsInJlbW92ZSIsInJlbGV2YW50UHJvamVjdHMiLCJmaWx0ZXIiLCJGSU5JU0hFRCIsInJlbmRlclByb2plY3RzIiwibGlzdElkIiwidG9VcHBlckNhc2UiLCJpbm5lckhUTUwiLCJwcmpJdGVtIl0sInNvdXJjZVJvb3QiOiIifQ==