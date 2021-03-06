import React, {useState} from 'react';
import AdminLayout from "../../../components/layouts/adminLaout";
import {NextPageContext} from "next";
import {Table, Space, Button, Popconfirm, message, Result, Pagination} from 'antd';
import httpClient from "../../../src/utils/httpClient";
import Link from "next/link";
import isAuthenticated from "../../../src/utils/isAuthenticated";
import isAdmin from "../../../src/utils/isAdmin";
import {useRouter} from "next/router";
import {constants} from "../../../constants";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Posts: React.FC = ({stories}) => {
    const [storiesData, setStoriesData] = useState(stories.items);
    const router = useRouter()
    const  confirm =(e: any)=> {

        httpClient.delete(`/stories/${e.id}`)
            .then((res:any)=>{
                setStoriesData((previousState: any[])=>  previousState.filter(s=>s.id !== e.id));
                message.success('Successfully deleted');
            })
            .catch(err=>{
                message.error('Click on No');
            })

    }

    const onChange = (page: any)=>{
        router.push(`${constants.BASE_URL}/admin/posts?page=${page}&limit=10`)
    }
    const  itemRender =(current: any, type: string, originalElement: any) =>{
        if (type === 'prev') {
            return <Link href={stories.links.previous}><a>Prev</a></Link>;
        }
        if (type === 'next') {
            return <Link href={stories.links.next}><a>Next</a></Link>;
        }
        return originalElement;
    }
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            // eslint-disable-next-line react/display-name
            render: (title: string) => <a>{title}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button type='link'>
                        <Link href={`/admin/${record.slug}/edit`}>
                            Edit
                        </Link>
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={()=>confirm(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    if(!isAuthenticated() || !isAdmin()){
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="link">Back Home</Button>}
            />
        )
    }

    return(
        <div>
            <h1>Posts</h1>
            <Table pagination={{current: stories.meta.currentPage,
                total: stories.meta.totalItems,
                pageSize: stories.meta.itemsPerPage,
                itemRender,
                onChange

            }} key="id" columns={columns} dataSource={storiesData} />
        </div>
    );
}

if(isAuthenticated() && isAdmin()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Posts.Layout = AdminLayout;
}

export async function getServerSideProps(ctx: NextPageContext) {


    return { props: {
            stories: JSON.parse(JSON.stringify(ctx.query.stories))
        } };
}
export default Posts;
