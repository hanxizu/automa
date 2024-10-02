// ==UserScript==
// @name         Facebook Post
// @namespace    http://tampermonkey.net/
// @version      1.42
// @description  Fetch text from Facebook element
// @author       hanspaul
// @updateURL   https://raw.githubusercontent.com/hanxizu/automa/refs/heads/main/postnew.js
// @downloadURL https://raw.githubusercontent.com/hanxizu/automa/refs/heads/main/postnew.js
// @match        https://www.facebook.com/*
// @grant        GM_xmlhttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js
// ==/UserScript==

(function () {
    'use strict';
let facebookurl = 'https://github.com/cs88997/facebook/raw/refs/heads/main/facebookpost.xlsx'
    let facebook22222;

    async function checkmainelement() {
        const JSamain = 'DIV:nth-of-type(1) > ul > LI:nth-of-type(1) > DIV[data-visualcompletion="ignore-dynamic"] a';
        // await observeElement(JSamain,getElementText)
        await waitForElement(JSamain);
        await getElementText(JSamain)

    }
    async function getElementText(selector) {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
            console.log('Element found:', targetElement);
            const text = targetElement.textContent || targetElement.innerText;

            // 存储跳转前的状态
            // 存储跳转前的状态
            localStorage.setItem('fetch_status', 'ready');
            localStorage.setItem('groupurl', `https://www.facebook.com/search/posts?q=${encodeURIComponent(text)}`);



            const groupurl = `https://www.facebook.com/search/posts?q=${encodeURIComponent(text)}`;
            await openNewURL(groupurl);
            console.log('Text:', text);
        } else {
            console.log('Element not found.');
        }
    }




    async function openNewURL(url) {
        window.open(url, '_blank');
    }

    async function hoverAndClicktext(selectortext) {
        const element = document.querySelector(selectortext);

        if (element) {
            const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
            element.dispatchEvent(mouseOverEvent);
            console.log('Hovered over element:', element);
            await delay(500);
            element.click();
            console.log('Element clicked:', element);
            return true;
        } else {
            console.log('No element found for selector or XPath');
            return false;
        }
    }

    async function hoverAndClick(element) {
        if (element) {
            const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
            element.dispatchEvent(mouseOverEvent);
            console.log('Hovered over element:', element);
            await delay(500);
            element.click();
            console.log('Element clicked:', element);
            return true;
        } else {
            console.log('No element found for selector or XPath');
            return false;
        }
    }



    async function clickElementsInCollection(selector, limit = 3) {
        console.log('Clicking elements in collection:', selector);
        const elements = Array.from(document.querySelectorAll(selector)).slice(0, limit);
        console.log('elements length' + elements.length);

        for (const element of elements) {
            try {
                await hoverAndClick(element);
                await delay(2000);

                const editorId = '.xwib8y2:nth-child(1) .xi81zsa:nth-child(1) .xdj266r:nth-child(1)';
                const JSeditorId = await waitForElement(editorId);
                if (JSeditorId) {
                    await startinsertText(editorId);
                } else {
                    await hoverAndClicktext(editorId);
                    await startinsertText(editorId);

                }


                const JSsend = '#focused-state-composer-submit .x1i10hfl';
                await waitForElement(JSsend);
                await hoverAndClicktext(JSsend);

                const JSclose = '.html-div:nth-child(3) > .x1i10hfl';
                await waitForElement(JSclose);
                await hoverAndClicktext(JSclose);

                await delay(2000);
            } catch (error) {
                console.error('Error in processing element:', error);
            }
        }
    }






    async function startinsertText(selector) {
        const randondata = await getRandomValueFrom();
        console.log('Random value (excluding first row):', randondata);

        await insertText(selector, randondata);
        await delay(1000);

        console.log('Text:', randondata);
    }



    async function waitForElement(selector, timeout = 10000) {
        return new Promise((resolve) => {
            // 如果元素已经存在，立即返回 true
            if (document.querySelector(selector)) {
                return resolve(true);
            }

            // 使用 MutationObserver 来监听 DOM 变化
            const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    resolve(true);  // 当找到元素时，返回 true
                    observer.disconnect();
                }
            });

            // 开始监听 DOM 变化
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // 超时处理，超时后返回 false
            setTimeout(() => {
                observer.disconnect();
                resolve(false);  // 超时返回 false
            }, timeout);
        });
    }




    //输入插入文本
    async function insertText(editorId, text) {
        console.log('Inserting text into editor:', text)

        const editor = document.querySelector(editorId);
        // editor.focus();
        //editor.innerHTML = ''; // 清空编辑器内容

        document.execCommand('insertText', false, text);
    }




    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function checkcommenctcss() {
        const collectionSelector = 'div > .x1yztbdb:nth-child(1) .x9f619:nth-child(2) > .x1i10hfl:nth-child(1) > .x9f619:nth-child(1)';
        //await observeElement(collectionSelector, clickElementsInCollection)
        await waitForElement(collectionSelector);
        await clickElementsInCollection(collectionSelector)


    }


    async function checkcomment() {
        console.log('Checking comments...');
        const checkInterval = setInterval(async () => {
            const collectionSelector = 'div > .x1yztbdb:nth-child(1) .x9f619:nth-child(2) > .x1i10hfl:nth-child(1) > .x9f619:nth-child(1)';
            const elementExists = document.querySelector(collectionSelector);
            if (elementExists) {
                clearInterval(checkInterval); // 停止检查
                await clickElementsInCollection(collectionSelector);

                console.log('Element found and clicked, stopping checks.');
            }
        }, 2000); // 每2秒检查一次
    }

    async function checkgroupcss() {
        const grouppageformcsstext = '.xu06os2:nth-of-type(4) INPUT';
        await waitForElement(grouppageformcsstext);
        await hoverAndClick(document.querySelector(grouppageformcsstext));

        await delay(1000); // 等待1秒

        const grouppagecsstext = 'LI:nth-of-type(4) .x1r8uery DIV.x9f619';
        await waitForElement(grouppagecsstext);
        await hoverAndClick(document.querySelector(grouppagecsstext));


    }
    async function checkgroupfilter() {
        const checkInterval = setInterval(async () => {
            console.log('checkgroupfilter')
            const grouppageformcsstext = '.xu06os2:nth-of-type(4) INPUT';
            const grouppagecsstext = 'LI:nth-of-type(4) .x1r8uery DIV.x9f619';
            const clickedFirst = await hoverAndClick(document.querySelector(grouppageformcsstext));
            if (clickedFirst) {
                await delay(1000); // 等待1秒
                const clickedSecond = await hoverAndClick(document.querySelector(grouppagecsstext));
                if (clickedSecond) {
                    clearInterval(checkInterval); // 停止检查
                }
            }
        }, 2000); // 每2秒检查一次
    }

    async function getRandomValueFrom() {

        const url = facebookurl;


        try {
            const jsonData = await fetchAndConvertXLSX(url);
            //console.log("Processed JSON data:", jsonData);

            const randomValue = await getRandomValueFromJSON(jsonData);
            //console.log("Random value (excluding first row):", randomValue);
            return randomValue

        } catch (error) {
            console.error("Failed to fetch and convert XLSX or get random value:", error);
        }




    }



    async function getRandomValueFromJSON(jsonData) {
        if (!Array.isArray(jsonData) || jsonData.length < 2) {
            throw new Error("Invalid JSON data or not enough rows");
        }

        // 排除第一行（标题行）
        const dataWithoutHeader = jsonData.slice(1);

        // 随机选择一行
        const randomRowIndex = Math.floor(Math.random() * dataWithoutHeader.length);
        const randomRow = dataWithoutHeader[randomRowIndex];

        // 如果行是数组，随机选择一个值；如果是对象，随机选择一个属性值
        if (Array.isArray(randomRow)) {
            const randomValueIndex = Math.floor(Math.random() * randomRow.length);
            return randomRow[randomValueIndex];
        } else if (typeof randomRow === 'object' && randomRow !== null) {
            const keys = Object.keys(randomRow);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return randomRow[randomKey];
        } else {
            return randomRow; // 如果既不是数组也不是对象，直接返回该值
        }
    }





    // 通用函数：获取 XLSX 文件并转换为 JSON
    async function fetchAndConvertXLSX(url) {
        // 用 GM_xmlhttpRequest 读取 XLSX 文件

        //const url = "https://github.com/cs88997/facebook/raw/refs/heads/main/facebookpost.xlsx";


        async function fetchXLSX(url) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    responseType: 'arraybuffer',
                    onload: function (response) {
                        if (response.status === 200) {
                            resolve(response.response);
                        } else {
                            reject(new Error(`Failed to fetch XLSX. Status: ${response.status}`));
                        }
                    },
                    onerror: function (error) {
                        reject(error);
                    }
                });
            });
        }

        async function xlsxToJSON(data) {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        }


        try {
            const xlsxData = await fetchXLSX(url);
            const jsonData = await xlsxToJSON(xlsxData);
            console.log("XLSX data as JSON:", jsonData);

            return jsonData; // 返回处理后的 JSON 数据


            // Process your JSON data here
        } catch (error) {
            console.error("Error:", error);
        }

    }

    async function waitForNewPageLoad() {
        return new Promise((resolve) => {
            window.addEventListener('load', () => {
                console.log('New page fully loaded.');
                resolve();
            });
        });
    }

    async function checkStateAndContinue() {
        console.log('checkStateAndContinue')

        const status = localStorage.getItem('fetch_status');
        if (status === 'ready') {
            console.log('checkStateAndContinue ready')
            // 恢复跳转后的状态并继续执行
            localStorage.setItem('fetch_status', 'done');  // 更新状态避免重复执行
            await checkgroupcss();
            await delay(2000); // 等待2秒
            await checkcommenctcss();
        }
    }




    // 页面加载后执行
    window.addEventListener('load', async function () {
        await delay(2000);  // 等待2秒
        checkStateAndContinue();  // 检查是否需要恢复执行
    });

    // 用于首次执行的入口
    window.addEventListener('load', async function () {
        await delay(2000);
        await checkmainelement(); // 获取文本并跳转
    });


    /*
        window.addEventListener('load', async function () {
            await delay(2000); // 等待5秒
            await checkmainelement(); // 获取文本
            //跳转网页
            await waitForNewPageLoad(); // Wait for the new page to load after navigation
            await delay(2000); // 等待2秒
            await checkgroupfilter(); // 执行检查元素的函数
            await delay(2000); // 等待2秒
            await checkcommenctcss(); // 开始执行检查评论按钮
        });

        */
})();
