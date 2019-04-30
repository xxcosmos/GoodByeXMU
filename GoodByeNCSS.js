// ==UserScript==
// @name         一键填写国家大学生学习情况问卷调查
// @namespace    https://greasyfork.org/zh-CN/scripts/382395
// @version      1.2
// @description  国家大学生学习情况问卷调查系统 请在http://183.230.19.246:16005/User/main.html 中打开
// @author       xiaoyuu.me
// @email        xandcosmos@gmail.com
// @grant        none
// @include      *://ncss.xmu.edu.cn/main.html
// @include      *://183.230.19.246:16005/User/*
// ==/UserScript==
function me() {
    let name = '';
    let count = 0;
    let selectElement;
    let list;

    selectElement = document.getElementsByTagName("select");
    if (selectElement != null) {
        for (let i = 0; i < selectElement.length; i++) {
            let option = selectElement.item(i).getElementsByTagName("option");
            selectElement.item(i).value = option.item(1).value;
            selectElement = document.getElementsByTagName("select");
        }

    }

    list = document.querySelectorAll('[type=radio],[type=text]');
    for (let i = 0; i < list.length;) {
        let item = list.item(i);

        if (item.getAttribute('type') === 'radio') {
            //是选项
            item.click();
            name = 'radio';
            i += Math.random() * 2;

        } else if (item.getAttribute('type') === 'text') {
            //为文本框
            if (item.name === name) {
                count++;
            } else {
                count = 1;
                name = item.name
            }
            item.value = count;
            i++;
        } else {
            break;
        }
    }
    //跳转到下一页
    //    next = document.querySelector('[value=下一页]');
    //    if (next != null) {
    //       next.click();
    //    }
}

function addButton(showText) {
    let button = document.createElement('input');
    button.style = 'position:fixed;float:left;margin:5px;padding:5px 16px;border-radius:4px;outline:none;border:none;background:rgb(26,115,232);color:#fff;z-index:3';
    button.value = showText;
    button.type = 'button';
    button.addEventListener('click', me);
    let topBar = document.body;
    topBar.insertBefore(button, topBar.firstElementChild);

}

addButton('点击我一键完成');
