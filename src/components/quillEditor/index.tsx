import ReactQuill from 'react-quill';

interface IQuillEditorProps {
    value?: string; // 回显的传入的value
    onChange?: (value: string) => void;
    className?: string;
}

export default function ReactQuillEditor({ className, value, onChange }: IQuillEditorProps) {
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'], // remove formatting button
    ];
    // 自定义工具栏
    const modules: any = {
        toolbar: toolbarOptions,
    };
    return <ReactQuill value={value} modules={modules} className={className} theme="snow" onChange={onChange}/>;
}
