import { useParams } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import SharedHeader from '../layout/SharedHeader';
import SharedFooter from '../layout/SharedFooter';

function DynamicPage() {
  const { slug } = useParams();
  const { siteData } = useSite();
  const { dynamicPages } = siteData;

  const page = dynamicPages?.find(p => p.slug === slug && p.enabled);

  if (!page) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SharedHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Page Not Found</h1>
            <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist.</p>
          </div>
        </main>
        <SharedFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SharedHeader />
      <main className="flex-1">
        <div className="container-academic py-16">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">{page.title}</h1>
          <div
            className="mt-8 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </main>
      <SharedFooter />
    </div>
  );
}

export default DynamicPage;
