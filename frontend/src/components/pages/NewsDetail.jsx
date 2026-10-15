import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function cleanBrokenHtml(html) {
  if (!html) {
    return '';
  }

  let cleaned = String(html);

  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, '');
  cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, '');
  cleaned = cleaned.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');
  cleaned = cleaned.replace(/<(object|embed)[\s\S]*?<\/\1>/gi, '');
  cleaned = cleaned.replace(/<meta[^>]*>/gi, '');
  cleaned = cleaned.replace(/<link[^>]*>/gi, '');
  cleaned = cleaned.replace(/\uFFFD/g, '');

  return cleaned;
}

function sanitizeArticleHtml(html) {
  if (!html) {
    return '';
  }

  try {
    const cleanedHtml = cleanBrokenHtml(html);

    const parser = new DOMParser();

    const parsedDocument = parser.parseFromString(
      cleanedHtml,
      'text/html'
    );

    parsedDocument
      .querySelectorAll(
        [
          'script',
          'style',
          'iframe',
          'object',
          'embed',
          'link',
          'meta',
          'form',
          'input',
          'button',
          'textarea',
          'select',
          'template',
        ].join(',')
      )
      .forEach((element) => {
        element.remove();
      });

    parsedDocument
      .querySelectorAll('*')
      .forEach((element) => {
        Array.from(element.attributes).forEach(
          (attribute) => {
            const attributeName =
              attribute.name.toLowerCase();

            const attributeValue =
              String(attribute.value || '')
                .trim()
                .toLowerCase();

            if (
              attributeName.startsWith('on') ||
              attributeName === 'srcdoc' ||
              attributeValue.startsWith('javascript:')
            ) {
              element.removeAttribute(attribute.name);
            }
          }
        );

        if (element.tagName === 'A') {
          const href =
            element.getAttribute('href') || '';

          if (
            href
              .trim()
              .toLowerCase()
              .startsWith('javascript:')
          ) {
            element.removeAttribute('href');
          }

          element.setAttribute(
            'rel',
            'noopener noreferrer'
          );

          if (
            href.startsWith('http://') ||
            href.startsWith('https://')
          ) {
            element.setAttribute(
              'target',
              '_blank'
            );
          }
        }

        if (element.tagName === 'IMG') {
          const imageSource =
            element.getAttribute('src') ||
            element.getAttribute('data-src') ||
            element.getAttribute('data-lazy-src') ||
            '';

          if (imageSource) {
            element.setAttribute(
              'src',
              imageSource
            );
          }

          element.setAttribute(
            'loading',
            'lazy'
          );

          element.setAttribute(
            'decoding',
            'async'
          );

          element.removeAttribute('width');
          element.removeAttribute('height');
          element.removeAttribute('srcset');
          element.removeAttribute('sizes');
          element.removeAttribute('fetchpriority');
        }

        element.removeAttribute('style');
      });

    return parsedDocument.body.innerHTML;
  } catch (error) {
    console.error(
      'Article HTML sanitization failed:',
      error
    );

    return '';
  }
}

function htmlToPlainText(html) {
  if (!html) {
    return '';
  }

  try {
    const parser = new DOMParser();

    const parsedDocument = parser.parseFromString(
      String(html),
      'text/html'
    );

    return (
      parsedDocument.body.textContent
        ?.replace(/\s+/g, ' ')
        .trim() || ''
    );
  } catch (error) {
    return String(html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

function normalizeSlug(value) {
  let normalized =
    String(value || '').trim();

  try {
    normalized =
      decodeURIComponent(normalized);
  } catch (error) {
    console.warn(
      'Could not decode news slug:',
      error
    );
  }

  return normalized
    .replace(/\/+$/, '')
    .trim();
}

function formatArticleDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString(
    'zh-TW',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
  );
}

function NewsDetail() {
  const { slug } = useParams();

  const [article, setArticle] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    let isMounted = true;

    const loadArticle = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `/news-archive.json?t=${Date.now()}`,
          {
            cache: 'no-store',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `News archive request failed: ${response.status}`
          );
        }

        const items =
          await response.json();

        if (!Array.isArray(items)) {
          throw new Error(
            'Invalid news archive format'
          );
        }

        const requestedSlug =
          normalizeSlug(slug);

        const foundArticle =
          items.find((item) => {
            const itemSlug =
              normalizeSlug(
                item?.slug || ''
              );

            return (
              itemSlug === requestedSlug
            );
          });

        if (!foundArticle) {
          throw new Error(
            `Article not found: ${requestedSlug}`
          );
        }

        if (isMounted) {
          setArticle(foundArticle);
        }
      } catch (loadError) {
        console.error(
          'News detail error:',
          loadError
        );

        if (isMounted) {
          setError(
            '找不到這篇新聞，或新聞資料載入失敗。'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const safeContent = useMemo(() => {
    return sanitizeArticleHtml(
      article?.content || ''
    );
  }, [article]);

  const fallbackText = useMemo(() => {
    return htmlToPlainText(
      article?.content || ''
    );
  }, [article]);

  const formattedDate =
    formatArticleDate(
      article?.pubDate
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container-academic py-20">
          <p className="text-muted-foreground">
            新聞載入中...
          </p>
        </main>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container-academic py-20">
          <div className="mx-auto max-w-3xl rounded-lg border border-red-200 bg-red-50 p-6">
            <p className="text-red-700">
              {error || '找不到這篇新聞'}
            </p>

            <Link
              to="/destinations"
              className="mt-6 inline-flex items-center gap-2 text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              返回新聞列表
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container-academic flex h-16 items-center md:h-20">
          <Link
            to="/"
            className="font-heading text-lg font-bold md:text-xl"
          >
            中華海外參訪顧問
          </Link>
        </div>
      </header>

      <main className="container-academic py-12 md:py-20">
        <Link
          to="/destinations"
          className="mb-8 inline-flex items-center gap-2 text-sm text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          返回新聞列表
        </Link>

        <article className="mx-auto max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {article.category && (
              <span className="font-medium text-accent">
                {article.category}
              </span>
            )}

            {formattedDate && (
              <time>
                {formattedDate}
              </time>
            )}
          </div>

          <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
            {article.title}
          </h1>

          {article.image && (
            <img
              src={article.image}
              alt={article.title || '新聞圖片'}
              className="mt-8 h-auto w-full rounded-lg object-cover"
              loading="eager"
              onError={(event) => {
                event.currentTarget.style.display =
                  'none';
              }}
            />
          )}

          {article.description && (
            <p className="mt-8 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
              {article.description}
            </p>
          )}

          {safeContent ? (
            <div
              className="
                mt-10 max-w-none overflow-hidden leading-relaxed
                [&_h1]:mb-5
                [&_h1]:mt-10
                [&_h1]:text-3xl
                [&_h1]:font-bold
                [&_h2]:mb-5
                [&_h2]:mt-10
                [&_h2]:text-2xl
                [&_h2]:font-bold
                [&_h3]:mb-4
                [&_h3]:mt-8
                [&_h3]:text-xl
                [&_h3]:font-bold
                [&_h4]:mb-4
                [&_h4]:mt-8
                [&_h4]:text-xl
                [&_h4]:font-bold
                [&_h5]:mb-4
                [&_h5]:mt-8
                [&_h5]:text-lg
                [&_h5]:font-bold
                [&_p]:mb-5
                [&_ul]:mb-5
                [&_ul]:list-disc
                [&_ul]:pl-6
                [&_ol]:mb-5
                [&_ol]:list-decimal
                [&_ol]:pl-6
                [&_li]:mb-2
                [&_img]:my-8
                [&_img]:h-auto
                [&_img]:max-w-full
                [&_img]:rounded-lg
                [&_figure]:my-8
                [&_figcaption]:mt-2
                [&_figcaption]:text-sm
                [&_figcaption]:text-muted-foreground
                [&_a]:break-words
                [&_a]:text-accent
                [&_a]:underline
                [&_table]:block
                [&_table]:max-w-full
                [&_table]:overflow-x-auto
              "
              dangerouslySetInnerHTML={{
                __html: safeContent,
              }}
            />
          ) : fallbackText ? (
            <div className="mt-10 whitespace-pre-wrap leading-relaxed">
              {fallbackText}
            </div>
          ) : (
            <p className="mt-10 text-muted-foreground">
              這篇新聞目前沒有完整內容。
            </p>
          )}
        </article>
      </main>
    </div>
  );
}

export default NewsDetail;