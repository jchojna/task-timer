(this["webpackJsonptask-timer"]=this["webpackJsonptask-timer"]||[]).push([[0],[,function(e,a,t){e.exports=t.p+"static/media/icons.92f0e3b1.svg"},,,,,,,,function(e,a,t){},function(e,a,t){},,,function(e,a,t){e.exports=t(29)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(0),i=t.n(n),s=t(11),r=t.n(s),l=(t(18),t(2)),o=t(12),c=t(3),m=t(4),u=t(6),d=t(5),T=t(7),k=t(1),p=t.n(k),h=(t(9),function(e){function a(){var e,t;Object(c.a)(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(t=Object(u.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(i)))).handleNextView=function(e){var a=t.props,n=a.taskNameValidity,i=a.onStateChange,s=e.key||null;"Enter"!==s&&null!==s||i(n?{isTaskVisible:!1,isTimeVisible:!0,isTaskNameChangeActive:!1,alertFlag:!1}:{alertFlag:!0})},t}return Object(T.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){var e=this,a=this.props,t=a.compClassName,n=a.alertClassName,s=a.taskName,r=a.onStateChange,l=a.onTaskNameChange;return i.a.createElement("section",{className:"Task ".concat(t),onKeyDown:function(a){return e.handleNextView(a)},tabIndex:"0"},i.a.createElement("h2",{className:"Task__heading"},"Write your task"),i.a.createElement("input",{className:"Task__input Task__input--name",id:"task-name",placeholder:"What would be your next task?",onChange:function(e){l(e.target.value),r({alertFlag:!0})},value:s}),i.a.createElement("label",{className:"Task__label Task__label--name visuallyhidden",htmlFor:"task-name"},"Your task"),i.a.createElement("button",{className:"button Task__button Task__button--right",onClick:this.handleNextView},i.a.createElement("svg",{className:"Task__svg",viewBox:"0 0 512 512"},i.a.createElement("use",{href:"".concat(p.a,"#arrow-right")}))),i.a.createElement("p",{className:"Task__alert ".concat(n)},"You have to enter your task first!"))}}]),a}(n.Component)),b=function(e){var a=e.compClassName,t=e.alertClassName,n=e.onStateChange,s=e.taskTimePlanned,r=e.breakTimePlanned,l=e.onTaskTimePlannedChange,o=e.onBreakTimePlannedChange,c=e.isTimerActive,m=e.onStartButtonClick;return i.a.createElement("section",{className:"Time ".concat(a)},i.a.createElement("h2",{className:"Time__heading"},"Estimate a time"),i.a.createElement("button",{className:"Time__button Time__button--left",onClick:function(){return n({isTaskVisible:!0,isTimeVisible:!1,isTaskNameChangeActive:!0})}},i.a.createElement("svg",{className:"Time__svg",viewBox:"0 0 512 512"},i.a.createElement("use",{href:"".concat(p.a,"#arrow-left")}))),i.a.createElement("input",{id:"task-time",className:"Time__input Time__input--task-time",placeholder:"00m00s",maxLength:"6",value:s,onChange:function(e){l(e.target.value),n({alertFlag:!0})}}),i.a.createElement("label",{className:"Time__label Time__label--task-time",htmlFor:"task-time"},"Task time"),i.a.createElement("input",{id:"break-time",className:"Time__input Time__input--break-time",placeholder:"00m00s",maxLength:"6",value:r,onChange:function(e){o(e.target.value),n({alertFlag:!0})}}),i.a.createElement("label",{className:"Time__label Time__label--break-time",htmlFor:"break-time"},"Max break time"),i.a.createElement("button",{className:"Time__start ".concat(c?"Time__start--disabled":""),disabled:c,onClick:function(){return m()}},"Start"),i.a.createElement("p",{className:"Time__alert ".concat(t)},"Enter time in a correct format (00m00s)"))},g=(t(19),function(e){var a=e.isTaskTimeActive,t=e.isBreakTimeActive,n=e.onDisplayModeChange,s=e.onStateChange,r=e.breaksTotal,l=a?r+1:r;return i.a.createElement("div",{className:"Controls"},i.a.createElement("button",{className:"Controls__button Controls__button--playPause",onClick:a||t?function(){return s({isTaskTimeActive:!a,isBreakTimeActive:!t,breaksTotal:l,previousTime:Date.now()})}:function(){return!1}},i.a.createElement("svg",{className:"Controls__svg ".concat(a?"Controls__svg--hidden":""),viewBox:"0 0 512 512"},i.a.createElement("use",{href:"".concat(p.a,"#play")})),i.a.createElement("svg",{className:"Controls__svg ".concat(a?"":"Controls__svg--hidden"),viewBox:"0 0 512 512"},i.a.createElement("use",{href:"".concat(p.a,"#pause")}))),i.a.createElement("button",{className:"Controls__button Controls__button--stop",onClick:a||t?function(){return s({isStopTaskVisible:!0})}:function(){return!1}},i.a.createElement("svg",{className:"Controls__svg",viewBox:"0 0 512 512"},i.a.createElement("use",{href:"".concat(p.a,"#stop")}))),i.a.createElement("button",{className:"Controls__button Controls__button--toggle",onClick:function(){return n()}},i.a.createElement("svg",{className:"Controls__svg",viewBox:"0 0 512 512"},i.a.createElement("use",{href:"".concat(p.a,"#toggle")}))))}),v=(t(20),function(e){var a=e.compClassName,t=e.taskTimeArray.join(":");return i.a.createElement("p",{className:a},t)}),E=(t(21),function(e){var a=e.compClassName,t=e.breaksTotal,n=e.breakTimeElapsedArray;return i.a.createElement("div",{className:a},i.a.createElement("h3",{className:"Break__counter"},"".concat(t," ").concat(1===t?"break":"breaks")),i.a.createElement(v,{compClassName:"Break__display",taskTimeArray:n}))}),_=(t(22),function(e){var a=e.compClassName,t=e.percent;return i.a.createElement("p",{className:a},"".concat(Math.round(t),"%"))}),f=(t(23),function(e){var a=e.isElapsedMode,t=e.percentElapsed,n=e.percentRemaining;return i.a.createElement("div",{className:"ProgressBar"},i.a.createElement("div",{className:"ProgressBar__part ProgressBar__part--loading",style:{width:"".concat(a?t:n,"%")}}),i.a.createElement("div",{className:"ProgressBar__part ProgressBar__part--unloading",style:{width:"".concat(a?n:t,"%")}}))}),N=(t(24),function(e){var a=e.isElapsedMode,t=e.percentElapsed,n=e.percentRemaining;return i.a.createElement("section",{className:"Progress"},i.a.createElement("header",{className:"Progress__header"},i.a.createElement(_,{compClassName:"Percentage ".concat(a?"Percentage--visible":""),percent:t}),i.a.createElement(_,{compClassName:"Percentage ".concat(a?"":"Percentage--visible"),percent:n})),i.a.createElement(f,{percentElapsed:t,percentRemaining:n,isElapsedMode:a}))}),C=(t(25),function(e){function a(){var e,t;Object(c.a)(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(t=Object(u.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(i)))).handleTaskTimeTick=function(){var e=t.props.state,a=e.isTaskTimeActive,n=e.taskTimeElapsed,i=e.taskTimeRemaining,s=e.previousTime,r=e.taskTimeTotal,l=e.breakTimeElapsed;if(a){var o=t.props,c=o.onTimeArrayChange,m=o.onStateChange,u=Date.now(),d=c(n),T=c(r),k=c(i),p=c(n+l);m(n>=r?{isStopTaskVisible:!1,isTimerVisible:!1,isTaskTimeActive:!1,taskTimeElapsed:r,taskTimeRemaining:0,taskTimeElapsedArray:T,taskTimeRemainingArray:["00","00","00"],percentElapsed:100,percentRemaining:0,isOutroVisible:!0,overallTime:n+l,overallTimeArray:p}:{previousTime:u,taskTimeElapsed:n+(u-s),taskTimeElapsedArray:d,taskTimeRemaining:r-n,taskTimeRemainingArray:k,percentElapsed:n/r*100,percentRemaining:i/r*100})}},t.handleBreakTimeTick=function(){var e=t.props.state,a=e.taskTimeElapsed,n=e.isBreakTimeActive,i=e.breakTimeElapsed,s=e.breakTimeTotal,r=e.previousTime;if(n){var l=t.props,o=l.onStateChange,c=l.onTimeArrayChange,m=Date.now(),u=c(i),d=c(s);o(i>=s?{isBreakTimeActive:!1,isTimerVisible:!1,isFailureVisible:!0,overallTime:a+i,breakTimeElapsed:s,breakTimeElapsedArray:d}:{breakTimeElapsed:i+(m-r),breakTimeElapsedArray:u,previousTime:m})}},t}return Object(T.a)(a,e),Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.taskIntervalId=setInterval((function(){return e.handleTaskTimeTick()}),10),this.breakIntervalId=setInterval((function(){return e.handleBreakTimeTick()}),10)}},{key:"componentWillUnmount",value:function(){clearInterval(this.taskIntervalId),clearInterval(this.breakIntervalId)}},{key:"render",value:function(){var e=this.props.state,a=e.taskName,t=e.isTaskTimeActive,n=e.isBreakTimeActive,s=e.isElapsedMode,r=e.breaksTotal,l=e.taskTimeElapsedArray,o=e.taskTimeRemainingArray,c=e.breakTimeElapsedArray,m=e.percentElapsed,u=e.percentRemaining,d=this.props,T=d.compClassName,k=d.onDisplayModeChange,p=d.onStateChange;return i.a.createElement("section",{className:"Timer ".concat(T)},i.a.createElement("div",{className:"Timer__container"},i.a.createElement("h2",{className:"Timer__heading"},'"'.concat(a,'"')),i.a.createElement(g,{isTaskTimeActive:t,isBreakTimeActive:n,breaksTotal:r,onDisplayModeChange:k,onStateChange:p}),i.a.createElement("div",{className:"Timer__display ".concat(t?"":"Timer__display--inactive")},i.a.createElement(v,{compClassName:s?"Display Display--visible Display--showUp":"Display Display--hideUp",taskTimeArray:l}),i.a.createElement(v,{compClassName:s?"Display Display--hideUp":"Display Display--visible Display--showUp",taskTimeArray:o})),i.a.createElement(E,{compClassName:"Break ".concat(n?"Break--active":""),breaksTotal:r,breakTimeElapsedArray:c}),i.a.createElement(N,{isElapsedMode:s,percentElapsed:m,percentRemaining:u})))}}]),a}(n.Component)),y=(t(26),function(e){var a=e.compClassName,t=e.onStateChange;return i.a.createElement("section",{className:a},i.a.createElement("div",{className:"StopTask__container"},i.a.createElement("h2",{className:"StopTask__heading"},"Are you sure you want to quit?"),i.a.createElement("button",{className:"StopTask__button StopTask__button--stop",onClick:function(){return t({isTaskVisible:!0,isStopTaskVisible:!1,isTimerVisible:!1,isTaskTimeActive:!1,isBreakTimeActive:!1,taskName:"",isTaskNameValid:!1,taskTimePlanned:"",isTaskTimePlannedValid:!1,breakTimePlanned:"",isBreakTimePlannedValid:!1})}},"Yes"),i.a.createElement("button",{className:"StopTask__button StopTask__button--cancel",onClick:function(){return t({isStopTaskVisible:!1})}},"Cancel")))}),A=(t(27),function(e){var a=e.minutes,t=e.seconds,n=e.breakTimeElapsed,s=e.breakFlag;return i.a.createElement("span",{className:"TimeResult"},i.a.createElement("span",null,a>1?" ".concat(a," minutes"):1===a?" ".concat(a," minute"):""),a>0&&(s?0!==n:0!==t)?"and":"",i.a.createElement("span",null,t>1?" ".concat(t," seconds"):1===t?" ".concat(t," second"):s&&0!==n?" a split second":""))}),V=(t(10),function(e){var a=e.state,t=a.taskName,n=a.breaksTotal,s=a.breakTimeElapsed,r=a.breakTimeElapsedArray,o=a.overallTime,c=a.overallTimeArray,m=e.compClassName,u=e.onStateChange,d=Object(l.a)(c,2),T=d[0],k=d[1],h=Object(l.a)(r,2),b=h[0],g=h[1];return i.a.createElement("section",{className:m},i.a.createElement("div",{className:"Outro__container"},i.a.createElement("h2",{className:"Outro__heading"},"Congratulations!",i.a.createElement("span",{className:"Outro__emoji",role:"img","aria-label":"party"}," \ud83c\udf89")),i.a.createElement("p",{className:"Outro__message"},"You have finished your task entitled ",i.a.createElement("br",null),i.a.createElement("span",{className:"TimeResult"},'"'.concat(t,'"')),i.a.createElement("br",null),"in",i.a.createElement(A,{minutes:parseInt(T),seconds:parseInt(k),breakTimeElapsed:s}),"".concat(s>0?" including break time.":"."),i.a.createElement("br",null),"You had",i.a.createElement("span",{className:"TimeResult"},"\n            ".concat(n>1?"".concat(n," breaks"):1===n?"".concat(n," break"):"no brakes","\n            ")),"during this task",i.a.createElement(A,{minutes:parseInt(b),seconds:parseInt(g),breakTimeElapsed:s,breakFlag:!0}),n?" long, what makes it around":"",i.a.createElement("span",{className:"TimeResult"},n?" ".concat(Math.round(s/o*100),"%"):""),n?" of all time.":"."),i.a.createElement("button",{className:"Outro__retry",onClick:function(){return u({isOutroVisible:!1,isTaskVisible:!0,taskName:"",isTaskNameValid:!1,taskTimePlanned:"",isTaskTimePlannedValid:!1,breakTimePlanned:"",isBreakTimePlannedValid:!1})}},i.a.createElement("svg",{className:"Outro__svg",viewBox:"0 0 512 512"},i.a.createElement("use",{href:"".concat(p.a,"#retry")})))))}),S=function(e){var a=e.compClassName,t=e.onStateChange,n=e.state,s=n.breaksTotal,r=n.breakTimeElapsed,o=n.breakTimeElapsedArray,c=n.overallTime,m=Object(l.a)(o,2),u=m[0],d=m[1];return i.a.createElement("section",{className:a},i.a.createElement("div",{className:"Failure__container"},i.a.createElement("h2",{className:"Failure__heading"},"Too long break!",i.a.createElement("span",{className:"Failure__emoji",role:"img","aria-label":"fail"}," \ud83d\ude2e")),i.a.createElement("p",{className:"Failure__message"},"It seems you exceeded the limit of break time! ",i.a.createElement("br",null),"You had",i.a.createElement("span",{className:"TimeResult"},"\n            ".concat(s>1?"".concat(s," breaks"):1===s?"".concat(s," break"):"no brakes","\n            ")),"during this task",i.a.createElement(A,{minutes:parseInt(u),seconds:parseInt(d),breakTimeElapsed:r,breakFlag:!0}),s?" long, what makes it around":"",i.a.createElement("span",{className:"TimeResult"},s?" ".concat(Math.round(r/c*100),"%"):""),s?" of all time.":"."," ",i.a.createElement("br",null),"But don't give up, try again!"),i.a.createElement("button",{className:"Failure__retry",onClick:function(){return t({isFailureVisible:!1,isTaskVisible:!0,taskName:"",isTaskNameValid:!1,taskTimePlanned:"",isTaskTimePlannedValid:!1,breakTimePlanned:"",isBreakTimePlannedValid:!1})}},i.a.createElement("svg",{className:"Failure__svg",viewBox:"0 0 512 512"},i.a.createElement("use",{href:"".concat(p.a,"#retry")})))))},P=(t(28),function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(u.a)(this,Object(d.a)(a).call(this,e))).handleStateChange=function(e){return t.setState(e)},t.handleTaskName=function(e){t.setState({taskName:e,isTaskNameValid:e.length>0})},t.handleTaskTimePlanned=function(e){var a=t.handleTotalTime(e),n=t.handleTimeArray(a);t.setState({taskTimePlanned:e,isTaskTimePlannedValid:/(\d?\d[Mm])?(\d?\d[Ss])/.test(e)&&a>0,taskTimeTotal:a,taskTimeRemaining:a,taskTimeRemainingArray:n})},t.handleBreakTimePlanned=function(e){var a=t.handleTotalTime(e);t.setState({breakTimePlanned:e,isBreakTimePlannedValid:/(\d?\d[Mm])?(\d?\d[Ss])/.test(e)&&a>0,breakTimeTotal:a})},t.handleTotalTime=function(e){var a=e.split(/[mM]/).map((function(e){return parseInt(e)||0})),t=a=a.length>1?a:[0].concat(Object(o.a)(a)),n=Object(l.a)(t,2);return 6e4*n[0]+1e3*n[1]},t.handleStartButton=function(){var e=t.state,a=e.isTaskTimePlannedValid,n=e.isBreakTimePlannedValid,i=t.handleTimeArray(0);a&&n?t.setState({isTimeVisible:!1,isTimerVisible:!0,isTaskTimeActive:!0,previousTime:Date.now(),taskTimeElapsed:0,breaksTotal:0,breakTimeElapsed:0,breakTimeElapsedArray:i,alertFlag:!1}):t.setState({alertFlag:!0})},t.handleDisplayMode=function(){return t.setState((function(e){return{isElapsedMode:!e.isElapsedMode}}))},t.handleTimeArray=function(e){var a=function(e){return e<10?"0".concat(e):e};return[a(Math.floor(e/6e4)),a(Math.floor(e/1e3%60)),a(Math.floor(e/10%100))]},t.state={isTaskVisible:!0,isTimeVisible:!1,isTimerVisible:!1,isStopTaskVisible:!1,isOutroVisible:!1,isFailureVisible:!1,isElapsedMode:!0,isTaskNameChangeActive:!1,alertFlag:!1,taskName:"",isTaskNameValid:!1,taskTimePlanned:"",isTaskTimePlannedValid:!1,taskTimeTotal:0,taskTimeElapsed:0,taskTimeElapsedArray:["00","00","00"],taskTimeRemaining:0,taskTimeRemainingArray:["00","00","00"],isTaskTimeActive:!1,isBreakTimePlannedValid:!0,isBreakTimeActive:!1,breaksTotal:0,breakTimePlanned:"",breakTimeTotal:0,breakTimeElapsed:0,breakTimeElapsedArray:["00","00","00"],previousTime:0,percentElapsed:0,percentRemaining:100,overallTime:0,overallTimeArray:["00","00","00"]},t}return Object(T.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){var e=this.state,a=e.isTaskVisible,t=e.isTimeVisible,n=e.isTimerVisible,s=e.isStopTaskVisible,r=e.isOutroVisible,l=e.isFailureVisible,o=e.alertFlag,c=e.taskName,m=e.isTaskNameChangeActive,u=e.isTaskNameValid,d=e.taskTimePlanned,T=e.breakTimePlanned,k=e.isTaskTimePlannedValid,p=e.isBreakTimePlannedValid,g=e.isTaskTimeActive;return i.a.createElement("div",{className:"App"},i.a.createElement("h1",{className:"App__heading visuallyhidden"},"Task Timer App"),i.a.createElement(h,{compClassName:a?"Task--visible ".concat(m?"slideInLeft":"slideInRight"):"slideOutLeft",alertClassName:o&&!u?"Task__alert--visible":"",onStateChange:this.handleStateChange,onTaskNameChange:this.handleTaskName,taskNameValidity:u,taskName:c,onKeyPress:this.handleKeyPress}),i.a.createElement(b,{compClassName:t?"Time--visible slideInRight":n?"slideOutLeft":"slideOutRight",alertClassName:o&&!k||o&&!p?"Time__alert--visible":"",onTaskTimePlannedChange:this.handleTaskTimePlanned,onBreakTimePlannedChange:this.handleBreakTimePlanned,onStateChange:this.handleStateChange,onStartButtonClick:this.handleStartButton,isTimerActive:g,taskTimePlanned:d,breakTimePlanned:T}),i.a.createElement(C,{compClassName:n?"Timer--visible slideInRight":"slideOutLeft",onStateChange:this.handleStateChange,onDisplayModeChange:this.handleDisplayMode,onTimeArrayChange:this.handleTimeArray,state:this.state}),i.a.createElement(y,{compClassName:"StopTask ".concat(s?"StopTask--visible":""),onStateChange:this.handleStateChange}),i.a.createElement(V,{compClassName:"Outro ".concat(r?"Outro--visible slideInRight":"slideOutLeft"),state:this.state,onStateChange:this.handleStateChange}),i.a.createElement(S,{compClassName:"Failure ".concat(l?"Failure--visible slideInRight":"slideOutLeft"),state:this.state,onStateChange:this.handleStateChange}))}}]),a}(n.Component)),w=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function B(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(i.a.createElement(P,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/task-timer",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("/task-timer","/service-worker.js");w?(!function(e,a){fetch(e).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):B(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):B(a,e)}))}}()}],[[13,1,2]]]);
//# sourceMappingURL=main.871efda9.chunk.js.map