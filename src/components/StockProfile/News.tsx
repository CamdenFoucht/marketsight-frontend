import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const News = (props: any) => {
  const theme: any = useTheme();

  return props.articles.map((el: any, index: number) => (
    <a
      href={el.url}
      className={
        'newspost ' +
        css`
          border-bottom: 1px solid ${theme.borderBottom};
          &:hover {
            background-color: ${theme.newsBackgroundHover};
          }
        `
      }
    >
      <img
        className='news__img'
        src={el.image + '?token=Tsk_93c89c2fc989450db503c468006f6eed'}
        alt='newspost'
      />
      <div className='news__content'>
        <span
          className={
            'news__source ' +
            css`
              color: ${theme.text};
            `
          }
        >
          {el.source}
        </span>
        <h4
          className={
            'news__headline ' +
            css`
              color: ${theme.text};
            `
          }
        >
          {el.headline}
        </h4>
        <p className='news__summary'>{el.summary.slice(0, 100)}</p>
      </div>
    </a>
  ));
};

export default News;
