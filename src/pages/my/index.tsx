import style from './my.module.scss';
import { getUserDetail, updateUser } from '@/api/user';
import Layout from '@/components/layout';
import { getLocal, setLocal } from '@/utils/commonUtils';
import { init } from 'next/dist/compiled/webpack/webpack';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import siteConfig from '@/configs/siteConfig';
import { Input, message } from 'antd';
import router from 'next/router';
import ArticleList from '@/components/articleList';
import { IArticlesData } from '../article/[id]';
import { findArticle } from '@/api/article';

export default function MyPage() {
    const userInf = getLocal('userInf')
    let { id, email, nickname, username, isAdmin } = userInf||{id:-1, email:'', nickname:'', username:'', isAdmin:false};    
    const [usernameEdit,setUsernameEdit]=useState(false);
    const [emailEdit,setEmailEdit]=useState(false);
    const [currentUsername,setCurrentUsername]=useState(nickname||username||'');
    const [currentEmail,setCurrentEmail]=useState(email||'');
    const [initUser,setInitUser] = useState({ email, username: nickname || username });
    const [articlesData,setArticlesData] = useState<IArticlesData[]>([])

    const handleUpdateUser = (params:any) => {
        const newUser = {...initUser,...params}
        const res = updateUser(newUser)
        setInitUser(newUser);
        setLocal('userInf',{...userInf,...newUser});
    }

    const handleEditUsernameClick = ()=>{
       if(usernameEdit){
            handleUpdateUser({username:currentUsername})
        } setUsernameEdit(!usernameEdit)
        
    }
    const handleEditEmailClick = ()=>{
        if(emailEdit){
            handleUpdateUser({email:currentEmail})
        }setEmailEdit(!emailEdit)
    }
    const initMyArticle = async ()=>{
        const res = await findArticle({admin_id:id});
        setArticlesData(res.data.data)
    }
    useEffect(()=>{
        const userInf = getLocal('userInf')
        if(!userInf){
            message.warning('请先登录')
            router.push({ pathname: `/` });
        }
    },[])
    useEffect(()=>{
        console.log('id',id);
        
        initMyArticle()
    },[id])
    return (
        <Layout>
            <div className={style.my}>
                <div className={style.top}>
                    <Image width={128}
                        height={128}
                        alt="haimin"
                        src={siteConfig.imgServer + 'haimin.jpg'} />
                    <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:8,width:'100%'}}>
                            欢迎你，{<Input className={style.title} value={currentUsername} disabled={!usernameEdit} onChange={(e)=>{setCurrentUsername(e.target.value)}}/>}
                            <a className={style.btn} onClick={handleEditUsernameClick}> {usernameEdit?'保存':'修改昵称'}</a>
                        </div>
                        <div style={{display:'flex',alignItems:'center',gap:8,width:'100%'}}>
                           当前账号绑定邮箱： <Input className={style.title} value={currentEmail} disabled={!emailEdit} onChange={(e)=>{setCurrentEmail(e.target.value)}}/>
                           <a className={style.btn} onClick={handleEditEmailClick}> {emailEdit?'保存':'换绑'}</a>
                        </div>
                        <div className={style.title}>uid:{id} <a className={style.btn}> 复制</a></div>
                    </div>
                </div>
                <div className={style.inf}>
                    <div className={style.box}>
                        {`累计获赞：${articlesData.reduce((preItem,item)=>{return preItem + item.favorite_num},0)}`}
                    </div>
                    <div className={style.box}>
                        发布文章数：{articlesData.length}
                    </div>
                    <div className={style.box}>
                        发布评论数：{1}
                    </div>
                    <div className={style.box}>
                        {`曝光数：${articlesData.reduce((preItem,item)=>{return preItem + item.browse},0)}`}
                    </div>
                </div>
                <p style={{fontSize:22,fontWeight:'bold'}}>我的文章：</p>
                <ArticleList canDelete articlesData={articlesData}></ArticleList>
            </div>
        </Layout>
    );
}
