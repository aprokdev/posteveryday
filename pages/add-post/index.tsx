import React from 'react';
import Layout from '../../components/layout';
import Input from '../../components/input';

function AddPost() {
    const [value, setValue] = React.useState('');
    return (
        <Layout>
            <Input value={value} onChange={({ target }) => setValue(target.value)} />           
        </Layout>
    );
}

export default AddPost;
