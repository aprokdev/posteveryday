import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Layout from '@components/layout';
import Input from '@components/input';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

function AddPost() {
    const [value, setValue] = React.useState({
        html: '',
        text: '![image](https://www.posteveryday.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fchemistry.c2964d15.jpg&w=1920&q=75)',
    });

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const onImageUpload = React.useCallback(async (file) => {
        return await toBase64(file);
    }, []);

    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange text', text);
        console.log('handleEditorChange html', html);
    }

    return (
        <Layout>
            {/* <h2 className="text-3xl">In development ¯\_(ツ)_/¯</h2> */}
            <MdEditor
                style={{ height: 'calc(100vh - 140px)' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                onImageUpload={onImageUpload}
            />
        </Layout>
    );
}

export default AddPost;
