import Layout from '@/components/layout';
import LineBallCanvas from '@/components/lineBallCanvas';

export default function Home() {
    return (
        <Layout>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                            {/* <LineBallCanvas></LineBallCanvas> */}
                <div style={{ width: '100%', height: '100%' }}>123</div>
            </div>
        </Layout>
    );
}
