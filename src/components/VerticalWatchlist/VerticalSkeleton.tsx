import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'emotion-theming';

const VerticalSkeleton = (props: any) => {
  const theme: any = useTheme();
  return (
    <ContentLoader
      speed={1.75}
      width={300}
      height={750}
      backgroundColor={theme.skeletonBackground}
      foregroundColor={theme.skeletonForeground}
      {...props}
    >
      <rect x='0' y='20' rx='2' ry='2' width='300' height='750' />
    </ContentLoader>
  );
};

export default VerticalSkeleton;
