import Layout from '@/components/layout/layout';

export default function Home() {
    return (
        <Layout>
            <div
                style={{
                    width: '100%',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <div style={{ background: 'black', width: '1200px', height: '100px' }}></div>
            </div>
        </Layout>
    );
}
