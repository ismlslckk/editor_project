
window.CkEditorBilgi = window.CkEditorBilgi || { disaridanEklenenIcerik: '', guncelIcerik: '' };

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file.then(
            (file) => {
                ckEditorFullFilled = false;
                // if (file.size / 1024 > 2048) {
                //     alert('Eklemiş olduğunuz dosya boyutu maksimum sınırı geçmektedir. (Maksimum = 2MB)');
                //     return new Promise((resolve, reject) => {
                //         reject();
                //     });
                // }

                return new Promise((resolve, reject) => {
                    const toBase64 = (file) =>
                        new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = (error) => reject(error);
                        });
                    const base64_image = toBase64(file).then((data) => {
                        ckEditorFullFilled = true;
                        return resolve({
                            default: data
                        });
                    });
                    this.loader.uploaded = true;
                    return base64_image;
                })
            }
        );
    }
}

let ckEditorFullFilled = true;
let fileUploadLoader = null;
let editor;
const rakamBoyutlari = []
let selectedImage = null;
let sifresiCozulecekSmallElement = null;

// This sample still does not showcase all CKEditor 5 features (!)
// Visit https://ckeditor.com/docs/ckeditor5/latest/features/index.html to browse all the features.
CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
    // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
    toolbar: {
        items: [
            /* 'exportPDF', 'exportWord', 'selectAll', '|', */
            'heading', '|',
            'bold', 'italic',
            /*  'strikethrough', 'underline','code', 'subscript', 'superscript', 'removeFormat', */
            '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            /* 'outdent', 'indent', '|', */
            'undo', 'redo',
            'fontSize', 'fontFamily', 'fontColor', '|',
            /*   'fontBackgroundColor','highlight','alignment', '|', */
            /*  'link',  */
            'insertImage',
            /* 'blockQuote', */
            'insertTable',
            /* 'mediaEmbed', 'codeBlock', 'htmlEmbed', */
            '|',
                    /* 'specialCharacters', 'pageBreak', */
                    /* 'horizontalLine', '|', */
                    /* 'textPartLanguage', '|', */
                    /* 'sourceEditing' */,
            /* 'findAndReplace' */

        ],
        shouldNotGroupWhenFull: true
    },
    // Changing the language of the interface requires loading the language file using the <script> tag.
    language: 'tr',
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true
        }
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
        ]
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
    placeholder: 'Yazmaya başlayın!!!',
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
    fontFamily: {
        options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif'
        ],
        supportAllValues: true
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22, 24, 26],
        supportAllValues: true
    },
    // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
    // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    },
    // Be careful with enabling previews
    // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
    htmlEmbed: {
        showPreviews: true
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
    link: {
        decorators: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
    mention: {
        feeds: [
            {
                marker: '@',
                feed: [
                    '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                    '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                    '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                    '@sugar', '@sweet', '@topping', '@wafer'
                ],
                minimumCharacters: 1
            }
        ]
    },
    // The "super-build" contains more premium features that require additional configuration, disable them below.
    // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
    removePlugins: [
        // These two are commercial, but you can try them out without registering to a trial.
        // 'ExportPdf',
        // 'ExportWord',
        'YouTube',
        'MediaEmbed',
        'CKBox',
        'CKFinder',
        'EasyImage',
        // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
        // Storing images as Base64 is usually a very bad idea.
        // Replace it on production website with other solutions:
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
        'Base64UploadAdapter',
        'RealTimeCollaborativeComments',
        'RealTimeCollaborativeTrackChanges',
        'RealTimeCollaborativeRevisionHistory',
        'PresenceList',
        'Comments',
        'TrackChanges',
        'TrackChangesData',
        'RevisionHistory',
        'Pagination',
        'WProofreader',
        // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
        // from a local file system (file://) - load this site via HTTP server if you enable MathType
        'MathType'
    ]
}).then(newEditor => {
    editor = newEditor;

    let typingTimer;
    const doneTypingInterval = 500; // Adjust the delay as needed (e.g., 1 second)
    clearTimeout(typingTimer); // Reset the timer each time the event fires

    editor.model.document.on('change:data', (evt, data) => {
        clearTimeout(typingTimer); // Reset the timer each time the event fires

        typingTimer = setTimeout(() => {
            if ((fileUploadLoader?.loader.status === 'idle' || fileUploadLoader?.loader.status === 'aborted' || !fileUploadLoader)) {
                const readedData = editor.getData();

                if (readedData.includes('iframe')) {
                    const iframeBasIndexOf = readedData.indexOf('<iframe');
                    const iframeBitIndexOf = readedData.indexOf('</iframe>');
                    if (iframeBasIndexOf !== -1 && iframeBitIndexOf !== -1) {
                        const newDataa = readedData.slice(0, iframeBasIndexOf) + readedData.slice(iframeBitIndexOf + 9);
                        editor.setData(newDataa);
                    }
                } else if (readedData.includes('Version:0.9 StartHTML:')) {
                    const versionIndexOf = readedData.indexOf('Version:0.9 StartHTML:');
                    const blockedIndexOf = readedData.indexOf('SourceURL:about:blank#blocked');
                    if (versionIndexOf !== -1 && blockedIndexOf !== -1) {
                        const newDataa = readedData.slice(0, versionIndexOf) + readedData.slice(blockedIndexOf + 29);
                        editor.setData(newDataa);
                    }
                } else if (readedData.includes('"=""')) {
                    const newDataa = readedData.replaceAll('"=""', '');
                    editor.setData(newDataa);
                }
            }
        wpfEventFirlat('editorStatus','available');
        }, doneTypingInterval); // Wait for user to stop typing
    });

    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        fileUploadLoader = new MyUploadAdapter(loader);
        return fileUploadLoader;
    };
})
    .catch(error => {
        console.error('error occured!...');
        console.error(error);
    });

setTimeout(() => {
    turkcelestir('Font Size', 'Yazı Boyutu');
    turkcelestir('Font Family', 'Yazı Ailesi');
    turkcelestir('Font Color', 'Yazı Rengi');
    turkcelestir('Font Background Color', 'Yazı Arkaplan Rengi');
    turkcelestir('Text alignment', 'Metin Hizalama');
    turkcelestir('Horizontal line', 'Ayraç Ekle');

    document.querySelectorAll('span').forEach(x => {
        if (x.innerHTML === 'Find') {
            x.innerHTML = 'Bul';
        }
    });

    ayarlaRakamBoyutlari();
    ayarlaYaziRengiIcon();
    okIkonlariniKaldir();
    secilenResmiAyarla();
    secilenMetniSifrelemeButonEkle();
    uyariAyarla();
    eventListelenerAyarla();
    //ayarlaFindAndReplace();
    //denemeSimgeliIcon();
}, 100);


function eventListelenerAyarla(){
    CefSharp.BindObjectAsync("eventListener").then(function() {
        console.log("eventListener is now available!");
    
        document.addEventListener('callbackForWpf', function(event) {
            eventListener.onJsEvent(JSON.stringify(event.detail));
        });
    });
}


// Remove previous highlights before applying new ones
function removeHighlights(element, updateHtml = false) {
    if (!element)
        element = document.getElementById("container");
    let highlighted = element.querySelectorAll("span.highlight_custom");
    if (highlighted) {
        highlighted.forEach(span => {
            span.replaceWith(document.createTextNode(span.textContent));
        });

        if (updateHtml)
            editor.setData(getEditorData());
    }
}

function highlightText(term) {
    if (term == "") {
        return;
    }

    let contentContainer = document.getElementById("container");

    // Function to normalize Turkish characters for case-insensitive matching
    function normalizeTurkish(text) {
        return text
            .toLocaleLowerCase("tr-TR") // Ensures Turkish-specific case conversion
            .replace(/ı/g, "i").replace(/I/g, "ı")
            .replace(/İ/g, "i").replace(/ç/g, "c")
            .replace(/Ç/g, "c").replace(/ğ/g, "g")
            .replace(/Ğ/g, "g").replace(/ö/g, "o")
            .replace(/Ö/g, "o").replace(/ş/g, "s")
            .replace(/Ş/g, "s").replace(/ü/g, "u")
            .replace(/Ü/g, "u");
    }

    function highlightNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let originalText = node.textContent;
            let normalizedText = normalizeTurkish(originalText);
            let normalizedTerm = normalizeTurkish(term);

            let regex = new RegExp(normalizedTerm, "gi"); // Case-insensitive search
            let match;
            let newHTML = "";
            let lastIndex = 0;
            let matches = [];

            // Find all matches in normalized text
            while ((match = regex.exec(normalizedText)) !== null) {
                matches.push({ start: match.index, length: match[0].length });
            }

            let charMap = [];
            let normalizedIndex = 0;

            // Create a map of normalizedText indices to originalText indices
            for (let i = 0; i < originalText.length; i++) {
                if (normalizedIndex < normalizedText.length && 
                    normalizeTurkish(originalText[i]) === normalizedText[normalizedIndex]) {
                    charMap[normalizedIndex] = i;
                    normalizedIndex++;
                }
            }

            // Highlight matched text using the original indices
            matches.forEach(({ start, length }) => {
                let startIndex = charMap[start];
                let endIndex = charMap[start + length - 1] + 1; // Ensure full match is captured

                newHTML += originalText.substring(lastIndex, startIndex) + 
                           `<span class="highlight_custom">${originalText.substring(startIndex, endIndex)}</span>`;
                lastIndex = endIndex;
            });

            newHTML += originalText.substring(lastIndex);

            if (newHTML !== originalText) {
                let span = document.createElement("span");
                span.innerHTML = newHTML;
                node.replaceWith(span);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "IMG") {
            Array.from(node.childNodes).forEach(highlightNodes);
        }
    }

    function removeHighlights(container) {
        if (!container) return;
        let highlightedElements = container.querySelectorAll(".highlight_custom");
        highlightedElements.forEach((el) => {
            el.replaceWith(document.createTextNode(el.textContent));
        });
    }

    removeHighlights(contentContainer);
    highlightNodes(contentContainer);
    editor.setData(getEditorData());
}




function denemeSimgeliIcon() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const allLiElements = document.querySelectorAll('li');
            if (allLiElements.length > 0) {
                document.querySelectorAll('li').forEach(li => {
                    li.classList.remove('todo-list');
                });
            }
        }
    });

}

function secilenMetniCozmeAyarla() {
    document.addEventListener('mousedown', function (evt) {
        if (!!evt && !!evt.target && !!evt.target.tagName) {
            const selectedTag = evt.target.tagName.toLowerCase();
            if (selectedTag != 'button') {
                if (evt.target.className.toString().includes('sifrelenmisEleman')) {
                    sifresiCozulecekSmallElement = evt.srcElement;
                }
                else if (evt.target.parentElement.className.toString().includes('sifrelenmisEleman')) {
                    sifresiCozulecekSmallElement = evt.target.parentElement;
                }
                else {
                    sifresiCozulecekSmallElement = null;
                }
            }
        }
    }, false);
}

function createSmallElementWithAsteriks(pureValue) {

    let asteriksStr = '';
    for (let i = 0; i < pureValue.length; i++) {
        asteriksStr = asteriksStr + '✱';
    }

    let smallElement = document.createElement("span");
    smallElement.innerText = asteriksStr;;
    smallElement.className = 'sifrelenmisEleman';
    smallElement.setAttribute('data-pureValue', pureValue);
    smallElement = sifreleStyleUygulaVeyaSil(true, smallElement);

    return smallElement;
}

function sifreleStyleUygulaVeyaSil(uygula = true, smallElement) {
    if (uygula) {
        smallElement.style.backgroundColor = '#f4f4f4';
        smallElement.style.color = '#d63384';
        smallElement.style.border = '1px solid #ccc';
        smallElement.style.borderRadius = '3px';
        smallElement.style.padding = '2px';
        smallElement.style.fontSize = '13px';
        return smallElement;
    }
    else {
        smallElement.style.backgroundColor = 'unset';
        smallElement.style.color = 'unset';
        smallElement.style.border = 'unset';
        smallElement.style.borderRadius = 'unset';
        smallElement.style.padding = 'unset';
        smallElement.style.fontSize = 'unset';
        return smallElement;
    }
}

function secilenMetniCoz() {
    sifresiCozulecekSmallElement = sifreleStyleUygulaVeyaSil(false, sifresiCozulecekSmallElement);
    sifresiCozulecekSmallElement.innerText = sifresiCozulecekSmallElement.getAttribute('data-pureValue');
    editor.setData(getEditorData());
}

function secilenMetniSifrele() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText) {
            // Create a strong element
            const resultWithAsteriks = createSmallElementWithAsteriks(selectedText);

            // Replace the selected text with the strong element
            range.deleteContents();
            range.insertNode(resultWithAsteriks);
        }
    }

    editor.setData(getEditorData());
}


function getEditorData() {
    return document.getElementsByClassName('ck-content')[0].innerHTML;
}

function secilenMetniSifrelemeButonEkle() {

    const ckEditorToolbar = document.getElementsByClassName('ck-toolbar__items')[0];
    const sifreleButonDiv = document.createElement("div");
    sifreleButonDiv.className = 'ck ck-dropdown';

    // Create a new button element
    const sifreleButon = document.createElement("button");
    sifreleButon.className = 'ck ck-button ck-off ck-button';
    sifreleButon.style.backgroundImage = "url('./png/lock.png')";
    sifreleButon.style.backgroundSize = "cover"; // Optional: make the image cover the button
    sifreleButon.style.backgroundPosition = "center";
    sifreleButon.style.backgroundRepeat = "no-repeat";
    sifreleButon.style.fontSize = "10px";


    const sifreCozButon = document.createElement("button");
    sifreCozButon.className = 'ck ck-button ck-off ck-button';
    sifreCozButon.style.backgroundImage = "url('./png/unlock.png')";
    sifreCozButon.style.backgroundSize = "cover"; // Optional: make the image cover the button
    sifreCozButon.style.backgroundPosition = "center";
    sifreCozButon.style.backgroundRepeat = "no-repeat";
    sifreCozButon.style.marginLeft = '5px';
    sifreCozButon.style.fontSize = "13px";

    sifreleButon.onclick = secilenMetniSifrele;
    sifreCozButon.onclick = secilenMetniCoz;
    sifreleButonDiv.appendChild(sifreleButon);
    sifreleButonDiv.appendChild(sifreCozButon);

    ckEditorToolbar.appendChild(sifreleButonDiv);

    secilenMetniCozmeAyarla();
}

function uyariAyarla() {

    const ckEditorToolbar = document.getElementsByClassName('ck-toolbar__items')[0];
    const uyariDiv = document.createElement("div");
    uyariDiv.id = 'uyariDiv';
    uyariDiv.style.position = 'absolute';
    uyariDiv.style.overflow = 'hidden';
    uyariDiv.style.right = '0';
    uyariDiv.style.display = 'none';

    // Create a new button element
    const p = document.createElement("p");
    p.id = 'uyariMesajEleman';
    p.style.color = 'red';
    p.style.fontWeight = '600';
    p.style.padding = '5px';

    uyariDiv.appendChild(p);

    ckEditorToolbar.appendChild(uyariDiv);

}

function uyariGoster(text) {
    const uyariDiv = document.getElementById("uyariDiv");
    uyariDiv.style.display = 'block';

    const kayanYaziEleman = document.getElementById("uyariMesajEleman");
    kayanYaziEleman.innerText = text;
}

function uyariGizle() {
    const uyariDiv = document.getElementById("uyariDiv");
    uyariDiv.style.display = 'none';
}

function okIkonlariniKaldir() {
    const ikonListesi = document.querySelectorAll('.ck-dropdown__arrow');
    const ikonListesi2 = document.querySelectorAll('.ck-splitbutton__arrow');
    ikonListesi.forEach(x => x.remove());
    ikonListesi2.forEach(x => x.remove());
}

function turkcelestir(eskiTooltipText, yeniTooltipText) {
    document.querySelector(`[data-cke-tooltip-text*="${eskiTooltipText}"]`)?.setAttribute('data-cke-tooltip-text', yeniTooltipText);
}

function guncelIcerigiDoldur() {
    removeHighlights(null, true);
    window.CkEditorBilgi.guncelIcerik = editor.getData();
}

function editoruDoldur() {
    wpfEventFirlat('editorStatus','busy');
    editor.setData(window.CkEditorBilgi.disaridanEklenenIcerik);
}

function wpfEventFirlat(action,detail){
    var event = new CustomEvent('callbackForWpf', { detail:{Action: action,Detail: detail} });
    document.dispatchEvent(event);
}

function rakamSvgAyarla(rakam) {

    const fontSizeIcon = document.querySelector('[data-cke-tooltip-text="Yazı Boyutu"]');

    let img = document.createElement('img');
    img.src = `./png/${rakam}.png`;
    img.style.width = '25px';
    img.style.height = '25px';

    fontSizeIcon.firstElementChild.remove();
    fontSizeIcon.insertBefore(img, fontSizeIcon.firstChild);
}

function ayarlaRakamBoyutlari() {
    rakamSvgAyarla('Default');

    const buttons = document.querySelectorAll(".ck-fontsize-option");
    buttons.forEach(element => {
        element.addEventListener("click", (event) => {
            rakamSvgAyarla(event.srcElement.innerText);
        });
    });
}

function ayarlaYaziRengiIcon() {
    const yaziRengiIcon = document.querySelector('[data-cke-tooltip-text="Yazı Rengi"]');

    let img = document.createElement('img');
    img.src = `./png/font_color_icon.png`;
    img.style.width = '25px';
    img.style.height = '25px';

    yaziRengiIcon.firstElementChild.remove();
    yaziRengiIcon.insertBefore(img, yaziRengiIcon.firstChild);
}

function ayarlaFindAndReplace() {
    const findAndReplace = document.querySelector('[data-cke-tooltip-text^="Bul"]').parentElement;
    findAndReplace.firstElementChild.remove();

    let imgFindAndReplace = document.createElement('img');
    imgFindAndReplace.src = `./png/find_icon.png`;
    imgFindAndReplace.style.width = '25px';
    imgFindAndReplace.style.height = '25px';

    imgFindAndReplace.addEventListener('click', () => {
        const findAndReplaceForm = document.querySelector('.ck-find-and-replace-form').parentElement;
        if (findAndReplaceForm.style.display === 'block')
            findAndReplaceForm.style.display = '';
        else
            findAndReplaceForm.style.display = 'block';
    })

    findAndReplace.appendChild(imgFindAndReplace);
}

function secilenResmiAyarla() {
    document.addEventListener('mousedown', function (evt) {
        if (!!evt && !!evt.target && !!evt.target.tagName) {
            const selectedTag = evt.target.tagName.toLowerCase();
            if (selectedTag == 'img') {
                selectedImage = evt.srcElement;
            }
        }
    }, false);
}

function guncelleSecilenResim(newImgSrc) {
    if (!!selectedImage) {
        editor.setData(editor.getData().replaceAll(selectedImage.src, newImgSrc));
        if (!!selectedImage.srcset) {
            editor.setData(editor.getData().replaceAll(selectedImage.srcset, newImgSrc));
        }
    }
}

function editoruReadOnlyYap() {
    document.getElementsByTagName('body')[0].style.pointerEvents = 'none';
}

function editoruEditableYap() {
    document.getElementsByTagName('body')[0].style.pointerEvents = '';
}

window.onerror = function (message, url, lineNumber) {
    console.log({ message })
    return true;
};
