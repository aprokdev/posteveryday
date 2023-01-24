import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';

export default function TinyEditor({ editorRef, initialValue }) {
    return (
        <>
            <Editor
                apiKey="8srmupem2vxdakc5vomuuu2hrn97ep4c78zupz4k5if90gjg"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={initialValue}
                // inline
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
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
                        'table',
                        'code',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
        </>
    );
}
