import React from 'react';
// import MDEditor from '@uiw/react-md-editor';
import Layout from '@components/layout';
import Input from '@components/input';

function AddPost() {
    const [value, setValue] = React.useState('');
    return (
        <Layout>
            <h2 className="text-3xl">In development ¯\_(ツ)_/¯</h2>
            {/* <Input value={value} onChange={({ target }) => setValue(target.value)} /> */}
            {/* <MDEditor value={value} onChange={setValue} />
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </Layout>
    );
}

export default AddPost;
