!function(){var t=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),e=null;t.addEventListener("click",(function(){t.disabled=!0,e=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));document.body.style.backgroundColor=t}),1e3)})),n.addEventListener("click",(function(){t.disabled=!1,clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.45ea2cc1.js.map
