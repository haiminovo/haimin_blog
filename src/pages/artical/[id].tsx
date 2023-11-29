import Layout from '@/components/layout/layout';
import { useRouter } from 'next/router';

export default function ArticalPage() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <Layout>
            <div>artical{id}</div>
        </Layout>
    );
}
