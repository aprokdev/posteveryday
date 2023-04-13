import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { useController } from 'react-hook-form';
import s from './style.module.scss';

const listPlugins = [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'code',
    'help',
    'wordcount',
];

const toolbar = `
    undo redo |
    bold italic forecolor | 
    alignleft aligncenter |
    alignright alignjustify | 
    bullist numlist outdent indent | 
    removeformat | 
    help
`;

const TinyEditor = React.forwardRef<Editor, any>(({ initialValue, control }, ref) => {
    const textFieldRef = useRef(null);
    const { field } = useController({
        name: 'Body',
        control,
        defaultValue: initialValue,
    });

    const { onChange, ...rest } = field;

    return (
        <div
            className={`bg-white min-h-500 shadow-inner ${s.html}`}
            style={{ borderRadius: '10px' }}
            ref={textFieldRef}
        >
            <Editor
                apiKey={process.env.TINY_MCE_API_KEY}
                onEditorChange={onChange}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: listPlugins,
                    toolbar,
                    forced_root_block_attrs: {
                        style: `body {
                            font-family: font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                            font-size: 14px;
                        }`,
                    },
                }}
                {...rest}
                ref={ref}
            />
        </div>
    );
});

export default TinyEditor;
