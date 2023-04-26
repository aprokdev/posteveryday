import Button from '@components/button';
import PostForm from '@components/post-form';
import SmallerContainer from '@components/smaller-container';
import { IEditModeProps } from './types';

export default function EditMode(props: IEditModeProps): JSX.Element {
    const { postData, backToReadMode, onSubmit } = props;
    return (
        <div className="bg-gray-200 pt-8">
            <SmallerContainer>
                <PostForm {...postData} onSubmit={onSubmit}>
                    <Button
                        type="button"
                        className="mr-4 !border-black !text-black !border-2 !bg-gray-200 w-28"
                        onClick={backToReadMode}
                    >
                        Back
                    </Button>
                    <Button type="submit" className="w-28">
                        Preview
                    </Button>
                </PostForm>
            </SmallerContainer>
        </div>
    );
}
