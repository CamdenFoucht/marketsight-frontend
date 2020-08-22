import React, { useLayoutEffect, useState, useRef } from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'emotion-theming';

const Loading = (props: any) => {
  const theme: any = useTheme();
  const targetRef: any = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

  const { width } = dimensions;

  let columns = 0;
  let rows = 0;

  if (width >= 1000) {
    columns = 4;
    rows = 4;
  } else if (width >= 768) {
    columns = 3;
    rows = 3;
  } else if (width >= 568) {
    columns = 2;
    rows = 3;
  } else {
    columns = 1;
    rows = 3;
  }

  let rects = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      rects.push(
        <rect
          x={j * (100 / columns + 1) + '%'}
          y={i * 220}
          rx='2'
          ry='2'
          width={100 / columns - 1 + '%'}
          height='200'
        />
      );
    }
  }

  return (
    <div style={{ width: '100%' }} ref={targetRef}>
      <ContentLoader
        speed={2}
        width={'100%'}
        height={750}
        backgroundColor={theme.skeletonBackground}
        foregroundColor={theme.skeletonForeground}
        {...props}
      >
        {rects}
      </ContentLoader>
    </div>
  );
};

export default Loading;
