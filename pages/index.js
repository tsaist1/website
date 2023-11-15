import Link from 'next/link';
import Date from '../components/date';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import useSWR from 'swr';

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section className={utilStyles.headingMd}>
                <p>[Welcome to ST's website]</p>
            </section>

            <section
                className={`${utilStyles.headingMd}, ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

// server side rendering
// export async function getServerSideProps(context) {
// 	return {
// 		props: {
// 			// props for your component
// 		},
// 	};
// }

// SWR -- React hook for client side data fetching
function Profile() {
    const { data, error } = useSWR('/api/user', fetch);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    return <div>hello {data.name}!</div>;
}

function About() {
    return (
        <embed
            src="../public/pdfs/ShengTseTsai_Resume.pdf"
            width="800px"
            height="2100px"
        />
    );
}

function SocialMediaLinks() {
    const [githubUrl, setGithubUrl] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');

    return (
        <div>
            <label>
                GitHub:
                <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                />
            </label>
            <br />
            <label>
                LinkedIn:
                <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                />
            </label>
            <br />
            <div>
                {githubUrl && (
                    <p>
                        GitHub:{' '}
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {githubUrl}
                        </a>
                    </p>
                )}
                {linkedinUrl && (
                    <p>
                        LinkedIn:{' '}
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {linkedinUrl}
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}
