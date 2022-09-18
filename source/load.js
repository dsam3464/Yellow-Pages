window.onload = fetchData();

function GetXmlHttpObject(){
    var xmlHttp = null;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function fetchData() {
    const p = new Promise((resolve, reject) => {
        var endpoint = './config.json';

        var xhr = GetXmlHttpObject();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response.notice);
            }
        };
        xhr.open('GET', endpoint, true);
        xhr.send();
    });
    p.then((notice) => {
        buildData(notice);
    });
}

function buildData(source) {
    const dom = document.getElementById("main");
    var innerString = "";
    for (const section of source) {
        // section header
        let headerStr = `
            <div>
            <h2>${section.header}</h2>
            <br>
            <h3>
        `;
        innerString += headerStr;
        // section body
        var linksStr = "";
        for (const content of source.content) {
            if (content.msg == null) {
                let aStr = `
                    <a href="${content.url}" target="_blank">${content.title}</a>
                    <br>
                `;
                linksStr += aStr;
            }
            else {
                let aStr = `
                    <a href="${content.url}" target="_blank" title="${content.msg}">${content.title}</a>
                    <br>
                `;
                linksStr += aStr;
            }
        }
        innerString += linksStr;
        // section footer
        let footerStr = `
            </h3>    
            </div>
        `;
        innerString += footerStr;
    }
    dom.innerHTML = innerString;
}