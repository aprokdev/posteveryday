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
                apiKey="8srmupem2vxdakc5vomuuu2hrn97ep4c78zupz4k5if90gjg"
                onEditorChange={onChange}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: listPlugins,
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                {...rest}
                ref={ref}
            />
        </div>
    );
});

export default TinyEditor;
