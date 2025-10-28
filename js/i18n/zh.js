export default {
    title: "翻译器",
    inputPlaceholder: "请输入要翻译的文本...",
    outputPlaceholder: "翻译文本...",
    labels: {
        textToTranslate: "要翻译的文本",
        targetLanguage: "目标语言",
        activation: "翻译器状态",
    },
    buttons: {
        translate: "翻译",
        activateTranslator: "激活翻译器",
        extractText: "提取文本",
        clear: "清除",
        copy: "复制",
        download: "下载"
    },
    languages: {
        automatic: "自动",
        english: "英语",
        spanish: "西班牙语",
        french: "法语",
        german: "德语",
        italian: "意大利语",
        portuguese: "葡萄牙语",
        japanese: "日语",
        chinese: "中文"
    },
    messages: {
        activating: "🔄 正在激活翻译器...",
        activated: "翻译器已激活 ✅",
        enterText: "请输入要翻译的文本。",
        translationError: "翻译错误：",
        modelRequired: "请点击'激活翻译器'以允许下载模型，然后重试。",
        pdfExtractor: {
            ready: "应用程序就绪。请选择PDF文件。",
            loading: "正在加载PDF...",
            pdfLoaded: "PDF已加载：{0}页",
            extracting: "正在提取文本...",
            processing: "正在处理第{0}页，共{1}页（{2}%）",
            noFile: "请先加载PDF文件",
            extracted: "文本提取成功",
            error: "提取文本时出错：{0}",
            fileInfo: "文件：{0}",
            pageInfo: "页码：{0}",
            pagesInfo: "页码：{0}-{1}",
            allPages: "所有页面（{0}）",
            characters: "字符数：{0}",
            interfaceCleared: "界面已清除",
            noCopyText: "没有可复制的文本",
            copied: "文本已复制到剪贴板",
            copyError: "复制文本时出错",
            noDownloadText: "没有可下载的文本",
            downloaded: "文本下载成功"
        }
    },
    navigation: {
        resources: "资源",
        language: "语言",
        help: "帮助"
    }
};