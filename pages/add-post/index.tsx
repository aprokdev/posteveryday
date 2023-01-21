import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import React from 'react';
// import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Input from '@components/form/input';
import Layout from '@components/layout';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

function AddPost() {
    const [value, setValue] = React.useState({
        html: '',
        text: '![image](https://www.posteveryday.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fchemistry.c2964d15.jpg&w=1920&q=75)',
    });

    const [title, setTitle] = React.useState<string>('');

    const toBase64 = (file): Promise<string | ArrayBuffer | Error> => {
        return new Promise((resolve, reject) => {
            console.log(file);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const onImageUpload = React.useCallback(async (file): Promise<string | ArrayBuffer | Error> => {
        const res = await toBase64(file);
        console.log('res', res);
        return res;
    }, []);

    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange html', html);
    }

    return (
        <Layout>
            {/* <h2 className="text-3xl">In development ¯\_(ツ)_/¯</h2> */}
            <label className="block">
                <span className="text-gray-700">Title</span>
                <Input value={title} onChange={({ target }) => setTitle(target.value)} autoFocus />
                <span className={`text-sm text-transparent`}>Error</span>
            </label>

            <span className="block">
                <span className="block text-gray-700 mb-4">Post body</span>
                <MdEditor
                    style={{ height: 'calc(100vh - 140px)' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    onImageUpload={onImageUpload}
                />
            </span>
        </Layout>
    );
}

export default AddPost;
